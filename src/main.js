/* eslint-disable semi */
import Vue from "vue";
import App from "./App.vue";
import store from "./store/index";
import router from "./route/index";
import service from "./http/request";
import API from "./http/api";
import businessToos from "./utils/businessTools";
import VCharts from "v-charts";
import i18n from "./utils/i18n";
import NProgress from "nprogress";
import "./components";
import "./styles/common.scss";
import "./icons"; // svg 图标
import "./utils/setRem";
import "nprogress/nprogress.css";
import "animate.css";
// import moment from "moment";
// import { Collapse, Icon } from "ant-design-vue";
// import JsonExcel from "vue-json-excel";
// import { Magnifier, DragWrap, DragItem } from "vue-gn-components";
// import "vue-gn-components/lib/style/index.css";
// import "./utils/vue-socket";
import "./permission";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
// use
Vue.use(mavonEditor);
NProgress.configure({
  showSpinner: false
});

// 时间过滤器
// Vue.filter("filterTime", timestr => {
//   return moment(timestr).calendar();
// });
Vue.use(VCharts);
// Vue.use(Collapse);
// Vue.use(Icon);
// Vue.use(Magnifier)
//   .use(DragWrap)
//   .use(DragItem)
// Vue.component("downloadExcel", JsonExcel);
Vue.prototype.$toast = businessToos.toast;
Vue.prototype.$deleteConfirm = businessToos.deleteConfirm;
Vue.prototype.$api = API;
Vue.prototype.$http = service;

Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount("#app");
