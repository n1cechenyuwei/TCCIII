import _this from "../main.js";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.1.150:8888/api/v1.0/"
});
// // Add a request interceptor
// // 添加请求的拦截器
instance.interceptors.request.use(
  function(config) {
    // 请求被发送之前要做的处理
    // Do something before request is sent
    // console.log('拦截器', config);
    // console.log(config.headers);
    // console.log(config.url);
    // 判断当前请求的地址是否是login
    if (config.url.toLowerCase() !== "login") {
      const token = sessionStorage.getItem("token");
      // 如果请求的地址不是login，设置token
      config.headers.token = token;
    }
    if(config.method=="get"){
      config.params = {
        _t: Date.parse(new Date())/1000,
        ...config.params
      }
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// // Add a response interceptor
// 添加响应的拦截器
instance.interceptors.response.use(
  function(response) {
    if (response.data.status === 123) {
      _this.$router.push({ name: "login" });
      return response.data;
    } else {
      return response.data;
    }
  },
  function(error) {
    console.log(error)
    return Promise.reject(error);
  }
);

// Vue.prototype.$http = instance;
// };

export default instance;
