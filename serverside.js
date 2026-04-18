const dgram = require('dgram');
const fs = require('fs');
const { handleRequest } = require('./logic');

const server = dgram.createSocket('udp4');

let activeClients = new Set();


const PORT = 5000;
const HOST = '0.0.0.0';



server.on('message', (msg, rinfo) => {
    const message = msg.toString();
    const clientId = rinfo.address + ":" + rinfo.port;

    activeClients.add(rinfo.address);
    console.log(`Klientë aktiv: ${activeClients.size}`);
    
    console.log(`Mesazh nga ${clientId}: ${message}`);

    const response = handleRequest(message, clientId);
    
    server.send(response, rinfo.port, rinfo.address);
});

server.bind(PORT, HOST, () => {
    console.log(`Serveri është aktiv në ${HOST}:${PORT}`);
});