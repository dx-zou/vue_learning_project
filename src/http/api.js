import Vue from "vue";

const BASE_URL = `http://127.0.0.1:3000`;
const API = {
  // 登录
  login: "/login",
  // 获取用户菜单栏
  getUserMenu: "getUserMenu",
  getBlogList: `/api/blog/list`
};
Vue.prototype.$api = API;
export default {
  API,
  BASE_URL
};
