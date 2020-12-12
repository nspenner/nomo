<template>
  <form class="parameterform-container">
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
  </form>
</template>

<script>
export default {
  data() {
    return {
      barCount: "4",
      beatCount: "4",
      bpm: "120",
      maxLength: "2",
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
  },
};
</script>

<style scoped>
.parameterform-container {
  display: flex;
  justify-content: space-between;
  height: 140px;
  max-width: 300px;
  align-items: center;
}

.time-signature-container {
  display: flex;
  flex-direction: column;
  width: 50%;
  flex: 1;
  align-items: flex-start;
}

.time-signature-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}

.time-signature-form input {
  background: #fdfaf2;
  border: 1px solid rgba(56, 39, 5, 0.54);
  box-sizing: border-box;
  border-radius: 5px;
  width: 56px;
  padding: 8px;
  font-family: Work Sans;
  font-style: normal;
  font-weight: 200;
  font-size: 36px;
  line-height: 54.3%;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: textfield;
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
}

.bpm-form > input {
  width: 100%;
  background: #fdfaf2;
  border: 1px solid rgba(56, 39, 5, 0.54);
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

span {
  display: block;
  width: 30%;
  border: 0.5px solid black;
}
</style>
