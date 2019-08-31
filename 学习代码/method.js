//记录的是常用面试函数的实现

function throttle(fn, delay){
	// 节流，避免高密度触发
	let prev = Date.now()
	return function(){
		const ctx = this
		const params = arguments
		let now = Date.now()
		// 只有大于设置的delay才会执行
		// 避免高密度触发
		if(now - prev >= now){
			fn.apply(ctx, params)
			prev = now
		}
	}
}

function throttleTwo(fn, delay) {
	let canRun = true
	return function(){
		const ctx = this
		const args = argument
		if(!canRun) {
			return
		} else {
			canRun = false
			setTimeout(()=>{
				fn.apply(ctx, args)
				canRun = true
			}, delay)
		}
	}
}

function debounce(fn, delay){
	// 防抖, 强制延长一段时间再执行
	let timer, handler
	handler = funciton(...args){
		if(timer){
			clearTimeout(timer)
		}
		timer = setTimeout(()=>{
			fn.apply(this, args)
		}, delay)
	}
	// 可以添加方法
	handler.cancel = function(){
		timer && clearTimeout(timer)
	}
	return handler
}

function myNew(fn, ...rest){
	// new实现
	let instance = Object.create(fn.prototype)
	// 执行构造方法
	let res = fn.apply(instance, rest)
	// 确保返回的是个对象
	typeof res === 'object' ? res : instance
}

function myExtend(sup, super){
	// extend实现
	sup.prototype = Object.create(super.prototype, {
		constructor:{
			enumerable: false,
			value: sup,
			configurable: true,
			writable: true,
		}
	})
	Object.setPrototypeof(sup, super)
}

function myBind(context, ...rest){
	// bind
	let ctx = this
	return function(){
		return ctx.apply(context, [...args, ...rest])
	}
}

function myCall(context, ...rest){
	// call and apply
	let ctx = context || window
	ctx.fn = this
	let result = ctx.fn(rest)
	delete ctx.fn
	return result
}
// 单例实现
// 包裹单例实现
let single = (function(){
	let instance
	return function(fn, ...rest){
		return instance || (instance = fn.apply(this, rest))
	}
})()
// 创建单一dom
let createDom = function(){
	let div = document.createElement('div')
	div.style.display = 'hidden'
	document.body.append(div)
	return div
}
// 单例主体
let Alert = (function(){
	let instance
	let dom
	function Alert(){
		instance = instance || (this instanceof Alert ?  this : new Alert())
		instance.init(content)
		return instance
	}
	Alert.prototype.init = function(content){
		dom = single(createDom)
		dom.innerHTML = content
	}
	Alert.prototype.show = function(){
		dom.style.display = 'block'
	}
	return Alert
})()
// 实现并发请求
function multiRequest(urls=[], maxRoutes=0, cb){
	const length = urls.length
	let count = 0
	const handler = function(){
		if(urls.length){
			const url = urls.shift()
			fetch(url).then(()=>{
				handler()
				count++
			}).catch((e)=>throw e)
		}
		// 执行完cb
		count == length && cb()
	}
	for(let i =0; i< length;i++){
		handler()
	}
}
// proxy简单例子
const wrapper = (target, defaultValue) => new Proxy(target, {
	get: (obj, prop) => {
		prop in obj ? obj[prop] : defaultValue
	},
	set: (obj, prop, v) => {
		obj[prop] = v
	}
})
// proxy缓存
const wrapper = (target, expire) => {
	const time = Date.now()
	const isExpired = (()=> Date.now() - time) > expire * 1000
	return new Proxy(target, {
		get: (obj, prop)=>{
			isExpired() ? obj[prop] : undefined
		}
	})
}
// proxy运算符重载
const range = (min, max) => new Proxy(Object.create(null), {
	has: (_, prop) => (+prop >= min && +prop < max)
})
3 in range(1, 2)
// curry
const curry = (fn, arr=[]) => fn.length === arr.length ? fn(arr) : (...args) => {
	curry(fn, [...args, ...arr])
} 
// reduce实现map
Array.prototype.myMap(cb){
	let arr = this
	return arr.reduce((acc, cur, i)=>{
		acc.push(cb(cur, i))
		// 必须要返回
		return acc
	}, [])
}
// deepClone
function deepClone(target){
	let hasCloneAux = []
	function _deepClone(target) {
		// 浅拷贝
		if(typeof target !== 'object' || !object) {
			return target
		}
		// 解决相同引用和循环引用
		for(let i=0;i<hasCloneAux.length;i++){
			if(hasCloneAux[i].target === target){
				return hasCloneAux[i].cloneTarget
			}
		}
		// 判定[]和{}
		let obj = Array.isArray(target) ? [] : {}
		// 缓存目标和引用
		hasCloneAux.push({target: target, cloneTarget: obj})
		// 递归调用
		Object.keys(target).foreach(key => {
			if(obj[key]) return
			obj[key] = _deepClone(target[key])
		})
		return obj
	}
	return _deepClone(target)
}
// mixin,多重继承的一种
function myMixin(obj, target) {
	const newObj = obj
	newObj.prototype = Object.create(obj.prototype)
	for(let prop in target){
		if(target.hasOwnProperty[prop]){
			newObj.prototype[prop] = target.hasOwnProperty[prop]
		}
	}
	return newObj
}