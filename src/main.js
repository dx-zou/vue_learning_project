import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import {
  getToken
} from "@/utils/auth";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import './plugins/api/api.js'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

//全局注册组件
import Alert from './components/alert/index'
import DateRange from './components/dateRange/index'
import ToDo from './components/todo/index';
const components = [
  Alert,
  DateRange,
  ToDo,
  ElementUI
]
components.forEach(component => Vue.use(component))
//挂载提示方法
Vue.prototype.$toast = toast
Vue.config.productionTip = false

const whiteList = ['/login', '/vx']

//全局前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  let hasToken = sessionStorage.getItem('token')
  if (hasToken) {
    //如果登录了角色存在就放行
    //否则就生成路由
    if (store.getters.role) {
      next()
      NProgress.done()
    } else {
      const role = sessionStorage.getItem('role')
      store.dispatch('generateRoutes', role)
      router.addRoutes(store.getters.addRouters)
      store.commit('SET_ROLE',role)
      // hack method to ensure that addRoutes is complete
      // set the replace: true, so the navigation will not leave a history record
      next({
        ...to,
        replace: true
      })
      NProgress.done()
    }
  } else {
    if (to.path == '/login') {
      next()
      NProgress.done()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})

function toast(type, message) {
  const toast = this.$notify({
    duration: 1500,
    type,
    message
  })
  return toast
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')