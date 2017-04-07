const uuidV1 = require('uuid/v1');
const WebSocket = require('ws');
const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  let clientSize = {
    type: 'incomingSize',
    size: wss.clients.size
  }
  wss.broadcast(JSON.stringify(clientSize));

  console.log('Client connected');

  ws.on('message', (data) => {
    message = JSON.parse(data);
    let id = uuidV1();
    let outputMessage = {
      type: 'incomingMessage',
      id: id,
      username: message.username,
      content: message.content
    }
    let outputNotification = {
      type: 'incomingNotification',
      notification: message.notification,
    }
    //console.log(clientSize);
    wss.broadcast(JSON.stringify(outputNotification));
    wss.broadcast(JSON.stringify(outputMessage));
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
  wss.broadcast(JSON.stringify(clientSize));
  });
});