/* eslint-disable semi */
import Vue from "vue";
import App from "./App.vue";
import store from "./store/index";
import ElementUI from "element-ui";
import router from "./route/index";
import "./plugins/http/request";
import "@/utils/toolFunctions";
import animated from "animate.css";
import NProgress from "nprogress";
import JsonExcel from "vue-json-excel";
import "./plugins/http/api";
import "./components";
import "element-ui/lib/theme-chalk/index.css";
import "./styles/common.scss";
import "nprogress/nprogress.css";
import "@/icons"; // svg 图标
import "@/utils/setRem";
import { Collapse, Icon } from "ant-design-vue";
import moment from "moment";
import i18n from "@/plugins/i18n";
// import locale from "element-ui/lib/locale/lang/en";

// import "./permission";
NProgress.configure({
  showSpinner: false
});

// 时间过滤器
Vue.filter("filterTime", timestr => {
  return moment(timestr).calendar();
});
// 全局注册组件
// Vue.use(ElementUI, { locale });
Vue.use(animated);
Vue.use(Collapse);
Vue.use(Icon);
Vue.component("downloadExcel", JsonExcel);

Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount("#app");
