<template>
  <div class="button-input">
    <div v-for="value in 12" :key="value-1" class="button-container" :style="gridParams[value-1]">
      <button @click="solve(value + 3)">{{$t(noteNames[value-1])}}</button>
    </div>
  </div>
</template>

<script>
import Utils from '../model/Utils';
import Note from '../model/Note';
import InputHelper from '../model/InputHelper';

export default {
  name: 'ButtonInput',
  computed: {
    inputNoteGroups(){
      return InputHelper.getInputNotes();
    },
    gridParams(){
      return Array.from(Array(12).keys()).map(v => (
      {
        'grid-row': Utils.hasAccidental(v) ? 1 : 2,
        'grid-column': (v <= 4 ? v+1 : v+2) + '/ span 2'
      }
      ));
    },
    noteNames() {
      var inputNoteGroupsLocal = InputHelper.getInputNotes();
      return inputNoteGroupsLocal.map((noteGroup) => {
        if(noteGroup.length == 1)
        {
          return this.$t(Utils.toLocalizationTag(noteGroup[0]));
        }
        return `${this.$t(Utils.toLocalizationTag(noteGroup[0]))}/${this.$t(Utils.toLocalizationTag(noteGroup[1]))}`;
      });
    }
  },
  methods: {
    solve(v) {
      var notesWithValueEqualToInputedValue = Note.PianoNoteRange.filter(note => note.value === v);
      this.$emit('noteInput', notesWithValueEqualToInputedValue);
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