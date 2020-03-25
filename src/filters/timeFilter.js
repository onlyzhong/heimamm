// 导入Vue
import Vue from "vue"
//导入moment
import moment from "moment"

//创建一个全局过滤器
Vue.filter('setTime', function (value) {
    return moment(value).format("YYYY-DD-MM");
});