const BASE_URL = "http://127.0.0.1:3000";
export default {
  BASE_URL,
  // 登录
  login: "/blog/user/login",
  // 注册
  register: "/blog/user/register",
  // 获取用户菜单栏
  getUserMenu: "getUserMenu",
  // 博客列表
  getBlogList: `/blog/api/list`,
  // 新增
  addBlog: `/blog/api/add-blog`,
  // 详情
  getBlogDetail: `/blog/api/blog-detail`,
  // 更新
  updateBlog: `/blog/api/update-blog`,
  // 删除
  deleteBlog: `/blog/api/delete-blog`
};
