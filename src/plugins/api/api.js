import Vue from 'vue'
import axios from 'axios'
import config from './config.js'
//在vue原型上挂载axios
Vue.prototype.$http = axios
//设置请求的根路径
axios.defaults.baseURL = config.baseURL
//设置跨域请求需要携带cookie
axios.defaults.withCredentials = config.withCredentials;
// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    //设置请求头信息
    config.headers.Authorization = localStorage.getItem("token") || "";
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    // 对响应数据先做一层处理
    //请求成功后返回的数据
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
//对外暴露axios对象
export default axios;