import Vue from 'vue'
import VueRouter from "vue-router"
//导入登录组件
import Login from "../views/login/index.vue"
//导入主页组件
import Index from "../views/index/index.vue"
// 导入 useElement 组件
// import UseElement from '../views/useElement/index.vue'



// 导入 index 组件的子路由
import Chart from '../views/chart/index.vue'
import User from '../views/user/index.vue'
import Question from '../views/question/index.vue'
import Enterprise from '../views/enterprise/index.vue'
import Subject from '../views/subject/index.vue'

//导入nprogress
import NPprogress from 'nprogress';
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
        //主页
        {
            path: "/index",
            component: Index,
            meta: {
                title: "后台管理"
            },
            children: [{
                    path: "chart",
                    component: Chart,
                    meta: {
                        title: "数据概览"
                    }
                },
                {
                    path: "user",
                    component: User,
                    meta: {
                        title: "用户列表"
                    }
                },
                {
                    path: "question",
                    component: Question,
                    meta: {
                        title: "题库列表"
                    }
                },
                {
                    path: "enterprise",
                    component: Enterprise,
                    meta: {
                        title: "企业列表"
                    }
                },
                {
                    path: "subject",
                    component: Subject,
                    meta: {
                        title: "学科列表"
                    }
                },
                // 子组件路由重定向
                {
                    path: "*",
                    redirect: "chart"
                },
                // 进主页直接进入chart组件
                {
                    path: "",
                    redirect: "chart"
                },
            ]
        },
        //路由重定向
        {
            path: "/*",
            redirect: "/login"
        },

    ]
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    NPprogress.start();
    if (to.path != "/login") {
        console.log(getToken());
        if (!getToken()) {
            Message.error("请先登录");
            NPprogress.done();
            next("/login");
        } else {
            apiInfo().then(res => {
                if (res.data.code == 200) {
                    var userInfo = {};
                    userInfo.username = res.data.data.username;
                    userInfo.avatar = process.env.VUE_APP_HTTP + "/" + res.data.data.avatar;
                    store.commit("setUserInfo", userInfo)
                    next();
                } else if (res.data.code == 206) {
                    Message.error("请先登录");
                    NPprogress.done();
                    next("/login")
                }
            })
        }
    } else {
        // NPprogress.done();
        next();
    }
})

router.afterEach(() => {
    NPprogress.done();
})
// 输出 出去router
export default router