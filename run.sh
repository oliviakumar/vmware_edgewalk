#!/bin/bash

cd appsdk
make
cd app-functions-sdk
./appsdk &
cd ../..
cd device-goface/
make
cd cmd/device-goface/
./device-goface &

