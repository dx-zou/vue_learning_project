import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './plugins/css/normalize.css'
import axios from 'axios'
Vue.prototype.axios = axios
axios.defaults.baseURL = 'https://easy-mock.com/mock/5c949a926811807c6b28d8c0/feng/'
//全局注册组件
import Alert from './components/alert/index'
import DateRange from './components/dateRange/index'
import ToDo from './components/todo/index';
const components = [
  Alert,
  DateRange,
  ToDo
]
components.forEach(component => Vue.use(component))
Vue.use(Alert)
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
