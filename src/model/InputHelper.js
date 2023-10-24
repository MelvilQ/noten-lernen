import Note, {Notes, Accidentals} from './Note';
export default class InputHelpers
{
    
    static getInputNotes()
    {
        /* These are the note groups that should be issued by the input views when a certain button is pressed */
        const inputNoteOctave = 1;
        return [
            [new Note(Notes.C,) ],
                [new Note(Notes.C,inputNoteOctave,Accidentals.Sharp), new Note(Notes.D,inputNoteOctave,Accidentals.Flat)],
            [new Note(Notes.D,inputNoteOctave)],
                [new Note(Notes.D,inputNoteOctave,Accidentals.Sharp), new Note(Notes.E,inputNoteOctave,Accidentals.Flat)],
            [new Note(Notes.E,inputNoteOctave)],
            [new Note(Notes.F,inputNoteOctave)],
                [new Note(Notes.F,inputNoteOctave,Accidentals.Sharp), new Note(Notes.G,inputNoteOctave,Accidentals.Flat)],
            [new Note(Notes.G,inputNoteOctave)],
                [new Note(Notes.G,inputNoteOctave,Accidentals.Sharp), new Note(Notes.A,inputNoteOctave,Accidentals.Flat)],
            [new Note(Notes.A,inputNoteOctave)],
                [new Note(Notes.A,inputNoteOctave,Accidentals.Sharp), new Note(Notes.B,inputNoteOctave,Accidentals.Flat)],
            [new Note(Notes.B,inputNoteOctave)]
          ];
    }
}