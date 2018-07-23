<template>
  <div id="screen">
    <ScoreLine :result="result" :timeLeft="timeLeft" />
    <NoteDisplay :currentExercise="currentExercise" />
    <FeedbackLine :feedback="feedback" />
    <ButtonInput v-if="inputMethod === 'button'" :isSharp="currentExercise.isSharp" @solved="checkAnswer" />      
    <KeyboardInput v-else @solved="checkAnswer" />
  </div>
</template>

<script>
import ScoreLine from './ScoreLine';
import NoteDisplay from './NoteDisplay';
import FeedbackLine from './FeedbackLine';
import ButtonInput from './ButtonInput';
import KeyboardInput from './KeyboardInput';

import * as _ from 'lodash';

export default {
  name: 'Game',
  components: { 
    ScoreLine,
    NoteDisplay,
    FeedbackLine,
    ButtonInput,
    KeyboardInput
  },
  data () {
    return {
      inputMethod: 'keyboard',
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
        value: isBass ? _.random(7, 45) : _.random(28, 65),
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

#screen {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  max-width: 720px;
  height: 80vh;
}
</style>
