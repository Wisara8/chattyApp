// server.js

const express = require('express');
const SocketServer = require('ws');
const uuidv1 = require('uuid/v1');
// uuidv1();  ⇨ '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e'

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  //count and send # of users currently connected
  let counter = wss.clients.size;
  ws.send(counter);
  ws.on('message', function incoming(event) {
    for (let client of wss.clients) {
      if (client.readyState === SocketServer.OPEN) {
        let msg = JSON.parse(event);
        //if client has changed name
        if (msg.type === "postUser") {
          let userNote = msg.oldUser + " has changed names to " + msg.newUser;
          msg.note = userNote;
          newUserMsg = JSON.stringify(msg);
          client.send(newUserMsg);
          //if there is a new post
        } else {
        msg.id = uuidv1();
        let newMsg = JSON.stringify(msg);
        client.send(newMsg);
        }
      }

    }

  });  
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});