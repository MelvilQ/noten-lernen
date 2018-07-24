<template>
  <div class="select-option">
    <div class="label">{{label}}</div>
    <div class="options-container">
      <div 
        v-for="item in items" 
        :key="item.value"
        class="value-box" 
        :class="{selected: value === item.value}"
        @click="select(item.value)">
          {{item.label}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectOption',
  props: ['label', 'value', 'items'],
  methods: {
    select(value){
      this.$emit('input', value);
    }
  }
}
</script>

<style>
.label {
  font-size: 9pt;
  color: black;
}

.options-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 5px;
}

.value-box {
  margin: 5px;
  width: 100px;
  height: 40px;
  border-radius: 10px;
  background-color: white;
  color: gray;
  border: 1px solid gray;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10pt;
  user-select: none;
}

.value-box:hover {
  color: black;
  border: 1px solid black;
}

.selected {
  background-color: lightblue;
  color: black;
  border: 1px solid black;
}

.selected:hover {
  background-color: lightblue;
}
</style>
