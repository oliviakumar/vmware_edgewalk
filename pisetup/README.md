# Pi Setup Script

**Please read before running script!**

## Requirements
This can be run on a freshly flashed raspberry pi, however, it does require an internet connectionso please connect through ethernet for the time being. This setup script will connect to wifi and allow you to ssh into the device. Essentially, all you need is an internet connection.

* Raspberry Pi 3B or higher (preferably RPi 4)
* Micro SD card (we used a 32GB card)
* Ethernet cable

Either of the following 2 options (Both options are ways to access the pi):

Option 0:
* HDMI cable
* Keyboard
* Monitor

Option 1:
* USB TTL Serial Cable

## Steps
### 0. Setting up Raspberry Pi
First, you will need to flash **Ubuntu Server ARM64** on your Micro SD card.

1. Download the ISO file for Ubuntu Server found here: https://wiki.ubuntu.com/ARM/RaspberryPi. *Make sure you downloaded the 64-bit version as EdgeX will not run on 32-bit. This link also has a tutorial on how to extract the ISO file*

2. Download Balena Etcher, which will allow you to flash the Ubuntu ISO image on you SD card: https://www.balena.io/etcher/

3. Insert you SD card in the SD card reader.

4. Open Balena Etcher and follow the instructions. Once Balena Etcher is done flashing, eject the SD card. 

5. Insert the Micro SD card into the Raspberry Pi and turn it on.

6. Follow the instructions on the screen to finish setting the operating system.

#### Option 0
##### Steps
0. Plug in ethernet cord to pi

1. Plug pi into monitor with HDMI cable

2. Plug in mouse and keyboard into pi

#### Option 1
##### Steps
0. Plug in ethernet cord to pi

1. Plug serial cable into pi and laptop

2. You will need a program that allows you to connect to the Raspbian serial console via the USB TTL cable.

On macOS and Linux I recommend you use a program called kermit.

On macOS, you can install kermit via Homebrew:

http://brew.sh

Follow the homebrew install instructions.

Once installed you can type:

```
$ brew install c-kermit
```

On Ubuntu Linux you can use apt-get to install c-kermit:

```
$ sudo apt-get install ckermit
```

Once installed, create a .kermrc file in your home directory (on your host computer/laptop):

```
$ cd
$ cat > .kermrc
set line /dev/cu.usbserial
set speed 115200
set carrier-watch off
connect
^D
$
```

Note on Linux you will use a different device name for the set line. It is often something like /dev/ttyS0.

Now you can use kermit to connect to your RPi via the USB Serial cable.

Type:

```
$ kermit
```

Now turn on your RPi.

You should see the boot squence.

### 1. Getting the script
Either clone script into local machine or use wget to just get the script

```
git clone https://github.com/oliviakumar/vmware_edgewalk.git
```

```
wget https://raw.githubusercontent.com/oliviakumar/vmware_edgewalk/master/pisetup/setup.sh
```

If the script was acquired through wget then the following command will need to completed.

```chmod +x setup.sh```

### 2. Steps to Run the Script
Enter the following command

```sudo -i```

This allows you to run everything as sudo which is needed.

### 3. Running the script
Run the script

```./setup.sh <ssid> <password>```

### 4. Entering Sender Script
When you are loaded into the python file you need to replace the information in the file with yours
```
sender_address = "<sender email address>"
sender_password = "<sender email password>"
sender_server = 'smtp.gmail.com'
sender_port = 587
recipient_address = "<receiver email address>"
```

### 5. Sets Scripts to Run on Startup
These instructions are repeated in the script before you can do the next part incase you did't read this README. You will have 15 seconds to read and copy the following commands. You will need these once the next section of the script activates. If you read this before running the script, good on you, you are prepared and have 15 seconds to relax. Just paste the following lines at the end of the file, then save and exit.
```
@reboot /etc/startup/wifi&
@reboot /etc/startup/getip&
@reboot /etc/startup/dockerrun&
```

## Getting Docker Running
Docker should have been installed through the setup script. You can check to make sure it was successfully installed by entering the following command.

```
docker --version
```

If the repository was cloned then the ```docker-compose.yml``` is available if it was not cloned then the ```docker-compose.yml``` will need to retrieved through the following command.

```
wget https://raw.githubusercontent.com/oliviakumar/vmware_edgewalk/task/refactoring/pisetup/docker-compose.yml
```

Once the file is on the Raspberry Pi, the following command will need to be run after you change to the directory the file is in.

```
sudo docker-compose up -d
```

You can then check if the EdgeX Foundry containers are running.

```
sudo docker ps -a
```

You will need to repeat this portion on every startup.

## Usage Instructions
```
./setup.sh <ssid> <password>
    ssid        the name of your wifi network
    password    the password for your wifi network
