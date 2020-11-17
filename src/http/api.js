const { origin } = window.location;
const env = process.env.NODE_ENV;
const BASE_URL = env === "development" ? "http://localhost:3000" : origin;
export default {
  BASE_URL,
  fileUpload: `${BASE_URL}/api/upload`,
  // 登录
  login: "/api/user/login",
  // 注册
  register: "/api/user/register",
  // 获取用户菜单栏
  getUserMenu: "/api/user/getUserMenu",
  // 博客列表
  blogQuery: `/api/blog/query`
};
