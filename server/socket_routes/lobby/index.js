module.exports = (io, socket, rooms) => {


  socket.on('createLobby', (data, callback) => {
    console.log("Creating lobby");
    let roomId = makeid(1)
    connectToRoom(socket, roomId)
    let player = {
      playerId: makeid(10),
      playerName: data.playerName,
      leader: true
    }
    let newRoom = {roomId, players: [player] }
    rooms[roomId] = newRoom
    updatePlayers(roomId, rooms[roomId].players)

    
    callback(newRoom)
  });


  socket.on('joinLobby', async (data, callback) => {

    if (rooms[data.roomId]) {
      let playerId = makeid(10)
      connectToRoom(socket, data.roomId)
      rooms[data.roomId].players.push({playerId: playerId, playerName: data.playerName})
      updatePlayers(data.roomId, rooms[data.roomId].players)
      callback({playerId})
    } else {
      callback({ errorMessage: 'Lobby doesnt exists' })
    }
  });

  socket.on('leaveLobby', async (data, callback) => {
    socket.leave(data.roomId);
    delete rooms[data.roomId].players.splice(rooms[data.roomId].players.findIndex(player => player.playerId === data.playerId), 1)
    updatePlayers(data.roomId, rooms[data.roomId].players) 
    callback()
  });

  socket.on('connectToRoom', async (data) => {
    connectToRoom(socket, data.roomId)
  });


  function connectToRoom(socket, roomId) {
    socket.join(roomId);
  }


  function updatePlayers(roomId, players) {
    io.in(roomId).emit('updatePlayers', players);
  }

  socket.on('getLobbyPlayers', async (data, callback) => {
    if (rooms[data.roomId]) {
      callback(rooms[data.roomId])
    } else {
      callback([])
    }
    
  });

  socket.on('checkIfLobbyExists', async (data, callback) => {
    if (rooms[data.roomId]) {
      callback(true)
    } else {
      callback(false)
    }
  });

  function makeid(length) {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

}