const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const SERVER_IP = '192.168.100.201';
const PORT = 5000;

const message = process.argv.slice(2).join(" ");

if (!message || message.trim() === "") {
    console.log("Shkruaj nje komande!");
    process.exit();
}

if (message === "help") {
    console.log(`
        Komdandat:
        read1
        read2
        write<tekst>
        execute
        list
        admin1234
        `);
           process.exit();
    }

console.log(`Duke u lidhur me serverin ${SERVER_IP}:${PORT}`);
console.log("Derguar:", message);

client.send(message, PORT, SERVER_IP, (err) => {
    if (err) {
        console.log("Gabim gjate dergimit:", err.message);
        client.close();
    }
});

client.on('message', (msg) => {
    console.log("Pergjigje:", msg.toString());
    client.close();
});

client.on('error', (err)=> {
    console.log("Gabim ne klient:", err.message);
    client.close();
});