// 抽出算法
const strategies = {
	isEmpty: function(v, errMsg) {
		v === '' && return errMsg
	},
	minLength: function(v, length,errMsg) {
		(v.length < length) && return errMsg
	},
	isPhoneNum: function(v, errMsg) {
		!/^1[3|5|8][0-9]{9}$/.test(v) && errMsg
	}
}
const aimForm = document.getElementById('aimForm')
//希望做到的调用方式
const validateFunc = function() {
	const validator = new Validator()
	// 目标form和多重标准都加入
	validator.add(aimForm.usename, [{
		strategy:'isEmpty', 
		errMsg:'can not be empty'
	}, {
		strategy:'minLength:8', 
		errMsg:'can not less than eight'
	}])
	validator.add(aimForm.password, [{
		strategy:'isEmpty', 
		errMsg:'can not be empty'
	}, {
		strategy:'minLength:6', 
		errMsg:'can not less than six'
	}])
	validator.add(aimForm.phoneNum, [{
		strategy:'isPhoneNum', 
		errMsg:'be a valid phone'
	}])

	const err = validator.start()
	err && return err
}

let Validator = function() {
	this.caches = []
}

Validator.prototype.add = function(dom, rules) {
	const self = this
	// 遍历rules去添加
	for(let i=0; i<rules.length; i++) {
		const rule = rules[i]
		(function(r){
			let strategyArr = r.split(':')
			const errMsg = rule.errMsg
			self.caches.push(function(){
				// 取出方法，放入value和errMsg用来调用方法
				const strategy = strategyArr.shift()
				// 因为有split后的参数，如minLength:6里面的6
				strategyArr.unshift(dom.value)
				strategyArr.push(errMsg)
				return strategies[strategy].apply(dom, strategyArr)
			})
		})(rule)
	}
}

Validator.prototype.start = function() {
	for(let i=0;i<this.caches.length;i++){
		const errMsg = this.caches[i]()
		errMsg && return errMsg
	}
}
// 绑定事件
aimForm.onsubmit = function() {
	const errMsg = validateFunc()
	if(errMsg) {
		alert(errMsg)
		return false
	}
}