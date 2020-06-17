module.exports = (io, socket, rooms) => {


  socket.on('createLobby', (data, callback) => {
    console.log("Creating lobby");
    socket.playerName = data.playerName
    let lobbyId = makeid(1)
    rooms.push({ roomId: lobbyId })
    socket.join(lobbyId, () => {
      updatePlayers(lobbyId)
      callback(lobbyId)
    });
  });


  socket.on('joinLobby', async (data, callback) => {

    if (rooms.find(el => el.roomId === data.lobbyId)) {
      let clients = await getPlayers(data.lobbyId)
      if (!clients.find(client => client.playerName === data.playerName)) {
        socket.playerName = data.playerName
        console.log(`${data.playerName} joined room: ${data.lobbyId}`);
  
        socket.join(data.lobbyId, () => {
          updatePlayers(data.lobbyId)
          callback({})
        });
      } else {
        callback({
          errMsg: 'Player name already exists'
        })
      }

    } else {
      callback({
        errMsg: 'Game does not exists'
      })
    }

  });

  socket.on('leaveLobby', (data, callback) => {
    socket.leave(data.lobbyId);
    console.log(`${data.playerName} left room: ${data.lobbyId}`);
    updatePlayers(data.lobbyId)
    callback()
  });


  socket.on('getLobbyPlayers', async (data, callback) => {
    callback(await getPlayers(data.lobbyId))
  });


  async function getPlayers(lobbyId) {
    return await new Promise(resolve => {
      io.in(lobbyId).clients(async (err, clients) => {

        let promises = clients.map(async el => {
          return { socketId: el, playerName: io.sockets.connected[el].playerName }
        })

        Promise.all(promises).then(function (results) {
          resolve(results)
        })

      });
    });
  }

  async function updatePlayers(lobbyId) {
    let clients = await getPlayers(lobbyId)
    socket.to(lobbyId).emit('updatePlayers', clients);
  }


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