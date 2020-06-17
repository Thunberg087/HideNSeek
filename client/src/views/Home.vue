<template>
  <div class="home">
    <div class="menu">
      <input type="text" placeholder="Your name" v-model="playerName" />
      <button @click="createLobby">Create game</button>
      <input type="text" placeholder="Lobby ID" v-model="lobbyId" />
      <button @click="joinLobby">Join game</button>
      <p v-if="errMsg">{{errMsg}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      playerName: "awd",
      lobbyId: "",
      players: [],
      errMsg: null
    };
  },
  methods: {
    createLobby() {
      this.$socket.emit(
        "createLobby",
        { playerName: this.playerName },
        callbackData => {
          this.$store.commit("UPDATE_GAME_CONNECTION", {
            inGame: true,
            gameLobbyID: callbackData,
            gamePlayerName: this.playerName
          });
          console.log(`Created lobby`, callbackData);
          if (this.$route.name != 'Lobby') {
            this.$router.push({ name: "Lobby", params: { id: callbackData } });
          }
        }
      );
    },
    joinLobby() {
      this.$store
        .dispatch("joinLobby", {
          lobbyId: this.lobbyId,
          playerName: this.playerName,
          vm: this
        })
        .catch(error => {
          this.errMsg = error.errMsg;
          this.$store.dispatch("resetLobbyStatus");
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
  background: rgb(63, 205, 75);
}
</style>