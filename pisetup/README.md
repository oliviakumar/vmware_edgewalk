# Pi Setup Script

**Please read before running script!**

## Requirements
This can be run on a freshly flashed raspberry pi, however, it does require an internet connectionso please connect through ethernet for the time being. This setup script will connect to wifi and allow you to ssh into the device. Essentially, all you need is an internet connection.

## Steps
### 1.
Either clone script into local machine or use wget to just get the script

```git clone https://github.com/oliviakumar/vmware_edgewalk.git```

```wget https://raw.githubusercontent.com/oliviakumar/vmware_edgewalk/master/pisetup/setup.sh?token=AHPIDWB5BVQ3FI4FNMLWOM25SFHRS```

### 2.
Enter the following command

```sudo -i```

This allows you to run everything as sudo which is needed.

### 3.
Run the script

```./setup.sh <ssid> <password>```

### 4.
When you are loaded into the python file you need to replace the information in the file with yours
```
sender_address = "<sender email address>"
sender_password = "<sender email password>"
sender_server = 'smtp.gmail.com'
sender_port = 587
recipient_address = "<receiver email address>"
```
### 5.
These instructions are repeated in the script before you can do the next part incase you did't read this README. You will have 15 seconds to read and copy the following commands. You will need these once the next section of the script activates. If you read this before running the script, good on you, you are prepared and have 15 seconds to relax. Just paste the following lines at the end of the file, then save and exit.
```
@reboot /etc/startup/wifi&
@reboot /etc/startup/getip&
```

## Usage Instructions
```
./nt <ssid> <password>
    ssid        the name of your wifi network
    password    the password for your wifi network
