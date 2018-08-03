<template>
  <div class="last-result-display">
    <h3>{{$t('lastRound')}}</h3>
    <div class="line">
      {{$t('score')}}: <strong>{{lastResult.score}}</strong>
      </div>
    <div class="line">
      {{$t('accuracy')}}: {{lastResult.accuracy}} % 
      ({{lastResult.numCorrect}} {{$t('correct')}}, {{lastResult.numWrong}} {{$t('wrong')}})
    </div>
  </div>
</template>

<script>
export default {
  name: 'LastResultDisplay',
  props: {
    lastResult: Object
  }
}
</script>

<style scoped>
.last-result-display {
  background-color: #dddddd;
  margin-bottom: 15px;
  padding: 5px;
}

h3 {
  margin: 5px 0;
}

.line {
  font-size: 10pt;
  margin: 2px;
}
</style>
