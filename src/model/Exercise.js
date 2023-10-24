export default class Exercise {
    constructor(note, clef) {
        this.note = note;
        this.clef = clef;
    }
    get clefName() {
        switch (this.clef) {
            case (Clefs.Treble):
                return "treble";
            case (Clefs.Bass):
                return "bass";
            case (Clefs.Alto):
                return "alto";
            case (Clefs.Tenor):
                return "tenor";
        }
    }
    get noteName(){
        return this.note.noteName;
    }
    static minBassValue(difficulty) {
        switch (difficulty) {
            case 'easy':
                return 28;
            case 'normal':
                return 20;
            case 'hard':
            default:
                return 11;
        }
    }
    static maxBassValue(difficulty) {
        switch (difficulty) {
            case 'easy':
                return 40;
            case 'normal':
                return 40;
            case 'hard':
            default:
                return 49;
        }
    }
    static minTrebleValue(difficulty) {
        switch (difficulty) {
            case 'easy':
                return 40;
            case 'normal':
                return 40;
            case 'hard':
            default:
                return 32;
        }
    }
    static maxTrebleValue(difficulty) {
        switch (difficulty) {
            case 'easy':
                return 52;
            case 'normal':
                return 61;
            case 'hard':
            default:
                return 69;
        }
    }
    static minAltoValue(difficulty) {
        switch (difficulty) {
            case 'easy':
                return 35;
            case 'normal':
                return 28;
            case 'hard':
            default:
                return 21;
        }
    }
    static maxAltoValue(difficulty) {
        switch (difficulty) {
            case 'easy':
                return 47;
            case 'normal':
                return 52;
            case 'hard':
            default:
                return 59;
        }
    }
    static minTenorValue(difficulty) {
        switch (difficulty) {
            case 'easy':
                return 35;
            case 'normal':
                return 28;
            case 'hard':
            default:
                return 18;
        }
    }
    static maxTenorValue(difficulty) {
        switch (difficulty) {
            case 'easy':
                return 47;
            case 'normal':
                return 52;
            case 'hard':
            default:
                return 56;
        }
    }
}

export const Clefs = Object.freeze({
    Treble: Symbol("Treble"),
    Bass: Symbol("Bass"),
    Alto: Symbol("Alto"),
    Tenor: Symbol("Tenor"),
});
