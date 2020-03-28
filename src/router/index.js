import Vue from 'vue'
import VueRouter from "vue-router"
//导入登录组件
import Login from "../views/login/index.vue"
//导入主页组件
import Index from "../views/index/index.vue"
// 导入 useElement 组件
// import UseElement from '../views/useElement/index.vue'


// 导入 child
import child from "./childRouter.js";

//导入nprogress
import Nprogress from 'nprogress';
//导入样式
import "nprogress/nprogress.css";

//导入store
import store from "../store/index"

//导入message
import {
    Message
} from "element-ui";
// 导入方法
import {
    apiInfo
} from "../api/index.js"
//导入操作token的方法
import {
    getToken
} from "../utils/mytoken.js";
// 注册
Vue.use(VueRouter)
// 实例化
const router = new VueRouter({
    routes: [
        //登录
        {
            path: "/login",
            component: Login,
            meta: {
                title: "登录"
            }
        },
        // 设置首页路由
        {
            path: "/index",
            component: Index,
            meta: {
                title: "后台管理",
                roles: ["管理员", "老师", "学生", "超级管理员"]
            },
            children: child
        },
        //路由重定向
        {
            path: "/*",
            redirect: "/login"
        }
    ]
})
// 添加一个全局前置导航守卫：当路由发生改变之前会执行
// to：要跳转的目标路由
// from：当前跳转来源的路由
// next：是否继续执行后续的代码
router.beforeEach((to, from, next) => {

    document.title = to.meta.title
    Nprogress.start();
    //判断是否为登录界面
    console.log(to.path);

    if (to.path != "/login") {
        console.log(getToken());
        //判断是否存在token
        if (!getToken()) {
            //不存在则提示并跳转登录页面
            Message.error("请先登录,token错误");
            Nprogress.done();
            next("/login");
        } else {
            //存在则判断是否为真
            apiInfo().then(res => {
                //判断当前账户是否为禁用状态
                if (res.data.data.status == 0) {
                    Message.error("该账号已被禁用,请联系管理员");
                    Nprogress.done();
                    next("/login");
                } else {
                    console.log(res.data.code);

                    if (res.data.code == 200) {
                        // 创建一个用户信息对象
                        var userInfo = {};
                        // 设置用户名
                        userInfo.username = res.data.data.username;
                        // 设置用户头像
                        userInfo.avatar = process.env.VUE_APP_HTTP + "/" + res.data.data.avatar;
                        // 调用 mutations 中的方法
                        store.commit("setUserInfo", userInfo)
                        // 得到当前登录系统的用户角色
                        const role = res.data.data.role;
                        // console.log(role);

                        // 将用户角色保存到 vuex 中
                        store.commit("setRole", role);
                        // 判断当前访问的路由权限中是否保存 role
                        // console.log(to.meta.roles)
                        if (to.meta.roles.includes(role)) {
                            // 说明当前角色有访问本路由的权限
                            next();
                        } else {
                            // 说明当前角色没有访问本路由的权限
                            Message.error("对不起，您没有访问本路由的权限");
                            // 关闭进度条
                            Nprogress.done();
                        }
                    } else if (res.data.code == 206) {
                        Message.error("请先登录..............");
                        Nprogress.done();
                        next("/login")
                    }
                }

            })
        }
    } else {
        // Nprogress.done();
        next();
    }
})

router.afterEach(() => {
    Nprogress.done();
})
// 输出 出去router
export default router