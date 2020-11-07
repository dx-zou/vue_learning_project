/* eslint-disable semi */
import Vue from "vue";
import App from "./App.vue";
import store from "./store/index";
import router from "./route/index";
import service from "./http/request";
import API from "./http/api";
import businessTools from "./utils/businessTools";
// import i18n from "./utils/i18n";
import "./utils/elementConf";
import NProgress from "nprogress";
import "./components";
import "./styles/common.scss";
import "./icons"; // svg 图标
import "./utils/setRem";
import "nprogress/nprogress.css";
import "animate.css";
// import "./permission";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
Vue.use(mavonEditor);
NProgress.configure({
  showSpinner: false
});

Vue.prototype.$toast = businessTools.toast;
Vue.prototype.$deleteConfirm = businessTools.deleteConfirm;
Vue.prototype.$api = API;
Vue.prototype.$http = service;

// 设置为 false 以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false;

new Vue({
  router,
  // i18n,
  store,
  render: h => h(App)
}).$mount("#app");
