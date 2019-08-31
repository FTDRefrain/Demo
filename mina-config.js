// 获得路径
const {resolve} = require('path')

// 拿到当前路径
const path = url => resolve(_dirname, url)

module.exports = {
	"json":{
		"pages":[
			"pages/index/index",
			"pages/logs/logs"
		],
		"window":{
			"backgroundTextStyle":"light",
			"navigationBarBackgroundColor":"$fff",
			"navigationBarTitleText":"WeChat",
			"navigationBarTextStyle":"black"
		} 
	},
	"style":{
		url:path('./style/base.sass'),
		lang:'sass'
	},
	"app":path('./app.js')
}