import Vue from 'vue'
import Router from 'vue-router'
import login from './views/login/login'
Vue.use(Router)

//不需要登录权限的路由
export const constantRouterMap = [{
  path: '/login',
  name: 'login',
  component: login
}, {
  path: '/vx',
  name: 'vuex',
  component: () => import('./views/vx/test'),
}]
//根据登录权限动态加载的路由表
export const asyncRoutes = [{
    path: '/',
    name: 'Home',
    redirect: '/home',
    meta: {
      roles: ['admin', 'normal']
    }
  }, {
    path: '/home',
    name: '首页',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/home/home'),
    meta: {
      requireAuth: true,
      roles: ['admin', 'normal']
    }
  },
  {
    path: '/cart',
    name: '购物车',
    component: () => import('@/views/cart/cart'),
    meta: {
      title: '',
      requireAuth: true,
      roles: ['admin', 'normal']
    }
  },
  {
    path: '/todolist',
    name: '代办事项',
    component: () => import('./views/todo/todolist'),
    meta: {
      requireAuth: true,
      roles: ['admin']
    }
  },
  {
    path: '/nav',
    name: '路由导航',
    component: () => import('./views/routeNav/navigation'),
    meta: {
      requireAuth: true,
      roles: ['admin', 'normal']
    }
  },
  {
    path: '/user/:id',
    name: '用户',
    component: () => import('./views/user/user'),
    props: {
      name: 'feng'
    },
    meta: {
      requireAuth: true,
      roles: ['admin', 'normal']
    }
  },
]
const router = new Router({
  routes: constantRouterMap,
  //滚动行为，
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    // return {x:0,y:0}
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

export default router