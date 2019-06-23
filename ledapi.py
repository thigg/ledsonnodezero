#!/usr/bin/env python3
# NeoPixel library strandtest example
# Author: Tony DiCola (tony@tonydicola.com)
#
# Direct port of the Arduino NeoPixel library strandtest example.  Showcases
# various animations on a strip of NeoPixels.
import sys
import time
from rpi_ws281x import *
import argparse
import re
from typing import List

# LED strip configuration:
LED_COUNT = 64  # Number of LED pixels.
LED_PIN = 18  # GPIO pin connected to the pixels (18 uses PWM!).
# LED_PIN        = 10      # GPIO pin connected to the pixels (10 uses SPI /dev/spidev0.0).
LED_FREQ_HZ = 800000  # LED signal frequency in hertz (usually 800khz)
LED_DMA = 10  # DMA channel to use for generating signal (try 10)
LED_BRIGHTNESS = 255  # Set to 0 for darkest and 255 for brightest
LED_INVERT = False  # True to invert the signal (when using NPN transistor level shift)
LED_CHANNEL = 0  # set to '1' for GPIOs 13, 19, 41, 45 or 53


# Define functions which animate LEDs in various ways.
def show(strip, colors: List[Color]):
    """Wipe color across display a pixel at a time."""
    for i, color in enumerate(colors):
        strip.setPixelColor(i, color)
    strip.show()


def parseHexColor(s: str) -> Color:
    """
    parses a hex string like aabbcc into a rgb color
    :param s: the hex string
    :return:
    """
    return Color(int(s[0:2], 16), int(s[2:4], 16), int(s[4:6], 16))


# Main program logic follows:
def evaluate(strip, action, arguments):
    try:
        if action == "show":
            colorarry = [parseHexColor(hex) for hex in re.findall('.{6}', arguments)]
            show(strip, colorarry)
        elif action == "wipe":
            show(strip, [Color(0, 0, 0) for _ in range(strip.numPixels())])
        else:
            print("Unknown action '%s'" % action)
    except Exception as err:
        print(err)


if __name__ == '__main__':
    # Process arguments
    parser = argparse.ArgumentParser(
        usage="Give what to print via stdin. Abort with ctrl+c. Via stdin always 2 lines: 1. action 2. arguments")
    parser.add_argument('-c', '--clear', action='store_true', help='clear the display on exit')
    parser.add_argument('--brightness', type=int, help='Set the birghtness value for the LED', default=255);
    args = parser.parse_args()

    # Create NeoPixel object with appropriate configuration.
    strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, args.brightness, LED_CHANNEL)
    # Intialize the library (must be called once before other functions).
    strip.begin()

    print('Press Ctrl-C to quit.')
    if not args.clear:
        print('Use "-c" argument to clear LEDs on exit')

    try:
        while True:
            action = input()
            arguments = input()
            evaluate(strip, action, arguments)

    except KeyboardInterrupt:
        if args.clear:
            evaluate(strip, 'wipe', '')
