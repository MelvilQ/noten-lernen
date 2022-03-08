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

  getNoteName(noteValue, isSharp) {
    var noteNames = this.getNoteNamesArray(isSharp);
    return noteNames[noteValue];
  },

  getNoteNamesArray(isSharp){
      if(isSharp){
        return [
          'C', 'CSharp', 
          'D', 'DSharp', 
          'E', 
          'F', 'FSharp', 
          'G', 'GSharp', 
          'A', 'ASharp', 
          'B'
        ];
      } else {
        return [
          'C', 'DFlat', 
          'D', 'EFlat', 
          'E', 
          'F', 'GFlat', 
          'G', 'AFlat', 
          'A', 'BFlat', 
          'B'
        ];
      }
  }
};
