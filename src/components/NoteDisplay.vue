<template>
  <div id="note-display"></div>
</template>

<script>
import abcjs from 'abcjs';

export default {
  name: 'NoteDisplay',
  props: {
    abc: String
  },
  watch: {
    abc(value){
      abcjs.renderAbc('note-display', this.abc, {staffwidth: 200, scale: 3});
    }
  }
}
</script>

<style>
#note-display {
  margin: 0 auto;
  min-height: 340px;
  max-height: 340px;
}
</style>