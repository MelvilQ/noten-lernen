<template>
  <div class="select-option">
    <div class="label">{{ label }}</div>
    <div class="options-container">
      <div v-for="item in items" :key="item.value" class="value-box"
        :class="{ selected: selectedItems.includes(item.value) }" @click="itemClicked(item.value)">
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectOptionMulti',
  props: ['label', 'selectedItems', 'items', 'canHaveEmptySelection'],
  methods: {
    itemClicked(itemValue) {
      if (!this.selectedItems.includes(itemValue)) {
        //adds a new item to the already selected items
        this.$emit('selectionChanged', [...this.selectedItems, itemValue]);
      }
      else if (this.selectedItems.length > (this.canHaveEmptySelection ? 0 : 1)) {
        //tries to remove an item from the selected
        this.$emit('selectionChanged', this.selectedItems.filter(v => v !== itemValue));
      }
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
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
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
