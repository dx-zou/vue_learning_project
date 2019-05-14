import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import {
  asyncRoutes,
  constantRouterMap
} from '@/router'

Vue.use(Vuex)

//判断是否有权限
function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}
//过滤异步路由
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = {
      ...route
    }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}
const state = {
  name: localStorage.getItem('name') || 'who are you ?',
  age: localStorage.getItem('age') || 28,
  count: 100,
  show: false,
  routers: constantRouterMap,
  addRouters: [],
  routes: []
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})