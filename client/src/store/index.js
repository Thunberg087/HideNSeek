import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

let state = {
  inGame: false,
  gameLobbyID: null,
  gamePlayerName: null
}

let mutations = {
  UPDATE_GAME_CONNECTION(state, payload) {
    state.inGame = payload.inGame
    state.gameLobbyID = payload.gameLobbyID
    state.gamePlayerName = payload.gamePlayerName
  }
}

export default new Vuex.Store({
  state,
  mutations,
  plugins: [createPersistedState()],
})
