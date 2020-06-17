module.exports = (io, socket, rooms) => {

  
  socket.on('initGame', (data) => {

    // DYNAMIC VARIABLES BUT HARD CODED
    let seekerPercentage = 0.1
  
    // TEMP PLAYERS
    // for (let index = 0; index < 30; index++) {
    //   rooms[data.roomId].players.push({playerId: "1537015913"+index, playerName: "awd"+index})
    // }
    
    emitCountDown(data.roomId)


    selectSeekers(rooms, data.roomId, seekerPercentage)
    
    console.log(rooms[data.roomId].players);
    
    io.in(data.roomId).emit('updatePlayers', rooms[data.roomId].players);
    
  });
    


  function selectSeekers(rooms, roomId, seekerPercentage) {
  
    let playerCount = rooms[roomId].players.length
    let seekerCount = Math.ceil(playerCount*seekerPercentage)

    var randArr = [];
    while(randArr.length < seekerCount){
        var r = Math.floor(Math.random() * playerCount);
        if(randArr.indexOf(r) === -1) randArr.push(r);
    }
    console.log(randArr);
    
    randArr.forEach(element => {
      rooms[roomId].players[element].seeker = true 
    });

  }


  function emitCountDown(roomId) {
    var timeleft = 1;
    var downloadTimer = setInterval(function(){
      if(timeleft <= 0){
        clearInterval(downloadTimer);
      }
      
      io.in(roomId).emit('countDown', timeleft);
      timeleft -= 1;
    }, 1000);

  }



  
  socket.on('updatePosition', (data) => {
    rooms[data.roomId].players[rooms[data.roomId].players.findIndex(el => el.playerId === data.playerId)].pos = data.pos
    console.log('awd');
    
    io.in(data.roomId).emit('updatePlayers', rooms[data.roomId].players);
    
  });
    


}