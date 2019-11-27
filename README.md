# Setting up a device service in an EdgeX instance

## Necessary prerequisites

* have Docker and Docker-Compose installed
* have a make program, run this: 
```
$ sudo apt install build-essential
```
* have Golang installed and have your GOPATH set to ~/go. Check that with 
```
$ go env
```
It is essential your device-sdk-go folder is inside your GOPATH directory.

## Get the EdgeX device SDK and the device-goface files

Create folders to download SDK to:
```
$ mkdir -p ~/go/src/github.com/edgexfoundry
$ cd ~/go/src/github.com/edgexfoundry
$ git clone https://github.com/edgexfoundry/device-sdk-go.git
```
Clone the device-goface files from the project repo:
```
$ git clone https://github.com/oliviakumar/vmware_edgewalk
```
Change your directory in terminal to the device-goface folder (containig the makefile) and build the service
```
$ make build
```
If there are no error, your service should be ready to run. Change directories to cmd/device-goface and see if there's an executable "device-goface". If yes, execute it, if no, try to build again (in the higher device-goface), using 
```
$ go build
```
Execute the built file:
```
$ ./device-goface
```
Watch the logs in the terminal to see if it works and check in Postman or browser: http://localhost:48080/api/v1/event/device/RandNum-Device-01/100

For any more help, consider the tutorial at: https://docs.edgexfoundry.org/Ch-GettingStartedSDK-Go.html  

# Goface  

## Necessary Prerequisites  
To compile go-face you need to have dlib (>= 19.10) and libjpeg development packages installed.  

### MacOS  
Make sure you have Homebrew installed.
```
brew install pkg-config dlib
sed -i '' 's/^Libs: .*/& -lblas -llapack/' /usr/local/lib/pkgconfig/dlib-1.pc
```  

### Models  
Currently shape_predictor_5_face_landmarks.dat, mmod_human_face_detector.dat and dlib_face_recognition_resnet_model_v1.dat are required. You may download them from dlib-models repo:     
```
mkdir models && cd models
wget https://github.com/davisking/dlib-models/raw/master/shape_predictor_5_face_landmarks.dat.bz2
bunzip2 shape_predictor_5_face_landmarks.dat.bz2
wget https://github.com/davisking/dlib-models/raw/master/dlib_face_recognition_resnet_model_v1.dat.bz2
bunzip2 dlib_face_recognition_resnet_model_v1.dat.bz2
wget https://github.com/davisking/dlib-models/raw/master/mmod_human_face_detector.dat.bz2
bunzip2 mmod_human_face_detector.dat.bz2
```   

### Usage  
Installing go-face on your machine: 
* cd into your $GOPATH:  
```
go get github.com/Kagami/go-face
```  
To use go-face in your go code:  
```
import "github.com/Kagami/go-face"  
```  

