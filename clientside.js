const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const SERVER_IP = '192.168.100.201';
const PORT = 5000;

const message = process.argv[2];

if (!message) {
    console.log("Shkruaj nje komande!");
    process.exit();
}

client.send(message, PORT, SERVER_IP, (err) => {
    if (err) throw err;
});

client.on('message', (msg) => {
    console.log("Pergjigje:", msg.toString());
    client.close();
});