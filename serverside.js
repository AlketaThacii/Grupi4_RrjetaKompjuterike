const dgram = require('dgram');
const fs = require('fs');
const server = dgram.createSocket('udp4');

const PORT = 5000;
const HOST = '0.0.0.0';



server.on('message', (msg, rinfo) => {
    const message = msg.toString();
    const clientId = rinfo.address + ":" + rinfo.port;

    console.log(`Mesazh nga ${clientId}: ${message}`);

    const response = handleRequest(message, clientId);
});

server.bind(PORT, HOST, () => {
    console.log("Serveri eshte aktiv...");
});