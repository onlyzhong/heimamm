import Vue from 'vue'
import VueRouter from "vue-router"
import Login from "../views/login/index.vue"


// 注册
Vue.use(VueRouter)
// 实例化
const router = new VueRouter({
    routes: [
        {
            path: "/login",
            component: Login
        }
    ]
})
// 输出 出去router
export default router