<template>
  <div class="keyboard-input">
    <button 
      v-for="value in 13" 
      :key="value" 
      class="key"
      :class="{black: isBlack(value-1), white: !isBlack(value-1)}" 
      :style="keyStyle[value-1]" 
      @click.stop="inputNote(value-1)" />
  </div>
</template>

<script>
import Utils from '../model/Utils';
import InputHelper from '../model/InputHelper';

export default {
  name: 'KeyboardInput',
  computed: {
    keyStyle(){
      return Array.from(Array(13).keys()).map(v => Utils.hasAccidental(v) ? 
      {
        // black keys
        height: '65%',
        width: '7.5%',
        'z-index': 2,
        left: (12.5 * (this.keyPos(v-1)) + 8.75) + '%'
      } : {
        // white keys
        height: '100%',
        width: '12.5%',
        'z-index': 1,
        left: (12.5 * this.keyPos(v)) + '%'
      });
    }
  },
  methods: {
    isBlack(v){
      return Utils.hasAccidental(v);
    },
    keyPos(v){
      return (v <= 4) ? Math.floor(v / 2) : (v <= 11) ? Math.floor((v+1) / 2) : 7;
    },
    inputNote(v){
      
      var inputNotes = InputHelper.getInputNotes();
      /*
      the last key on the rendered keyboard (key 13)
      is the same as the first. Thus we wrap around 
      the array access index
      */
      this.$emit('noteInput', inputNotes[v%12]);
    }
  }
}
</script>

<style scoped>
.keyboard-input {
  position: relative;
  width: 92%;
  height: 150px;
  margin: 0 auto;
}

.key {
  position: absolute;
  top: 0;
  padding: 0;
  box-sizing: content-box;
  border: solid 1px black;
  cursor: pointer;
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
  outline: none;
}

.black {
  background-color: black;
}

.black:hover {
  background-color: #333333;
}

.black:focus {
  background-color: black;
  outline: none;
}

.key:active {
  background-color: yellow;
}
</style>