<template>
	<div class="statistics-graph">
		<chartist
	    ratio="history"
	    type="Line"
	    :data="chartData"
	    :options="chartOptions">
		</chartist>
		<div class="grid-container">
            <div>
                <span class="record">{{$t('record')}}: {{statistics.record}}</span>
                <button class="reset" @click="showRecordModal" v-if="statistics.record > 2">❌</button>
				<modal @executeAction="resetRecord" v-if="showRecordModalProp" @closeModal="showRecordModalProp = false" :title="this.$i18n.t('resetRecordModalHeading')" :text="this.$i18n.t('resetModalText')" :okButtonText="this.$i18n.t('delete')" :cancelButtonText="this.$i18n.t('cancel')"/>
            </div>
            <div>
                <span class="record">{{$t('history')}}: </span>
                <button class="reset" @click="resetHistory" v-if="statistics.lastScores.length >= 2">❌</button>
				<modal @executeAction="resetHistory" v-if="showRecordModalProp" @closeModal="showRecordModalProp = false" :title="this.$i18n.t('resetHistoryModalHeading')" :text="this.$i18n.t('resetModalText')" :okButtonText="this.$i18n.t('delete')" :cancelButtonText="this.$i18n.t('cancel')"/>
            </div>
		</div>
	</div>
</template>

<script>
import Statistics from '../model/Statistics';

import Chartist from 'chartist';
import 'chartist/dist/chartist.min.css';
import Modal from './Modal.vue';

export default {
	name: 'StatisticsGraph',
	components: { Modal },
	data(){
		return {
			statistics: Statistics,
			showRecordModalProp: false,
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
	},
	methods: {
		resetRecord(){
			Statistics.resetRecord();
		},
		resetHistory(){
			Statistics.resetHistory();
		},
		showRecordModal() {
			this.showRecordModalProp = !this.showRecordModalProp;
		}
	}
}
</script>

<style scoped>
.record {
  font-size: 11pt;
}

button.reset {
  border: none;
  outline: none;
  cursor: pointer;
  background-color: white;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 5px;
}
</style>
