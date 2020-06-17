import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import router from './../router'

Vue.use(Vuex)

let state = {
  playerId: null,
  roomId: null,
  ingame: false,
  players: []
}

let mutations = {
  UPDATE_PLAYERID(state, payload) {
    state.playerId = payload
  },  
  UPDATE_ROOMID(state, payload) {
    state.roomId = payload
  },
  UPDATE_INGAME(state, payload) {
    state.ingame = payload
  },
  UPDATE_PLAYERS(state, payload) {
    state.players = payload
  }
}

let actions = {
  updatePlayerInfo({ commit }, payload) {
    commit('UPDATE_PLAYERID', payload.playerId)
    commit('UPDATE_ROOMID', payload.roomId)
  },
  resetPlayer({ commit }) {
    commit('UPDATE_PLAYERID', null)
    commit('UPDATE_ROOMID', null)
    commit('UPDATE_INGAME', false)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [createPersistedState()],
})
