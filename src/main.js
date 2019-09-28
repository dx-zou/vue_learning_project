/* eslint-disable semi */
import Vue from "vue";
import App from "./App.vue";
import store from "./store/index";
import ElementUI from "element-ui";
import router from "./route/index";
import request from "./http/request";
import Tools from "@/utils/tools";
import animated from "animate.css";
import NProgress from "nprogress";
import JsonExcel from "vue-json-excel";
import api from "./http/api";
import components from "./components";
import "element-ui/lib/theme-chalk/index.css";
import "./styles/common.scss";
import "nprogress/nprogress.css";
import '@/icons'; // svg 图标
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
// 挂载提示方法
Vue.prototype.$toast = Tools.toast;
Vue.prototype.$http = request;
Vue.prototype.$api = api;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
