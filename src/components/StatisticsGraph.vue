<template>
	<div class="statistics-graph">
		<h3>Letzte Runden</h3>
		<chartist
		    ratio="history"
		    type="Line"
		    :data="chartData"
		    :options="chartOptions">
		</chartist>
		<div>Rekord: {{statistics.record}}</div>
	</div>
</template>

<script>
import Statistics from '../model/Statistics';

import Chartist from 'chartist';
import 'chartist/'

export default {
	name: 'StatisticsGraph',
	data(){
		return {
			statistics: Statistics
		}
	},
	computed: {
		history(){
			return this.statistics.lastScores;
		},
		chartData(){
			return {
				labels: new Array(this.history.length).map(x => ''),
				series: [this.history]
			};
		},
		chartOptions(){
			return {
			  fullWidth: true,
			  chartPadding: {
			    right: 40
				},
				lineSmooth: false
			};
		}
	}
}
</script>

<style>
@import url("../../node_modules/chartist/dist/chartist.min.css");
</style>
