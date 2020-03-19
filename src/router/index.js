import Vue from 'vue'
import VueRouter from "vue-router"
import Login from "../views/login/index.vue"
import UseElementUI from "element-ui"


// 注册
Vue.use(VueRouter)
// 实例化
const router = new VueRouter({
    routes: [
        //登录
        {
            path: "/login",
            component: Login
        },
        //路由重定向
        { 
            path: "/",
            redirect: "/login"
        },
        //使用element的路由规则
        {
            path: "/useElement",
            component: UseElementUI
        }
    ]
})
// 输出 出去router
export default router