# mqtt-panel

A simple web interface which is able to subscribe to a MQTT topic and display
the information.

The screenshot shows an example how to keep track on what's going in your
apartment or your house. It's not about controlling, this setup is about
observing various states.

![screenshot](screenshot.png)

![screenshot](screenshot-mobile.png)

What to see `mqtt-panel` in action -> http://youtu.be/Qb0UJa9kf2g

The web page is using [bootstrap](http://getbootstrap.com/) with
[jQuery](http://jquery.com/).

## Prerequisites/Installation

### Get the files

Clone the `mqtt-panel` [repository](https://github.com/fabaff/mqtt-panel)

```bash
$ git clone git@github.com:fabaff/mqtt-panel.git
```

### Dependencies

`mqtt-panel` is using the listed projects to provide its functionality:

- [paho-mqtt](https://www.eclipse.org/paho/clients/python/)
- [mqtt](https://github.com/adamvr/MQTT.js/)

If you are using Fedora and want to generate MQTT messages, install the
`paho-mqtt` Python bindings for `test-messages.py`.

```bash
$ sudo dnf -y install python-paho-mqtt
```

### MQTT broker/server

A MQTT broker/server with Websocket support is needed.

- [mosquitto](http://mosquitto.org/) - An Open Source MQTT v3.1/3.11 broker
- [mosca](http://mcollina.github.io/mosca/) - A multi-transport MQTT broker
  for node.js (Project seems abandoned)

## Running mqtt-panel

1. Make sure that your MQTT broker/server is running and listening.
2. Adjust `var host = '127.0.0.1';` and `var port = 3000;` in the file
   `js/index.js` to match your setup. Also, `var topic = '#';`.
3. Open `index.html` in a modern web browser.

## Generate MQTT messages

Start the `./test-messages.py` script to publish test messages if you have
no other source for messages. Depending on your broker you may need to set
the supported version, on line 33: `protocol=mqtt.MQTTv311` and adjust
the broker and its port.

For manually sending messages to your MQTT broker/server you can use
`mosquitto_pub` from `mosquitto`.

```bash
$ mosquitto_pub -V mqttv311 -h localhost -d -t home/front/door -m "false"
```

To check if the messages are are ok, subscribe to the topic **home/#** with
`mosquitto_sub`.

```bash
$ mosquitto_sub -V mqttv311 -h localhost -d -t home/#
```

## Credits

`mqtt-panel` was inspired by the ideas of:

- [mqtt-svg-dash](https://github.com/jpmens/mqtt-svg-dash) by [Jan-Piet Mens](http://jpmens.net/)
- [Robert Hekkers](http://blog.hekkers.net/2012/10/13/realtime-data-with-mqtt-node-js-mqtt-js-and-socket-io/)

## License

`mqtt-panel` licensed under MIT, for more details check LICENSE.
