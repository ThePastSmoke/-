import axios from "axios";
// 引入vuex
import store from "@/store/index";
// 引入处理大数字文字的文件
import jsonBig from "json-bigint";

const request = axios.create({
  baseURL: "http://42.192.129.12:8000/",
  // transformResponse 允许自定义原始的响应数据（字符串）
  transformResponse: [
    function (data) {
      // console.log(data);
      try {
        // 如果转换成功则返回转换的数据结果
        return jsonBig.parse(data);
      } catch (err) {
        // 如果转换失败，则包装为统一数据格式并返回
        return data;
      }
    },
  ],
});

// 设置请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = store.state?.user?.token;
    // 判断token是否存在 存在的话设置请求头
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // 最后放行
    return config;
  },
  (err) => {
    // 出现错误后把错误传递下去
    return Promise.reject(err);
  }
);

export default request;
