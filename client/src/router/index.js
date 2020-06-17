import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Lobby from '../views/Lobby.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/lobby/:id',
    name: 'Lobby',
    component: Lobby
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import('../views/Map.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
