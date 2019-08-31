// 下面的伪代码
// app.js
const app = new Vue({})
const store = new Vue.Store({})

const router = new Router({
	routes:[
		{path:'/p1',component:Page1},
		{path:'/p2',component:Page2},
		{path:'/p3',component:Page3},
	]
})

// server.js
// 根据上下文返回新的app
export default context = {
	// 拿到url
	router.push(context.url)
	// 对url中的所有组件进行遍历，如果改变了就重新拿数据
	return new Promise.all(router.getMatchedComponents.map(
		(component)=>{
			if(component.fetchServerData){
				return component.fetchServerData(store)
			}
		}
	)).then(() =>{
		// 更新上下文中的数据
		context.state = store.state
		return app
	})
}

// 更新状态并且挂载到dom上
store.replaceState(window._INITIAL_STATE_)
app.$mount('#app')











