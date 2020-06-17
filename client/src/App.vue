<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/general/Navbar'


export default {
  components: {
    Navbar
  },
}
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
