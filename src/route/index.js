import Vue from "vue";
import Router from "vue-router";
import routes from "./router";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes,
  // 滚动行为，
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    // return {x:0,y:0}
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  }
});


