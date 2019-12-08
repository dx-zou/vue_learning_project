import Vue from "vue";
import axios from "axios";
// import BASE_URL from "./api";
// 添加请求拦截器
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // baseURL: "https://easy-mock.com/mock/5c949a926811807c6b28d8c0/feng/",
  // baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000
});
service.interceptors.request.use(
  config => {
    // 设置请求头信息
    config.headers.Authorization = sessionStorage.getItem("token") || "";
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  response => {
    // 对响应数据先做一层处理
    // 请求成功后返回的数据
    return response.data;
  },
  error => {
    // 对响应错误做统一处理
    // Vue.prototype.$notify({
    //   type: "fail",
    //   duration: 1000,
    //   message: error.response.data.errMsg
    // });
    return Promise.reject(error);
  }
);
Vue.prototype.$http = service;
export default service;
