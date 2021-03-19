<template>
  <form class="parameterform-container">
    <div class="row">
      <div class="bpm-form">
        <label for="barCount">Beats</label>
        <input
          v-model="barCount"
          v-on:change="handleBarCountChange"
          class="bar-count"
          type="text"
          inputmode="numeric"
          size="1"
          maxlength="2"
          pattern="[0-9]*"
          name="barCount"
          id="barCount"
        />
      </div>
      <div class="bpm-form">
        <label for="bpm">BPM</label>
        <input
          type="text"
          inputmode="numeric"
          name="bpm"
          id="bpm"
          v-model="bpm"
          v-on:change="handleBpmChange"
        />
      </div>
    </div>
    <div class="row"><volume-slider aria-label="Volume Slider" v-on:change="handleVolumeChange"/></div>
  </form>
</template>

<script>
import VolumeSlider from "./VolumeSlider.vue";

export default {
  components: {
    VolumeSlider,
  },
  data() {
    return {
      barCount: "4",
      beatCount: "4",
      bpm: "120",
      maxLength: "2",
      volume: .5
    };
  },
  methods: {
    handleBpmChange: function() {
      this.$emit("bpm-change", this.bpm);
    },
    handleBeatCountChange: function() {
      this.$emit("beat-count-change", this.beatCount);
    },
    handleBarCountChange: function() {
      this.$emit("bar-count-change", this.barCount);
    },
    handleVolumeChange: function(volume) {
      this.$emit("volume-change", volume * 0.01)
    }
  },
};
</script>

<style scoped>
.parameterform-container {
  height: 240px;
  max-width: 300px;
}

.parameterform-container > .row {
  margin-top: 32px;
}

.parameterform-container > .row:first-child {
  margin-top: 0;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bpm-form {
  margin: 2rem;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: column;
}

.bpm-form > label {
  font-family: Work Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 54.3%;
  letter-spacing: -0.04em;
  margin-bottom: 1rem;
  color: var(--text-color-primary);
}

.bpm-form > input {
  width: 100%;
  background: var(--input-background-color);
  color: var(--text-color-primary);
  border: 1px solid var(--form-border-color);
  box-sizing: border-box;
  border-radius: 5px;
  padding: 0.5rem;
  font-family: Work Sans;
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 54.3%;
  letter-spacing: 0.1em;
  text-align: center;
}
</style>
