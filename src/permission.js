import router from "./route";
import NProgress from "nprogress";
import getPageTitle from "./utils/getPageTitle";
import store from "./store";

/**
 * 判断路由权限
 *
 * @param {*} to
 * @returns
 */
const checkPermission = to => {
  return (
    store.getters.menuName.includes(to.name) ||
    store.getters.menuName.includes(to.meta.parentName) || 
    to.path === "/dashboard" || 
    to.path === "/login"
  )
};

/**
 * @description 根据权限调整路由
 *
 * @param {*} to
 * @param {*} next
 */
const permissionControl = (to, next) => {
  if (checkPermission(to)) {
    next();
  } else {
    to.path === "/404" ? next() : next("/404");
  }
  NProgress.done();
};

// 全局前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start();
  document.title = getPageTitle(to.name);
  const hasToken = sessionStorage.getItem("userToken");
  const username = sessionStorage.getItem("username");
  // if (hasToken) {
  //   // 如果刷新了页面就重新获取菜单列表
  //   if (!store.getters.menuList.length) {
  //     store.dispatch("user/getUserMenu", username).then(() => {
  //       permissionControl(to, next);
  //     });
  //   } else {
  //     permissionControl(to, next);
  //   }
  // } else {
  //   to.path === "/login" ? next() : next("/login");
  //   NProgress.done();
  // }
  next()
});
router.afterEach(() => {
  NProgress.done();
});
