<template>
</template>

<script>
export default {
  name: 'MousetrapInput',
  methods: {
    initMousetrap(){
      this.$mousetrap.bind('y', () => this.solve(0));
      this.$mousetrap.bind('s', () => this.solve(1));
      this.$mousetrap.bind('x', () => this.solve(2));
      this.$mousetrap.bind('d', () => this.solve(3));
      this.$mousetrap.bind('c', () => this.solve(4));
      this.$mousetrap.bind('v', () => this.solve(5));
      this.$mousetrap.bind('g', () => this.solve(6));
      this.$mousetrap.bind('b', () => this.solve(7));
      this.$mousetrap.bind('h', () => this.solve(8));
      this.$mousetrap.bind('n', () => this.solve(9));
      this.$mousetrap.bind('j', () => this.solve(10));
      this.$mousetrap.bind('m', () => this.solve(11));

      this.$mousetrap.bind(',', () => this.solve(0));
      this.$mousetrap.bind('l', () => this.solve(1));
      this.$mousetrap.bind('.', () => this.solve(2));
      this.$mousetrap.bind('ö', () => this.solve(3));
      this.$mousetrap.bind('-', () => this.solve(4));

      this.$mousetrap.bind('q', () => this.solve(0));
      this.$mousetrap.bind('2', () => this.solve(1));
      this.$mousetrap.bind('w', () => this.solve(2));
      this.$mousetrap.bind('3', () => this.solve(3));
      this.$mousetrap.bind('e', () => this.solve(4));
      this.$mousetrap.bind('r', () => this.solve(5));
      this.$mousetrap.bind('5', () => this.solve(6));
      this.$mousetrap.bind('t', () => this.solve(7));
      this.$mousetrap.bind('6', () => this.solve(8));
      this.$mousetrap.bind('z', () => this.solve(9));
      this.$mousetrap.bind('7', () => this.solve(10));
      this.$mousetrap.bind('u', () => this.solve(11));

      this.$mousetrap.bind('i', () => this.solve(0));
      this.$mousetrap.bind('9', () => this.solve(1));
      this.$mousetrap.bind('o', () => this.solve(2));
      this.$mousetrap.bind('0', () => this.solve(3));
      this.$mousetrap.bind('p', () => this.solve(4));
      this.$mousetrap.bind('ü', () => this.solve(5));
      this.$mousetrap.bind('+', () => this.solve(7));
    },
    solve(v){
      this.$emit('solved', v);
    }
  },
  mounted(){
    this.initMousetrap();
  }
}
</script>

