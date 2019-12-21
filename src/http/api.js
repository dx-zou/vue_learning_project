import Vue from "vue";

const API = {
  // 登录
  login: "/pc_blog/user/login",
  // 获取用户菜单栏
  getUserMenu: "getUserMenu",
  // 博客列表
  getBlogList: `/pc_blog/blog/list`
};
Vue.prototype.$api = API;
export default {
  API
};
