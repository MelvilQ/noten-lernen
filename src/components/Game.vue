<template>
  <div class="game-screen">
    <ScoreLine 
      :result="result" 
      :timeLeft="timeLeft" />
    <NoteDisplay 
      :currentExercise="currentExercise" />
    <FeedbackLine 
      :feedback="feedback" />
    <ButtonInput 
      v-if="options.inputMode === 'button'" 
      :isSharp="currentExercise.isSharp" 
      @solved="checkAnswer" />  
    <KeyboardInput 
      v-if="options.inputMode === 'keyboard'" 
      @solved="checkAnswer" />
  </div>
</template>

<script>
import ScoreLine from './ScoreLine';
import NoteDisplay from './NoteDisplay';
import FeedbackLine from './FeedbackLine';
import ButtonInput from './ButtonInput';
import KeyboardInput from './KeyboardInput';

import Options from '../model/Options';
import Statistics from '../model/Statistics';

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
      options: Options,
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
    minBassValue(){
      switch(this.options.difficulty){
        case 'easy':
          return 24;
        case 'normal':
          return 10;
        case 'hard':
        default:
          return 7;
      }
    },
    maxBassValue(){
      switch(this.options.difficulty){
        case 'easy':
          return 36;
        case 'normal':
          return 36;
        case 'hard':
        default:
          return 45;
      }
    },
    minTrebleValue(){
      switch(this.options.difficulty){
        case 'easy':
          return 36;
        case 'normal':
          return 36;
        case 'hard':
        default:
          return 28;
      }
    },
    maxTrebleValue(){
      switch(this.options.difficulty){
        case 'easy':
          return 48;
        case 'normal':
          return 55;
        case 'hard':
        default:
          return 65;
      }
    }
  },
  methods: {
    startGame(){
      this.result.numCorrect = 0;
      this.result.numWrong = 0;
      this.timeLeft = this.options.gameLength;
      this.timer = setInterval(() => {
        this.timeLeft -= 1;
        if(this.timeLeft < 0){
          this.onGameFinished();
        }
      }, 1000)
      this.generateNewExercise();
    },
    onGameFinished(){
      clearInterval(this.timer);
      const score = (this.result.numCorrect === 0) ? 0 // TODO this is duplicate code, refactor this
        : Math.round(100 * this.result.numCorrect * this.result.numCorrect 
          / (this.result.numCorrect + this.result.numWrong));
      Statistics.addScore(score);
      this.$emit('gameEnded'); // TODO add some info about the game as argument
    },
    generateNewExercise(){
      const isBass = this.options.clef === 'all' ? _.sample([true, false]) 
        : this.options.clef === 'bass';
      this.currentExercise = {
        clef: isBass ? 'bass' : 'treble',
        value: isBass ? _.random(this.minBassValue, this.maxBassValue) 
          : _.random(this.minTrebleValue,this.maxTrebleValue),
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
.game-screen {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  max-width: 720px;
}
</style>
