<template>
  <div class="page dashboard-page">
    <mia-header v-bind:class="{ hidden: isActive }"></mia-header>

    <div class="blocs">
      <mia-playlists
        class="bloc"
        v-bind:class="{ active: blocs.playlists.isActive, hidden: isActive && !blocs.playlists.isActive }"
        v-bind:isFullScreen="blocs.playlists.isActive"
      >
        <div v-on:click="displayBloc('playlists')" class="displayBloc">+</div>
      </mia-playlists>

      <div
        class="bloc"
        v-bind:class="{ active: blocs.test.isActive, hidden: isActive && !blocs.test.isActive }"
      >
        Test bloc
        <div v-on:click="displayBloc('test')" class="displayBloc">+</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Header from "../components/Header";
import Playlists from "../components/Playlists";

Vue.component("mia-header", Header);
Vue.component("mia-playlists", Playlists);

export default {
  name: "Dashboard",
  components: {
    Header,
    Playlists
  },

  data() {
    return {
      isActive: false,
      blocs: {
        playlists: {
          isActive: false
        },
        test: {
          isActive: false
        }
      }
    };
  },

  methods: {
    displayBloc(bloc) {
      this.isActive = !this.isActive;

      Object.keys(this.blocs).forEach(key => {
        this.blocs[key].isActive = false;

        if (key === bloc && this.isActive) {
          this.blocs[key].isActive = true;
        }
      });
    }
  }
};
</script>

<style scoped>
.blocs {
  display: flex;
}

.blocs > * {
  margin-left: 10px;
}

.blocs > *.active {
  margin: 0;
}

.bloc {
  width: 300px;
  height: 300px;
  border: solid 1px black;
  background-color: black;
  transition: 1s;
  overflow-y: auto;
}

.bloc.active {
  width: 100vw;
  height: 100vh;
}

.displayBloc {
  font-size: 30px;
  width: 34px;
  top: 5px;
  position: relative;
  border: solid 3px;
  border-radius: 50%;
  margin: 0 auto;
  text-align: center;
}

.hidden {
  display: none;
}
</style>
