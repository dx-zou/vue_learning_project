import Vue from "vue"
const API = {
  // 登录
  login: "/login",
  // 获取用户菜单栏
  getUserMenu: "getUserMenu"
};
Vue.prototype.$toast = API;
export default API;
