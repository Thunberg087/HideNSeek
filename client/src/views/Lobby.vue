<template>
  <div>
    <p>Current players</p>
    <div class="playerField">
      <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/%C3%86toms_-_Earth.svg" width="100%">
    </div>
      <div class="player" :key="player.playerName" v-for="player in players">
        <h5>{{player.playerName}}</h5>
        <i :style="playerColor" class="fas fa-male"></i>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      players: []
    }
  },
  sockets: {
    updatePlayers(data) {
      this.players = data
    }
  },
  created() {
    this.getPlayers()
  },
  computed: {
    playerColor() {
      let r = Math.floor(Math.random() * 255);
      let g = Math.floor(Math.random() * 255);
      let b = Math.floor(Math.random() * 255);
      return {"color": "rgb("+ r +","+ g +","+ b +")"}
    }
  },
  methods: {
    getPlayers() {
      this.$socket.emit('getLobbyPlayers', { lobbyId: this.$route.params.id }, (data) => {
        this.players = data
      });
    },
    leaveLobby() {
      
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital@1&display=swap');

  .playerField {
    position: relative;
    width: 30%;
    margin:auto;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  .playerField img {
    position: relative;
  }

  .player {
    position: relative; 
    width:auto;
    margin:5px;
    display: inline-block;
    border-radius: 5px;
    color: white;
    font-size: 20pt;
  }

  .player h5 {
    font-family: 'Poppins', sans-serif;
    font-size: 10pt;
    font-weight: lighter;
    color: white;
  }


  div p {
    font-family: 'Lobster', cursive;
    color:white;  
    font-size: 30px;
    margin: 20px;
  }

  @keyframes rotate {
  0%   {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
}
</style>