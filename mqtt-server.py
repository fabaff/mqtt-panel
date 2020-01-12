#!/usr/bin/python3
""""
Running HBMQTT as MQTT broker.

Copyright (c) 2015-2020, Fabian Affolter <fabian@affolter-engineering.ch>
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
            'bind': '0.0.0.0:3000',
            'type': 'ws',
            'max_connections': 10,
        },
#        'topic-check': {
#            'enabled': True,
#            'plugins': ['topic_taboo'],
#        },    
    },
}

broker = Broker(config)

#@asyncio.coroutine
#def start_broker():
#    """Start the broker."""
#    yield from broker.start()

async def start_broker():
    """Start the broker."""
    await broker.start()

if __name__ == '__main__':
    formatter = "[%(asctime)s] :: %(levelname)s :: %(name)s :: %(message)s"
    logging.basicConfig(level=logging.INFO, format=formatter)
    asyncio.get_event_loop().run_until_complete(start_broker())
    asyncio.get_event_loop().run_forever()

