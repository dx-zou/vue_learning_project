import login from '@/views/login/login'
import layout from '../layout'

// 不需要登录权限的路由
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: login
  }
]
// 根据登录权限动态加载的路由表
export const asyncRoutes = [
  {
    path: '/',
    redirect: '/home',
    meta: {
      roles: ['admin', 'normal']
    }
  },
  // 首页
  {
    path: '/home',
    component: layout,
    children: [
      {
        name: '首页',
        path: '',
        component: () => import('@/views/home/home'),
        meta: {
          requireAuth: true,
          roles: ['admin', 'normal']
        }
      }
    ]
  },
  // 我的组件
  {
    path: '/my-components',
    component: layout,
    children: [
      {
        path: 'date-select',
        name: '日期选择',
        component: () => import('@/views/my-components/dateSelect'),
        meta: {
          requireAuth: true,
          roles: ['admin', 'normal']
        }
      },
      {
        path: 'my-table',
        name: '表格',
        component: () => import('@/views/my-components/my-table'),
        meta: {
          requireAuth: true,
          roles: ['admin', 'normal']
        }
      }
    ]
  },
  // 常用
  {
    path: '/normal-use',
    component: layout,
    children: [
      {
        name: '购物车',
        path: 'cart',
        component: () => import('@/views/normal-use/cart'),
        meta: {
          title: '',
          requireAuth: true,
          roles: ['admin', 'normal']
        }
      },
      {
        name: 'cssWorld',
        path: 'css-world',
        component: () => import('../views/normal-use/css-world'),
        meta: {
          title: '',
          requireAuth: true,
          roles: ['admin', 'normal']
        }
      }
    ]
  },
  // vue 学习
  {
    path: '/vue',
    component: layout,
    children: [
      {
        name: '路由导航',
        path: 'route-nav',
        component: () => import('@/views/vue/route-nav'),
        meta: {
          requireAuth: true,
          roles: ['admin', 'normal']
        }
      },
      {
        path: 'vuex',
        component: () => import('@/views/vue/vuex'),
        meta: {
          requireAuth: true,
          roles: ['admin', 'normal']
        }
      },
      {
        name: '插槽',
        path: 'slot',
        component: () => import('@/views/vue/todo'),
        meta: {
          requireAuth: true,
          roles: ['admin', 'normal']
        }
      },
      {
        name: '过渡动画',
        path: 'transition',
        component: () => import('@/views/vue/transition'),
        meta: {
          requireAuth: true,
          roles: ['admin', 'normal']
        }
      },
      {
        name: '计算属性',
        path: 'watch-computed',
        component: () => import('@/views/vue/computed'),
        meta: {
          requireAuth: true,
          roles: ['admin', 'normal']
        }
      }
    ]
  },
  // 第三方插件
  {
    path: '/third-party',
    component: layout,
    children: [
      {
        name: 'easy-mock',
        path: 'user/:id',
        component: () => import('@/views/third-party/easy-mock'),
        props: {
          name: 'feng'
        },
        meta: {
          requireAuth: true,
          roles: ['admin', 'normal']
        }
      },
      {
        name: '富文本编辑器',
        path: 'editor',
        component: () => import('@/views/third-party/quill-editor')
      }
    ]
  },
  // 404
  {
    path: '*',
    component: () => import('@/views/404')
  }
]
