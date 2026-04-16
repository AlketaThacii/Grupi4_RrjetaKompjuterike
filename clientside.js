const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const SERVER_IP = '192.168.1.100';
const PORT = 5000;