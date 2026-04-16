const dgram = require('dgram');
const fs = require('fs');
const server = dgram.createSocket('udp4');

const PORT = 5000;
const HOST = '0.0.0.0';

server.bind(PORT, HOST, () => {
    console.log("Serveri eshte aktiv...");
});