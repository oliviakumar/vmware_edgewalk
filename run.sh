#!/bin/bash

cd device-goface/
make
cd cmd/device-goface/
./device-goface &
cd ../../../appsdk
make
cd app-functions-sdk
./appsdk &
cd ../..

