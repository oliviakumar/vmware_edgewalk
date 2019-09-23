#!/bin/bash
apt-get update
apt-get install wpasupplicant
apt-get install python3
apt-get install wget
apt-get install go

wpa_passphrase $1 $2 >> /etc/wpa_supplicant/wpa_supplicant.conf

mkdir /etc/startup

touch /etc/startup/wifi
echo "#!/bin/bash" >> /etc/startup/wifi
echo sudo wpa_supplicant -B -i wlan0 -c /etc/wpa_supplicant/wpa_supplicant.conf >> /etc/startup/wifi
echo sudo dhclient >> /etc/startup/
chmod +x /etc/startup/wifi
/etc/startup/wifi

wget https://raw.githubusercontent.com/crsmith20/mail-sender/master/mail_sender.py --directory-prefix=/etc/startup/
vi /etc/startup/mail_sender.py

touch /etc/startup/getip
echo "#!/bin/bash" >> /etc/startup/getip
echo sudo python3 /etc/startup/mail_sender.py >> /etc/startup/getip
chmod +x /etc/startup/getip

echo Follow these following instructions carefully you will have 15 seconds to read the instructions
echo
echo Copy the following two lines
echo @reboot /etc/startup/wifi&
echo @reboot /etc/startup/getip&
echo
echo Once you the next command executes, it should ask you how you want to open the file
echo Choose whatever you are most comfortable with
echo Once it opens please paste the 2 above lines into the file
echo Then write and exit, this will automatically assign the tasks for next startup
sleep 15
crontab -e
/etc/startup/getip
