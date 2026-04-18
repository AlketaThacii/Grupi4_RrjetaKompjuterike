const fs = require("fs");

let clients = {};

const ADMIN_PASSWORD = "1234"; 

function handleRequest(message, clientId) {

    // nëse klienti është i ri
    if (!clients[clientId]) {
        clients[clientId] = "read";
    }

    // ADMIN LOGIN me password
    if (message.startsWith("admin ")) {
        const pass = message.split(" ")[1];

        if (pass === ADMIN_PASSWORD) {
            clients[clientId] = "admin";
            return "Je ADMIN";
        } else {
            return "Password gabim!";
        }
    }

    // READ FILE 1
    else if (message === "read1") {
        try {
            return fs.readFileSync("./data/file1.txt", "utf8");
        } catch (e) {
            return "Gabim gjatë leximit të file1!";
        }
    }

    // READ FILE 2
    else if (message === "read2") {
        try {
            return fs.readFileSync("./data/file2.txt", "utf8");
        } catch (e) {
            return "Gabim gjatë leximit të file2!";
        }
    }

    // WRITE (vetëm admin)
    else if (message.startsWith("write ")) {
        if (clients[clientId] !== "admin") {
            return "Nuk ke leje për write!";
        }

        const content = message.replace("write ", "").trim();

        if (content.length === 0) {
            return "Nuk mund te shkruash tekst bosh!";
        }

        try {
            fs.appendFileSync("./data/file1.txt", content + "\n", "utf8");
            return "U shtua në file1!";
        } catch (e) {
            return "Gabim gjate shkrimit!";
        }
    }

    // EXECUTE (vetëm admin)
    else if (message === "execute") {
        if (clients[clientId] !== "admin") {
            return "S'ke leje për execute!";
        }

        return "Komanda u ekzekutua!";
    }

    return "Komande e panjohur!";
}

module.exports = { handleRequest };