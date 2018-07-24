<template>
	<div class="menu">
		<div class="start-container">
			<button class="start" @click="startGame">START</button>
		</div>
		<StatisticsGraph v-if="statistics.lastScores.length" />
		<div class="settings">
			<h3>Optionen</h3>
			<div class="setting">
				<SelectOption label="RUNDENLÄNGE" :items="gameLengthOptions" v-model="options.gameLength" />
			</div>
			<div class="setting">
				<SelectOption label="NOTENEINGABE" :items="inputModeOptions" v-model="options.inputMode" />
			</div>
			<div class="setting">
				<SelectOption label="NOTENSCHLÜSSEL" :items="clefOptions" v-model="options.clef" />
			</div>
			<div class="setting">
				<SelectOption label="SCHWIERIGKEITSGRAD" :items="difficultyOptions" v-model="options.difficulty" />
			</div>
			<div class="setting">
				<SelectOption label="VORZEICHEN" :items="accidentalOptions" v-model="options.accidentals" />
			</div>
		</div>
	</div>
</template>

<script>
import SelectOption from './SelectOption';
import StatisticsGraph from './StatisticsGraph';

import Options from '../model/Options';
import Statistics from '../model/Statistics';

export default {
	name: 'Menu',
	components: { SelectOption, StatisticsGraph },
	data(){
		return {
			options: Options,
			statistics: Statistics
		}
	},
	computed: {
		gameLengthOptions(){
			return [
				{value: 20, label: '20 Sekunden'}, 
				{value: 60, label: '1 Minute'}, 
				{value: 300, label: '5 Minuten'}
			];
		},
		inputModeOptions(){
			return [
				{value: 'button', label:'Buttons'},
				{value: 'keyboard', label: 'Klaviatur'}
			];
		},
		clefOptions() {
			return [
				{value: 'all', label: 'Beide'},
				{value: 'treble', label: 'Violinschlüssel'},
				{value: 'bass', label: 'Bassschlüssel'}
			];
		},
		difficultyOptions() {
			return [
				{value: 'easy', label: 'Leicht'},
				{value: 'normal', label: 'Mittel'},
				{value: 'hard', label: 'Schwer'}
			];
		},
		accidentalOptions() {
			return [
				{value: 'no', label: 'Keine'},
				{value: 'onlySharp', label: '♯'},
				{value: 'onlyFlat', label: '♭'},
				{value: 'both', label: '♯ und ♭'}
			]
		}
	},
	methods: {
		startGame(){
			Options.saveOptions();
			this.$emit('startGame');
		}
	},
	created(){
		Options.loadOptions();
		Statistics.loadStatistics();
	}
}
</script>

<style scoped>
.menu {
  max-width: 720px;
  margin: 0 auto;
}

.start-container {
  padding: 20px;
}

button.start {
  width: 100%;
  padding: 20px 10px;
  border-radius: 10px;
  background-color: lightblue;
  font-size: 16pt;
  font-weight: bold;
  border: none;
  outline: none;
}

button.start:focus {
  outline: none;
  background-color: lightblue;
}

button.start:hover {
  background-color: deepskyblue;
}

button.start:active {
  background-color: yellow;
}

.setting {
  margin-top: 10px;
}
</style>