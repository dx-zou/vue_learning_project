/* eslint-disable semi */
import Vue from "vue";
import App from "./App.vue";
import store from "./store/index";
import ElementUI from "element-ui";
import router from "./route/index";
import "./http/request";
import "@/utils/toolFunctions";
import animated from "animate.css";
import NProgress from "nprogress";
import JsonExcel from "vue-json-excel";
import "./http/api";
import components from "./components";
import "element-ui/lib/theme-chalk/index.css";
import "./styles/common.scss";
import "nprogress/nprogress.css";
import "@/icons"; // svg 图标
import "@/utils/setRem";
// import "./permission";
NProgress.configure({
  showSpinner: false
});
// 全局注册组件
Vue.use(ElementUI);
Vue.use(animated);
Vue.component("downloadExcel", JsonExcel);
components.forEach(component => Vue.use(component));

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
