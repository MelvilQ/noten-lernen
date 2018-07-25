<template>
  <div class="last-result-display">
    <h3>Letzte Runde</h3>
    <div class="line">
      Punktzahl: <strong>{{lastResult.score}}</strong>
      </div>
    <div class="line">
      Genauigkeit: {{lastResult.accuracy}} % ({{lastResult.numCorrect}} richtig, {{lastResult.numWrong}} falsch)
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
  background-color: #ddddcc;
  margin-bottom: 15px;
  padding: 5px;
}

h3 {
  margin: 5px 0;
}

.line {
  font-size: 10pt;
}
</style>
