#!/bin/bash

BASE=/etc/startup/
WPA=/etc/wpa_supplicant/wpa_supplicant.conf
WIFI=${BASE}wifi
GETIP=${BASE}getip
MAIL=${BASE}mail_sender.py

apt-get update
apt-get install wpasupplicant
apt-get install python3
apt-get install wget
apt-get install golang
apt-get install vim

if [ -z $1] && [ -z $2 ]
then
	echo "./setup <ssid> <password>"
	exit 1
else
	wpa_passphrase $1 $2 >> $WPA
fi

mkdir $BASE

touch $WIFI
echo "#!/bin/bash" >> $WIFI
echo sudo wpa_supplicant -B -i wlan0 -c ${WPA} >> $WIFI
echo sudo dhclient >> $WIFI
chmod +x ${WIFI}
$WIFI

wget https://raw.githubusercontent.com/crsmith20/mail-sender/master/mail_sender.py --directory-prefix=$BASE
vim $MAIL

touch $GETIP
echo "#!/bin/bash" >> $GETIP
echo sudo python3 ${MAIL} >> $GETIP
chmod +x $GETIP

echo Follow these following instructions carefully you will have 15 seconds to read the instructions
echo
echo Copy the following two lines
echo @reboot ${WIFI}'&'
echo @reboot ${GETIP}'&'
echo
echo Once you the next command executes, it should ask you how you want to open the file
echo Choose whatever you are most comfortable with
echo Once it opens please paste the 2 above lines into the file
echo Then write and exit, this will automatically assign the tasks for next startup
sleep 15
crontab -e
$GETIP
