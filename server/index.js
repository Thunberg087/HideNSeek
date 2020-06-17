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




let rooms = []

io.on('connection', function (socket) {

  console.log("Client connected: (" + socket.id + ")");
  require('./socket_routes/lobby')(io, socket, rooms)



  socket.on('disconnect', function () {
    console.log("Client disconnected: (" + socket.id + ")");
  });
});
