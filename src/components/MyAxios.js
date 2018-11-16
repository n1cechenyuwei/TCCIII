import axios from "axios";

var MyAxios = {};
MyAxios.install = function (Vue) {
  // axios.defaults.baseURL = "http://192.168.1.186:8888/api/v1.0/";
  // Vue.prototype.$http = axios;
  // 创建自定义的axios实例
  const instance = axios.create({
    baseURL: "http://192.168.1.186:8888/api/v1.0/"
  });
  // // Add a request interceptor
  // // 添加请求的拦截器
  instance.interceptors.request.use(
    function (config) {
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
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // // Add a response interceptor
  // // 添加响应的拦截器
  // instance.interceptors.response.use(
  //   function(response) {
  //     // Do something with response data
  //     return response;
  //   },
  //   function(error) {
  //     // Do something with response error
  //     return Promise.reject(error);
  //   }
  // );

  Vue.prototype.$http = instance;
};

export default MyAxios;