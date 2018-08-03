import Vue from "vue";
import VueI18n from "vue-i18n";
import strings from "./resources/strings";
import App from "./App";
import Options from "./model/Options";

Vue.config.productionTip = false;

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}

Vue.use(require("vue-chartist"));
Vue.use(VueI18n);

Options.loadOptions();
Options.language = Options.language || navigator.language.substr(0, 2);
const i18n = new VueI18n({
  locale: Options.language,
  fallbackLocale: "en",
  messages: strings
});

new Vue({
  i18n,
  el: "#app",
  components: { App },
  template: "<App/>"
});
