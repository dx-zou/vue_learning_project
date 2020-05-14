/* eslint-disable semi */
import Vue from "vue";
import App from "./App.vue";
import store from "./store/index";
import router from "./route/index";
import "./components";
import "./http/request";
import "./http/api";
import "./utils/businessTools";
import "./styles/common.scss";
import "./icons"; // svg 图标
import "./utils/setRem";
import animated from "animate.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import VCharts from "v-charts";
import i18n from "./utils/i18n";
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
// 全局注册组件
Vue.use(animated).use(VCharts);
// Vue.use(Collapse);
// Vue.use(Icon);
// Vue.use(Magnifier)
//   .use(DragWrap)
//   .use(DragItem)
// Vue.component("downloadExcel", JsonExcel);

Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount("#app");
