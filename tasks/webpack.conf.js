cosnt {resolve} = require('path')
const path = url => resolve(_dirname, url)

const webpack = require('webpack')
const CopyWepackPlugin = require('copy-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
// 引入识别文件名的包
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// 因为是微信小程序
const extractSass = new ExtractTextPlugin({
	filename: '[name].wxss'
})

module.exports = {
	devtool: false,
	output: {
		path: path('./mina'),
		filename: '[name].js'
	},
	resolve: {
		// 添依赖
		alias: {
			utils: path('../utils/utils')
		}
	},
	module: {
		rules: [
		// 第一条规则
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					// 调用babel时候添加的规则
					presets: [
						['env',{
							modules: false
						}]
					]
				}
			},
			// 配置样式的规则
			{
				test: /\.sass$/,
				use:extractSass.extract({
					use:[
						// 加载不同的loader
						{
							loader:'css-loader'
						},
						{
							loader:'postcss-loader',
							options:{
								plugins:(loader)=>[
									require('autoprefixer')({
										browsers:[
											'last 2 version'
										]
									})
								]
							}
						},
						{
							loader:'sass-loader',
							// 设置缩进
							options:{
								indentedSyntax:true
							}
						}
					],
					// default
					fallback:'style-loader'
				})
			},
			// 配置小程序的规则
			{
				test:/.\mina$/,
				loader:'wechat-mina-loader',
				options:{
					path:path('../'),
					dist:'./mina'
				}
			}
		]
	},
	// 插件
	plugins:[
		extractSass,
		// 拷贝文件的插件 
		new CopyWepackPlugin([
				{
					from:{
						glob:'pages/**/*.json',
					},
					to:{
						''
					}
				},
				{
					from:'static',
					to:'static'
				}
		]),
		// 模块缩进的插件
		new webpack.optimize.ModuleConcatnationPlugin(),
		// js文件压缩
		new webpack.optimize.UglifyJsPlugin({
			sourceMap:false
		}),
		// 进度条插件
		new ProgressBarPlugin()

	]

}