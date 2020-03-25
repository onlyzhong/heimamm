// 用来封装所有与企业相关的网站请求
// 导入 axios
import axios from 'axios'
// 导入接口 token 的方法
import {
    getToken
} from './mytoken'
// 创建一个 axios 实例
const instance = axios.create({
    baseURL: process.env.VUE_APP_HTTP,
    withCredentials: true
})

//请求拦截器
instance.interceptors.request.use(
    function (config) {
        config.headers.token = getToken();
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

//响应拦截器
instance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
)
export default instance