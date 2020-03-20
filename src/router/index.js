import Vue from 'vue'
import VueRouter from "vue-router"
import Login from "../views/login/index.vue"
import Index from "../views/index/index.vue"
// 导入 useElement 组件
// import UseElement from '../views/useElement/index.vue'

// 导入 index 组件的子路由
import Chart from '../views/chart/index.vue'
import User from '../views/user/index.vue'
import Question from '../views/question/index.vue'
import Enterprise from '../views/enterprise/index.vue'
import Subject from '../views/subject/index.vue'


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
            component: Index,
            children: [{
                    path: "chart",
                    component: Chart
                },
                {
                    path: "user",
                    component: User
                },
                {
                    path: "question",
                    component: Question
                },
                {
                    path: "enterprise",
                    component: Enterprise
                },
                {
                    path: "subject",
                    component: Subject
                },
                {
                    path: "",
                    redirect: "chart"
                },
            ]
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