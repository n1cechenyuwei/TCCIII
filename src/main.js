import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import MyAxios from "@/components/MyAxios";
import store from "./store";
import ElementUI from "element-ui";
// import G2 from "@antv/g2";

import "@/assets/css/style.css";
import "@/assets/css/override-element-ui.css";
import "@/assets/css/icon/iconfont.css";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);
// Vue.use(G2);
Vue.use(MyAxios);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
