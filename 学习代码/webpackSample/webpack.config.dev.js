// 基本的打包文件
const path = require('path');
const fs = require('fs')
// 用于设置head里面的内容,构建的是多页面应用
const HtmlWebpackPlugin = require('html-webpack-plugin');
const srcRoot = path.resolve(__dirname, 'src')
const devPath = path.resolve(__dirname, 'dev')
const pageDir = path.resolve(srcRoot, 'page')
const mainFile = 'index.js'

// 根据不同目录下的html生成不同的页面
function getHtmlTemplate(entryMap) {
    let htmlTemplate = []

    Object.keys(entryMap).forEach((key)=>{
        let fullPathName = path.resolve(pageDir, key)
        let fileName = path.resolve(fullPathName, `${key}.html`)

        if(fs.existsSync(fileName)){
            htmlTemplate.push(new HtmlWebpackPlugin({
                filename:`${key}.html`,
                template:fileName,
                // chunk表示生成的html引入哪些js文件，key就表示引入当前目录下的js文件
                chunk:[key]
            }))
        }
    })
    return htmlTemplate
}

// 遍历所有的入口文件,以后创建的时候就不用手动添加
function getEntry(){
    let entryMap = {}

    fs.readdirSync(pageDir).foreach((pathname)=>{
        // 转化成绝对路径并且拿到下面的index
        let fullPathName = path.resolve(pageDir,pathname)
        let fileName = path.resolve(fullPathName, mainFile)

        let stat = fs.statSync(fullPathName)

        if(stat.isDirectory() && fs.existsSync(fileName)) {
            entryMap[pathname] = fileName
        }

        return entryMap
    })
}

const entryMap = getEntry();
// 返回的是所有的目录下传入不同模板的插件
const htmlTemplate = getHtmlTemplate()

module.exports = {
    mode:'development',
    // 里面的hot代表开启热更新
    devServer:{
        contentBase:devPath,
        hot:true
    },
    entry:entryMap,
    // 省略后缀
    resolve:{
        // 自定义缩写
        alias:{
            component: path.resolve(srcRoot, 'component')
        },
        extensions:['.js','.jsx'],
    },
    output:{
        path:devPath,
        filename:'[name].min.js'
    },
    module:{
        rules:[
            {test:/\.{js|jsx}$/, use:[{loader:'babel-loader'}, {loader:'eslint-loader'}], include:srcRoot},
            { test:/\.css$/, use:['style-loader','css-loader',], include:srcRoot },
            { test:/\.scss$/, use:['style-loader','css-loader','sass-loader'], include:srcRoot },
            // 对于图片进行解析，超过大小的使用url
            { test:/\.(png|jpeg|jpg)$/, use:['url=loader?limit=8192',], include:srcRoot },
        ]
    },
    plugins:[
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ].concat(htmlTemplate)
}