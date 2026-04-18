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
            return "Je ADMIN (ke read, write, execute)";
        } else {
            return "Password gabim!";
        }
    }
  //Njohja e rolit
    else if (message === "whoami") {
        return "Roli yt: " + clients[clientId];
    }
    //Ofrimi i sherbimeve apo opsioni help
    else if (message === "help") {
        return `
Komandat:
read1 - lexo file1
read2 - lexo file2
write <tekst> - shkruaj (vetëm admin)
execute - ekzekuto (vetëm admin)
list - shfaq file-t
whoami - shfaq rolin
admin <password> - bëhu admin
`;
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
    // List Files
            else if (message === "list") {
        try {
            const files = fs.readdirSync("./data");
            return "Files në server:\n" + files.join("\n");
        } catch (e) {
            return "Gabim gjatë leximit të folderit!";
        }
    }

    // WRITE (vetëm admin)
    else if (message.startsWith("write ")) {
        if (clients[clientId] !== "admin") {
            return "Nuk ke leje për write!";
        }

        const content = message.replace("write ", "").trim();

        if (!content) {
            return "Tekst i zbrazët!";
        }

        try {
            fs.appendFileSync("./data/file1.txt", content + "\n", "utf8");
            return "U shtua në file1!";
        } catch (e) {
            return "Gabim gjatë shkrimit!";
        }
    }
        //Ekzekutimi
     else if (message === "execute") {
        if (clients[clientId] !== "admin") {
            return "S'ke leje për execute!";
        }

        try {
            const files = fs.readdirSync("./data");
            return "Execute OK. Files në server: " + files.join(", ");
        } catch (e) {
            return "Gabim gjatë execute!";
        }
    }
    //Default
    return "Komandë e panjohur! Shkruaj 'help'";
}

module.exports = { handleRequest };

