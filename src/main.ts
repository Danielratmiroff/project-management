import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./assets/css/tailwind.css";
import VCalendar from "v-calendar";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import VueTippy, { TippyComponent } from "vue-tippy";

Vue.use(VueTippy);
Vue.component("tippy", TippyComponent);

import "tippy.js/themes/light.css";
import "tippy.js/themes/light-border.css";
import "tippy.js/themes/google.css";
import "tippy.js/themes/translucent.css";

Vue.config.productionTip = false;
Vue.component("v-select", vSelect);
Vue.use(VCalendar);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
