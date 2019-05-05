import {
  INCREMENT,
  STATUS
} from './mutation-types'
import {
  asyncRouterMap
} from '@/router.js'
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
  GenerateRoutes({
    commit
  }, data) {
    return new Promise(resolve => {
      const {
        roles
      } = data;
      const accessedRouters = asyncRouterMap.filter(v => {
        if (roles.indexOf('admin') >= 0) return true;
        if (hasPermission(roles, v)) {
          if (v.children && v.children.length > 0) {
            v.children = v.children.filter(child => {
              if (hasPermission(roles, child)) {
                return child
              }
              return false;
            });
            return v
          } else {
            return v
          }
        }
        return false;
      });
      commit('SET_ROUTERS', accessedRouters);
      resolve();
    })
  }
}