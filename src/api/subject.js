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
        // headers: {
        //     token: getToken()
        // },
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

// 封装状态切换的接口
export function apiChangeStatus(id) {
    return instance({
        url: "/subject/status",
        method: "POST",
        data: {
            id
        }
    });
}

//封装新增学科的接口
export function apiAddSubject(addForm) {
    let {
        rid,
        name,
        short_name,
        intro,
        remark
    } = addForm;
    return instance({
        url: "/subject/add",
        method: "POST",
        data: {
            rid,
            name,
            short_name,
            intro,
            remark
        }
    })

}

// 封装一个提交数据的方法
export function apiEidtSubject(editForm) {
    let {
        rid, // 学科编号
        name, // 学科名称
        short_name, // 简称
        intro, // 介绍
        remark, // 备注
        id //要修改数据的 id
    } = editForm;
    return instance({
        url: "/subject/edit",
        method: "POST",
        data: {
            rid, // 学科编号
            name, // 学科名称
            short_name, // 简称
            intro, // 介绍
            remark, // 备注
            id //要修改数据的 id
        }
    });
}

//封装一个删除学科的接口
export function apiDeleteSubject(deleteForm) {
    let {
        id //要修改数据的 id
    } = deleteForm;
    return instance({
        url: "/subject/remove",
        method: "POST",
        data: {
            id //要修改数据的 id
        }
    });
}