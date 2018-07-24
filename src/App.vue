<template>
  <div id="app">
    <Menu v-if="page === 'menu'" @startGame="startGame" />
    <Game v-if="page === 'game'" @gameEnded="returnToMenu" />
  </div>
</template>

<script>
import Menu from './components/Menu';
import Game from './components/Game';

export default {
  name: 'App',
  components: {
    Menu,
    Game,
  },
  data(){
    return {
      page: 'menu'
    }
  },
  methods: {
    returnToMenu(){
      this.page = 'menu';
    },
    startGame(){
      this.page = 'game';
    }
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
