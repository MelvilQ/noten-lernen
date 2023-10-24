<template>
  <div id="note-outer-box">
    <div id="note-display" @click="playCurrentNote"></div>
  </div>
</template>

<script>



import Note, {Accidentals} from '../model/Note';
import abcjs from 'abcjs';

export default {
  name: 'NoteDisplay',
  props: {
    //TODO: i should probably decouple the concept of an exercise from the presentation of notes ?
    currentExercise: Object
  },
  computed: {
    noteAsAbcNote(){

      /*
       ABC notation reference: https://abcnotation.com/wiki/abc:standard:v2.1#pitch
       
       interactive abc editor if you want to play around 
       https://paulrosen.github.io/abcjs/interactive/interactive-editor.html#available-methods
      */
      
      
      /*
       we are converting from our internal note representation to the ABC notation.
       the abc notation represents the middle C as just "C" which coresponds in our system
       to "C4". That means we have to convert every note that is not in the fourth octave with prefixes
       Every octave above 4 adds a "'" and every octave below 4 adds a "," in the abc notation.
      */
      const exerciseNote = this.currentExercise.note;

      var abcAccidentalPrefix = "";
      if(exerciseNote.accidental == Accidentals.Sharp)
      {
        abcAccidentalPrefix = "^";
      }
      else if(exerciseNote.accidental == Accidentals.Flat){
        abcAccidentalPrefix = "_";
      }
      var abcOctaveModifier = "";

      const middleOctave = 4;
      let octaveDistanceToMiddleOctave = exerciseNote.octave - middleOctave;
      if(octaveDistanceToMiddleOctave > 0)
      {
        abcOctaveModifier = "'".repeat(Math.abs(octaveDistanceToMiddleOctave));
      }
      else if(octaveDistanceToMiddleOctave < 0)
      {
        abcOctaveModifier = ",".repeat(Math.abs(octaveDistanceToMiddleOctave));
      }

      var abcNote = `${abcAccidentalPrefix}${exerciseNote.noteName}${abcOctaveModifier}`;
    
      return abcNote;
      /*
      TODO: i should probably put this conversion into a separate class or make it part of the note ? 
      Remark: putting it on the note class would mean i couple a implementation detail of the view into the model !
      */
    },
    exerciseAsAbcText(){

      //TODO: add grand staff again.
      // if (this.currentExercise.staff === 'piano') {
      //   return (
      //     // Multiple voices notation: https://abcnotation.com/wiki/abc:standard:v2.1#multiple_voices
      //     'L:1/4\n'
      //     + '%%score {1 2}\n'
      //     + 'V:1 clef=treble\n'
      //     + 'V:2 clef=bass\n'
      //     + 'K:C\n'
      //     + '[V:1] ' + (this.currentExercise.clef === 'treble' ? this.accidental + this.note : 'z') + '\n'
      //     + '[V:2] ' + (this.currentExercise.clef === 'bass' ? this.accidental + this.note : 'z')
      //   )
      // } else
      var abcText = `
      L:1/4
      K:C
      V:1 clef=${this.currentExercise.clefName}
      ${this.noteAsAbcNote}
      `
      return abcText;
    },
  },
  watch: {
    exerciseAsAbcText() {
      abcjs.renderAbc('note-display', this.exerciseAsAbcText, {
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
