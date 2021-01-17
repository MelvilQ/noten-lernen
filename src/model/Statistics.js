import * as Lockr from "lockr";

export default {
  lastScores: [],
  record: 0,
  clef: [],
  difficulty: '',
  accidentals: '',
  legacyScores: [],
  legacyRecord: 0,

  init() {
    this.legacyScores = Lockr.get("lastScores", []);
    this.legacyRecord = Lockr.get("record", 0);
  },
  getScoresKey(clef, difficulty, accidentals) {
    /* the basic idea is to generate an unique key based on the active user settings.
     * Only the three types of settings that make a difference in overall game
     * difficulty/type are considered. */
    let scoresKey = "lastScores__";
    return scoresKey.concat(clef.join('_'), '__',  difficulty, '__',  accidentals);
  },
  getRecordKey(clef, difficulty, accidentals) {
    /* the basic idea is to generate an unique key based on the active user settings.
     * Only the three types of settings that make a difference in overall game
     * difficulty/type are considered. */
    let scoresKey = "record__";
    return scoresKey.concat(clef.join('_'), '__',  difficulty, '__',  accidentals);
  },
  loadStatistics(clef, difficulty, accidentals) {
    // Save arguments for potential later use.
    this.clef = clef;
    this.difficulty = difficulty;
    this.accidentals = accidentals;

    let scoresKey = this.getScoresKey(clef, difficulty, accidentals);
    let recordKey = this.getRecordKey(clef, difficulty, accidentals);

    /* Use legacy scores and record as a fallback/starting point if the respective
     * scoresKey has no dedicated entry yet.*/
    this.lastScores = Lockr.get(scoresKey, this.legacyScores);
    this.record = Lockr.get(recordKey, this.legacyRecord);
  },
  saveStatistics(clef, difficulty, accidentals) {
    // Save arguments for potential later use.
    this.clef = clef;
    this.difficulty = difficulty;
    this.accidentals = accidentals;

    let scoresKey = this.getScoresKey(clef, difficulty, accidentals);
    let recordKey = this.getRecordKey(clef, difficulty, accidentals);
    Lockr.set(scoresKey, this.lastScores);
    Lockr.set(recordKey, this.record);
  },
  addScore(score, clef, difficulty, accidentals) {
    this.lastScores.push(score);
    if (this.lastScores.length > 25) {
      this.lastScores.shift();
    }
    if (score > this.record) {
      this.record = score;
    }
    this.saveStatistics(clef, difficulty, accidentals);
  },
  resetRecord() {
    this.record = 0;
    this.saveStatistics(this.clef, this.difficulty, this.accidentals);
  },
  resetHistory() {
    this.lastScores = [];
    this.saveStatistics(this.clef, this.difficulty, this.accidentals);
  }
};
