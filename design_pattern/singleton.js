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