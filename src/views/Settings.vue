<template>
    <div class="settings">
        <Button class="back" @click="closeSettings">{{$t('navigateBack')}}</Button>
        <div class="setting">
            <SelectOption :label="$t('ROUND_LENGTH')" :items="gameLengthOptions" v-model="options.gameLength" />
        </div>
        <div class="setting">
            <SelectOption :label="$t('NOTE_INPUT')" :items="inputModeOptions" v-model="options.inputMode" />
        </div>
        <div class="setting">
            <SelectOptionMulti :label="$t('CLEF')" :items="clefOptions" v-bind:selectedItems="options.clef"
                v-on:selectionChanged="options.clef = $event.sort()" :canHaveEmptySelection="false"/>
        </div>
        <div class="setting">
            <SelectOption :label="$t('DIFFICULTY')" :items="difficultyOptions" v-model="options.difficulty" />
        </div>
        <div class="setting">
            <SelectOptionMulti :label="$t('ACCIDENTALS')" :items="accidentalOptions" v-bind:selectedItems="options.accidentals"
            v-on:selectionChanged="options.accidentals = $event.sort()" :canHaveEmptySelection="true" />
        </div>
        <div class="setting">
            <SelectOption :label="$t('SOUND')" :items="onOffOptions" v-model="options.sound" />
        </div>
        <div class="setting">
            <SelectOption :label="$t('VIBRATION')" :items="onOffOptions" v-model="options.vibration" />
        </div>
        <div class="setting">
            <SelectOption :label="$t('DISPLAYCORRECTNOTE')" :items="onOffOptions" v-model="options.displayNote" />
        </div>
        <div class="setting">
            <SelectOptionDropdown :label="$t('LANGUAGE')" :items="languageOptions" v-model="options.language" />
        </div>
    </div>
</template>

<script>
import SelectOption from "../components/SelectOption";
import SelectOptionMulti from "../components/SelectOptionMulti";
import SelectOptionDropdown from "../components/SelectOptionDropdown";
import Options from '../model/Options';

export default {
    name: "Settings",
    components: { SelectOption, SelectOptionMulti, SelectOptionDropdown },
    data() {
        return {
            options: Options,
        };
    },
    computed: {
        gameLengthOptions() {
            return [
                { value: 20, label: this.$t("twentySeconds") },
                { value: 60, label: this.$t("oneMinute") },
                { value: 300, label: this.$t("fiveMinutes") },
                { value: 0, label: this.$t("infinite") }
            ];
        },
        inputModeOptions() {
            return [
                { value: "button", label: this.$t("buttons") },
                { value: "keyboard", label: this.$t("piano") },
                { value: "midi", label: 'MIDI' }
            ];
        },
        clefOptions() {
            return [
                { value: "treble", label: this.$t("trebleClef") },
                { value: "bass", label: this.$t("bassClef") },
                { value: "alto", label: this.$t("altoClef") },
                { value: "tenor", label: this.$t("tenorClef") },
                // { value: "piano", label: this.$t("pianoClef") }
            ];
        },
        difficultyOptions() {
            return [
                { value: "easy", label: this.$t("easy") },
                { value: "normal", label: this.$t("normal") },
                { value: "hard", label: this.$t("hard") }
            ];
        },
        accidentalOptions() {
            return [
                { value: "flat", label: this.$t("flat") },
                { value: "sharp", label: this.$t("sharp") },
            ];
        },
        onOffOptions() {
            return [
                { value: false, label: this.$t("off") },
                { value: true, label: this.$t("on") }
            ];
        },
        languageOptions() {
            return [
                { value: "en", label: "EN" },
                { value: "de", label: "DE" },
                { value: "es", label: "ES" },
                { value: "fr", label: "FR" },
                { value: "it", label: "IT" },
                { value: "pl", label: "PL" },
                { value: "pt", label: "PT" },
                { value: "cz", label: "CZ" },
                { value: "ln", label: "LN" },
                { value: "nl", label: "NL" },
                { value: "hu", label: "HU" },
                { value: "ja", label: "JA" },
            ];
        }
    },
    watch: {
        "options.language": function (lang) {
            this.$i18n.locale = lang;
        }
    },
    methods: {
        closeSettings()
        {
            Options.saveOptions();
            this.$emit('closeSettings');
        },
    },
    created() {
        Options.loadOptions();
    }
};
</script>

<style scoped>
.settings {
    max-width: 720px;
    margin: 0 auto;
}

.back-container {
    padding: 15px;
}

button.back {
    width: 100%;
    padding: 20px 10px;
    border-radius: 10px;
    background-color: lightblue;
    font-size: 16pt;
    font-weight: bold;
    cursor: pointer;
    border: none;
    outline: none;
}

button.back:focus {
    outline: none;
    background-color: lightblue;
}

button.back:hover {
    background-color: steelblue;
}

button.back:active {
    background-color: yellow;
}

.setting {
    margin-top: 10px;
}
</style>

