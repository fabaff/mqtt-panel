#!/usr/bin/python3
#
# test-messages.py - This script publish a random MQTT messages every 2 s.
#
# Copyright (c) 2013-2020, Fabian Affolter <fabian@affolter-engineering.ch>
# Released under the MIT license. See LICENSE file for details.
#
import random
import time
import paho.mqtt.client as mqtt

timestamp = int(time.time())

broker = "127.0.0.1"
port = 1883
element = "home"
areas = ["front", "back", "kitchen", "basement", "living"]
entrances = ["door", "window"]
states = ["true", "false"]

print(f"Messages are published on topic {element}/#... -> CTRL + C to shutdown")

while True:
    area = random.choice(areas)
    if area in ["basement", "living"]:
        topic = element + "/" + area + "/temp"
        message = random.randrange(0, 30, 1)
    else:
        topic = element + "/" + area + "/" + random.choice(entrances)
        message = random.choice(states)

    mqtt_client = mqtt.Client("mqtt-panel-test", protocol=mqtt.MQTTv311)
    mqtt_client.connect(broker, port=int(port))
    mqtt_client.publish(topic, message)
    time.sleep(2)
