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

* Train()  
  - Traverses through a fixed directory called "trainImages" and trains the model for every folder found.  
  - Adds the directory name, image data, and indices of the samples to the Models struct, which is later used for inferencing.  

* Infer()  
	- Parameters:   

			edgexcontext - edgex event instance
			params - parameters of the data interface that will be populated 
	- Returns:   
	
			boolean - true or false depending on whether the face matches  
			interface - contains the data of matched person, or default values for anonymous

	- Takes in the edgex event instance and the data interface from the app sdk and populates the data interface according 
	to the results of the facial recognition  
	- If face matched, returns true and populates the data interface according accordingly. If face not recognized,  
	returns false and populates the data interface with default information.
