<template>
  <div class="button-input">
    <div v-for="value in 12" :key="value-1" class="button-container" :style="gridParams[value-1]">
      <button @click="solve(value-1)">{{$t(noteNames[value-1])}}</button>
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
      return Utils.getNoteNamesArray(this.isSharp);
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
  grid-template-columns: repeat(14, 1fr);
}

.button-container {
  height: 50px;
}

button {
  width: 95%;
  height: 95%;
  background-color: lightblue;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  outline: none;
  font-weight: bold;
}

button:hover {
  background-color: steelblue;
}

button:focus {
  background-color: lightblue;
}

button:active {
  background-color: yellow;
}
</style>