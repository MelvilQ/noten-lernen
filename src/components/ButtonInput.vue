<template>
  <div class="button-input">
    <div v-for="value in 12" :key="value-1" class="button-container" :style="gridParams[value-1]">
      <button @click="solve(value-1)">{{noteNames[value-1]}}</button>
    </div>
  </div>
</template>

<script>
import Utils from '../model/Utils';

export default {
  name: 'ButtonInput',
  props: {
    isSharp: Boolean
  },
  computed: {
    noteNames(){
      if(this.isSharp){
        return ['C', 'Cis', 'D', 'Dis', 'E', 'F', 'Fis', 'G', 'Gis', 'A', 'Ais', 'H'];
      } else {
        return ['C', 'Des', 'D', 'Es', 'E', 'F', 'Ges', 'G', 'As', 'A', 'B', 'H'];
      }
    },
    gridParams(){
      return Array.from(Array(12).keys()).map(v => ({
        'grid-row': Utils.hasAccidental(v) ? 1 : 2,
        'grid-column': (v <= 4 ? v+1 : v+2) + '/ span 2'
      }));
    }
  },
  methods: {
    solve(v) {
      this.$emit('solved', v);
    }
  }
}
</script>

<style scoped>
.button-input {
  display: grid;
}

.button-container {
  height: 50px;
}

button {
  width: 95%;
  height: 95%;
  background-color: lightblue;
  border-radius: 5px;
  border: none;
  outline: none;
  font-weight: bold;
}

button:hover {
  background-color: deepskyblue;
}

button:active {
  background-color: yellow;
}
</style>