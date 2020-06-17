const http = require('http')
const https = require('https')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
require('dotenv').config()

var cors = require('cors')
app.use(cors())
app.use(bodyParser.json({ limit: '500kb' }));

if (process.env.NODE_ENV == 'production') {
  // Certificate
  var privateKey = fs.readFileSync(path.resolve(__dirname, '/etc/letsencrypt/live/oms.aviliax.com/privkey.pem'));
  var certificate = fs.readFileSync(path.resolve(__dirname, '/etc/letsencrypt/live/oms.aviliax.com/fullchain.pem'));
  var sslcredentials = { key: privateKey, cert: certificate };
  var server = https.createServer(sslcredentials, app);
} else {
  var server = http.createServer(app);
}

let port = process.env.PORT || 3000

server.listen(port, () => {
  console.log("Server started at port: " + port);
})

const io = require('socket.io').listen(server);


function makeid(length) {
  var result           = '';
  var characters       = '0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


io.on('connection', function (socket) {

  console.log("Client connected: (" + socket.id + ")");


  
  
  socket.on('createLobby', (data, callback) => {
    console.log("Creating lobby");
    
    socket.playerName = data.playerName

    let lobbyId = makeid(2)

    socket.join(lobbyId, () => {
 
      // var numClients = (typeof clientIds !== 'undefined') ? Object.keys(clientIds).length : 0;
     
      io.in(lobbyId).clients((err , clients) => {
        let newClients = clients.map(el => {
          return { socketId: el, playerName: io.sockets.connected[el].playerName }
        })

        callback(lobbyId)
      });

    });


   
  });

  
  socket.on('joinLobby', (data, callback) => {

    socket.playerName = data.playerName

    socket.join(data.lobbyId, () => {
      io.in(data.lobbyId).clients((err , clients) => {
        let newClients = clients.map(el => {
          return { socketId: el, playerName: io.sockets.connected[el].playerName }
        })
        socket.to(data.lobbyId).emit('updatePlayers', newClients);

        callback(newClients)
      });
    });
  });



  socket.on('getLobbyPlayers', (data, callback) => {
      io.in(data.lobbyId).clients((err , clients) => {
        let newClients = clients.map(el => {
          return { socketId: el, playerName: io.sockets.connected[el].playerName }
        })
        callback(newClients)
      });
  });

  

  socket.on('disconnect', function () {
    console.log("Client disconnected: (" + socket.id + ")");
    console.log(socket.rooms);
    
  });
});

