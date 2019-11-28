// -*- Mode: Go; indent-tabs-mode: t -*-
//
// Copyright (C) 2018 Canonical Ltd
// Copyright (C) 2018-2019 IOTech Ltd
//
// SPDX-License-Identifier: Apache-2.0
//
// Credit goes to

package driver

import (
	"bytes"
	"fmt"
	"image"
	"image/jpeg"
	"image/png"
	"os"
	"sync"
	"time"

	dsModels "github.com/edgexfoundry/device-sdk-go/pkg/models"
	"github.com/edgexfoundry/go-mod-core-contracts/clients/logger"
	contract "github.com/edgexfoundry/go-mod-core-contracts/models"
	// import goface functionality, to be called on by using "GF.funcName()"
	// "github.com/oliviakumar/vmware_edgewalk/model-goface/detect"
)

// internal data struct
type GofaceDevice struct {
	lc         logger.LoggingClient
	asyncCh    chan<- *dsModels.AsyncValues
	mux        sync.Mutex
	imagePath	string
}

func (s *GofaceDevice) DisconnectDevice(deviceName string, protocols map[string]contract.ProtocolProperties) error {
	return nil
}

// Initialize performs protocol-specific initialization for the devicef
// service.
func (s *GofaceDevice) Initialize(lc logger.LoggingClient, asyncCh chan<- *dsModels.AsyncValues) error {
	s.lc = lc
	s.asyncCh = asyncCh

	// start routine operating camera to check for faces with current rec instance
	// OperateCamera will call on OperateGoface to recognize the faces
	// OperateGoface will call on parseStruct to get the info of the recognized picture
	// go s.OperateCamera()

	return nil
}

func getImageBytes(imgFile string, buf *bytes.Buffer) error {
	// Read existing image from file
	img, err := os.Open(imgFile)
	if err != nil {
		fmt.Println(err)
		return err
	}
	defer img.Close()

	// read in opened img file
	// Expects "jpeg" or "png" image type
	imageData, imageType, err := image.Decode(img)
	if err != nil {
		fmt.Println(err)
		return err
	}

	// Finished with file. Reset file pointer
	_, err = img.Seek(0, 0)

	// case handling of jpeg vs png, decides on which pipeline to encode
	if imageType == "jpeg" {
		err = jpeg.Encode(buf, imageData, nil)
		if err != nil {
			fmt.Println(err)
			return err
		}
	} else if imageType == "png" {
		err = png.Encode(buf, imageData)
		if err != nil {
			fmt.Println(err)
			return err
		}
	}
	return nil
}

// method that will be initialized in Init() but will run as a routine to constantly take in new image paths


// device service method to operate the camera, gets called with current rec instance
// returns the last path with a face in it
// func (s *GofaceDevice) OperateCamera() string {
// 	// init path var that will be reused throughout the whole program

// 	for {
// 		/*args := "-o model-goface/testImages/Test%08.jpg"
// 		exec.Command("raspistill", args)
// 		*/

// 		// testing with hardcoded image path
// 		s.imagePath = "test1.jpg"
// 		var hasFace = detect.TestForFace(s.imagePath)
// 		if hasFace == true {
// 			return s.imagePath
// 		}
// 		// then sleep for 1 sec
// 		time.Sleep(1000 * time.Millisecond)
// 		// path of last photo
// 		return s.imagePath
// 	}
// }


// HandleReadCommands triggers a protocol Read operation for the specified device.
func (s *GofaceDevice) HandleReadCommands(deviceName string, protocols map[string]contract.ProtocolProperties, reqs []dsModels.CommandRequest) (res []*dsModels.CommandValue, err error) {
	//fmt.Fprintf(os.Stdout,  "....... %s .......\n", reqs[0].DeviceResourceName)
	if len(reqs) != 1 {
		err = fmt.Errorf("GofaceDevice.HandleReadCommands; too many command requests; only one supported")
		return
	}
	s.lc.Debug(fmt.Sprintf("GofaceDevice.HandleReadCommands: protocols: %v resource: %v attributes: %v", protocols, reqs[0].DeviceResourceName, reqs[0].Attributes))

	res = make([]*dsModels.CommandValue, 1)
	now := time.Now().UnixNano() / int64(time.Millisecond)

	// define case that goface device calls on driver - send image bytes
	if reqs[0].DeviceResourceName == "goface" {
		buf := new(bytes.Buffer)
		s.mux.Lock()
		getImageBytes("../../../model-goface/testImages/test1.jpg", buf)
		cv, _ := dsModels.NewBinaryValue(reqs[0].DeviceResourceName, now, buf.Bytes())
		s.mux.Unlock()
		res[0] = cv
	}
	return
}

// HandleWriteCommands passes a slice of CommandRequest struct each representing
// a ResourceOperation for a specific device resource.
// Since the commands are actuation commands, params provide parameters for the individual
// command.
func (s *GofaceDevice) HandleWriteCommands(deviceName string, protocols map[string]contract.ProtocolProperties, reqs []dsModels.CommandRequest,
	params []*dsModels.CommandValue) error {
	err := fmt.Errorf("GofaceDevice.HandleWriteCommands; no write commands supported")
	return err
}

