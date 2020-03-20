import Vue from 'vue'
import VueRouter from "vue-router"
import Login from "../views/login/index.vue"
import Index from "../views/index/index.vue"
// 导入 useElement 组件
// import UseElement from '../views/useElement/index.vue'


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
        //主页
        {
            path: "/index",
            component: Index
        },
        //路由重定向
        {
            path: "/",
            redirect: "/login"
        },

    ]
})
// 输出 出去router
export default router