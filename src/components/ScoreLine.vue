<template>
	<div class="score-line">
    <div>
      <div class="score-value">{{timeLeftFormatted}}</div>
      <div class="score-label">ZEIT</div>
    </div>
    <div>
      <div class="score-value">{{numCorrect}}</div>
      <div class="score-label">RICHTIG</div>  
    </div>
    <div>
      <div class="score-value">{{accuracy}}</div>
      <div class="score-label">GENAUIGKEIT</div>  
    </div>
    <div>
      <div class="score-value">{{score}}</div>
      <div class="score-label">PUNKTE</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScoreLine',
  props: {
    result: Object,
    timeLeft: Number
  },
  computed: {
    timeLeftFormatted(){
      var formatterDate = new Date(null);
      formatterDate.setSeconds(this.timeLeft);
      return formatterDate.toISOString().substr(15, 4);
    },
    numCorrect(){
      return this.result.numCorrect;
    },
    accuracy(){
      if(this.result.numCorrect <= 0 && this.result.numWrong <= 0){
        return '0 %';
      }
      return Math.round(100 * this.result.numCorrect / (this.result.numCorrect + this.result.numWrong)) + ' %';
    },
    score(){
      if(this.result.numCorrect <= 0 && this.result.numWrong <= 0){
        return 0;
      }
      return Math.round(100 * this.result.numCorrect * this.result.numCorrect / (this.result.numCorrect + this.result.numWrong));
    },
  }
};
</script>

<style scoped>
.score-line {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.score-value {
  font-size: 15pt;
  color: #2c3e50;
}

.score-label {
  font-size: 8pt;
  color: grey;
}
</style>