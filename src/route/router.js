import login from '@/views/login/login'
import layout from '../layout'

//不需要登录权限的路由
export const constantRouterMap = [{
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/vx',
    component: layout,
    children: [{
      path: '',
      name: 'vuex',
      component: () => import('@/views/vx/test'),
    }],
  },
  {
    path: '/date-select',
    component: layout,
    children: [{
      path: '',
      name: '日期选择',
      component: () => import('@/views/dateSelect'),
    }],
  }
]
//根据登录权限动态加载的路由表
export const asyncRoutes = [{
    path: '/',
    redirect: '/home',
    meta: {
      roles: ['admin', 'normal']
    }
  },
  {
    path: '/home',
    component: layout,
    children: [{
      name: '首页',
      path: '',
      component: () => import('@/views/home/home'),
      meta: {
        requireAuth: true,
        roles: ['admin', 'normal']
      }
    }]
  },
  {
    path: '/cart',
    component: layout,
    children: [{
      name: '购物车',
      path: '',
      component: () => import('@/views/cart/cart'),
      meta: {
        title: '',
        requireAuth: true,
        roles: ['admin', 'normal']
      }
    }],
  },
  {
    path: '/todolist',
    component: layout,
    children: [{
      path: '',
      name: '代办事项',
      component: () => import('@/views/todo/todolist'),
      meta: {
        requireAuth: true,
        roles: ['admin']
      }
    }]
  },
  {
    path: '/nav',
    component: layout,
    children: [{
      name: '路由导航',
      path: '',
      component: () => import('@/views/routeNav/navigation'),
      meta: {
        requireAuth: true,
        roles: ['admin', 'normal']
      }
    }]
  },
  {
    path: '/user/:id',
    component: layout,
    children: [{
      name: '用户',
      path: '',
      component: () => import('@/views/user/user'),
      props: {
        name: 'feng'
      },
      meta: {
        requireAuth: true,
        roles: ['admin', 'normal']
      }
    }]
  },
]
