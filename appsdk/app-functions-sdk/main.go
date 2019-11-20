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
	"strings"

	"github.com/edgexfoundry/app-functions-sdk-go/pkg/transforms"
	"github.com/edgexfoundry/app-functions-sdk-go/appcontext"
	"github.com/edgexfoundry/app-functions-sdk-go/appsdk"
	"github.com/edgexfoundry/go-mod-core-contracts/models"
	"github.com/edgexfoundry/device-goface/driver"
)

const (
	serviceKey = "imageWebService"
)

type SendingData struct {
	Identity  string `json:"identity"`
	Accepted  bool `json:"accepted"`
	Location  string `json:"location"`
	Entrytype string `json:"type"`
	Device string `json:"device"`
	Edgexid string `json:"edgexId"`
	Imagepath string
}

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

	// 4) This is our pipeline configuration, the collection of functions to
	// execute every time an event is triggered.
	edgexSdk.SetFunctionsPipeline(
		transforms.NewFilter(deviceNames).FilterByDeviceName,
		GetDataFromJSON,
		SendData,
		SendImage,
	)

	// 5) shows how to access the application's specific configuration settings.
	//appSettings := edgexSdk.ApplicationSettings()
	//if appSettings != nil {
	//	appName, ok := appSettings["ApplicationName"]
	//	if ok {
	//		edgexSdk.LoggingClient.Info(fmt.Sprintf("%s now running...", appName))
	//	} else {
	//		edgexSdk.LoggingClient.Error("ApplicationName application setting not found")
	//		os.Exit(-1)
	//	}
	//} else {
	//	edgexSdk.LoggingClient.Error("No application settings found")
	//	os.Exit(-1)
	//}

	// 6) Lastly, we'll go ahead and tell the SDK to "start" and begin listening for events to trigger the pipeline.
	if err := edgexSdk.MakeItRun(); err != nil {
		edgexSdk.LoggingClient.Error("MakeItRun returned error: ", err.Error())
		os.Exit(-1)
	}

	os.Exit(0)
}

func printJSONToConsole(edgexcontext *appcontext.Context, params ...interface{}) (bool,interface{}) {
	if len(params) < 1 {
		// We didn't receive a result
		return false, errors.New("No Data Received")
	}
	println(params[0].(string))
	return true, params[0].(string)
}

func GetDataFromJSON(edgexcontext *appcontext.Context, params ...interface{}) (bool, interface{}) {
	if len(params) < 1 {
		return false, errors.New("No data received")
	}
	model := params[0].(models.Event)
	for _, reading := range model.Readings {
		b := []byte(reading.Value)
		data := driver.NewData()
		err := json.Unmarshal(b, &data)
		if err != nil {
			fmt.Println(err)
			return false, errors.New("Could not unpack data")
		}
		send := SendingData{
			Identity: data.Identity,
			Accepted: data.Accepted,
			Location: data.Location,
			Entrytype: data.Entrytype,
			Device: reading.Device,
			Edgexid: reading.Id,
			Imagepath: data.Imagepath,
		}
		return true, send;
	}
	return false, errors.New("No readings received")
}

func SendData(edgexcontext *appcontext.Context, params ...interface{}) (bool, interface{}) {
	if len(params) < 1 {
		return false, errors.New("No data recevied")
	}
	send := params[0].(SendingData)
	data, err := json.Marshal(send)
	if err != nil {
		fmt.Println(err)
		return false, errors.New("Could not convert to json")
	}
	exportHost := GetExportHost()
	host := "http://" + exportHost + ":8080/edge/api"
	resp, err := http.Post(host, "application/json", bytes.NewReader(data))
	if err != nil {
		fmt.Println(err)
		return false, errors.New("Error posting data")
	}
	defer resp.Body.Close()
	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return false, fmt.Errorf("export failed with %d HTTP status code", resp.StatusCode)
	}
	return true, send
}

func SendImage(edgexcontext *appcontext.Context, params ...interface{}) (bool, interface{}) {
	if len(params) < 1 {
		return false, errors.New("No data recevied")
	}
	send := params[0].(SendingData)
	if send.Imagepath != "" {
		file, err := os.Open(send.Imagepath)
		if err != nil {
			fmt.Println(err)
			return false, errors.New("Image could not be opened")
		}
		values := map[string] io.Reader {
			"file": file,
			"edgexId": strings.NewReader(send.Edgexid),
		}
		err = Upload(values)
		if err != nil {
			fmt.Println(err)
			return false, errors.New("Error posting image data")
		}
		return true, nil
	} else {
		return true, "No image path was given"
	}
}

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

func GetExportHost() string  {
	exportHost := os.Getenv("EXPORTHOST")
	if (exportHost == "") {
		exportHost = "localhost"
	}
	return exportHost
}

