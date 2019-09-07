import login from '@/views/login/login';
import layout from '../layout';
const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/',
    redirect: '/dashboard'
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
        meta: {}
      }
    ]
  },
  // 我的组件
  {
    path: '/my-components',
    component: layout,
    meta: { title: 'components' },
    children: [
      {
        path: 'date-select',
        name: 'date',
        component: () => import('@/views/my-components/dateSelect'),
        meta: {
          breadcrumbs: ['components', 'date']
        }
      }
      // {
      //   path: 'table',
      //   name: 'table',
      //   component: () => import('@/views/my-components/my-table'),
      //   meta: {
      //     breadcrumbs: ['components', 'table']
      //   }
      // }
    ]
  },
  // 常用
  {
    path: '/css-world',
    component: layout,
    name: 'css-world',
    children: [
      {
        path: 'css-color',
        name: 'css-color',
        component: () => import('../views/css-world/css-color/css-color'),
        meta: {
          breadcrumbs: ['css-world', 'css-color']
        }
      },
      {
        path: 'css-skill',
        name: 'css-skill',
        component: () => import('../views/css-world/css-skill/css-skill'),
        meta: {
          breadcrumbs: ['normal', 'css-skill']
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
        path: 'router',
        name: 'router',
        component: () => import('@/views/vue/vue-router'),
        meta: {
          breadcrumbs: ['vue', 'route']
        }
      },
      {
        name: 'slot',
        path: 'slot',
        component: () => import('@/views/vue/todo'),
        meta: {
          breadcrumbs: ['vue', 'slot']
        }
      },
      {
        path: 'transition',
        name: 'transition',
        component: () => import('@/views/vue/transition'),
        meta: {
          breadcrumbs: ['vue', 'transiton']
        }
      },
      {
        path: 'computed',
        name: 'computed',
        component: () => import('@/views/vue/computed'),
        meta: {
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
        name: 'easy-mock',
        path: 'user',
        component: () => import('@/views/third-party/easy-mock'),
        props: {
          name: 'feng'
        },
        meta: {
          breadcrumbs: ['third-party', 'mock']
        }
      },
      {
        path: 'editor',
        name: 'editor',
        component: () => import('@/views/third-party/quill-editor'),
        meta: { breadcrumbs: ['third-party', 'editor'] }
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