// Stop the protocol-specific DS code to shutdown gracefully, or
// if the force parameter is 'true', immediately. The driver is responsible
// for closing any in-use channels, including the channel used to send async
// readings (if supported).
func (s *GofaceDevice) Stop(force bool) error {
	// Then Logging Client might not be initialized
	if s.lc != nil {
		s.lc.Debug(fmt.Sprintf("GofaceDevice.Stop called: force=%v", force))
	}
	return nil
}

// AddDevice is a callback function that is invoked
// when a new Device associated with this Device Service is added
func (s *GofaceDevice) AddDevice(deviceName string, protocols map[string]contract.ProtocolProperties, adminState contract.AdminState) error {
	s.lc.Debug(fmt.Sprintf("a new Device is added: %s", deviceName))
	return nil
}

// UpdateDevice is a callback function that is invoked
// when a Device associated with this Device Service is updated
func (s *GofaceDevice) UpdateDevice(deviceName string, protocols map[string]contract.ProtocolProperties, adminState contract.AdminState) error {
	s.lc.Debug(fmt.Sprintf("Device %s is updated", deviceName))
	return nil
}

// RemoveDevice is a callback function that is invoked
// when a Device associated with this Device Service is removed
func (s *GofaceDevice) RemoveDevice(deviceName string, protocols map[string]contract.ProtocolProperties) error {
	s.lc.Debug(fmt.Sprintf("Device %s is removed", deviceName))
	return nil
}

func (s *GofaceDevice) WriteConfiguration() {
	edgeHub := GetEdgeHub()
	config := "[Writable]\n" +
	"LogLevel = 'INFO'\n" +
	"\n" +
	"[Service] \n" +
	"Host = \"localhost\"\n" +
	"Port = 45045\n" +
	"ConnectRetries = 20\n" +
	"Labels = []\n" +
	"OpenMsg = \"device goface started\"\n" +
	"MaxResultCount = 50000\n" +
	"Timeout = 5000\n" +
	"EnableAsyncReadings = true\n" +
	"AsyncBufferSize = 16\n" +
	"\n" +
	"[Registry]\n" +
	"Host = \"" + edgeHub + "\"\n" +
	"Port = 8500\n" +
	"CheckInterval = \"10s\"\n" +
	"FailLimit = 3\n" +
	"FailWaitTime = 10\n" +
	"\n" +
	"# Calls to other EdgeX components\n" +
	"[Clients]\n" +
	"	[Clients.Data]\n" +
	"	Name = \"edgex-core-data\"\n" +
	"	Protocol = \"http\"\n" +
	"	Host = \"" + edgeHub + "\"\n" +
	"	Port = 48080\n" +
	"	Timeout = 5000\n" +
	"\n" +
	"	[Clients.Metadata]\n" +
	"	Name = \"edgex-core-metadata\"\n" +
	"	Protocol = \"http\"\n" +
	"	Host = \"" + edgeHub + "\"\n" +
	"	Port = 48081\n" +
	"	Timeout = 5000\n" +
	"\n" +
	" 	[Clients.Logging]\n" +
	"	Name = \"edgex-support-logging\"\n" +
	"	Protocol = \"http\"\n" +
	"	Host = \"" + edgeHub + "\"\n" +
	"	Port = 48061\n" +
	"\n" +
	"[Device]\n" +
	"	DataTransform = true\n" +
	"	InitCmd = \"\"\n" +
	"	InitCmdArgs = \"\"\n" +
	"	MaxCmdOps = 128\n" +
	"	MaxCmdValueLen = 256\n" +
	"	RemoveCmd = \"\"\n" +
	"	RemoveCmdArgs = \"\"\n" +
	"	ProfilesDir = \"./res\"\n" +
	"\n" +
	"# enable the logging and define the level\n" +
	"[Logging]\n" +
	"EnableRemote = false\n" +
	"File = \"./device-goface.log\"\n" +
	"\n" +
	"# Pre-define Devices - use Name for API calls\n" +
	"[[DeviceList]]\n" +
	"	Name = \"device-goface-01\"\n" +
	"	Profile = \"device-goface\"\n" +
	"	Description = \"Goface Recognizer Device\"\n" +
	"	Labels = [ \"IoT\" ]\n" +
	"	[DeviceList.Protocols]\n" +
	"		[DeviceList.Protocols.Other]\n" +
	"			Address = \"goface01\"\n" +
	"			Port = \"300\"\n" +
	"		[[DeviceList.AutoEvents]]\n" +
	"			Frequency = \"1s\"\n" +
	"			OnChange = false\n" +
	"			Resource = \"goface\"\n"
	bytes := []byte(config)
	err := ioutil.WriteFile("res/configuration.toml", bytes, 0644)
	if err != nil {
		fmt.Println(err)
	}
}

func GetEdgeHub() string  {
	edgeHub := os.Getenv("EDGEHUB")
	if (edgeHub == "") {
		edgeHub = "localhost"
	}
	return edgeHub
}
