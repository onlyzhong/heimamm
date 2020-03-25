// 用来封装所有与企业相关的网站请求
// 导入 axios
// import axios from 'axios'
// 导入接口 token 的方法
// import {
//     getToken
// } from '../utils/mytoken'
// 创建一个 axios 实例
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

// 封装请求企业的接口
export function apiGetenterprise(enterpriseList) {
    let {
        name,
        page,
        limit,
        eid,
        username,
        status
    } = enterpriseList
    return instance({
        url: '/enterprise/list',
        // headers: {
        //     token: getToken()
        // },
        params: {
            name,
            page,
            limit,
            eid,
            username,
            status
        }
    })
}

// 封装状态切换的接口
export function apiChangeStatus(id) {
    return instance({
        url: "/enterprise/status",
        method: "POST",
        data: {
            id
        }
    });
}

//封装新增企业的接口
export function apiAddenterprise(addForm) {
    let {
        eid,
        name,
        short_name,
        intro,
        remark
    } = addForm;
    return instance({
        url: "/enterprise/add",
        method: "POST",
        data: {
            eid,
            name,
            short_name,
            intro,
            remark
        }
    })

}

// 封装一个编辑数据的方法
export function apiEidtenterprise(editForm) {
    let {
        id, //要修改数据的 id

        eid,
        name, // 企业名称
        short_name, // 简称
        intro, // 介绍
        remark, // 备注
    } = editForm;
    return instance({
        url: "/enterprise/edit",
        method: "POST",
        data: {
            id, //要修改数据的 id
            tag: eid,
            name, // 企业名称
            short_name, // 简称
            intro, // 介绍
            remark // 备注
        }
    });
}

//封装一个删除企业的接口
export function apiDeleteenterprise(deleteForm) {
    let {
        id //要修改数据的 id
    } = deleteForm;
    return instance({
        url: "/enterprise/remove",
        method: "POST",
        data: {
            id //要修改数据的 id
        }
    });
}