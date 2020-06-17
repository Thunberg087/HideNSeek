<template>
  <div  class="mapWrapper">
           <button @click="leaveGame">LEave</button>


      <MglMap v-if="this.currentPosition" :attributionControl="false" :accessToken="accessToken" :mapStyle="mapStyle" :center="currentPosition" :zoom='13'>
        <MglNavigationControl position="top-right" />
        <MglGeolocateControl position="bottom-left" />
          <MglMarker :coordinates="player.pos" :key="player.playerId" v-for="player in this.$store.state.players" color="black">
            <MglPopup>
              <div>{{ player.pos }}</div>
            </MglPopup>
          </MglMarker>
      </MglMap>
  </div>
</template>

<script>
import Mapbox from "mapbox-gl";
import {
  MglMap,
  MglAttributionControl,
  MglNavigationControl,
  MglGeolocateControl,
  MglFullscreenControl,
  MglScaleControl,
  MglMarker,
  MglPopup,
  MglGeojsonLayer 
} from "vue-mapbox";

export default {
  components: {
    MglMap,
    MglNavigationControl,
    MglGeolocateControl,
    MglScaleControl,
    MglMarker,
    MglPopup,
    MglGeojsonLayer 
  },
  data() {
    return {
      accessToken: require('../../../tokens').mapboxToken, 
      mapStyle: "mapbox://styles/mapbox/streets-v11",
      currentPosition: null,
    };
  },
  created() {
    console.log(this.$store.state.players);
    console.log(this.$store.state);
    this.currentPosition = this.$store.state.players.find(el => el.playerId === this.$store.state.playerId).pos
    // this.$store.state.players
  },
  methods: {
    leaveGame() {
      this.$store.dispatch('resetPlayer')
      this.$router.push({ name: 'Home' })
    }
  }
};
</script>

<style scoped>
.mapWrapper {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

/deep/ .mapboxgl-canvas {
  width: auto;
  height: auto;
}

/deep/ .mapboxgl-ctrl-logo {
  display: none;
}


</style>