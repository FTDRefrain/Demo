// 仿照dev-server写，但是没有自动刷新
const express = require('express')
const webpack = require('webpack')
const webpackMiddleWare = require('webpack-middle-ware')
const config = require('webpack.config.js')

const app = express()
// webpack的编译器
const compiler = webpack(config)
// 中间件，实现每次访问就重新编译且指定输出路径
app.use(webpackMiddleWare(compiler, {
	publicPath: config.output.publicPath
}))

app.listen(3000, () => {
	console.log('server run');
})