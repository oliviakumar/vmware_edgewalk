// -*- Mode: Go; indent-tabs-mode: t -*-
//
// Copyright (C) 2017-2018 Canonical Ltd
// Copyright (C) 2018-2019 IOTech Ltd
//
// SPDX-License-Identifier: Apache-2.0

// This package provides a simple example of a device service.
package main

import (
	"github.com/edgexfoundry/device-sdk-go/pkg/startup"

	"github.com/oliviakumar/vmware_edgewalk/device-goface/driver"
)

//Naming the device service
const (
	serviceName string = "device-goface"
)

//Calls the gofacedevice to start the facial recognition
func main() {
	sd := driver.GofaceDevice{}
	sd.WriteConfiguration()
	startup.Bootstrap(serviceName, "0.0.0", &sd)
}
