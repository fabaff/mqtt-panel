#!/usr/bin/python3
""""
Running HBMQTT as MQTT broker.

Copyright (c) 2015-2018, Fabian Affolter <fabian@affolter-engineering.ch>
Released under the MIT license. See LICENSE file for details.

Source: https://github.com/beerfactory/hbmqtt/blob/develop/samples/broker_start.py
"""
import asyncio
import logging

from hbmqtt.broker import Broker

logger = logging.getLogger(__name__)

config = {
    'listeners': {
        'default': {
            'type': 'tcp',
            'bind': '0.0.0.0:1883',
        },
        'ws-mqtt': {
            'bind': '127.0.0.1:3000',
            'type': 'ws',
            'max_connections': 10,
        },
    },
}

broker = Broker(config)


@asyncio.coroutine
def test_coro():
    yield from broker.start()


if __name__ == '__main__':
    formatter = "[%(asctime)s] :: %(levelname)s :: %(name)s :: %(message)s"
    logging.basicConfig(level=logging.INFO, format=formatter)
    asyncio.get_event_loop().run_until_complete(test_coro())
    asyncio.get_event_loop().run_forever()
