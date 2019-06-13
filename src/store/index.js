import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import Cookies from 'js-cookie'
import {
  constantRouterMap
} from '@/route/router'

Vue.use(Vuex)

const state = {
  name: localStorage.getItem('name') || 'who are you ?',
  age: localStorage.getItem('age') || 28,
  count: 100,
  show: false,
  routers: constantRouterMap,
  addRouters: [],
  routes: [],
  role: '',
  sidebar: {
    isCollapse: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : false
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
