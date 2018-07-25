<template>
  <div class="game-screen">
    <button class="quit" @click="quit">
      RUNDE ABBRECHEN
    </button>
    <ScoreLine 
      :result="result" 
      :timeLeft="timeLeft" />
    <NoteDisplay 
      :currentExercise="currentExercise" />
    <FeedbackLine 
      :feedback="feedback"
      :uniqueId="numAnswers" />
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

import Utils from '../model/Utils';
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
      numCorrect: 0,
      numWrong: 0,
      mistakes: [],
      timeLeft: 0,
      timer: null,
      feedback: 'none'
    }
  },
  computed: {
    numAnswers(){
      return this.numCorrect + this.numWrong;
    },
    accuracy(){
      if(this.numAnswers === 0){
        return 0;
      }
      return Math.round(100 * this.numCorrect / this.numAnswers);
    },
    score(){
      if(this.numAnswers === 0){
        return 0;
      }
      return Math.round(100 * this.numCorrect * this.numCorrect / this.numAnswers);
    },
    result(){
      return {
        numAnswers: this.numAnswers,
        numCorrect: this.numCorrect,
        numWrong: this.numWrong,
        accuracy: this.accuracy,
        score: this.score,
        mistakes: this.mistakes
      }
    },
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
      this.numCorrect = 0;
      this.numWrong = 0;
      this.mistakes = [];
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
      Statistics.addScore(this.score);
      this.$emit('gameEnded', this.result); 
    },
    quit(){
      clearInterval(this.timer);
      this.$emit('gameEnded', null);
    },
    generateNewExercise(){
      const isBass = this.options.clef === 'all' ? _.sample([true, false]) 
        : this.options.clef === 'bass';
      this.currentExercise = {
        clef: isBass ? 'bass' : 'treble',
        value: isBass ? _.random(this.minBassValue, this.maxBassValue) 
          : _.random(this.minTrebleValue,this.maxTrebleValue)
      };
      switch(this.options.accidentals){
        case 'no':
          this.currentExercise.isSharp = false;
          if(Utils.hasAccidental(this.currentExercise.value)){
            _.sample([true, false]) ? this.currentExercise.value++ : this.currentExercise.value--;
          }
          break;
        case 'onlySharp':
          this.currentExercise.isSharp = true;
          break;
        case 'onlyFlat':
          this.currentExercise.isSharp = false;
          break;
        case 'all':
          this.currentExercise.isSharp = _.sample([true, false])
      }
    },
    checkAnswer(value){
      if(value === this.currentExercise.value % 12){
        this.onCorrectAnswer();
      } else {
        this.onWrongAnswer(value);
      }
      this.generateNewExercise();
    },
    onCorrectAnswer(){
      this.numCorrect += 1;
      this.feedback = 'correct';
    },
    onWrongAnswer(wrongValue){
      this.numWrong += 1;
      this.mistakes.push({
        noteValue: this.currentExercise.value,
        correctValue: this.currentExercise.value % 12,
        wrongValue: wrongValue
      });
      this.feedback = 'wrong';
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

button.quit {
  padding: 5px;
  font-weight: bold;
  border-radius: 0px 0px 5px 5px;
  border: none;
  outline: none;
  background-color: lightblue;
}

button.quit:hover {
  background-color: steelblue;
}

button.quit:focus {
  outline: none;
  background-color: lightblue;
}

button.quit:active {
  background-color: yellow;
}
</style>
