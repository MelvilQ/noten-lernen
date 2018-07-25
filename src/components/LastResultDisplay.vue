<template>
  <div class="last-result-display">
    <h3>Letzte Runde</h3>
    <div>Punktzahl: {{lastResult.score}}</div>
    <div>Genauigkeit: {{lastResult.accuracy}} %</div>
    <div>Richtig: {{lastResult.numCorrect}}</div>
		<div>Fehler: {{lastResult.numWrong}}</div>
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
</style>
