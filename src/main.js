import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
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
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
