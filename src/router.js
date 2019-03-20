import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
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
      component: () => import(/* webpackChunkName: "home" */ './views/home/home.vue')
    },
    {
      path: '/cart',
      name: '购物车',
      component: (resolve) => require(['@/views/cart/cart.vue'],resolve),
      meta: {
        title: '',
        requireAuth: true
      }
    },
    {
      path: '/todolist',
      name: '代办事项',
      component: () => import('./views/todo/todolist.vue')
    }

  ]
})
