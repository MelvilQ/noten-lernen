<template>
  <div class="feedbackNote-line">
    <span class="feedbackNote note" v-if="visibleFeedback !== 'none'">{{ $t(feedbackNote) }}</span>
  </div>
</template>

<script>
export default {
  name: 'FeedbackLineNote',
  data(){
    return {
      visible: true
    };
  },
  computed: {
    visibleFeedback(){
      return this.visible ? this.feedbackNote : 'none';
    }
  },
  props: {
    feedbackNote: String
  },
  watch: {
    feedbackNote(val){
      this.visible = false;
      setTimeout(() => {this.visible = true;}, 0);
    }
  }
}
</script>

<style scoped>
@keyframes feedbackNote {
  0% {
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.feedbackNote {
  text-align: center;
  line-height: 3;
  color: white;
  border-radius: 5px;
  padding: 1px 5px;
  opacity: 0;
  animation-name: feedbackNote;
  animation-duration: 0.5s;
  animation-iteration-count: 1;
}

.note {
  background-color: black;
  font-size: 1.2em;
}

</style>