/*
    Reference for key names on an 88 Keypiano
    See: http://www.sengpielaudio.com/calculator-notenames.htm
 */
export default class Note {

    constructor(note, octave, accidental = Accidentals.None) {
        this.note = note;
        this.accidental = accidental;
        this.octave = octave;
        this.value = Note.__calculateValue(note, accidental, octave);
        if (this.value < 1 || this.value > 88) {
            throw new Error(`The note ${note.toString()}${accidental.toString()}${octave.toString()}(${this.value.toString()}) is out of range`)
        }
    }

    get hasAccidental() {
        return !(this.accidental === Accidentals.None);
    }

    get noteName() {
        switch (this.note) {
            case Notes.C: return 'C';
            case Notes.D: return 'D';
            case Notes.E: return 'E';
            case Notes.F: return 'F';
            case Notes.G: return 'G';
            case Notes.A: return 'A';
            case Notes.B: return 'B'
            default:
                throw new Error(`Unrecognized note letter encountered: ${this.note}`)
        }
    }
    equalsAbsolute(otherNote) {
        return otherNote.value === this.value;
    }

    equalsRelative(otherNote) {
        return otherNote.note === this.note && otherNote.accidental === this.accidental;
    }

    static __calculateValue(note, accidental, octave) {

        /*
        we start from the piano key C0 even though
        that is not part of the regular piano, 
        but that makes calculations easier. 
        Every octave adds an offset of 12 and each note
        adds its own offset inside of its octave the octave
        */

        const NumberOfNotesInOctave = 12;

        let c0NoteValue = -8;
        let noteValue = c0NoteValue + octave * NumberOfNotesInOctave;
        noteValue += Note.__noteToOffsetInOctave(note);
        noteValue += Note.__accidentalToOffset(accidental);

        return noteValue;
    }

    static __noteToOffsetInOctave(note) {
        switch (note) {
            case Notes.C:
                return 0;
            case Notes.D:
                return 2;
            case Notes.E:
                return 4;
            case Notes.F:
                return 5;
            case Notes.G:
                return 7;
            case Notes.A:
                return 9;
            case Notes.B:
                return 11;
            default:
                break;
        }
    }

    static __accidentalToOffset(accidental) {
        switch(accidental)
        {
            case(Accidentals.Flat):
                return -1;
            case(Accidentals.None):
                return 0;
            case(Accidentals.Sharp):
                return 1;
        }
    }

    static get NotesInOctave()
    {
        pianoRange = this.PianoNoteRange;
        return this.PianoNoteRange.filter(note => note.octave == 1);
    }

    static get PianoNoteRange() {
        if (!this._pianoNoteRange) {
            let noteArray = [];
            /*
                first 5 notes and last note have special handling as theire 
                full octave is not present.
            */
            noteArray.push(new Note(Notes.A, 0, Accidentals.None))
            noteArray.push(new Note(Notes.A, 0, Accidentals.Sharp))
            noteArray.push(new Note(Notes.B, 0, Accidentals.Flat))
            noteArray.push(new Note(Notes.B, 0, Accidentals.None))
            noteArray.push(new Note(Notes.B, 0, Accidentals.Sharp))

            let notesInOctave = [
                Notes.C,
                Notes.D,
                Notes.E,
                Notes.F,
                Notes.G,
                Notes.A,
                Notes.B,
            ]
            let accidentals = [
                Accidentals.Flat,
                Accidentals.None,
                Accidentals.Sharp
            ]

            /* adding all notes in the octaves 1 -> 7 */
            for (let octave = 1; octave <= 7; octave++) {
                notesInOctave.forEach(note => {
                    accidentals.forEach(accidental => {
                        noteArray.push(new Note(note, octave, accidental));
                    })
                });
            }

            noteArray.push(new Note(Notes.C, 8, Accidentals.Flat));
            noteArray.push(new Note(Notes.C, 8, Accidentals.None));
            this._pianoNoteRange = noteArray;
        }
        return this._pianoNoteRange;
    }
}


export const Notes = Object.freeze({
    C: Symbol("C"),
    D: Symbol("D"),
    E: Symbol("E"),
    F: Symbol("F"),
    G: Symbol("G"),
    A: Symbol("A"),
    B: Symbol("B"),
});

export const Accidentals = Object.freeze({
    Flat: Symbol("Flat"),
    None: Symbol("None"),
    Sharp: Symbol("Sharp"),
    Natural: Symbol("Natural")
});