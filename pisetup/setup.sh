#!/bin/bash

BASE=/etc/startup/
WPA=/etc/wpa_supplicant/wpa_supplicant.conf
WIFI=${BASE}wifi
GETIP=${BASE}getip
MAIL=${BASE}mail_sender.py
DOCKER=${BASE}dockerrun

if [ -z $1] && [ -z $2 ]
then
	echo "./setup <ssid> <password>"
	exit 1
if

add-apt-repository ppa:longsleep/golang-backports
apt-get update
apt-get install golang-go
apt-get install wpasupplicant
apt-get install python3
apt-get install wget
apt-get install vim
apt-get install docker
apt-get install docker-compose
apt-get install libssl-dev libffi-dev
apt-get install libzmq3-dev

wpa_passphrase $1 $2 >> $WPA

echo Processing...
sleep 3

mkdir $BASE

touch $WIFI
echo "#!/bin/bash" >> $WIFI
echo sudo wpa_supplicant -B -i wlan0 -c ${WPA} >> $WIFI
echo sudo dhclient >> $WIFI
chmod +x $WIFI

echo Processing...
sleep 3

wget https://raw.githubusercontent.com/crsmith20/mail-sender/master/mail_sender.py --directory-prefix=${BASE}
vim $MAIL

echo Processing...
sleep 3

touch $GETIP
echo "#!/bin/bash" >> $GETIP
echo sleep 30 >> $GETIP
echo sudo python3 ${MAIL} >> $GETIP
chmod +x $GETIP

touch $DOCKER
echo "#!/bin/bash" >> $DOCKER
echo sudo systemctl start docker >> $DOCKER
echo sudo systemctl enable docker >> $DOCKER
chmod +x $DOCKER

echo Follow these following instructions carefully you will have 15 seconds to read the instructions
echo
echo Copy the following two lines
echo
echo @reboot ${WIFI}'&'
echo @reboot ${GETIP}'&'
echo @reboot ${DOCKER}'&'
echo
echo Once you the next command executes, it should ask you how you want to open the file
echo Choose whatever you are most comfortable with
echo Once it opens please paste the 2 above lines into the file
echo Then write and exit, this will automatically assign the tasks for next startup
sleep 15
crontab -e

echo Processing...
sleep 3

$WIFI

echo Processing...
sleep 3

$GETIP

echo Processing...
sleep 3

$DOCKER

echo Setup finished
