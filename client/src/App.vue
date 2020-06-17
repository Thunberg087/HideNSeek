<template>
  <div id="app">
    <!-- {{this.$store.state}} -->
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/general/Navbar";

export default {
  components: {
    Navbar
  },
  created() {


    if (this.$store.state.inGame) {
      this.$store
        .dispatch("joinLobby", {
          lobbyId: this.$store.state.gameLobbyID,
          playerName: this.$store.state.gamePlayerName,
          vm: this
        })
        .catch(error => {
          this.$store.dispatch("resetLobbyStatus");
        });
    } else {
      if (this.$route.name != "Home") {
        this.$router.push({ name: "Home" });
      }
    }
  }
};
</script>

<style>
* {
  margin: 0;
}

body {
  background: paleturquoise;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
