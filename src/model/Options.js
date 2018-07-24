import * as Lockr from "lockr";

export default {
  inputMode: "button",
  gameLength: 60,
  clef: "all",
  difficulty: "easy",
  accidentals: "no",

  loadOptions() {
    const loadedOptions = Lockr.get("options");
    if (!loadedOptions) {
      return;
    }
    Object.assign(this, loadedOptions);
  },
  saveOptions() {
    Lockr.set("options", this);
  }
};
