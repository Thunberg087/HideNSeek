<template>
  <div class="home">
    <Logo />
    <div class="menu">
      <input type="text" placeholder="Your name" v-model="playerName">
      <button @click="createLobby">Create game</button>
      <input type="text" placeholder="Lobby ID" v-model="lobbyId">
      <button @click="joinLobby">Join game</button>
    </div>
  </div>
</template>

<script>
import Logo from './../components/general/Logo'

export default {
  components: {
    Logo
  },
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
        this.$store.commit('UPDATE_GAME_CONNECTION', { inGame: true, gameLobbyID: callbackData, gamePlayerName: this.playerName })
        console.log(`Created lobby`, callbackData);
        this.$router.push({name: 'Lobby', params: { id: callbackData }})
      });
    },
    joinLobby() {
      this.$socket.emit('joinLobby', { lobbyId: this.lobbyId, playerName: this.playerName }, (data) => {
        this.$store.commit('UPDATE_GAME_CONNECTION', { inGame: true, gameLobbyID: this.lobbyId, gamePlayerName: this.playerName })
        console.log(data);
        this.$router.push({name: 'Lobby', params: { id: this.lobbyId }})

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
   border: 1px solid rgb(158, 45, 45);;
   background: rgb(205, 63, 63);
   color: white;
 }
</style>