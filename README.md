# mqtt-panel

A simple web interface which is able to subscribe to a MQTT topic and display
the information. 

The screenshot shows an example how to keep track on what's going in your
apartment or your house. It's not about controlling, this setup is about 
observing various states.

![screenshot](https://raw.github.com/fabaff/mqtt-panel/master/screenshot.png)

What to see `mqtt-panel` in action -> http://youtu.be/Qb0UJa9kf2g

The web page is using [bootstrap](http://getbootstrap.com/) with 
[jQuery](http://jquery.com/).

## Prerequisites/Installation

### Get the files
Clone the `mqtt-panel` [repository](https://github.com/fabaff/mqtt-panel)
```
git clone git@github.com:fabaff/mqtt-panel.git
```

###Dependencies
`mqtt-panel` depends on a couple of additional pieces: 

- [node.js](http://www.nodejs.org/)
- [mqtt](https://github.com/adamvr/MQTT.js/)
- [socket.io](http://socket.io/)
- [firmata](https://github.com/jgautier/firmata) if using with an Arduino

If you are using Fedora, just use `yum` to install `node`.

```
$ sudo yum -y install node npm mosquitto-python
``` 

then

```
$ npm install mqtt socket.io
```

### MQTT broker/server
A MQTT broker/server is needed to run on **localhost** on port **1883**. 

- [mosca](http://mcollina.github.io/mosca/) - A multi-transport MQTT broker
  for node.js
- [mosquitto](http://mosquitto.org/) - An Open Source MQTT v3.1 Broker

## Running mqtt-panel

1. Make sure that your MQTT broker/server is running and listening.
2. Launch `./runner.sh` which will start the node server incl. the web socket 
   on port 3000.
3. Start the `./test-messages.py` script to publish test messages if you have
   no other source for messages. This requires the Python bindings of mosquitto.
4. Open `index.html` with your browser.

For manually sending messages to your MQTT broker/server you can use 
`mosquitto_pub` from `mosquitto`.

```
$ mosquitto_pub -h localhost -d -t home/front/door -m "false"
```
To check if the messages are are ok, subscribe to the topic **home/#** with 
`mosquitto_sub`.

```
$ mosquitto_sub -h localhost -d -t home/#
```

## Credits

`mqtt-panel` was insired by the ideas of:

* [mqtt-svg-dash](https://github.com/jpmens/mqtt-svg-dash) by [Jan-Piet Mens](http://jpmens.net/)
* [Robert Hekkers](http://blog.hekkers.net/2012/10/13/realtime-data-with-mqtt-node-js-mqtt-js-and-socket-io/)

## License
`mqtt-panel` licensed under MIT, for more details check LICENSE.
