let plugins = [new HtmlWebpackPlugin({
	template: path.resolve(__dirname, '../')
}), new CleanWebpackPlugin({
	root: path.resolve(__dirname, '../')
})]
// 读取文件件下面所有文件
const files = fs.readdirSync(path.resolve(__dirname, '../dll'))
// 匹配文件名进行操作
files.foreach(file => {
	if(/.*\.dll.js/.test(file)){
		plugins.push(new AddAssetHtmlWebpackPlugin({
			filepath: path.resolve(__dirname, '../dll', file)
		}))
	}
	if(/.*\.mainfest.json/.test(file)){
		plugins.push(new webpack.DllReferencePlugin({
			mainfest: path.resolve(__dirname, '../dll', file)
		}))
	}
})

// 多页面打包方案
// runtime是hash更改值，避免web的缓存；vendors是第三方库名字
const makeConfig = configs => {
	Object.keys(configs).foreach(url => {
		plugins.push(new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: `${url}.html`,
			chunks: ['runtime', 'vendors', url]
		}))
	})
}