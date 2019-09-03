// 装饰者
// 基本思想 - 拿到原函数，组装后覆盖
let log = function() {
	console.log('123')
}
const _log = log
log = function() {
	_log()
	// doSomething()
}
// AOP方式
Function.prototype.before = function(beforeFn) {
	const _self = this
	return function() {
		beforeFn.apply(this, arguments)
		return _self.apply(this, arguments)
	}
}
Function.prototype.after = function(afterFn) {
	const _self = this
	return function() {
		const ret = _self.apply(this, arguments)
		afterFn.apply(this, arguments)
		return ret
	}
}
// 上面可以改成
// log = log.after(doSomething)
// 修改参数
let log2 = function(params) {
	console.log(params)
}
log2 = log2.before(function(params){
	params.b = 3
})
log2({
	a:1
})