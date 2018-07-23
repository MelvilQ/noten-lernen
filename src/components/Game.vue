<template>
  <div id="screen">
    <ScoreLine :result="result" :timeLeft="timeLeft" />
    <NoteDisplay :abc="abc" />
    <FeedbackLine :feedback="feedback" />
    <div v-if="inputMethod === 'button'" id="note-button-input">
      <div v-for="value in 12" :key="value-1" class="button-container" :style="gridParams(value-1)">
        <button @click="checkAnswer(value-1)">{{noteNames[value-1]}}</button>
      </div>
    </div>
    <div v-else id="note-key-input">
      TODO
    </div>
  </div>
</template>

<script>
import ScoreLine from './ScoreLine';
import NoteDisplay from './NoteDisplay';
import FeedbackLine from './FeedbackLine';

import * as _ from 'lodash';

export default {
  name: 'Game',
  components: { 
    ScoreLine,
    NoteDisplay,
    FeedbackLine
  },
  data () {
    return {
      inputMethod: 'button',
      currentExercise: {
        clef: 'treble',
        value: 36,
        isSharp: false
      },
      result: {
        numCorrect: 0,
        numWrong: 0,
      },
      timeLeft: 0,
      timer: null,
      feedback: {
        showCorrectFeedback: false,
        showWrongFeedback: false
      }
    }
  },
  computed: {
    accidental(){
      const v = this.currentExercise.value % 12;
      const hasAccidental = (v === 1 || v === 3 || v === 6 || v === 8 || v === 10);
      if(!hasAccidental){
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
      const value = this.currentExercise.value;
      if(value < 12){
        return this.noteLetter + ',,,';
      } else if(value < 24){
        return this.noteLetter + ',,';
      } else if(value < 36){
        return this.noteLetter + ',';
      } else if(value < 48){
        return this.noteLetter;
      } else if(value < 60){
        return this.noteLetter.toLowerCase();
      } else {
        return this.noteLetter.toLowerCase() + '\'';
      }
    },
    abc(){
      return (
        'L:1/4\nK:C ' + this.currentExercise.clef 
        + '\n' 
        + this.accidental + this.note
      );
    },
    noteNames(){
      if(this.currentExercise.isSharp){
        return ['C', 'Cis', 'D', 'Dis', 'E', 'F', 'Fis', 'G', 'Gis', 'A', 'Ais', 'H'];
      } else {
        return ['C', 'Des', 'D', 'Es', 'E', 'F', 'Ges', 'G', 'As', 'A', 'B', 'H'];
      }
    }
  },
  methods: {
    startGame(){
      this.result.numCorrect = 0;
      this.result.numWrong = 0;
      this.timeLeft = 60;
      this.timer = setInterval(() => {
        this.timeLeft -= 1;
        if(this.timeLeft <= 0){
          this.onGameFinished();
        }
      }, 1000)
      this.generateNewExercise();
    },
    onGameFinished(){
      clearInterval(this.timer);
    },
    generateNewExercise(){
      const isBass =  _.sample([true, false]);
      this.currentExercise = {
        clef: isBass ? 'bass' : 'treble',
        value: isBass ? _.random(11, 41) : _.random(31, 62),
        isSharp: _.sample([true, false])
      };
    },
    checkAnswer(value){
      if(value === this.currentExercise.value % 12){
        this.onCorrectAnswer();
      } else {
        this.onWrongAnswer();
      }
      this.generateNewExercise();
    },
    onCorrectAnswer(){
      this.result.numCorrect += 1;
      this.feedback.showWrongFeedback = false;
      this.feedback.showCorrectFeedback = true;
    },
    onWrongAnswer(){
      this.result.numWrong += 1;
      this.feedback.showCorrectFeedback = false;
      this.feedback.showWrongFeedback = true;
    },
    gridParams(v){
      const hasAccidental = (v === 1 || v === 3 || v === 6 || v === 8 || v === 10);
      return {
        'grid-row': hasAccidental ? 1 : 2,
        'grid-column': (v <= 4 ? v+1 : v+2) + '/ span 2'
      };
    }
  },
  mounted(){
    this.startGame();
  }
}
</script>

<style>
html,
body {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
}

.button-container {
  height: 50px;
}

button {
  width: 95%;
  height: 95%;
  background-color: lightblue;
  border-radius: 5px;
  border: none;
  outline: none;
  font-weight: bold;
}

button:hover {
  background-color: deepskyblue;
}

button:active {
  background-color: yellow;
}

#screen {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  max-width: 720px;
  height: 75vh;
}

#note-button-input {
  display: grid;
}
</style>
