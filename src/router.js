import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      redirect: '/home',
    },
    {
      path: '/home',
      name: '首页',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "home" */ './views/home/home')
    },
    {
      path: '/cart',
      name: '购物车',
      component: (resolve) => require(['@/views/cart/cart'], resolve),
      meta: {
        title: '',
        requireAuth: true
      }
    },
    {
      path: '/todolist',
      name: '代办事项',
      component: () => import('./views/todo/todolist')
    },
    {
      path: '/nav',
      name: '路由导航',
      component: () => import('./views/routeNav/navigation')
    },
    {
      path: '/user/:id',
      name: '用户',
      component: () => import('./views/user/user'),
      props: {
        name: 'feng'
      }
    },
    {
      path: '/vx',
      name: 'vuex',
      component: () => import('./views/vx/test'),
    }

  ],
  //滚动行为，
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    // return {x:0,y:0}
    if (savedPosition) {
      console.log(savedPosition);

      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})