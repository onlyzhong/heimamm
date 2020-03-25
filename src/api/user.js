// // 用来封装所有与用户相关的网站请求
// // 导入 axios
// import axios from 'axios'
// // 导入接口 token 的方法
// import {
//     getToken
// } from '../utils/mytoken'
// // 创建一个 axios 实例
// const instance = axios.create({
//     baseURL: process.env.VUE_APP_HTTP,
//     withCredentials: true
// })
import instance from '../utils/myhttp'
// //请求拦截器
// instance.interceptors.request.use(
//     function (config) {
//         config.headers.token = getToken();
//         return config;
//     },
//     function (error) {
//         return Promise.reject(error);
//     }
// );

// //响应拦截器
// instance.interceptors.response.use(
//     function (response) {
//         return response;
//     },
//     function (error) {
//         return Promise.reject(error);
//     }
// )

// 封装请求用户的接口
export function apiGetUser(userList) {
    let {
        username,
        email,
        role_id,
        page,
        limit
    } = userList
    return instance({
        url: '/user/list',
        // headers: {
        //     token: getToken()
        // },
        params: {
            username,
            email,
            role_id,
            page,
            limit
        }
    })
}

// 封装状态切换的接口
export function apiChangeStatus(id) {
    return instance({
        url: "/user/status",
        method: "POST",
        data: {
            id
        }
    });
}

//封装新增用户的接口
export function apiAddUser(addForm) {
    let {
        username,
        email,
        phone,
        role_id,
        status,
        remark
    } = addForm;
    return instance({
        url: "/user/add",
        method: "POST",
        data: {
            username,
            email,
            phone,
            role_id,
            status,
            remark
        }
    })

}

// 封装一个提交数据的方法
export function apiEidtUser(editForm) {
    let {
        id, // 用户标识,及id 
        username, // 昵称
        phone, // 手机
        email, // 邮箱
        avatar, // 头像
        password, //密码
        remark, //备注
        status, //状态
        role_id //角色
    } = editForm;
    return instance({
        url: "/user/edit",
        method: "POST",
        data: {
            id, // 用户标识,及id 
            username, // 昵称
            phone, // 手机
            email, // 邮箱
            avatar, // 头像
            password, //密码
            remark, //备注
            status, //状态
            role_id //角色
        }
    });
}

//封装一个删除用户的接口
export function apiDeleteUser(deleteForm) {
    let {
        id //要修改数据的 id
    } = deleteForm;
    return instance({
        url: "/user/remove",
        method: "POST",
        data: {
            id //要修改数据的 id
        }
    });
}