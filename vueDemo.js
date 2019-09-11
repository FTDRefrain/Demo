import Vue from 'vue'
import axios from 'axios'
// 设置基础的url
axios.defaults.baseURL = 'https://www.123.com'
// 设置拦截中间件
axios.interceptors.response.use((rs)=>{
	return rs.data
}, (err) => {
	return Promise.reject(err)
})
// 可以任意组件通过this.$http访问到
Vue.prototype.$http = axios

// 过滤器的另一种方式，可以直接给:bind数据使用
Vue.filter('fixTwo', function(value){
	let result = parseFloat(value)
	return Number.isInterger(result) ? result : result.toFixed(2)
})