import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import vueEventCalendar from "vue-event-calendar";
import MyAxios from "@/components/MyAxios";

import "@/assets/css/style.css";
import "@/assets/css/override-element-ui.css";
import "@/assets/css/icon/iconfont.css";
import "element-ui/lib/theme-chalk/index.css";
import "vue-event-calendar/dist/style.css";

Vue.use(ElementUI);
Vue.use(MyAxios);
Vue.use(vueEventCalendar, { locale: "zh", color: "skyblue", className: "tbb" });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
