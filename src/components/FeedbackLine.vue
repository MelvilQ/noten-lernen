<template>
  <div class="feedback-line">
    <span class="feedback correct" v-if="visibleFeedback === 'correct-note'">{{$t('correctExcl')}} - {{ $t(feedbackNote) }}</span>
    <span class="feedback correct" v-if="visibleFeedback === 'correct'">{{$t('correctExcl')}}</span>
    <span class="feedback wrong" v-if="visibleFeedback === 'wrong'">{{$t('wrongExcl')}}</span>
    <span class="feedback dummy" v-if="visibleFeedback === 'none'">dummy</span>
    <span class="feedback dummy" v-if="visibleFeedback === 'none_temp'">dummy_temp</span>
  </div>
</template>

<script>
export default {
  name: 'FeedbackLine',
  data(){
    return {
      visible: true
    };
  },
  computed: {
    visibleFeedback(){
      return this.visible ? this.feedback : 'none_temp';
    }
  },
  props: {
    feedback: String,
    feedbackNote: String,
    uniqueId: Number
  },
  watch: {
    uniqueId(val){
      this.visible = false;
      setTimeout(() => {this.visible = true;}, 0);
    }
  }
}
</script>

<style scoped>
@keyframes feedback {
  0% {
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
}

.feedback {
  text-align: center;
  line-height: 3;
  color: white;
  border-radius: 5px;
  padding: 1px 5px;
  opacity: 0.3;
  animation-name: feedback;
  animation-duration: 0.5s;
  animation-iteration-count: 1;
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