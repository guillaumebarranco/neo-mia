<template>
  <nav>
    <router-link :to="{name: 'Index'}">Home</router-link>
    <router-link :to="{name: 'Meteo'}">Meteo</router-link>
  </nav>
</template>

<script>
export default {
  name: "AppHeader",

  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
