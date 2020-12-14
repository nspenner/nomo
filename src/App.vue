<template>
  <div class="app-container" :class="mode">
    <Metronome v-on:play="toggleTheme" />
  </div>
</template>

<script>
import Metronome from "./components/Metronome.vue";
import "normalize.css";

export default {
  name: "App",
  components: {
    Metronome,
  },
  data: () => ({
    mode: "light",
  }),
  methods: {
    toggleTheme() {
      // this.mode = this.mode === "light" ? "dark" : "light";
    },
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
  /* background: var(--background-color); */
}

.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  background: var(--background-color);
}

.light {
  --background-color: #f9f5eb;
  --text-color-primary: #251b19;
  --form-border-color: rgba(56, 39, 5, 0.54);
  --input-background-color: #fdfaf2;
  --copper-red: #ce6c47ff;
  --jasmine: #f4d58dff;
  --ebony: #626d58ff;
  --kombu-green: #3a4f41ff;
  --dark-sienna: #360709ff;
  --banana-mania: #f7e3b5ff;
}

.dark {
  --background-color: #251b19;
  --text-color-primary: #f9f5eb;
  --form-border-color: #fdfaf2;
  --input-background-color: #625b4d;
}
</style>
