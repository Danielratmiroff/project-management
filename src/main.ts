import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./assets/css/tailwind.css";
import VCalendar from "v-calendar";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
Vue.config.productionTip = false;
Vue.component("v-select", vSelect);
Vue.use(VCalendar, {
  componentPrefix: "vc", // Use <vc-calendar /> instead of <v-calendar />
  // ...other defaults
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
