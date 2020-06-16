<template>
  <div v-if="this.currentPosition" class="mapWrapper">
      <MglMap :attributionControl="false" :accessToken="accessToken" :mapStyle="mapStyle" :center="currentPosition" :zoom='13'>
        <MglNavigationControl position="top-right" />
  
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
  MglGeojsonLayer 
} from "vue-mapbox";

export default {
  components: {
    MglMap,
    MglNavigationControl,
    MglGeolocateControl,
    MglScaleControl,
    MglMarker,
    MglGeojsonLayer 
  },
  data() {
    return {
      accessToken: require('../../../tokens').mapbokToken, 
      mapStyle: "mapbox://styles/mapbox/streets-v11",
      currentPosition: null,
    };
  },
  created() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.currentPosition = [ position.coords.longitude, position.coords.latitude ]
        console.log(position.coords);
        
      });
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


</style>