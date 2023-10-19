<template>
  <div class="menu">
    <div class="start-container">
      <button class="start" @click="$emit('startGame')">{{$t('Start')}}</button>
      <button class="start" @click="$emit('toSettings')">{{$t('settings')}}</Button>
    </div>
    <LastResultDisplay v-if="lastResult" :lastResult="lastResult"/>
    <StatisticsGraph v-if="statistics.lastScores.length >= 2"/>
  </div>
</template>

<script>
import LastResultDisplay from "../components/LastResultDisplay";
import StatisticsGraph from "../components/StatisticsGraph";

import Statistics from "../model/Statistics";
import Options from "../model/Options";

export default {
  name: "Menu",
  components: { LastResultDisplay, StatisticsGraph },
  props: {
    lastResult: Object
  },
  data() {
    return {
      options: Options,
      statistics: Statistics
    };
  },
  watch: {
    "options.language": function(lang) {
      this.$i18n.locale = lang;
    },
    "options.clef": function() {
      this.updateGameType();
    },
    "options.difficulty": function() {
      this.updateGameType();
    },
    "options.accidentals": function() {
      this.updateGameType();
    }
  },
  methods: {
    updateGameType() {
        Statistics.loadStatistics(Options.clef, Options.difficulty, Options.accidentals);
    }
  },
  created() {
    Options.loadOptions();
    Statistics.init();
    Statistics.loadStatistics(Options.clef, Options.difficulty, Options.accidentals);
  }
};
</script>

<style scoped>
.menu {
  max-width: 720px;
  margin: 0 auto;
}

.start-container {
  padding: 15px;
}

button.start {
  width: 100%;
  padding: 20px 10px;
  border-radius: 10px;
  background-color: lightblue;
  font-size: 16pt;
  font-weight: bold;
  cursor: pointer;
  border: none;
  outline: none;
  margin-top: 10px;
}

button.start:focus {
  outline: none;
  background-color: lightblue;
}

button.start:hover {
  background-color: steelblue;
}

button.start:active {
  background-color: yellow;
}

.setting {
  margin-top: 10px;
}
</style>
