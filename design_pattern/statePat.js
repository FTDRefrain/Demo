// 状态模式 - 文件上传组件为例子
// 通用下的状态模式构建
const myPlugin = (function() {
	let plugin = document.createElement('embed')
	plugin.style.display = 'none'
	// 所有方法
	plugin.sign = function() {
		log('sign')
	}
	plugin.pause = function() {
		log('pause')
	}
	plugin.uploading = function() {
		log('uploading')
	}
	plugin.del = function() {
		log('del')
	}
	plugin.done = function() {
		log('done')
	}

	document.body.appendChild(plugin)
})()
// 构造函数
const Upload = function(filename) {
	this.plugin = myPlugin
	this.filename = filename
	this.btn1 = null
	this.btn2 = null
	this.signState = new SignState(this)
	this.uploadState = new UploadState(this)
	this.pauseState = new PauseState(this)
	this.doneState = new DoneState(this)
	this.errorState = new ErrorState(this)
	this.currentState = this.signState
}
// 初始化
Upload.prototype.init = function() {
	this.btn1 = document.createElement('button')
	this.btn2 = document.createElement('button')
	this.bindEvent()
}
// 事件绑定
Upload.prototype.bindEvent = function() {
	const self = this
	this.btn1.onclick = function() {
		self.currentState.clickHandle1()
	}
	this.btn2.onclick = function() {
		self.currentState.clickHandle2()
	}
}
// 委托方法
Upload.prototype.sign = function() {
	this.plugin.sign()
	this.currentState = this.signState
}

const StateFactory = (function() {
	// 设定方法
	let State = function(){}
	// 防止重写错误
	State.prototype.clickHandle1 = function() {
		throw new Error()
	}
	State.prototype.clickHandle2 = function() {
		throw new Error()
	}

	return function(param){
		let F = function(uploadObj) {
			this.uploadObj = uploadObj
		}
		// 继承
		F.prototype = new State()
		// 重写方法
		for(let p in param){
			F.prototype[p] = param[p]
		}
		return F
	}
})()
// 省略了其他状态转换的代码，例子如下
const SignState = StateFactory({
	// 委托过来调用的方法
	// 负责进行状态转换
	clickHandle1:function(){
		this.uploadObj.done()
		log('sign')
	},
	clickHandle2:function(){
		this.uploadObj.del()
		log('del')
	}
})

// JS版本 - FSM
const FSM = {
	off: {
		pressBtn:function(){
			// 使用call将Light传进来了
			this.state = FSM.on
		}
	},
	on: {
		pressBtn:function(){
			this.state = FSM.off
		}
	}
}
let Light = function() {
	this.state = FSM.off
	this.btn = null
}
Light.prototype.init = function() {
	const self = this
	this.btn = document.createElement('button')
	this.btn.onclick = function(){
		self.state.pressBtn.call(self)
	}
}

// JS版本 - 闭包和对象设计
const delegate = function(client, delegation){
	// 绑定对象和状态
	return {
		pressBtn:function() {
			// 调用状态改变，把对象传进去
			return delegation.pressBtn.apply(client, arguments)
		}
	}
}
const FSM = {
	off:{
		pressBtn:function(){
			// 设定状态
			this.state = this.onState
		}
	},
	on:{
		pressBtn:function(){
			this.state = this.offState
		}
	}
}

let Light = function() {
	// 添加状态
	this.onState = delegate(this, FSM.on)
	this.offState = delegate(this, FSM.off)
	this.state = this.offState
}
Light.prototype.init = function() {
	const self = this
	let btn = document.body.createElement('button')
	btn.onclick = function() {
		// 调用状态的方法
		self.state.pressBtn()
	}
}