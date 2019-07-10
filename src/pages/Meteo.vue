<template>
  <div class="page meteo-page">
    <mia-header></mia-header>
  </div>
</template>

<script>
import Vue from "vue";
import Header from "../components/Header";

Vue.component("mia-header", Header);

export default {
  name: "Meteo",
  components: {
    Header
  },

  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

