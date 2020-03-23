// 用来封装所有与学科相关的网站请求
// 导入 axios
import axios from 'axios'
// 导入接口 token 的方法
import {
    getToken
} from '../utils/mytoken'
// 创建一个 axios 实例
const instance = axios.create({
    baseURL: process.env.VUE_APP_HTTP,
    withCredentials: true
})

// 封装请求学科的接口
export function apiGetSubject(subjectList) {
    let {
        name,
        page,
        limit,
        rid,
        username,
        status
    } = subjectList
    return instance({
        url: '/subject/list',
        headers: {
            token: getToken()
        },
        params: {
            name,
            page,
            limit,
            rid,
            username,
            status
        }
    })
}