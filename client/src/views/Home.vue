<template>
  <div class="home">
    <div class="menu">
      <input type="text" placeholder="Your name" v-model="playerName">
      <button @click="createLobby">Create game</button>
      <input type="text" placeholder="Lobby ID" v-model="lobbyId">
      <button @click="joinLobby">Join game</button>
    </div>
  </div>
</template>

<script>


export default {
  name: 'Home',
  data() {
    return {
      playerName: 'awd',
      lobbyId: '',
      players: []
    }
  },
  methods: {
    createLobby() {
      this.$socket.emit('createLobby', { playerName: this.playerName },  (callbackData) => {
        console.log(`Created lobby`, callbackData);
        this.$router.push({name: 'Lobby', params: { id: callbackData }})
      });
    },
    joinLobby() {
      this.$socket.emit('joinLobby', { lobbyId: this.lobbyId, playerName: this.playerName }, (data) => {
        console.log(data);
      });
    }
  }
}
</script>

<style scoped>
 .menu {
   position: relative;
   top: 50%;
 }

.menu * {
   display: block;
   padding: 10px;
   margin: 10px;
   width: calc(100% - 20px);
   box-sizing: border-box;
   text-align: center;
   border: none;
   border-radius: 7px;
 }

 .menu button {
   background: rgb(63, 205, 75);
 }
</style>