<template>
  <div id="screen">
    <ScoreLine :result="result" :timeLeft="timeLeft" />
    <NoteDisplay :currentExercise="currentExercise" />
    <FeedbackLine :feedback="feedback" />
    <div v-if="inputMethod === 'button'" id="note-button-input">
      <div v-for="value in 12" :key="value-1" class="button-container" :style="gridParams[value-1]">
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

import Utils from '../model/Utils';

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
    noteNames(){
      if(this.currentExercise.isSharp){
        return ['C', 'Cis', 'D', 'Dis', 'E', 'F', 'Fis', 'G', 'Gis', 'A', 'Ais', 'H'];
      } else {
        return ['C', 'Des', 'D', 'Es', 'E', 'F', 'Ges', 'G', 'As', 'A', 'B', 'H'];
      }
    },
    gridParams(){
      return Array.from(Array(12).keys()).map(v => ({
        'grid-row': Utils.hasAccidental(v) ? 1 : 2,
        'grid-column': (v <= 4 ? v+1 : v+2) + '/ span 2'
      }));
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
