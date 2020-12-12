<template>
  <header><h1>Nomo</h1></header>
  <main>
    <Control v-bind:playing="playing" v-on:toggle-play="toggleMetronome" />
    <div class="beat-indicator">Beat Indicator</div>
    <ParameterForm
      v-on:bpm-change="bpm = $event"
      v-on:bar-count-change="barCount = $event"
      v-on:beat-count-change="beatCount = $event"
    />
  </main>
  <footer><span>About</span></footer>
</template>
<script>
import ParameterForm from "./ParameterForm";
import Control from "./Control";
import lowClick from "../assets/low_click.wav";
import highClick from "../assets/high_click.wav";

export default {
  name: "Metronome",
  components: {
    ParameterForm,
    Control,
  },
  data() {
    return {
      playing: false,
      lowClick: new Audio(lowClick),
      highClick: new Audio(highClick),
      bpm: 120,
      beatCount: 4,
      barCount: 4,
      counter: 0,
    };
  },
  methods: {
    handleClick: function() {
      alert("clicked!");
      this.lowClick.play();
    },
    toggleMetronome: function() {
      if (this.playing) {
        // Stop the timer
        clearInterval(this.timer);
        this.playing = !this.playing;
      } else {
        // Start a timer with the current BPM
        this.timer = setInterval(this.playClick, (60 / this.bpm) * 1000);
        this.count = 0;
        this.playing = !this.playing;
      }
    },
    playClick: function() {
      // The first beat will have a different sound than the others
      if (this.count % this.barCount === 0) {
        this.highClick.play();
      } else {
        this.lowClick.play();
      }
      this.count = (this.count + 1) % this.barCount;
    },
  },
};
</script>
<style scoped>
h1 {
  font-family: Work Sans;
  font-style: normal;
  font-weight: 200;
  font-size: 64px;
  text-transform: lowercase;
  color: #382705;
  margin: 24px;
}

main {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

.beat-indicator {
  height: 72px;
}

.parameterform {
  height: 160px;
}

footer {
  margin: 16px;
}

footer > span {
  font-family: Work Sans;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 54.3%;
  letter-spacing: -0.04em;
  text-decoration-line: underline;
  margin: 16px;
}
</style>
