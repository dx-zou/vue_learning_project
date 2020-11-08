const { origin } = window.location;
const env = process.env.NODE_ENV;
const BASE_URL = env === "development" ? "http://47.95.1.121:3000" : origin;
export default {
  BASE_URL,
  // 登录
  login: "/login",
  // 注册
  register: "/register",
  // 获取用户菜单栏
  getUserMenu: "getUserMenu",
  // 博客列表
  getBlogList: `/api/blog/list`,
  // 新增
  addBlog: `/api/blog/add`,
  // 详情
  getBlogDetail: `/api/blog/detail`,
  // 更新
  updateBlog: `/api/blog/update`,
  // 删除
  deleteBlog: `/api/blog/delete`
};
