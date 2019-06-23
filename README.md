#Project ChristmasPie
##Controlling WS281x LEDs via NodeJS on a Raspberry Pi 
Example-Project for controlling LEDS on a raspberrypi zero with a nodejs server.

Fun project to kickstart people into JavaScript which like to make.

You can use it with any RaspberryPi and any WS281x LEDs. (I used a WS2812 matrix).


##Connecting to the Raspberry
### SSH Access
- Confirmed for RPi Zero: Use the not-power (the second one) usb port to connect the raspberry to a computer. It should show up as a ethernet adapter and should be reachable via `raspberry.local`.
- You can connect to it via `ssh pi@raspberrypi.local`
### Wifi Access
- For joining Networks (edit only sd card): https://raspberrypi.stackexchange.com/a/57023/23023
- For Hosting an access point: https://www.raspberrypi.org/documentation/configuration/wireless/access-point.md

##Hardware and Setup
- Built with a raspberry pi zero.
- System setup like here: https://learn.adafruit.com/neopixels-on-raspberry-pi?view=all
- WS2812 LEDS connected to the PWM output of a raspberry pi zero.
   - ledapi.py defines 64 LED's currently, change it if it doesn't fit.
- nodejs is installed manually, because we need v11: https://www.thepolyglotdeveloper.com/2018/03/install-nodejs-raspberry-pi-zero-w-nodesource/
- install the requirements with `npm install`
- requires python3 and the `rpi_ws281x` module
- needs to be run as root