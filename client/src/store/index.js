import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import router from './../router'

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

let actions = {
  joinLobby({ commit }, payload) {    
    return new Promise((resolve, reject) => {
 
    let vm = payload.vm
    vm.$socket.emit('joinLobby', { lobbyId: payload.lobbyId, playerName: payload.playerName }, (data) => {
      if (data.errMsg) {
        if (router.app.$route.name != 'Home') {
          router.push({name: 'Home'}) 
        }
        reject(data) 
      } else {
        commit('UPDATE_GAME_CONNECTION', { inGame: true, gameLobbyID: payload.lobbyId, gamePlayerName: payload.playerName })
        if (router.app.$route.name != 'Lobby') {
          router.push({name: 'Lobby', params: { id: payload.lobbyId }})
        }
        resolve()
      }
    });
  });
  },
  leaveLobby({ dispatch }, payload) {    
    let vm = payload.vm
    vm.$socket.emit('leaveLobby', { lobbyId: payload.lobbyId, playerName: payload.playerName }, (data) => {
      dispatch('resetLobbyStatus')
    });
  },
  resetLobbyStatus({ commit }) {
    commit('UPDATE_GAME_CONNECTION', { inGame: false, gameLobbyID: null, gamePlayerName: null })
    if (router.app.$route.name != 'Home') {
      router.push({name: 'Home'}) 
    }
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [createPersistedState()],
})
