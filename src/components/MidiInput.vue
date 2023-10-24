<template>
  <div class="midi-input">
    <div class="ready" v-if="midiIsReady && !lastNotePlayed">{{$t('playTheNote')}}</div>
    <div class="last-note" v-if="lastNotePlayed">{{$t('lastNotePlayed')}}: {{ $t(lastNotePlayed) }}</div>
    <div class="error-message" v-if="errorMessage">{{errorMessage}}</div>
    <div class="restart-button" v-if="!midiIsReady"><button @click="initMidi()">Restart MIDI</button></div>
  </div>
</template>

<script>
import WebMidi from 'webmidi';
import Utils from '../model/Utils';

export default {
  name: 'MidiInput',
  props: {
    isSharp: Boolean
  },
  data() {
    return {
      midiIsReady: false,
      lastNotePlayed: null,
      errorMessage: '',
    }
  },
  computed: {
    noteNames(){
      return Utils.getNoteNamesArray(this.isSharp);
    }
  },
  methods: {
    initMidi() {
      //TODO: fix midi input to use note system
      WebMidi.enable(error => {
        if (error) {
          console.log(error);
          this.errorMessage = this.$t('noMidiSupport');
          return;
        }
        if (WebMidi.inputs.length < 1) {
          this.errorMessage = this.$t('noDeviceFound');
          return;
        };
        WebMidi.inputs.forEach((midiInput) => {
          console.log("Using ", midiInput);
          // There are two conventions for note numbers, instead we use octave and offset within octave.
          midiInput.on('noteon', 'all', stroke => this.solve(stroke.note.octave * 12 + stroke.note.number % 12));
        });
        this.midiIsReady = true;
      });
    },
    solve(v) {
      this.lastNotePlayed = this.noteNames[v % 12];
      this.$emit('noteInput', v);
    }
  },
  mounted() {
    this.initMidi();
  },
  beforeDestroy() {
    WebMidi.disable();
  }
}
</script>

<style scoped>
.ready {
  font-style: italic;
}

.last-note {
  text-align: center;
}

.error-message {
  text-align: center;
  font-weight: bold;
  color: red;
}

.restart-button {
  text-align: center;
  margin-top: 12px;
}
</style>
