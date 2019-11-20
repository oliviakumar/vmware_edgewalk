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
	device_goface "github.com/edgexfoundry/vmware_edgewalk/device-goface"
	"github.com/edgexfoundry/vmware_edgewalk/device-goface/driver"
)

const (
	serviceName string = "device-goface"
)

func main() {
	sd := driver.GofaceDevice{}
	startup.Bootstrap(serviceName, device_goface.Version, &sd)
}
