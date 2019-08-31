// 开发环境下的打包文件
const path = require('path');
const fs = require('fs')
// 用于设置head里面的内容,构建的是多页面应用
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 用来清除上次打包压缩好的文件
const CleanWebpack = require('clean-webpack-plugin')
// 将目录下的静态文件都拷贝出去
const CopyWebpackPlugin = require('copy-webpack-plugin')
const srcRoot = path.resolve(__dirname, 'src')
const distPath = path.resolve(__dirname, 'dist')
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
                chunk:['common',key]
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
    mode:'production',
    // 里面的hot代表开启热更新
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
        path:distPath,
        filename:'js/[name].min.js',
        //找静态文件
        publicPath:'/'
    },
    module:{
        rules:[
            {test:/\.{js|jsx}$/, use:[{loader:'babel-loader'}, {loader:'eslint-loader'}], include:srcRoot},
            { test:/\.css$/, use:[MiniCssExtractPlugin.loader,'css-loader',], include:srcRoot },
            { test:/\.scss$/, use:[MiniCssExtractPlugin.loader,{
                loader:'css-loader',
                //开启压缩
                options:{
                    minimize:true
                }
            },'sass-loader',{
                loader:'sass-resources-loader',
                // 这里面是把一些通用的设置给引入进去
                options:{
                    resources:`${srcRoot}/component/common.scss`
                }
            }],include:srcRoot },
            // 对于图片进行解析，超过大小的使用url，且放到images目录下面
            { test:/\.(png|jpeg|jpg)$/, use:['url=loader?limit=8192&name=./images/[name].[hash].[ext]',], include:srcRoot },
        ]
    },
    optimization:{
        splitChunks:{
            cacheGroups:{
                common:{
                    test: /[\\/]node_modules[\\/]/,
                    chunk:'all',
                    name:'common'
                }
            }
        }
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename:"[id].css"
        }),
        // 第二个参数表示是否能压缩到项目之外的目录
        new CleanWebpackPlugin([distPath],{allowExternal:false}),
        new CopyWebpackPlugin([
                {
                    from:'src/json', to:path.resolve(distPath, 'json'), force:true
                },
                {
                    from:'src/static', to:path.resolve(distPath, 'static'), force:true
                }
            ])
    ].concat(htmlTemplate)
}