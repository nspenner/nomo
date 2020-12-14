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
/*
    This Vue uses code ported from Chris Wilson's web metronome implementation

    The MIT License (MIT)

    Copyright (c) 2014 Chris Wilson

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    */
import ParameterForm from "./ParameterForm";
import Control from "./Control";
import lowClick from "../assets/low_click.wav";
import highClick from "../assets/high_click.wav";
import Worker from "worker-loader!../assets/worker.js";

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
      audioContext: new AudioContext(),
      isPlaying: false, // Are we currently playing?
      startTime: null, // The start time of the entire sequence.
      currentTwelveletNote: null, // What note is currently last scheduled?
      masterVolume: 0.5,
      accentVolume: 1,
      quarterVolume: 0.75,
      eighthVolume: 0,
      sixteenthVolume: 0,
      tripletVolume: 0,
      lookahead: 25.0, // How frequently to call scheduling function
      //(in milliseconds)
      scheduleAheadTime: 0.1, // How far ahead to schedule audio (sec)
      // This is calculated from lookahead, and overlaps
      // with next interval (in case the timer is late)
      nextNoteTime: 0.0, // when the next note is due.
      noteLength: 0.05, // length of "beep" (in seconds)
      notesInQueue: [], // the notes that have been put into the web audio,
      // and may or may not have played yet. {note, time}
      timerWorker: new Worker(), // The Web Worker used to fire timer messages
    };
  },
  created: function() {
    console.log("hi");
    let scheduler = this.scheduler;
    this.timerWorker.onmessage = function(e) {
      if (e.data == "tick") {
        scheduler();
      } else {
        console.log("message: " + e.data);
      }
    };
    this.timerWorker.postMessage({ interval: this.lookahead });
  },
  methods: {
    maxBeats: function() {
      let beats = this.barCount * 12;
      return beats;
    },
    nextTwelvelet: function() {
      const secondsPerBeat = 60.0 / this.bpm;

      this.nextNoteTime += 0.08333 * secondsPerBeat; // Add beat length to last beat time
      this.currentTwelveletNote++; // Advance the beat number, wrap to zero

      if (this.currentTwelveletNote === this.maxBeats()) {
        this.currentTwelveletNote = 0;
      }
    },
    calcVolume: function(beatVolume) {
      return beatVolume * this.masterVolume;
    },
    scheduleNote: function(beatNumber, time) {
      // push the note on the queue, even if we're not playing.
      this.notesInQueue.push({ note: beatNumber, time: time });

      // create oscillator & gainNode & connect them to the context destination
      let osc = this.audioContext.createOscillator();
      let gainNode = this.audioContext.createGain();

      osc.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      if (beatNumber % this.maxBeats() === 0) {
        if (this.accentVolume > 0.25) {
          osc.frequency.value = 880.0;
          gainNode.gain.value = this.calcVolume(this.accentVolume);
        } else {
          osc.frequency.value = 440.0;
          gainNode.gain.value = this.calcVolume(this.quarterVolume);
        }
      } else if (beatNumber % 12 === 0) {
        // quarter notes = medium pitch
        osc.frequency.value = 440.0;
        gainNode.gain.value = this.calcVolume(this.quarterVolume);
      } else if (beatNumber % 6 === 0) {
        osc.frequency.value = 440.0;
        gainNode.gain.value = this.calcVolume(this.eighthVolume);
      } else if (beatNumber % 4 === 0) {
        osc.frequency.value = 300.0;
        gainNode.gain.value = this.calcVolume(this.tripletVolume);
      } else if (beatNumber % 3 === 0) {
        // other 16th notes = low pitch
        osc.frequency.value = 220.0;
        gainNode.gain.value = this.calcVolume(this.sixteenthVolume);
      } else {
        gainNode.gain.value = 0; // keep the remaining twelvelet notes inaudible
      }

      osc.start(time);
      osc.stop(time + this.noteLength);
    },
    scheduler: function() {
      while (
        this.nextNoteTime <
        this.audioContext.currentTime + this.scheduleAheadTime
      ) {
        this.scheduleNote(this.currentTwelveletNote, this.nextNoteTime);
        this.nextTwelvelet();
      }
    },

    toggleMetronome: function() {
      this.playing = !this.playing;
      this.$emit("play");
      if (this.playing) {
        this.currentTwelveletNote = 0;
        this.nextNoteTime = this.audioContext.currentTime;
        this.timerWorker.postMessage("start");
      } else {
        this.timerWorker.postMessage("stop");
      }
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
  color: var(--text-color-primary);
  margin: 24px;
  text-align: center;
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
  color: var(--text-color-primary);
}
</style>
