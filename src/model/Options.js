import * as Lockr from "lockr";

export default {
  inputMode: "button",
  gameLength: 60,
  clef: 'all',

  loadOptions() {
    const loadedOptions = Lockr.get("options");
    if (!loadedOptions) {
      return;
    }
    this.inputMode = loadedOptions.inputMode;
    this.gameLength = loadedOptions.gameLength;
    this.clef = loadedOptions.clef;
  },
  saveOptions() {
    Lockr.set("options", this);
  }
};
