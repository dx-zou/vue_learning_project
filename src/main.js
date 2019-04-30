import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './plugins/css/normalize.css'
import './plugins/api/api.js'
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
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


//全局前置守卫
router.beforeEach((to, from, next) => {
  // console.log(to.path);

  let token = localStorage.getItem('token')
  if (to.meta.requireAuth) {
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
  if (token && to.path == '/login') {
    next('/home')
  }
})

function toast(type, message) {
  const toast = this.$notify({
    duration: 2000,
    type,
    message
  })
  return toast
}