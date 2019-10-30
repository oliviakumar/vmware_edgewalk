package main

import (
	"errors"
	"fmt"
	"os"

	"github.com/edgexfoundry/app-functions-sdk-go/pkg/transforms"
	"github.com/edgexfoundry/app-functions-sdk-go/appcontext"
	"github.com/edgexfoundry/app-functions-sdk-go/appsdk"
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

	// 4) This is our pipeline configuration, the collection of functions to
	// execute every time an event is triggered.
	edgexSdk.SetFunctionsPipeline(
		transforms.NewFilter(deviceNames).FilterByDeviceName,
		transforms.NewConversion().TransformToJSON,
		//transforms.NewHTTPSender("localhost:8080/edge/api", "application/json", false).HTTPPost,
		printJSONToConsole,
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
	return true, nil
}

