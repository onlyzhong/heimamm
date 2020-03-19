//导入axios模块
import axios from "axios"

//封装获取短信验证码请求
export function apiGetCode({
    code,
    phone
}) {
    return axios({
        url: process.env.VUE_APP_ONLINEHTTP + "/sendsms",
        method: "POST",
        data: {
            code,
            phone
        },
        withCredentials: true
    })
}
//封装注册请求
// export function apiRegister({
//     username, //用户名
//     phone, //手机
//     email, //邮箱
//     avatar, //头像
//     password, //密码
//     rcode //验证码
// }) {
//     return axios({
//         url: process.env.VUE_APP_HTTP + "/register",
//         method: "POST",
//         data: {
//             username: username,
//             phone: phone,
//             email: email,
//             avatar: avatar,
//             password: password,
//             rcode: rcode,
//         }
//     })
// }



// export function apiRegister(registerForm) {
//     const {
//         niconame,
//         email,
//         phone,
//         password,
//         regcode,
//         avatar
//     } = registerForm;
//     console.log(niconame,
//         email,
//         phone,
//         password,
//         regcode,
//         avatar);

//     return axios({
//         url: process.env.VUE_APP_HTTP + "/register",
//         method: "POST",
//         data: {
//             username: niconame,
//             phone: phone,
//             email: email,
//             avatar: avatar,
//             password: password,
//             rcode: regcode,
//         }
//     })
// }

export function apiRegister({
    username,
    phone,
    email,
    avatar,
    password,
    rcode
}) {
    window.console.log(username,
        phone,
        email,
        avatar,
        password,
        rcode)
    return axios({
        url: process.env.VUE_APP_HTTP + '/register',
        method: "POST",
        data: {
            username: username,
            phone: phone,
            email: email,
            avatar: avatar,
            password: password,
            rcode: rcode
        }
    });
}