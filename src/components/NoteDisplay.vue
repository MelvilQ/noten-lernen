<template>
  <div id="note-display" @click="playCurrentNote"></div>
</template>

<script>
import Utils from '../model/Utils';

import abcjs from 'abcjs';

export default {
  name: 'NoteDisplay',
  props: {
    currentExercise: Object
  },
  computed: {
    accidental(){
      if(!Utils.hasAccidental(this.currentExercise.value)){
        return '';
      }
      return this.currentExercise.isSharp ? '^' : '_';
    },
    noteLetter(){
      const v = this.currentExercise.value % 12;
      const isSharp = this.currentExercise.isSharp;
      switch(v){
        case 0: return 'C';
        case 1: return isSharp ? 'C' : 'D';
        case 2: return 'D';
        case 3: return isSharp ? 'D' : 'E';
        case 4: return 'E';
        case 5: return 'F';
        case 6: return isSharp ? 'F' : 'G';
        case 7: return 'G';
        case 8: return isSharp ? 'G' : 'A';
        case 9: return 'A';
        case 10: return isSharp ? 'A' : 'B';
        case 11: return 'B'
      }
    },
    note(){
      // ABC notation reference: https://abcnotation.com/wiki/abc:standard:v2.1#pitch
      // We are numbering the notes starting with C0 = 0, D0 = 1 and so on. Thus C4 = 48.
      const value = this.currentExercise.value;
      if(value < 12){
        return this.noteLetter + ',,,,';
      } else if(value < 24){
        return this.noteLetter + ',,,';
      } else if(value < 36){
        return this.noteLetter + ',,';
      } else if(value < 48){
        return this.noteLetter + ',';
      } else if(value < 60){
        return this.noteLetter;
      } else if(value < 72){
        return this.noteLetter.toLowerCase();
      } else if(value < 84){
        return this.noteLetter.toLowerCase() + '\'';
      } else if(value < 96){
        return this.noteLetter.toLowerCase() + '\'\'';
      }
    },
    abc(){
      return (
        'L:1/4\nK:C ' + this.currentExercise.clef 
        + '\n' 
        + this.accidental + this.note
      );
    },
  },
  watch: {
    abc(value){
      abcjs.renderAbc('note-display', this.abc, {staffwidth: 200, scale: 2.5, clickListener: () => this.unselect()});
    }
  },
  methods: {
	  playCurrentNote(){
      this.$emit('play');
    },
    unselect(){
      Array.from(document.getElementsByTagName('path'))
        .filter(p => p.getAttribute('fill') === '#ff0000')
        .forEach(p => p.setAttribute('fill', null));
    }
  }
}
</script>

<style scoped>
#note-display {
  margin: 0 auto;
  min-height: 225px;
  max-height: 225px;
  cursor: pointer;
}
</style>
