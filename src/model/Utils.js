export default {
  hasAccidental(v) {
    v %= 12;
    return v === 1 || v === 3 || v === 6 || v === 8 || v === 10;
  }
};
