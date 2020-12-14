let host = 'localhost';
let port = 9001;
let topic = '#';
let useTLS = false;
let cleansession = true;
let reconnectTimeout = 3000;
let tempData = new Array();
let mqtt;

function MQTTconnect() {
    if (typeof path == "undefined") {
        path = '/';
    }
    mqtt = new Paho.MQTT.Client(host, port, path, "mqtt_panel" + parseInt(Math.random() * 100, 10));
    let options = {
        timeout: 3,
        useSSL: useTLS,
        cleanSession: cleansession,
        onSuccess: onConnect,
        onFailure: function (message) {
            $('#status').html("Connection failed: " + message.errorMessage + "Retrying...")
                .attr('class', 'alert alert-danger');
            setTimeout(MQTTconnect, reconnectTimeout);
        }
    };

    mqtt.onConnectionLost = onConnectionLost;
    mqtt.onMessageArrived = onMessageArrived;
    console.log("Host: " + host + ", Port: " + port + ", Path: " + path + " TLS: " + useTLS);
    mqtt.connect(options);
};

function onConnect() {
    $('#status').html('Connected to ' + host + ':' + port + path)
        .attr('class', 'alert alert-success');
    mqtt.subscribe(topic, { qos: 0 });
    $('#topic').html(topic);
};

function onConnectionLost(response) {
    setTimeout(MQTTconnect, reconnectTimeout);
    $('#status').html("Connection lost. Reconnecting...")
        .attr('class', 'alert alert-warning');
};

function onMessageArrived(message) {
    let topic = message.destinationName;
    let payload = message.payloadString;
    console.log("Topic: " + topic + ", Message payload: " + payload);
    $('#message').html(topic + ', ' + payload);
    let topics = topic.split('/');
    let area = topics[1];

    switch (area) {
        case 'front':
            $('#value1').html('(Switch value: ' + payload + ')');
            if (payload == 'true') {
                $('#label1').text('Closed');
                $('#label1').removeClass('badge-danger').addClass('badge-success');
            } else {
                $('#label1').text('Open');
                $('#label1').removeClass('badge-success').addClass('badge-danger');
            }
            break;
        case 'back':
            $('#value2').html('(Switch value: ' + payload + ')');
            if (payload == 'true') {
                $('#label2').text('Closed');
                $('#label2').removeClass('badge-danger').addClass('badge-success');
            } else {
                $('#label2').text('Open');
                $('#label2').removeClass('badge-success').addClass('badge-danger');
            }
            break;
        case 'living':
            $('#livingTempSensor').html('(Sensor value: ' + payload + ')');
            $('#livingTempLabel').text(payload + ' °C');
            $('#livingTempLabel').addClass('badge-default');

            tempData.push({
                "timestamp": Date().slice(16, 21),
                "temperature": parseInt(payload)
            });
            if (tempData.length >= 10) {
                tempData.shift()
            }
            drawChart(tempData);

            break;
        case 'basement':
            $('#basementTempSensor').html('(Sensor value: ' + payload + ')');
            if (payload >= 25) {
                $('#basementTempLabel').text(payload + ' °C - too hot');
                $('#basementTempLabel').removeClass('badge-warning badge-success badge-info badge-primary').addClass('badge-danger');
            } else if (payload >= 21) {
                $('#basementTempLabel').text(payload + ' °C - hot');
                $('#basementTempLabel').removeClass('badge-danger badge-success badge-info badge-primary').addClass('badge-warning');
            } else if (payload >= 18) {
                $('#basementTempLabel').text(payload + ' °C - normal');
                $('#basementTempLabel').removeClass('badge-danger badge-warning badge-info badge-primary').addClass('badge-success');
            } else if (payload >= 15) {
                $('#basementTempLabel').text(payload + ' °C - low');
                $('#basementTempLabel').removeClass('badge-danger badge-warning badge-success badge-primary').addClass('badge-info');
            } else if (mpayload <= 12) {
                $('#basementTempLabel').text(payload + ' °C - too low');
                $('#basementTempLabel').removeClass('badge-danger badge-warning badge-success badge-info').addClass('badge-primary');
                basementTemp.push(parseInt(payload));
                if (basementTemp.length >= 20) {
                    basementTemp.shift()
                }
            }
            break;
        default:
            console.log('Error: Data do not match the MQTT topic.');
            break;
    }
};

function drawChart(data) {
    let ctx = document.getElementById("tempChart").getContext("2d");


    let temperatures = []
    let timestamps = []

    data.map((entry) => {
        temperatures.push(entry.temperature);
        timestamps.push(entry.timestamp);
    });

    let chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timestamps,
            datasets: [{
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: temperatures
            }]
        },
        options: {
            legend: {
                display: false
            }
        }
    });
}

$(document).ready(function () {
    drawChart(tempData);
    MQTTconnect();
});