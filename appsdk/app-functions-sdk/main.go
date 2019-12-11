package main

import (
	"errors"
	"fmt"
	"os"
	"encoding/json"
	"net/http"
	"bytes"
	"mime/multipart"
	"io"
	"io/ioutil"
	"strings"
	"path/filepath"
	"os/exec"
	"reflect"

	"github.com/edgexfoundry/app-functions-sdk-go/pkg/transforms"
	"github.com/edgexfoundry/app-functions-sdk-go/appcontext"
	"github.com/edgexfoundry/app-functions-sdk-go/appsdk"
	"github.com/edgexfoundry/go-mod-core-contracts/models"

	"github.com/oliviakumar/vmware_edgewalk/model-goface/recognition"
	dModels"github.com/oliviakumar/vmware_edgewalk/models"
)

const (
	serviceKey = "imageWebService"
)

func main() {

	// 1) First thing to do is to create an instance of the EdgeX SDK, giving it a service key
	edgexSdk := &appsdk.AppFunctionsSDK{ServiceKey: serviceKey}

	// 2) Next, we need to initialize the SDK
	if err := edgexSdk.Initialize(); err != nil {
		fmt.Println(err)
		//edgexSdk.LoggingClient.Error(fmt.Sprintf("SDK initialization failed: %v\n", err))
		os.Exit(-1)
	}

	// 3) Since our FilterByDeviceName Function requires the list of Device Names we would
	// like to search for, we'll go ahead and define that now.
	deviceNames := []string{"device-goface-01"}

	recognition.Train()

	// 4) This is our pipeline configuration, the collection of functions to
	// execute every time an event is triggered.
	edgexSdk.SetFunctionsPipeline(
		transforms.NewFilter(deviceNames).FilterByDeviceName,
		SaveImage,
		recognition.Infer,
		SendData,
		SendImage,
	)

	// 5) Lastly, we'll go ahead and tell the SDK to "start" and begin listening for events to trigger the pipeline.
	if err := edgexSdk.MakeItRun(); err != nil {
		edgexSdk.LoggingClient.Error("MakeItRun returned error: ", err.Error())
		os.Exit(-1)
	}

	os.Exit(0)
}

//Saves the image in the edgex instance, so it can be deleted locally
func SaveImage(edgexcontext *appcontext.Context, params ...interface{}) (bool, interface{}) {
	if len(params) < 1 {
		return false, errors.New("No data received")
	}
	model := params[0].(models.Event)
	for _, reading := range model.Readings {
		if (len(reading.BinaryValue) == 0) {
			return false, errors.New("No file received")
		}
		out, err := exec.Command("uuidgen").Output()
		if err != nil {
			fmt.Println(err)
			return false, errors.New("error generating uuid")
		}
		uuid := strings.TrimSuffix(string(out), "\n")
		imgName := uuid + ".jpg"
		fpath := "../../model-goface/testImages/" + imgName
		if err != nil {
			return false, errors.New("Cannot find path")
		}
		err = ioutil.WriteFile(fpath, reading.BinaryValue, 0755)
		send := dModels.SendingData {
			Device: reading.Device,
			Edgexid: uuid,
			Imagepath: imgName,
		}
		return true, send
	}
	return false, errors.New("No readings received")
}

//Sends data struct to the web service
func SendData(edgexcontext *appcontext.Context, params ...interface{}) (bool, interface{}) {
	if len(params) < 1 {
		return false, errors.New("No data recevied")
	}
	if reflect.TypeOf(params[0]).Name() == "string" {
		DeleteFile(params[0].(string))
		return false, errors.New("No face was detected/image metadata cannot be read")
	}
	send := params[0].(dModels.SendingData)
	data, err := json.Marshal(send)
	if err != nil {
		DeleteFile(send.Imagepath)
		fmt.Println(err)
		return false, errors.New("Could not convert to json")
	}
	exportHost := GetExportHost()
	host := "http://" + exportHost + ":8080/edge/api"
	resp, err := http.Post(host, "application/json", bytes.NewReader(data))
	if err != nil {
		DeleteFile(send.Imagepath)
		fmt.Println(err)
		return false, errors.New("Error posting data")
	}
	defer resp.Body.Close()
	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		DeleteFile(send.Imagepath)
		return false, fmt.Errorf("export failed with %d HTTP status code", resp.StatusCode)
	}
	return true, send
}

//Sends the inference image to the web service
func SendImage(edgexcontext *appcontext.Context, params ...interface{}) (bool, interface{}) {
	if len(params) < 1 {
		return false, errors.New("No data recevied")
	}
	send := params[0].(dModels.SendingData)
	if send.Imagepath != "" {
		imgPath := filepath.Join("../../model-goface/testImages", send.Imagepath)
		file, err := os.Open(imgPath)
		if err != nil {
			fmt.Println(err)
			DeleteFile(send.Imagepath)
			return false, errors.New("Image could not be opened")
		}
		values := map[string] io.Reader {
			"file": file,
			"edgexId": strings.NewReader(send.Edgexid),
		}
		err = Upload(values)
		if err != nil {
			fmt.Println(err)
			DeleteFile(send.Imagepath)
			return false, errors.New("Error posting image data")
		}
	}
	str := ""
	if send.Imagepath == "" {
		str = "No image path was given"
	}
	DeleteFile(send.Imagepath)
	return true, str
}

//Handles the conversion of image toa multipart request
func Upload(values map[string] io.Reader) (err error) {
	b := new(bytes.Buffer)
	w := multipart.NewWriter(b)
	for key, r := range values {
		var fw io.Writer
		if x, ok := r.(io.Closer); ok {
			defer x.Close()
		}
		// Add an image file
		if x, ok := r.(*os.File); ok {
			if fw, err = w.CreateFormFile(key, x.Name()); err != nil {
				fmt.Println(err)
				return errors.New("Error creating form file")
			}
		} else {
			// Add other fields
			if fw, err = w.CreateFormField(key); err != nil {
				fmt.Println(err)
				return errors.New("Error creating form field")
			}
		}
		if _, err = io.Copy(fw, r); err != nil {
			return err
		}
	}
	w.Close()

	exportHost := GetExportHost()
	host := "http://" + exportHost + ":8080/edge/image"
	resp, err := http.Post(host, w.FormDataContentType(), b)
	if err != nil {
		fmt.Println(err)
		return errors.New("Error posting image data")
	}
	defer resp.Body.Close()
	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return errors.New(fmt.Sprintf("export failed with %d HTTP status code", resp.StatusCode))
	}
	return
}

//Returns the exporthost
func GetExportHost() string  {
	exportHost := os.Getenv("EXPORTHOST")
	if (exportHost == "") {
		exportHost = "localhost"
	}
	return exportHost
}

//Deletes the files after it has been sent to edgex
func DeleteFile(path string) error {
	if path != "" {
		cmd := exec.Command("rm", filepath.Join("../../model-goface/testImages", path))
		return cmd.Run()
	}
	return nil
}

