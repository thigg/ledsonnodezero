# Project ChristmasPie
## Controlling WS281x LEDs via NodeJS on a Raspberry Pi 
Example-Project for controlling LEDS on a raspberrypi zero with a nodejs server.

Fun project to kickstart people into JavaScript which like to make.
You can use that example, play around with it and build a fun application.
Protip: use a powerbank and your Phone to use it while on the way.

You can use it with any RaspberryPi and any WS281x LEDs. (I used a WS2812 matrix).



## Connecting to the Raspberry
The Webserver is by default on Port 3000. You can change that with an enviroment variable like `NODE_PORT=80`.
When the systemd-service on startup is enabled, it is automatically on port 80.

### SSH Access
- Confirmed for RPi Zero: Use the not-power (the second one) usb port to connect the raspberry to a computer. It should show up as a ethernet adapter and should be reachable via `raspberry.local`.
- You can connect to it via `ssh pi@raspberrypi.local`
### Wifi Access
- For joining Networks (edit only sd card): https://raspberrypi.stackexchange.com/a/57023/23023
- For Hosting an access point: https://www.raspberrypi.org/documentation/configuration/wireless/access-point.md

### Deployment
 - You can deploy the code in WebStorm by adding a sftp deployment to the folder.
 This syncs your changes immediatley
 
 ## Development
 ### JavaScript
 - `/api` in `routes ledapi.js` defines a rest api, which can be used to control the LEDs via REST. The current implementation has a `/api/show` endpoint, which takes the colors as hex string. 6 Characters per color.
 - `views/index.pug` is the pug/jade definition of the website. Currently it shows 2 buttons to controll the two sample functions.
 ### Python
 The python script listenes simply on stdin and reads always 2 lines. The first defines the command and the second the arguments for this command.
 Currently:
 - `show` and a string of hex encoded colors. 6 characters per color, simply concatenated.
 - `wupe` sets black as color for all LEDs

## Hardware and Setup
- Built with a raspberry pi zero.
- System setup like here: https://learn.adafruit.com/neopixels-on-raspberry-pi?view=all
- WS2812 LEDS connected to the PWM output of a raspberry pi zero.
   - `ledapi.py` defines 64 LED's currently, change it if it doesn't fit.
- nodejs is installed manually, because we need v11: https://www.thepolyglotdeveloper.com/2018/03/install-nodejs-raspberry-pi-zero-w-nodesource/
- install the requirements with `npm install`
- requires python3 and the `rpi_ws281x` module
- needs to be run as root
- Enable /bin/www as a systemd service if the webserver should run at startup.

### Run the server on startup
Enable the server on startup with an systemd service.
For that you need to copy the `ledsonpi.service` file to `/lib/systemd/system/`.
- Go into the folder where the `.service` file is and run `sudo cp ledsonpi.service /lib/systemd/system/`.
- Now you can enable the service with `sudo systemct enable ledsonpi.service`.
- And you can check its status with  `sudo systemctl status ledsonpi`
- Stop it with `sudo systemctl stop ledsonpi`.