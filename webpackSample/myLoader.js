// webpack 配置
module: {
	rules:{
		test: /\.js$/,
		use:[{
			loader: path.resolve(__dirname, './myLoader.js'),
			// 会作为query进行访问
			options: {
				name: 'lee'
			}
		}]
	}
}
// 下面配置的是loaders的查找方式
// 有了这个直接写名字就可以了
// 不写路径的时候是直接去node_modules里面查找
resolveLoader: {
	modules: ['node_modules', './loaders']
}
// 一定要是function 因为有this指向问题
module.exports = function(source) {
	return source.replace('1', this.query.name)
}

// loader-utils使用
const loaderUtils = require('loader-utils')
module.exports = function(source) {
	const options = loaderUtils.getOptions(this)
	source.replace('123', options.name)
	// 希望传递信息或者构建sourceMap用来分析
	this.callback(err, result, sourceMap, data)
}

// 异步操作相关
module.exports = function(source) {
	const options = loaderUtils.getOptions(source)
	// 声明异步操作
	const callback = this.async()

	setTimeout(() => {
		const result = source.replace('123', options.name)
		callback(null, result)
	}, 1000)
}