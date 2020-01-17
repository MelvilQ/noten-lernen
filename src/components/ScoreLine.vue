<template>
	<div class="score-line">
    <div v-if="!isInfiniteRound">
      <div class="score-value">{{timeLeftFormatted}}</div>
      <div class="score-label">{{$t('TIME')}}</div>
    </div>
    <div>
      <div class="score-value">{{result.numCorrect}}</div>
      <div class="score-label">{{$t('CORRECT')}}</div>  
    </div>
    <div>
      <div class="score-value">{{result.accuracy}} %</div>
      <div class="score-label">{{$t('ACCURACY')}}</div>  
    </div>
    <div v-if="!isInfiniteRound">
      <div class="score-value">{{result.score}}</div>
      <div class="score-label">{{$t('SCORE')}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScoreLine',
  props: {
    result: Object,
    timeLeft: Number,
    isInfiniteRound: Boolean,
  },
  computed: {
    timeLeftFormatted(){
      var formatterDate = new Date(null);
      formatterDate.setSeconds(this.timeLeft);
      return formatterDate.toISOString().substr(15, 4);
    }
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