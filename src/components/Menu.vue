<template>
	<div class="menu">
		<div class="start-container">
			<button class="start" @click="startGame">START</button>
		</div>
		<div class="settings">
			<h3>Optionen</h3>
			<div class="setting">
				<SelectOption label="RUNDENLÄNGE" :items="gameLengthOptions" v-model="options.gameLength" />
			</div>
			<div class="setting">
				<SelectOption label="NOTENEINGABE" :items="inputModeOptions" v-model="options.inputMode" />
			</div>
		</div>
		<StatisticsGraph v-if="statistics.lastScores.length >= 2" />
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
.start-container {
  padding: 20px;
}

button.start {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  background-color: lightblue;
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
</style>