/* eslint-disable semi */
import Vue from "vue";
import App from "./App.vue";
import router from "./route/index";
import store from "./store/index";
import request from "./plugins/http/request";
import api from "./plugins/http/api";
import ElementUI from "element-ui";
import NProgress from "nprogress";
import animated from "animate.css";
import "element-ui/lib/theme-chalk/index.css";
import "./styles/common.scss";
import "nprogress/nprogress.css";
import components from "./components";
import "./permission";
NProgress.configure({
  showSpinner: false
});
// 全局注册组件
Vue.use(ElementUI);
Vue.use(animated);
components.forEach(component => Vue.use(component));
// 挂载提示方法
Vue.prototype.$toast = toast;
Vue.prototype.$http = request;
Vue.prototype.$api = api;
Vue.config.productionTip = false;
function toast(type, message) {
  return this.$notify({
    duration: 2000,
    type,
    message
  });
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
