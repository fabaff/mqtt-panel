#!/usr/bin/env python
# 
# test-messages.py - This script pushlish a random MQTT messages every 2 s.
#
# Copyright (c) 2013, Fabian Affolter <fabian@affolter-engineering.ch>
# Released under the MIT license. See LICENSE file for details.
#
import random
import time
import mosquitto

broker = '127.0.0.1'
port = 1883
elements = 'doors'
areas = ['front', 'back', 'garage', 'basement']
states = ['true', 'false']

print 'Messages are published on topic %s/#... -> CTRL + C to shutdown' \
    % elements

while True:
    topic = elements + '/' + random.choice(areas)
    message = random.choice(states)

    client = mosquitto.Mosquitto("mqtt-panel-test")
    client.connect(broker)
    client.publish(topic, message)
    time.sleep(2)
