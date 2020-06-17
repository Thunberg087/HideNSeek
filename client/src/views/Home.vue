<template>
  <div class="home">
    <Logo />
    <div class="menu">
      <input type="text" placeholder="Your name" v-model="playerName" />
      <button @click="createLobby">Create game</button>
      <input type="text" placeholder="Lobby ID" v-model="roomId" />
      <button @click="joinLobby">Join game</button>
      <p v-if="errorMessage">{{errorMessage}}</p>
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
      playerName: "awd",
      roomId: "",
      players: [],
      errorMessage: null
    };
  },
  methods: {
    createLobby() {
      this.$socket.emit("createLobby", { playerName: this.playerName }, callbackData => {
         console.log(callbackData);
         
         this.$store.dispatch('updatePlayerInfo', { playerId: callbackData.players[0].playerId, roomId: callbackData.roomId })

          console.log(`Created lobby`, callbackData);
          if (this.$route.name != 'Lobby') {
            this.$router.push({ name: "Lobby", params: { id: callbackData.roomId } });
          }
      });
    },
    joinLobby() {
      this.$socket.emit("joinLobby", { playerName: this.playerName, roomId: this.roomId }, callbackData => {
        if (!callbackData.errorMessage) {
          this.$store.dispatch('updatePlayerInfo', { playerId: callbackData.playerId, roomId: this.roomId })
          console.log(`Player joined room: `, this.roomId);
          if (this.$route.name != 'Lobby') {
            this.$router.push({ name: "Lobby", params: { id: this.roomId } });
          }
        } else {
          this.errorMessage = callbackData.errorMessage
        }
      
      });
    }
  }
};
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