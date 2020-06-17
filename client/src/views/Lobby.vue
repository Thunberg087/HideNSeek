<template>
  <div>
    <button @click="leaveLobby">Leave lobby</button>
    <div :key="player.playerName" v-for="player in players">
      {{player.playerName}}
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
  methods: {
    getPlayers() {
      this.$socket.emit('getLobbyPlayers', { lobbyId: this.$route.params.id }, (data) => {
        this.players = data
      });
    },
    leaveLobby() {
      this.$store.dispatch('leaveLobby', { lobbyId: this.$route.params.id, playerName: this.$store.state.gamePlayerName, vm: this })
    }
  }
}
</script>

<style scoped>

</style>