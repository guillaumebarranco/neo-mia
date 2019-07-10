<template>
  <div>
    <div v-for="instruction in instructions" v-bind:key="instruction.id">{{ instruction }}</div>
    <div v-if="isAudio(command)">{{ command.content }}</div>
    <iframe v-if="isAudio(command)" v-bind:src="getTranslatedCommand(command.content)"></iframe>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import * as annyang from "annyang";
import * as urlencode from "urlencode";

export default {
  name: "Audio",

  computed: {
    ...mapGetters(["instructions", "command"])
  },
  methods: {
    ...mapActions(["sanitizeInstructions"]),

    getTranslatedCommand(text) {
      // window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
      const encodedText = urlencode(text);
      // return "";
      return `http://translate.google.com/translate_tts?tl=fr&client=tw-ob&q=${encodedText}`;
    },

    isAudio(command) {
      return command && command.type && command.type === "audio";
    },

    loadAudio() {
      if (annyang) {
        annyang.setLanguage("fr-FR");

        annyang.start({
          autoRestart: true
        });

        const userSaid = ["test", "test micro"];

        // annyang.addCallback('result', (userSaid) => {
        //     console.log('userSaid', userSaid);

        this.$store.dispatch("updateInstructions", userSaid);
        this.$store.dispatch("sanitizeInstructions");
        this.$store.dispatch("getMatchingAnswer");
        // });
      } else {
        console.log("annyang not charged");
      }
    }
  },
  created() {
    this.loadAudio();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
iframe {
  opacity: 0;
}
</style>
