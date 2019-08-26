import router from './route'
import NProgress from 'nprogress'
import getPageTitle from './utils/getPageTitle'
// 全局前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  let hasToken = sessionStorage.getItem('token')
  if (hasToken) {
    document.title = getPageTitle(to.name)
    next()
    NProgress.done()
  } else {
    if (to.path === '/login') {
      next()
      NProgress.done()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})
