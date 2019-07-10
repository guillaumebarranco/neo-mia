<template>
  <div class="hello">
    <mia-header></mia-header>
    <mia></mia>
    <mia-audio></mia-audio>
  </div>
</template>

<script>
import Vue from "vue";
import Header from "../components/Header";
import Mia from "../components/Mia";
import Audio from "../components/Audio";

Vue.component("mia", Mia);
Vue.component("mia-header", Header);
Vue.component("mia-audio", Audio);


export default {
  name: "Home",
  components: {
    Header,
    Mia,
    Audio
  },

  data() {
    return {
      msg: "Mia"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
</style>

