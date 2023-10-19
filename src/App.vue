<template>
  <div id="app">
    <Menu v-if="page === 'menu'" @startGame="navigateToGame" :lastResult="lastResult" @toSettings="navigateToSettings" />
    <Settings v-if="page === 'settings'" @closeSettings="navigateToMenu" />
    <Game v-if="page === 'game'" @gameEnded="navigateToMenu" />
  </div>
</template>

<script>
import Menu from './views/Menu';
import Game from './views/Game';
import Settings from './views/Settings';

export default {
  name: 'App',
  components: {
    Menu,
    Settings,
    Game,
  },
  data() {
    return {
      page: 'menu',
      lastResult: null
    }
  },
  methods: {
    navigateToMenu(result) {
      this.lastResult = result;
      this.page = 'menu';
    },
    navigateToGame() {
      this.page = 'game';
    },
    navigateToSettings() {
      this.page = 'settings';
    }
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  user-select: none;
  height: 100%;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}
</style>
