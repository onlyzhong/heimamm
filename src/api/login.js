// 用来封装所有与登录相关的网络请求

// 导入 axios
import axios from "axios"
// 创建一个新的 axios 对象，并且设置基准地址
var instance = axios.create({
    baseURL: process.env.VUE_APP_URL
});

// axios.create: 单独创建一个新的 axios 实例
//      这个实例的用法与 axios 对象是一样的，
//      只不过实现可以创建多个，并且它们之间不会相互干扰
//   如果将来有这样的需求：
//       我们前端对应的服务器接口有两个：
//          第一个的基准地址： 139.160.1.1
//          第二个的基准地址： 120.110.11.1
//      那么我们就可以为两个基准地址分别创建两个 axios 实现，这样一来他们之互不干扰
// 注意点：
//  如果创建了 axios 的实例，我们需要在下面使用它

// 封装登录的方法
export function apiLogin({
    phone,
    password,
    code
}) {
    return instance({ // 这段是错误的，因为没有使用 instance，它没有基准地址
        url: `/login`,
        method: "POST",
        data: {
            phone: phone,
            password: password,
            code: code
        }
    });
}

// 封装登录的方法
// export function apiLogin({ phone, password, code }) {
//   return axios({ // 这段是错误的，因为没有使用 instance，它没有基准地址
//     url: `/login`,  
//     method: "POST",
//     data: {
//       phone: phone,
//       password: password,
//       code: code
//     }
//   });
// }