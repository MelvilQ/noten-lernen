import Note, {Accidentals} from '../model/Note'

export default {

  hasAccidental(v) {
    v %= 12;
    return v === 1 || v === 3 || v === 6 || v === 8 || v === 10;
  },

  getNearestNoteOfValue(value, otherNote) {
    let v = value;
    while (otherNote >= v + 6) {
      v += 12;
    }
    return v;
  },

  toLocalizationTag(note)
  {
    var localizationTag = note.noteName;
    if(note.hasAccidental)
    {
      switch (note.accidental)
      {
        case Accidentals.Sharp:
          localizationTag += "Sharp";
          break;
        case Accidentals.Flat:
          localizationTag += "Flat";
          break;
      }
    }
    return localizationTag
  },

  getNoteName(noteValue) {
    var noteNames = this.getNoteNamesArray();
    return noteNames[noteValue];
  },

  getNoteNamesArray() {
    /*
    the identation is supposed to be a 
    visualization of the layout on the piano keyboard
    */

    /* TODO: get rid of this during further reworks */
    return [
      ['C'],
        ['CSharp', 'DFlat'],
      ['D'],
        ['DSharp', 'EFlat'],
      ['E'],
      ['F'],
        ['FSharp', 'GFlat'],
      ['G'],
        ['GSharp', 'AFlat'],
      ['A'],
        ['ASharp', 'BFlat'],
      ['B']
    ];
  }
};
