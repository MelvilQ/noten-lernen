<template>
  <div class="keyboard-input">
    <div v-for="value in 12" :key="value" class="key" :style="keyStyle[value-1]" @click.stop="solve(value-1)">
    </div>
  </div>
</template>

<script>
import Utils from '../model/Utils';

export default {
  name: 'KeyboardInput',
  computed: {
    keyStyle(){
      return Array.from(Array(12).keys()).map(v => Utils.hasAccidental(v) ? 
      {
        'background-color': 'black',
        height: '65%',
        width: '8%',
        'z-index': 2,
        left: (14.27 * (this.keyPos(v-1)) + 10.27) + '%'
      } : {
        'background-color': 'white',
        height: '100%',
        width: '14.27%',
        'z-index': 1,
        left: (14.27 * this.keyPos(v)) + '%'
      });
    }
  },
  methods: {
    keyPos(v){
      return (v <= 4) ? Math.floor(v / 2) : Math.floor((v+1) / 2)
    },
    solve(v){
      this.$emit('solved', v);
    }
  }
}
</script>

<style scoped>
.keyboard-input {
  position: relative;
  width: 80%;
  height: 150px;
  margin: 0 auto;
}

.key {
  position: absolute;
  top: 0;
  border: solid 1px black;
}
</style>