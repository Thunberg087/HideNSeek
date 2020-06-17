import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import VueSocketIO from 'vue-socket.io'
import io from 'socket.io-client'
import store from './store'

export const socket = io("http://localhost:3000")

Vue.use(VueSocketIO, socket)

Vue.config.productionTip = false

var vm = new Vue({
  router,
  socket,
  store,
  render: h => h(App)
}).$mount('#app')
