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
	"encoding/json"
	"fmt"
	"os"
	"strconv"
	"strings"
	"sync"
	"time"

	dsModels "github.com/edgexfoundry/device-sdk-go/pkg/models"
	"github.com/edgexfoundry/go-mod-core-contracts/clients/logger"
	contract "github.com/edgexfoundry/go-mod-core-contracts/models"
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
	lc           logger.LoggingClient
	asyncCh      chan<- *dsModels.AsyncValues
	switchButton bool

	mux        sync.Mutex
	device     *os.File
	scanner    *bufio.Scanner
	gofacedata string
}

func NewData() GofaceData {
	return GofaceData{}
}

func (s *GofaceDevice) DisconnectDevice(deviceName string, protocols map[string]contract.ProtocolProperties) error {
	return nil
}

// Initialize performs protocol-specific initialization for the device
// service.
func (s *GofaceDevice) Initialize(lc logger.LoggingClient, asyncCh chan<- *dsModels.AsyncValues) error {
	s.lc = lc
	s.asyncCh = asyncCh

	// routine for reading the goface data and saving it to s.gofacedata
	go func() {
		// open device / mock file
		s.device, _ = os.Open("../goface-test.txt")
		// don't close until done
		defer s.device.Close()

		s.scanner = bufio.NewScanner(s.device)

		//scanning line by line, checking if it starts with $GF, indicating new goface reading
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
	identityName := strings.TrimSpace(data[1])
	acceptedStatus, _ := strconv.ParseBool(strings.TrimSpace(data[2]))
	location := strings.TrimSpace(data[3])
	entrytype := strings.TrimSpace(data[4])
	imagePath := strings.TrimSpace(data[5])

	// creating struct containing data extracted from line
	gofaceDataPoint := GofaceData{
		Identity:  identityName,
		Accepted:  acceptedStatus,
		Location:  location,
		Entrytype: entrytype,
		Imagepath: imagePath,
	}

	// convert to JSON
	resp, err := json.Marshal(gofaceDataPoint)

	// print error if something has gone wrong
	if err != nil {
		fmt.Println(err)
	}

	// return the JSON-parsed response as a string
	return string(resp)
}

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
