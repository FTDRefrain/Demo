class CopyRightWebpackPlugin {
	constructor(options){
		this.options = options
	}
	apply(compiler){
		// 异步周期的执行方式
		compiler.hook.emit.tapAsync('CopyRightWebpackPlugin', (compilation, cb) => {
			compilation.assets['copyright.txt'] = {
				source: function(){
					return 'copy'
				},
				size: function() {
					return '4'
				}
			}
			// 必须调用
			cb()
		})
		// 同步函数，一个是没有cb，另一个是调用tap方式触发声明周期；
		compiler.hook.compile.tap('CopyRightWebpackPlugin', (compilation)=>{

		})
	}
}

module.exports = CopyRightWebpackPlugin
// 可以在浏览器里面打开node的调试工具，且在第一行打上了断点
// 且之后可以使用debugger打断点
node --inspect --inspect-brk node_modules/webpack/bin/webpack.js