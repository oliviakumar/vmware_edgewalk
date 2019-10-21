// -*- Mode: Go; indent-tabs-mode: t -*-
//
// Copyright (C) 2018 Canonical Ltd
// Copyright (C) 2018-2019 IOTech Ltd
//
// SPDX-License-Identifier: Apache-2.0

// This package provides a simple example implementation of
// ProtocolDriver interface.
//
package driver

import (
	"bufio"
	"bytes"
	"encoding/json"
	"fmt"
	"image"
	"image/jpeg"
	"image/png"
	"os"
	"strconv"
	"strings"
	"sync"
	"time"

	dsModels "github.com/edgexfoundry/device-sdk-go/pkg/models"
	"github.com/edgexfoundry/go-mod-core-contracts/clients/logger"
	contract "github.com/edgexfoundry/go-mod-core-contracts/models"
)

// internal data struct
type GofaceDriver struct {
	lc           logger.LoggingClient
	asyncCh      chan<- *dsModels.AsyncValues
	switchButton bool
	testString   string

	mux        sync.Mutex
	device     *os.File
	scanner    *bufio.Scanner
	gofacedata string
}

// external data struct
type GofaceData struct {
	identity  string
	accepted  bool
	location  string
	entrytype string
}

func getImageBytes(imgFile string, buf *bytes.Buffer) error {
	// Read existing image from file
	img, err := os.Open(imgFile)
	if err != nil {
		return err
	}
	defer img.Close()

	// TODO: Attach MediaType property, determine if decoding
	//  early is required (to optimize edge processing)

	// Expect "png" or "jpeg" image type
	imageData, imageType, err := image.Decode(img)
	if err != nil {
		return err
	}
	// Finished with file. Reset file pointer
	img.Seek(0, 0)
	if imageType == "jpeg" {
		err = jpeg.Encode(buf, imageData, nil)
		if err != nil {
			return err
		}
	} else if imageType == "png" {
		err = png.Encode(buf, imageData)
		if err != nil {
			return err
		}
	}
	return nil
}

// Initialize performs protocol-specific initialization for the device
// service.
func (s *GofaceDriver) Initialize(lc logger.LoggingClient, asyncCh chan<- *dsModels.AsyncValues) error {
	s.lc = lc
	s.asyncCh = asyncCh

	// routine for reading the goface data and saving it to s.gofacedata
	go func() {
		// open device or file with sample output
		s.device, _ = os.Open("goface-test.txt")
		defer s.device.Close()

		s.scanner = bufio.NewScanner(s.device)

		//scanning line by line, checkinf if it starts with $GF, indicating new goface reading
		for s.scanner.Scan() {
			// split lines and split line data points at comma
			splitLine := strings.Split(s.scanner.Text(), ",")
			if len(splitLine) > 0 {
				if splitLine[0] == "$GF" {
					tempGofaceData := parseGofaceLine(splitLine)
					s.mux.Lock()
					s.gofacedata = tempGofaceData
					s.mux.Unlock()
					time.Sleep(1000 * time.Millisecond)
				}
			}
		}

	}()

	return nil
}

// parse goface string and extract data necessary for struct
// data[1] - identity of entrant as a string
// data[2] - status of acceptance: true or false, parsed as string
// data[3] - location of entry , like back door or front door
// data[4] - type of entry, in or out (for later checkout function)
func parseGofaceLine(data []string) string {

	// parsing data from file
	identityName := data[1]
	acceptedStatus, _ := strconv.ParseBool(data[2])
	//acceptedStatus := data[2]
	location := data[3]
	entrytype := data[4]

	// creating struct containing data extracted from line
	RecognizerDataPoint := GofaceData{
		identity: identityName,
		// @TODO: fix bool/string error
		accepted:  acceptedStatus,
		location:  location,
		entrytype: entrytype,
	}

	// convert to JSON
	resp, err := json.Marshal(RecognizerDataPoint)

	// print error if something has gone wrong
	if err != nil {
		fmt.Println(err)
	}

	// return the JSON-parsed response as a string
	return string(resp)
}

func (s *GofaceDriver) DisconnectDevice(deviceName string, protocols map[string]contract.ProtocolProperties) error {
	return nil
}

// HandleReadCommands triggers a protocol Read operation for the specified device.
func (s *GofaceDriver) HandleReadCommands(deviceName string, protocols map[string]contract.ProtocolProperties, reqs []dsModels.CommandRequest) (res []*dsModels.CommandValue, err error) {
	//fmt.Fprintf(os.Stdout,  "....... %s .......\n", reqs[0].DeviceResourceName)
	if len(reqs) != 1 {
		err = fmt.Errorf("GofaceDriver.HandleReadCommands; too many command requests; only one supported")
		return
	}
	s.lc.Debug(fmt.Sprintf("GofaceDriver.HandleReadCommands: protocols: %v resource: %v attributes: %v", protocols, reqs[0].DeviceResourceName, reqs[0].Attributes))

	res = make([]*dsModels.CommandValue, 1)
	now := time.Now().UnixNano() / int64(time.Millisecond)

	// define case that goface device calls on driver - send testString ("Hello IoT!")
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
func (s *GofaceDriver) HandleWriteCommands(deviceName string, protocols map[string]contract.ProtocolProperties, reqs []dsModels.CommandRequest,
	params []*dsModels.CommandValue) error {

	if len(reqs) != 1 {
		err := fmt.Errorf("SimpleDriver.HandleWriteCommands; too many command requests; only one supported")
		return err
	}
	if len(params) != 1 {
		err := fmt.Errorf("SimpleDriver.HandleWriteCommands; the number of parameter is not correct; only one supported")
		return err
	}

	s.lc.Debug(fmt.Sprintf("SimpleDriver.HandleWriteCommands: protocols: %v, resource: %v, parameters: %v", protocols, reqs[0].DeviceResourceName, params))
	var err error
	if s.switchButton, err = params[0].BoolValue(); err != nil {
		err := fmt.Errorf("SimpleDriver.HandleWriteCommands; the data type of parameter should be Boolean, parameter: %s", params[0].String())
		return err
	}

	return nil
}

// Stop the protocol-specific DS code to shutdown gracefully, or
// if the force parameter is 'true', immediately. The driver is responsible
// for closing any in-use channels, including the channel used to send async
// readings (if supported).
func (s *GofaceDriver) Stop(force bool) error {
	// Then Logging Client might not be initialized
	if s.lc != nil {
		s.lc.Debug(fmt.Sprintf("SimpleDriver.Stop called: force=%v", force))
	}
	return nil
}

// AddDevice is a callback function that is invoked
// when a new Device associated with this Device Service is added
func (s *GofaceDriver) AddDevice(deviceName string, protocols map[string]contract.ProtocolProperties, adminState contract.AdminState) error {
	s.lc.Debug(fmt.Sprintf("a new Device is added: %s", deviceName))
	return nil
}

// UpdateDevice is a callback function that is invoked
// when a Device associated with this Device Service is updated
func (s *GofaceDriver) UpdateDevice(deviceName string, protocols map[string]contract.ProtocolProperties, adminState contract.AdminState) error {
	s.lc.Debug(fmt.Sprintf("Device %s is updated", deviceName))
	return nil
}

// RemoveDevice is a callback function that is invoked
// when a Device associated with this Device Service is removed
func (s *GofaceDriver) RemoveDevice(deviceName string, protocols map[string]contract.ProtocolProperties) error {
	s.lc.Debug(fmt.Sprintf("Device %s is removed", deviceName))
	return nil
}
