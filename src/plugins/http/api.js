import Vue from "vue";

const API = {
  // 登录
  login: "/pc_blog/user/login",
  // 获取用户菜单栏
  getUserMenu: "getUserMenu",
  // 博客列表
  getBlogList: `/pc_blog/blog/list`,
  // 新增
  addBlog: `/pc_blog/blog/add-blog`,
  // 详情
  getBlogDetail: `/pc_blog/blog/blog-detail`,
  // 更新
  updateBlog: `/pc_blog/blog/update-blog`,
  // 删除
  deleteBlog: `/pc_blog/blog/delete-blog`
};
Vue.prototype.$api = API;
export default {
  API
};
