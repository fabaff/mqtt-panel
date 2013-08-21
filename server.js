#!/usr/bin/env node
/**
 * Copyright (c) 2013, Fabian Affolter <fabian@affolter-engineering.ch>
 * Released under the MIT license. See LICENSE file for details.
 */

var mqtt = require('mqtt');
var socket = require('socket.io');
//var firmata = require('firmata');

var mqttbroker = 'localhost';
var mqttport = 1883;

var io = socket.listen(3000);
var mqttclient = mqtt.createClient(mqttport, mqttbroker);

// Reduce socket.io debug output
io.set('log level', 0)

// Subscribe to topic
io.sockets.on('connection', function (socket) {
    socket.on('subscribe', function (data) {
        mqttclient.subscribe(data.topic);
    });
});

// Push the message to socket.io
mqttclient.on('message', function(topic, payload) {
    io.sockets.emit('mqtt',
        {'topic'  : topic,
         'payload' : payload
        }
    );
});

// Setup the arduino
//var board = new firmata.Board('/dev/ttyACM0', function(err) {
//    if (err) {
//        console.log(err);
//        return;
//    }

//    board.pinMode(0, board.MODES.INPUT);
//    board.pinMode(1, board.MODES.INPUT);
//    board.pinMode(2, board.MODES.INPUT);
//    board.pinMode(3, board.MODES.INPUT);

//    // Analog pin 0
//    var oldVal1;
//    board.analogRead(0, function(val) {
//        // Reduce the amount of messages
//        if (val != oldVal1 && val != oldVal1 + 1 && val != oldVal1 - 1) {
//            mqttclient.publish('home/living', String(val));
//        }
//        oldVal1 = val;
//    });

//    // Digital pin 2
//    board.digitalRead(2, function(val) {
//        mqttsend('home/front', val);
//    });

//    // Digital pin 3
//    board.digitalRead(3, function(val) {
//        mqttsend('home/back', val);
//    });
//});

//function mqttsend(topic, val) {
//    if (val == 1) {
//        state = 'true';
//    } else {
//        state = 'false';
//    }
//    mqttclient.publish(topic, state);
//};
