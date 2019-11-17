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
	"encoding/json"
	"fmt"
	"github.com/Kagami/go-face"
	"os/exec"
	"sync"
	"time"

	dsModels "github.com/edgexfoundry/device-sdk-go/pkg/models"
	"github.com/edgexfoundry/go-mod-core-contracts/clients/logger"
	contract "github.com/edgexfoundry/go-mod-core-contracts/models"
	// import goface functionality, to be called on by using "GF.funcName()"
	GF "github.com/edgexfoundry/vmware_edgewalk/modelgoface"
)

// external data struct
type GofaceData struct {
	Identity  string `json:"identity"`
	Accepted  bool   `json:"accepted"`
	Location  string `json:"location"`
	Entrytype string `json:"type"`
	Imagepath string `json:"imagePath"`
}

// internal data struct
type GofaceDevice struct {
	lc         logger.LoggingClient
	asyncCh    chan<- *dsModels.AsyncValues
	mux        sync.Mutex
	gofacedata string
}

// instantiate struct
type Rec struct {
	*face.Recognizer
}

// constructor used by App SDK to call on data struct from device service
func NewData() GofaceData {
	return GofaceData{}
}

func (s *GofaceDevice) DisconnectDevice(deviceName string, protocols map[string]contract.ProtocolProperties) error {
	return nil
}

// Initialize performs protocol-specific initialization for the devicef
// service.
func (s *GofaceDevice) Initialize(lc logger.LoggingClient, asyncCh chan<- *dsModels.AsyncValues) error {
	s.lc = lc
	s.asyncCh = asyncCh

	// call on goface.go to init model training
	rec := GF.NewRecognizer()
	rec.Train()
	// start routine operating camera to check for faces
	go s.OperateCamera(rec)

	return nil
}

// method that will be initialized in Init() but will run as a routine to constantly take in new image paths
func (s *GofaceDevice) OperateGoface(imgPath string, rec GF.Recognizer) {
	// anon routine for reading the goface data and saving it to s.gofacedata
	go func() {
		// check if a face was detected
		if imgPath != "no face detected" {
			// read in struct and parse as JSON
			// rec.Infer() gives back a struct of GofaceData type that is parsed into a JSON-formatted string
			tempGofaceData := parseStruct(rec.Infer(imgPath))
			s.mux.Lock()
			s.gofacedata = tempGofaceData
			s.mux.Unlock()
			//sleep for 10 millisecs to give other routines the opportunity to run
			time.Sleep(10 * time.Millisecond)
		} else {
			// sleep for 1 sec to catch next picture
			time.Sleep(1000 * time.Millisecond)
		}
	}()
}

// device service method to operate the camera, gets called with current rec instance
// returns the last path with a face in it
func (s *GofaceDevice) OperateCamera(rec GF.Recognizer) string {
	// init path var that will be reused throughout the whole program
	var imgPath string

	for {
		// @TODO to be filled with actual path
		exec.Command("raspistill", "dir/mycameraoutput")
		// @TODO takeShot() to be written, depending on library being used
		// raspistill.takeShot()
		imgPath = "dir/mycameraoutput"
		hasFace := rec.TestForFace(imgPath)
		// if there is a face in the picture, give path of picture to Infer() to recognize it
		if hasFace == true {
			go s.OperateGoface(imgPath, rec)
			return imgPath
		}
		// then sleep for 1 sec
		time.Sleep(1000 * time.Millisecond)
		// path of last photo
		return "no face detected"
	}
}

// parse struct into string input to send into EdgeX
func parseStruct(data GF.GofaceData) string {
	// convert to JSON
	resp, err := json.Marshal(data)

	// print error if something has gone wrong
	if err != nil {
		fmt.Println(err)
	}

	// return the JSON-parsed response as a string
	return string(resp)
}

// function to take in pictures from current

// HandleReadCommands triggers a protocol Read operation for the specified device.
func (s *GofaceDevice) HandleReadCommands(deviceName string, protocols map[string]contract.ProtocolProperties, reqs []dsModels.CommandRequest) (res []*dsModels.CommandValue, err error) {
	if len(reqs) != 1 {
		err = fmt.Errorf("GofaceDevice.HandleReadCommands; too many command requests; only one supported")
		return
	}
	s.lc.Debug(fmt.Sprintf("GofaceDevice.HandleReadCommands: protocols: %v resource: %v attributes: %v", protocols, reqs[0].DeviceResourceName, reqs[0].Attributes))

	res = make([]*dsModels.CommandValue, 1)
	now := time.Now().UnixNano() / int64(time.Millisecond)

	if reqs[0].DeviceResourceName == "goface" {
		s.mux.Lock()
		cv := dsModels.NewStringValue(reqs[0].DeviceResourceName, now, s.gofacedata)
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
