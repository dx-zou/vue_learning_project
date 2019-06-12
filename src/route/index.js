import Vue from 'vue'
import Router from 'vue-router'
import {
  constantRouterMap,
} from './router'
Vue.use(Router)

const router = new Router({
  routes: constantRouterMap,
  //滚动行为，
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    // return {x:0,y:0}
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

export default router