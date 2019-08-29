import login from '@/views/login/login'
import layout from '../layout'
const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/',
    redirect: '/dashboard',
    meta: {
      roles: ['admin', 'normal']
    }
  },
  // 首页
  {
    path: '/dashboard',
    component: layout,
    children: [
      {
        path: '',
        name: 'dashboard',
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
    redirect: '/my-components/date-select',
    meta: { title: 'components' },
    children: [
      {
        path: 'date-select',
        name: 'date',
        component: () => import('@/views/my-components/dateSelect'),
        meta: {
          requireAuth: true,
          roles: ['admin', 'normal'],
          breadcrumbs: ['components', 'date']
        }
      },
      {
        path: 'my-table',
        name: 'table',
        component: () => import('@/views/my-components/my-table'),
        meta: {
          requireAuth: true,
          roles: ['admin', 'normal'],
          breadcrumbs: ['components', 'table']
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
        name: '小球动画',
        path: 'cart',
        component: () => import('@/views/normal-use/cart'),
        meta: {
          breadcrumbs: ['normal', 'cart'],
          requireAuth: true,
          roles: ['admin', 'normal']
        }
      },
      {
        path: 'css-world',
        name: 'css-world',
        component: () => import('../views/normal-use/css-world'),
        children: [
          {
            path: 'css-color',
            name: 'css-color',
            component: () => import('../views/normal-use/css-world/css-world'),
            meta: {
              breadcrumbs: ['normal', 'css-color'],
              requireAuth: true,
              roles: ['admin', 'normal']
            }
          },
          {
            path: 'css-skill',
            name: 'css-skill',
            component: () => import('../views/normal-use/css-world/css-skill'),
            meta: {
              breadcrumbs: ['normal', 'css-skill'],
              requireAuth: true,
              roles: ['admin', 'normal']
            }
          }
        ]
      }
    ]
  },
  // vue 学习
  {
    path: '/vue',
    component: layout,
    children: [
      {
        name: '路由导航守卫',
        path: 'route-nav',
        component: () => import('@/views/vue/route-nav'),
        meta: {
          requireAuth: true,
          roles: ['admin', 'normal'],
          breadcrumbs: ['vue', 'route']
        }
      },
      {
        name: 'slot',
        path: 'slot',
        component: () => import('@/views/vue/todo'),
        meta: {
          requireAuth: true,
          roles: ['admin', 'normal'],
          breadcrumbs: ['vue', 'slot']
        }
      },
      {
        name: 'transition',
        path: 'transition',
        component: () => import('@/views/vue/transition'),
        meta: {
          requireAuth: true,
          roles: ['admin', 'normal'],
          breadcrumbs: ['vue', 'transiton']
        }
      },
      {
        name: 'computed',
        path: 'watch-computed',
        component: () => import('@/views/vue/computed'),
        meta: {
          requireAuth: true,
          roles: ['admin', 'normal'],
          breadcrumbs: ['vue', 'computed']
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
        name: 'mock',
        path: 'user/:id',
        component: () => import('@/views/third-party/easy-mock'),
        props: {
          name: 'feng'
        },
        meta: {
          requireAuth: true,
          roles: ['admin', 'normal'],
          breadcrumbs: ['third-party', 'mock']
        }
      },
      {
        name: 'editor',
        path: 'editor',
        component: () => import('@/views/third-party/quill-editor'),
        meta: {
          requireAuth: true,
          roles: ['admin'],
          breadcrumbs: ['third-party', 'editor']
        }
      }
    ]
  },
  // 404
  {
    path: '*',
    component: () => import('@/views/404')
  }
]
export default constantRouterMap
