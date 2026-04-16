let clients = {};

function handleRequest(message, clientId) {

  if(!clients[clientId]) {
    clients[clientId] = "read";
  }
   return "Komande e panjohur!";
}