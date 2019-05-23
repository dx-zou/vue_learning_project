import {
  INCREMENT,
  STATUS
} from './mutation-types'
import {
  asyncRoutes
} from '@/router.js'

//判断role是否拥有route对应的权限
function hasPermission(role, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(role)
  } else {
    return true
  }
}
//过滤异步路由
export function filterAsyncRoutes(role, routes) {
  const res = []
  routes.forEach(route => {
    const tmp = {
      ...route
    }
    //如果role有权限
    if (hasPermission(role, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, role)
      }
      res.push(tmp)
    }
  })
  return res
}

export default {
  //异步函数
  increment({
    commit
  }, number) {
    setTimeout(() => {
      commit(INCREMENT, number)
      commit(STATUS)
    }, 3000);
  },
  //生成动态路由
  generateRoutes({
    commit
  }, role) {
    let accessRoutes = []
    if (role == 'admin') {
      accessRoutes = asyncRoutes || []
    } else {
      accessRoutes = filterAsyncRoutes(role, asyncRoutes)
    }
    commit('SET_ROUTES', accessRoutes)
  }

}