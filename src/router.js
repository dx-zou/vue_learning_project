import Vue from 'vue'
import Router from 'vue-router'
import login from './views/login/login'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      redirect: '/home',
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: '首页',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "home" */ '@/views/home/home'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/cart',
      name: '购物车',
      component: () => import( /* webpackChunkName: "cart" */ '@/views/cart/cart'),
      meta: {
        title: '',
        requireAuth: true
      }
    },
    {
      path: '/todolist',
      name: '代办事项',
      component: () => import('./views/todo/todolist'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/nav',
      name: '路由导航',
      component: () => import('./views/routeNav/navigation'),
      meta: {
        requireAuth: true
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
        requireAuth: true
      }
    },
    {
      path: '/vx',
      name: 'vuex',
      component: () => import('./views/vx/test'),
      meta: {
        requireAuth: true
      }
    }

  ],
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