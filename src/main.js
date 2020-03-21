import Vue from 'vue'
import App from './App.vue'
//导入路由
import router from "./router/index"
// 导入模块
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//导入store
import store from "./store/index"


//导入css
import "./style/index.css"
//注册
Vue.use(ElementUI);
Vue.config.productionTip = false

// window.console.log(process.env.VUE_APP_NAME);
// window.console.log(process.env.VUE_APP_AGE);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')