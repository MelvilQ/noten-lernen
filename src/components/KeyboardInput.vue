<template>
  <div class="keyboard-input">
    <div 
      v-for="value in 12" 
      :key="value" 
      class="key"
      :class="{black: isBlack(value-1), white: !isBlack(value-1)}" 
      :style="keyStyle[value-1]" 
      @click.stop="solve(value-1)">
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
        // black keys
        height: '65%',
        width: '8%',
        'z-index': 2,
        left: (14.27 * (this.keyPos(v-1)) + 10.27) + '%'
      } : {
        // white keys
        height: '100%',
        width: '14.27%',
        'z-index': 1,
        left: (14.27 * this.keyPos(v)) + '%'
      });
    }
  },
  methods: {
    isBlack(v){
      return Utils.hasAccidental(v);
    },
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
  cursor: pointer;
  user-select: none;
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.white {
  background-color: white;
}

.white:hover {
  background-color: #dddddd;
}

.white:focus {
  background-color: white;
}

.black {
  background-color: black;
}

.black:hover {
  background-color: #333333;
}

black:focus {
  background-color: black;
}

.key:active {
  background-color: yellow;
}
</style>