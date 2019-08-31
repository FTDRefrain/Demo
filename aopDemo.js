Function.prototype.before = function(beforefn) {
	const self = this
	return function() {
		// 修正this
		beforefn.apply(this, arguments)
		// 结果保存
		return self.apply(this, arguments)
	}
}

Function.prototype.after = function(afterfn) {
	const self = this
	return function() {
		const res = self.apply(this, arguments)
		afterfn.apply(this, arguments)
		return res	
	}
}

const log = console.log.bind()

let test = function() {
	log(2)
}
test = test.before(function(){
	log(1)
}).after(function(){
	log(3)
})

test()