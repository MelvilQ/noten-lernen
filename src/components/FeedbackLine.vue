<template>
  <div class="feedback-line">
    <span class="feedback correct" v-if="feedback.showCorrectFeedback">Richtig!</span>
    <span class="feedback wrong" v-else-if="feedback.showWrongFeedback">Falsch!</span>
    <span class="feedback dummy" v-else>dummy</span>
  </div>
</template>

<script>
export default {
  name: 'FeedbackLine',
  props: {
    feedback: Object
  }
}
</script>

<style scoped>
.feedback {
  text-align: center;
  line-height: 3;
  color: white;
  user-select: none;
  border-radius: 5px;
  padding: 1px 5px;
}

.correct {
  background-color: green;
}

.wrong {
  background-color: red;
}

.dummy {
  background-color: white;
}
</style>