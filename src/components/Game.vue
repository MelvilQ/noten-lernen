<template>
  <div class="game-screen">
    <button class="quit" @click="quit">
      {{$t('ABORT')}}
    </button>
    <ScoreLine 
      :result="result" 
      :timeLeft="timeLeft"
      :isInfiniteRound="!options.gameLength" />
    <FeedbackLine 
      :feedback="feedback"
      :uniqueId="numAnswers" />
<<<<<<< HEAD
    <ButtonInput 
      v-if="options.inputMode === 'button'" 
      :isSharp="currentExercise.isSharp" 
      @solved="checkAnswer" />  
    <KeyboardInput 
      v-if="options.inputMode === 'keyboard'" 
      @solved="checkAnswer" />
    <MidiInput
      v-if="options.inputMode === 'midi'"
      @solved="checkAnswer" />
    <MousetrapInput 
      v-if="options.inputMode !== 'midi'"
=======
    <NoteDisplay 
      :currentExercise="currentExercise"
      @play="playNote(currentExercise.value)" />
    <RealDeviceInput 
>>>>>>> paramadeep-master
      @solved="checkAnswer" />
  </div>
</template>

<script>
import ScoreLine from './ScoreLine';
import NoteDisplay from './NoteDisplay';
import FeedbackLine from './FeedbackLine';
<<<<<<< HEAD
import ButtonInput from './ButtonInput';
import KeyboardInput from './KeyboardInput';
import MidiInput from './MidiInput';
import MousetrapInput from './MousetrapInput';
=======
import RealDeviceInput from './RealDeviceInput';
>>>>>>> paramadeep-master

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
<<<<<<< HEAD
    ButtonInput,
    KeyboardInput,
    MidiInput,
    MousetrapInput,
=======
    RealDeviceInput
>>>>>>> paramadeep-master
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
      timeLeft: 0,
      timer: null,
      feedback: 'none',
      sample: null,
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
      return Math.round(this.baseFactor * this.numCorrect * this.numCorrect / this.numAnswers);
    },
    baseFactor(){
      // 20s -> 300, 1min -> 100, 5min -> 20
      return this.options.gameLength ? (6000 / this.options.gameLength) : 0;
    },
    result(){
      return {
        numAnswers: this.numAnswers,
        numCorrect: this.numCorrect,
        numWrong: this.numWrong,
        accuracy: this.accuracy,
        score: this.score
      }
    },
    minBassValue(){
      switch(this.options.difficulty){
        case 'easy':
          return 24;
        case 'normal':
          return 16;
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
          return 57;
        case 'hard':
        default:
          return 65;
      }
    },
    minAltoValue(){
      switch(this.options.difficulty){
        case 'easy':
          return 31;
        case 'normal':
          return 24;
        case 'hard':
        default:
          return 17;
      }
    },
    maxAltoValue(){
      switch(this.options.difficulty){
        case 'easy':
          return 43;
        case 'normal':
          return 48;
        case 'hard':
        default:
          return 55;
      }
    },
    minTenorValue(){
      switch(this.options.difficulty){
        case 'easy':
          return 31;
        case 'normal':
          return 24;
        case 'hard':
        default:
          return 14;
      }
    },
    maxTenorValue(){
      switch(this.options.difficulty){
        case 'easy':
          return 43;
        case 'normal':
          return 48;
        case 'hard':
        default:
          return 52;
      }
    }
  },
  methods: {
    startGame(){
      this.numCorrect = 0;
      this.numWrong = 0;
      this.timeLeft = this.options.gameLength;
      if (this.options.gameLength){
        this.timer = setInterval(() => {
            this.timeLeft -= 1;
            if(this.timeLeft < 0){
              this.onGameFinished();
            }
          }, 1000);
      }
      this.generateNewExercise();
    },
    onExit(){
      clearInterval(this.timer);
      if(this.sample){
        this.sample.pause();
      }
    },
    onGameFinished(){
      this.onExit();
      Statistics.addScore(this.score,
                          this.options.clef,
                          this.options.difficulty,
                          this.options.accidentals);
      this.$emit('gameEnded', this.result); 
    },
    quit(){
      this.onExit();
      this.$emit('gameEnded', null);
    },
    generateNewExercise(){
      let exercise = this.currentExercise;
      while(exercise.value === this.currentExercise.value){
        exercise = this.generateExercise();
      }
      this.currentExercise = exercise;
    },
    generateExercise(){
      const clef = _.sample(this.options.clef);
      const exercise = { clef, value: this.getRandomNoteForClef(clef) };
      switch(this.options.accidentals){
        case 'no':
          exercise.isSharp = false;
          if(Utils.hasAccidental(exercise.value)){
            _.sample([true, false]) ? exercise.value++ : exercise.value--;
          }
          break;
        case 'onlySharp':
          exercise.isSharp = true;
          break;
        case 'onlyFlat':
          exercise.isSharp = false;
          break;
        case 'sharpAndFlat':
          exercise.isSharp = _.sample([true, false])
          break;
      }
      return exercise;
    },
    getRandomNoteForClef(clef){
      switch(clef){
        case 'treble': 
          return _.random(this.minTrebleValue, this.maxTrebleValue);
        case 'bass':
          return _.random(this.minBassValue, this.maxBassValue);
        case 'alto':
          return _.random(this.minAltoValue, this.maxAltoValue);
        case 'tenor':
          return _.random(this.minTenorValue, this.maxTenorValue);
      }
    },
    checkAnswer(value){
      this.playNote(Utils.getNearestNoteOfValue(value, this.currentExercise.value));
      if(value === this.currentExercise.value){
        this.onCorrectAnswer();
        this.generateNewExercise();
      } else {
        this.onWrongAnswer(value);
      }
    },
    onCorrectAnswer(){
      this.numCorrect += 1;
      this.feedback = 'correct';
    },
    onWrongAnswer(wrongValue){
      this.numWrong += 1;
      this.feedback = 'wrong';
      if('vibrate' in navigator) {
        navigator.vibrate(200);
      }
    },
    playNote(value){
      if(!this.options.sound){
        return;
      }
      if(!!this.sample && !this.sample.paused){
        this.sample.pause();
      }
      this.sample = new Audio('static/samples/piano/' + value + '.mp3');
      this.sample.play();
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
  border: none;
  outline: none;
  background-color: lightblue;
  cursor: pointer;
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
