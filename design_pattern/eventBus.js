const log = console.log.bind()
// 发布-订阅模式
const EventBus = (function(){
	const global = this
	let event
	const _default = 'DEFAULT'

	event = function() {
		let nameSpaceCache = Object.create(null)
		// 订阅事件
		const _listen = function(key,fn,cache) {
			if(cache[key] === void 0) {
				cache[key] = []
			}
			cache[key].push(fn)
		}
		// 删除事件
		const _remove = function(key, fn, cache) {
			if(cache[key]){
				if(fn){
					for(let i=0;i<cache[key].length;i++){
						if(cache[key][i] === fn){
							cache[key].splice(i, 1)
						}
					}
				} else {
					cache[key] = []
				}
			}
		}
		// 发布事件
		const _trigger = function(...rest) {
			const cache = rest.shift()
			const key = rest.shift()
			for(let i =0;i<cache[key].length;i++){
				cache[key][i](...rest)
			}
		}
		// 命名空间引入
		const _create = function(namespace=_default) {
			let cache = Object.create(null)
			let offline = []
			ret = {
				listen: function(key, fn, last) {
					_listen(key, fn, cache)
					if(offline === null){
						return
					}
					if(last === 'last'){
						offline.length && offline.pop()()
					} else {
						for(let i =0;i<offline.length;i++){
							offline[i]()
						}
					}
					offline = null
				},
				one: function(key, fn, last){
					_remove(key, fn, cache)
					this.listen(key, fn, last)
				},
				remove: function(key, fn){
					_remove(key, fn, cache)
				},
				trigger: function(...rest) {
					const fn = () => _trigger(cache, ...rest)
					offline === null ? fn() : offline.push(fn)
					log(offline, 'offline2')
				}
			}
			if(namespace !== _default) {
				return nameSpaceCache[namespace] === null ? (nameSpaceCache[namespace] = ret) : nameSpaceCache[namespace]
			} else {
				return ret
			}
		}

		return {
			create: _create,
			e:null,
			one: function(key, fn, last){
				if(this.e === null) {
					this.e = this.create()
				}
				this.e.one(key, fn, last)
			},
			remove: function(key, fn){
				if(this.e === null) {
					this.e = this.create()
				}
				this.e.remove(key, fn)
			},
			listen: function(key, fn, last){
				const e = this.create()
				e.listen(key, fn, last)
			},
			trigger: function(){
				const e = this.create()
				e.trigger.apply(this, arguments)
			}
		}
	}

	return event()
})()
EventBus.trigger('click', 1)
EventBus.listen('click', function(a){
	console.log(a)
})
EventBus.trigger('click', 3)
EventBus.trigger('declick', 1)
EventBus.listen('declick', function(a){
	console.log(a+1)
})