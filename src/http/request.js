import Vue from "vue";
import axios from "axios";
import api from "./api";
const service = axios.create({
  baseURL: api.BASE_URL,
  // baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: false,
  timeout: 30000
});
// 添加请求拦截
service.interceptors.request.use(
  config => {
    // 设置请求头信息
    config.headers.Authorization = sessionStorage.getItem("token") || "";
    config.headers.post["Content-Type"] = "application/json";
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  response => {
    const { authorization } = response.headers;
    // 保存响应头返回的token
    if (authorization) {
      sessionStorage.setItem("token", authorization);
    }
    // 对响应数据先做一层处理
    // 请求成功后返回的数据
    const data = response.data;
    if (data.code === 400 || data.code === 401) {
      Vue.prototype.$notify({
        type: "error",
        duration: 2000,
        message: response.data.msg
      });
    }
    return data;
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;
