import * as Lockr from "lockr";

export default {
  lastScores: [],
  record: 0,

  loadStatistics() {
    this.lastScores = Lockr.get("lastScores", []);
    this.record = Lockr.get("record", 0);
  },
  saveStatistics() {
    Lockr.set("lastScores", this.lastScores);
    Lockr.set("record", this.record);
  },
  addScore(score) {
    this.lastScores.push(score);
    if (this.lastScores.length > 25) {
      this.lastScores.shift();
    }
    if (score > this.record) {
      this.record = score;
    }
    this.saveStatistics();
  },
  resetRecord() {
    this.record = 0;
    this.saveStatistics();
  }
};
