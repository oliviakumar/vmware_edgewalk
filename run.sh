#!/bin/bash

cd appsdk
make clean
make
cd app-functions-sdk
./appsdk &
cd ../..
cd device-goface/
make clean
make
cd cmd/device-goface/
./device-goface &

