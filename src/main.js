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

const whiteList = ['/login', '/vx'] // no redirect whitelist

//全局前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  let hasToken = getToken()
  console.log(hasToken)
  if (hasToken) {
    if (to.path == '/login') {
      next('/vx')
      NProgress.done()
    } else {
      // const hasRoles = store.getters.roles && store.getters.roles.length > 0
      const hasRoles = false
      if (hasRoles) {
        next()
      } else {
        try {
          // const {
          //   roles
          // } = await store.dispatch('user/getInfo')

          const roles = ['admin']
          const accessRoutes = store.dispatch('generateRoutes', roles)
          router.addRoutes(accessRoutes)
          console.log(router)
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({
            ...to,
            replace: true
          })
          console.log(...to)
        } catch (error) {
          // remove token and go to login page to re-login
          // await store.dispatch('user/resetToken')
          // next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
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