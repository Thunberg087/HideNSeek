<template>
  <div class="player">
    <h5>{{player.playerName}}</h5>
    <i class="fas fa-male"></i>
  </div>
</template>

<script>
export default {
  props: {
    player: {
      type: Object
    }
  },
};
</script>

<style scoped>


  .player {
    position: relative; 
    width:auto;
    margin:5px;
    display: inline-block;
    border-radius: 5px;
    font-size: 20pt;
    color: white;
  }


  .player h5 {
    font-family: 'Poppins', sans-serif;
    font-size: 10pt;
    font-weight: lighter;
    color: white;
  }


</style>