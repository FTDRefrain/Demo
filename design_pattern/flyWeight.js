// 享元模式 - 内部状态和外部状态分割
// 2000份文件上传
const createFatory = (function(){
	let objTypes = Object.create(null)
	return {
		// 内部状态
		create: function(type) {
			return objTypes[type] === void 0 ? (objTypes[type] = new Upload(type)) : objTypes[type]
		}
	}
})()

const uploadManager = (function(){
	let outDatabase = {}
	return {
		// 添加内容根据id存到database里面
		add: function(id, fileType, fileName, fileSize) {
			// 工厂模式创建内部状态
			const uploadObj = createFatory(fileType)
			// 逻辑
			const dom = document.createElement('div')
			dom.onclick = () => {
				uploadObj.addFile(id)
			}
			document.body.appendChild(dom)
			// 先保存外部状态
			outDatabase[id] = {
				fileName,
				fileSize,
				dom
			}
			return uploadObj
		},
		// 绑定外部状态
		setExternal:function(id, uploadObj) {
			const attr = outDatabase[id]
			for(let i in attr){
				uploadObj[i] = attr[i]
			}
		}
	}
})()
// 内部状态，根据type创建，因为有flash, input两种方式上传
const Upload = function(type) {
	this.type = type
}
// 绑定外部状态
Upload.prototype.addFile = function(id) {
	// 根据id调取对应的状态
	uploadManager.setExternal(id, this)
	// 执行逻辑
	if(this.fileSize < 3000) {
		return this.dom.parentNode.removeChild(this.dom)
	}
	if(window.confirm('want to add')){
		return this.dom.parentNode.removeChild(this.dom)
	}
}
// 扫描上传文件
window.startUpload = function(type, files) {
	let id = 0
	files.foreach(file => {
		uploadManager.add(id++, type, file.fileName, file.fileSize)
	})
}

// 对象池实现
const objPoolFactory = (fn) => {
	let pool = []
	return {
		// 有就直接返回否则创建
		create: function(){
			const obj = pool.length === 0 ? fn.apply(this, arguments) : pool.shift()
			return obj
		},
		// 使用完由使用者放回来
		recover: function(obj){
			pool.push(obj)
		}
	}
}
// 使用方式
const iframeFactory = objPoolFactory(function(){
	const iframe = document.createElement('iframe')
	document.body.appendChild(iframe)
	iframe.onload = function(){
		// 避免重复声明
		iframe.onload = null
		// 使用完放回去
		iframeFactory.recover(iframe)
	}
	return iframe
})
// 创建
const ifr = iframeFactory.create()