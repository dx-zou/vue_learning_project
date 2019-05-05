import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import {
  asyncRouterMap,
  constantRouterMap
} from '@/router.js'
Vue.use(Vuex)

function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}
const state = {
  name: localStorage.getItem('name') || 'who are you ?',
  age: localStorage.getItem('age') || 28,
  count: 100,
  show: false,
  routers: constantRouterMap,
  addRouters: []
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})