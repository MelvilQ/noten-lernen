<template>
  <div class="select-option-dropdown">
    <div class="label">{{label}}</div>
    <select :selected="value" @input="select($event.target.value)">
      <option 
        v-for="item in items" 
        :key="item.value"
        :value="item.value">
          {{item.label}}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'SelectOptionDropdown',
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

select {
  margin: 5px;
  width: 100px;
  height: 40px;
  padding-left: 8px;
  border-radius: 10px;
  background-color: white;
  color: black;
  border: 1px solid black;
  cursor: pointer;
  font-size: 10pt;
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

select:hover {
  background-color: lightblue;
}
</style>
