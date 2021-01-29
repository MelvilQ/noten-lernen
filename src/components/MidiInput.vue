<template>
  <div class="midi-input">
    <div class="ready" v-if="midiIsReady && !lastNotePlayed">{{$t('playTheNote')}}</div>
    <div class="last-note" v-if="lastNotePlayed">{{$t('lastNotePlayed')}}: {{lastNotePlayed}}</div>
    <div class="error-message" v-if="errorMessage">{{errorMessage}}</div>
  </div>
</template>

<script>
import WebMidi from 'webmidi';

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
      if(this.isSharp){
        return [
          this.$t('C'), this.$t('CSharp'), 
          this.$t('D'), this.$t('DSharp'), 
          this.$t('E'), 
          this.$t('F'), this.$t('FSharp'), 
          this.$t('G'), this.$t('GSharp'), 
          this.$t('A'), this.$t('ASharp'), 
          this.$t('B')
        ];
      } else {
        return [
          this.$t('C'), this.$t('DFlat'), 
          this.$t('D'), this.$t('EFlat'), 
          this.$t('E'), 
          this.$t('F'), this.$t('GFlat'), 
          this.$t('G'), this.$t('AFlat'), 
          this.$t('A'), this.$t('BFlat'), 
          this.$t('B')
        ];
      }
    }
  },
  methods: {
    solve(v) {
      this.lastNotePlayed = this.noteNames[v];
      this.$emit('solved', v);
    }
  },
  mounted() {
    WebMidi.enable(error => {
      if (error) {
        console.log(error);
        this.errorMessage = this.$t('noMidiSupport');
      }
      const midiInput = WebMidi.inputs[0];
      if(!midiInput) {
        this.errorMessage = this.$t('noDeviceFound');
        return;
      }
      midiInput.on('noteon', 'all', stroke => this.solve(stroke.note.number % 12));
      this.midiIsReady = true;
    });
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
</style>
