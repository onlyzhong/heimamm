// 导入 axios
import axios from "axios"
//导入操作token的方法
import {
    getToken
} from "../utils/mytoken"
// 创建一个新的 axios 对象，并且设置基准地址
var instance = axios.create({
    baseURL: process.env.VUE_APP_HTTP,
    withCredentials: true
});

// 封装用户信息的接口
export function apiInfo() {
    return instance({
        url: '/info',
        method: 'GET', // 如果请求方式是 get，method 可以省略掉
        headers: {
            token: getToken()
        }
    })
}