<template>
  <div>
    <button @click="leaveLobby">Leave lobby</button>
    <br />
    <br />
    <!-- <img
      class="globeImg"
      src="https://upload.wikimedia.org/wikipedia/commons/5/5e/%C3%86toms_-_Earth.svg"
      width="100%"
    />-->
    <!-- <p>Current players</p> -->
    <div class="playerField">
      <Player :player="player" :key="player.playerName" v-for="player in players" />
    </div>
    <h1>{{countDownTime}}</h1>
    <button v-if="leader" :disabled="players.length < 1" @click="initGame">Start game</button>
  </div>
</template>

<script>
import Player from "./../components/lobby/Player";

export default {
  data() {
    return {
      countDownTime: null
    };
  },
  components: {
    Player
  },
  sockets: {
    countDown(data) {
      if (data === 0) {
        this.startGame();
      }
      this.countDownTime = data;
    }
  },
  created() {
    this.connectToSocketRoom();
    this.checkIfLobbyExists();
  },
  computed: {
    players() {
      return this.$store.state.players
    },
    leader() {
      let player = this.$store.state.players.find(
        player => player.playerId === this.$store.state.playerId
      );

      if (player) {
        if (
          this.$store.state.players.find(
            player => player.playerId === this.$store.state.playerId
          ).leader === true
        ) {
          return true;
        } else {
          return false;
        }
      }
    }
  },
  methods: {
    connectToSocketRoom() {
      this.$socket.emit("connectToRoom", { roomId: this.$store.state.roomId });
    },
    leaveLobby() {
      this.$socket.emit(
        "leaveLobby",
        {
          playerId: this.$store.state.playerId,
          roomId: this.$store.state.roomId
        },
        data => {
          this.$router.push({ name: "Home" });
          this.$store.dispatch("resetPlayer");
        }
      );
    },
    checkIfLobbyExists() {
      this.$socket.emit(
        "checkIfLobbyExists",
        { roomId: this.$route.params.id },
        data => {
          if (!data) {
            this.$router.push({ name: "Home" });
            this.$store.dispatch("resetPlayer");
          } else {
            if ("geolocation" in navigator) {
              navigator.geolocation.getCurrentPosition(position => {
                let pos = [position.coords.longitude, position.coords.latitude]
                this.$socket.emit("updatePosition", {
                  roomId: this.$store.state.roomId,
                  playerId: this.$store.state.playerId,
                  pos
                });
              });
            }
          }
        }
      );
    },
    initGame() {
      this.$socket.emit("initGame", { roomId: this.$route.params.id });
    },
    startGame() {
      console.log("Starting game");
      this.$router.push({ name: "Map" });

      this.$store.commit("UPDATE_INGAME", true);
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lobster&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital@1&display=swap");

div p {
  font-family: "Lobster", cursive;
  color: white;
  font-size: 30px;
  margin: 20px;
}

.globeImg {
  height: 130px;
}

.playerField {
  position: relative;
  width: 90%;
  margin: auto;
  border-radius: 50%;
  margin-bottom: 10px;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>