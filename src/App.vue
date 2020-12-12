<template>
  <Metronome />
</template>

<script>
import Metronome from "./components/Metronome.vue";
import "normalize.css";

export default {
  name: "App",
  components: {
    Metronome,
  },
};
</script>

<style>
html,
body {
  height: 100%;
}

#app {
  font-family: "Work Sans", Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}
</style>
