// 职责链模式，一步一步往下走，适合逻辑嵌套深层的
const NEXT_SUCCESSOR = 'nextSuccessor'
const log = console.log.bind()
const Chain = function(fn) {
	this.fn = fn
	this.successor = null
}

Chain.prototype.setNext = function(successor) {
	return this.successor = successor
}

Chain.prototype.passRequest = function() {
	const ret = this.fn.apply(this, arguments)
	if(ret === NEXT_SUCCESSOR){
		// 调用下一个successor的passRequest
		return this.successor && this.successor.passRequest.apply(this.successor, arguments)
	}
	return ret
}


const order500 = (id, type) => {
	if(id === 5) {
		log('success 5')
	}
	return NEXT_SUCCESSOR
}
const order200 = (id, type) => {
	if(id === 2) {
		log('success 2')
	}
	return NEXT_SUCCESSOR
}
const order100 = (id, type) => {
	if(id === 1) {
		log('success 1')
	}
	return NEXT_SUCCESSOR
}

// const fn500 = new Chain(order500)
// const fn200 = new Chain(order200)
// const fn100 = new Chain(order100)
// fn500.setNext(fn200)
// fn200.setNext(fn100)
// fn500.passRequest(1)

// 异步方式
Chain.prototype.next = function() {
	// 调用下一个successor的passRequest
	return this.successor && this.successor.passRequest.apply(this.successor, arguments)
}

const asyncFn = new Chain(function() {
	// 必须function保存到chain的this才能调用next
	const self = this
	setTimeout(()=>{
		self.next()
	}, 1000)
})

// AOP的after实现职责连
Function.prototype.after = function(fn) {
	const self = this
	return function() {
		// 先执行之前的函数
		const ret = self.apply(this, arguments)
		if(ret === NEXT_SUCCESSOR) {
			// 这里的this是执行完after的function
			return fn.apply(this, arguments)
		}
		return ret
	}
}

const chain = order500.after(order200).after(order100)
// chain(1)