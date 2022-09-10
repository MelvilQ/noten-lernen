<template>
  <div id="note-outer-box">
    <div id="note-display" @click="playCurrentNote"></div>
  </div>
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
      if (this.currentExercise.staff === 'piano') {
        return (
          // Multiple voices notation: https://abcnotation.com/wiki/abc:standard:v2.1#multiple_voices
          'L:1/4\n'
          + '%%score {1 2}\n'
          + 'V:1 clef=treble\n'
          + 'V:2 clef=bass\n'
          + 'K:C\n'
          + '[V:1] ' + (this.currentExercise.clef === 'treble' ? this.accidental + this.note : 'z') + '\n'
          + '[V:2] ' + (this.currentExercise.clef === 'bass' ? this.accidental + this.note : 'z')
        )
      } else {
        return (
          'L:1/4\nK:C ' + this.currentExercise.clef
          + '\n'
          + this.accidental + this.note
        );
      }
    },
  },
  watch: {
    abc(value) {
      abcjs.renderAbc('note-display', this.abc, {
        clickListener: () => this.unselect(),
        paddingtop: '0',
        paddingleft: '0',
        paddingbottom: '0',
        paddingright: '0',
        // It is somewhat tricky to size and layout an SVG image correctly. We start by setting 'responsive'
        // here, which lets us control size via the width of the parent object.
        responsive: 'resize',
        staffwidth: 80  // Sufficient to show a single quarter note.
      });
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
  cursor: pointer;
}

#note-outer-box {
  width: 120px;
}

</style>
