// 执行shell命令
require('shelljs/global')

const webpack = require('webpack')
// 文件读取
const fs = require('fs')
// 工具包
const _ = require('lodash')
// 获得路径
const {resolve} = require('path')

// 拿到当前路径
const path = url => resolve(process.cwd(), url)

// 引入文件
const wepackConf = require('./webpack.conf')
// 设定路径
const assetsPath = path('./mina')
// 配置文件
const config = require(path('./mina-config'))
// 确保打包文件目录
rm('rf', assetsPath)
mkdir(assetsPath)
// 入口文件
var entry = () => _.reduce(config.json.pages, (en, i)=>{
	// 拿到路径下需要打包的所有文件，使用i进行站位
	en[i] = resolve(process.cwd(), './', `${i}.mina`)
	return en
},{})
renderConf.entry = entry()
renderConf.entry.app = config.app

// 出口
renderConf.output = {
	path: path('./mina'),
	filename: '[name].js'
}

// webpack根据配置进行编译
var compiler = webpack(renderConf)
// 将配置写出去
fs.writeFileSync(path('./mina/app.json'), JSON.stringify(config.json), 'utf8')
 
compiler.watch({
	aggregateTimeOut: 300,
	poll: true
},(err, status) => {
	process.stdout.write(stats.toString({
		colors: true,
		modules: false,
		children: true,
		chunks:true,
		chunkModules: true,
	})+'\n\n')
})