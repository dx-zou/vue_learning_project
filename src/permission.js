import router from "./route";
import NProgress from "nprogress";
// import store from "./store";

const getPageTitle = pageTitle => {
  const title = "前端学习管理系统";
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
};
/**
 * 判断路由权限
 *
 * @param {*} to
 * @returns
 */
// const checkPermission = to => {
//   const menuNames = store.getters.menuName;
//   const noAuthPath = ["/dashboard", "/login"];
//   return (
//     menuNames.includes(to.name) ||
//     menuNames.includes(to.meta.parentName) ||
//     noAuthPath.includes(to.path)
//   );
// };

/**
 * @description 根据权限调整路由
 *
 * @param {*} to
 * @param {*} next
 */
// const permissionControl = (to, next) => {
//   if (checkPermission(to)) {
//     next();
//   } else {
//     to.path === "/404" ? next() : next("/404");
//   }
//   NProgress.done();
// };

// 全局前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start();
  document.title = getPageTitle(to.name);
  const hasToken = sessionStorage.getItem("userToken");
  // const username = sessionStorage.getItem("username");
  if (hasToken) {
    // 如果刷新了页面就重新获取菜单列表
    // if (!store.getters.menuList.length) {
    //   store.dispatch("user/getUserMenu", username).then(() => {
    //     permissionControl(to, next);
    //   });
    // } else {
    //   permissionControl(to, next);
    // }
    to.path === "/login" ? next("/dashboard") : next();
  } else {
    to.path === "/login" ? next() : next("/login");
  }
  NProgress.done();
});
router.afterEach(() => {
  NProgress.done();
});
