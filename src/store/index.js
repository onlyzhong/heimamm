// vuex 的仓库
// 用法与 vue-router 差不多
import Vue from 'vue'
// 导入 vuex
import Vuex from 'vuex'
// 使用 vuex
Vue.use(Vuex)
// 创建一个 store 对象
const store = new Vuex.Store({
    // 用来管理数据
    state: {
        name: '日川冈坂'
    },
    // 用来修改 state 的方法
    mutations: {
        // 所有 mutaions 中的方法的第一个参数都是 ： state
        changeName: function (state,mynane) {
            state.name = mynane
        }
    }
})

// 暴露 store
export default store
