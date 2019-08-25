import Vue from "vue";
import axios from "axios";
// 在vue原型上挂载axios
// 添加请求拦截器
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true,
  timeout: 10000
});
console.log(process.env)
service.interceptors.request.use(
  config => {
    // 设置请求头信息
    config.headers.Authorization = localStorage.getItem("token") || "";
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
    Vue.prototype.$notify({
      type: "fail",
      duration: 1000,
      message: error.response.data.errMsg
    });
    return Promise.reject(error);
  }
);
export default  service
