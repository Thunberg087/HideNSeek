<template>
  <div class="stars" id="app">
    <!-- {{this.$store.state}} -->

    <div class="stars"></div>
    <div class="twinkling"></div>
    <div class="clouds"></div>

    <router-view class="mainPage" />
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/general/Navbar";
import Logo from "./components/general/Logo";
import Footer from "./components/general/Footer";

export default {
  components: {
    Navbar,
    Logo,
    Footer
  },
  created() {
 

    // if (this.$store.state.inGame) {
    //   this.$store
    //     .dispatch("joinLobby", {
    //       lobbyId: this.$store.state.gameLobbyID,
    //       playerName: this.$store.state.gamePlayerName,
    //       vm: this
    //     })
    //     .catch(error => {
    //       this.$store.dispatch("resetLobbyStatus");
    //     });
    // } else {
    //   if (this.$route.name != "Home") {
    //     this.$router.push({ name: "Home" });
    //   }
    // }
  }
};
</script>

<style>
* {
  margin: 0;
}

body {
  background: #2c2c2c;
  overscroll-behavior-y: contain;
}

@keyframes move-twink-back {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -10000px 5000px;
  }
}
@-webkit-keyframes move-twink-back {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -10000px 5000px;
  }
}
@-moz-keyframes move-twink-back {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -10000px 5000px;
  }
}
@-ms-keyframes move-twink-back {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -10000px 5000px;
  }
}

@keyframes move-clouds-back {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 10000px 0;
  }
}
@-webkit-keyframes move-clouds-back {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 10000px 0;
  }
}
@-moz-keyframes move-clouds-back {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 10000px 0;
  }
}
@-ms-keyframes move-clouds-back {
  from {
    background-position: 0;
  }
  to {
    background-position: 10000px 0;
  }
}

.stars,
.twinkling,
.clouds {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.stars {
  background: #000
    url(http://www.script-tutorials.com/demos/360/images/stars.png) repeat top
    center;
  z-index: -10;
}

.twinkling {
  background: transparent
    url(http://www.script-tutorials.com/demos/360/images/twinkling.png) repeat
    top center;
  z-index: -9;

  -moz-animation: move-twink-back 200s linear infinite;
  -ms-animation: move-twink-back 200s linear infinite;
  -o-animation: move-twink-back 200s linear infinite;
  -webkit-animation: move-twink-back 200s linear infinite;
  animation: move-twink-back 200s linear infinite;
}

.clouds {
  background: transparent
    url(http://www.script-tutorials.com/demos/360/images/clouds3.png) repeat top
    center;
  z-index: -8;
  opacity: 0.8;
  -moz-animation: move-clouds-back 200s linear infinite;
  -ms-animation: move-clouds-back 200s linear infinite;
  -o-animation: move-clouds-back 200s linear infinite;
  -webkit-animation: move-clouds-back 200s linear infinite;
  animation: move-clouds-back 200s linear infinite;
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
  color: #b94242;
}
</style>
