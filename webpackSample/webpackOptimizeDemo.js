// cache
// 问题是热更新可能重复hit
module.exports = {
  module: {
    rules: [
      {
        test: /\.ext$/,
        use: ['cache-loader', ...loaders],
        include: path.resolve('src'),
      },
    ],
  },
  optimization:{
  	minimizer:[
  		new UglifyJsPlugin({
  			cache: true,
  			parallel: true
  		})
  	]
  }
};

// multiply cores: happypack
const HappyPack = require('happypack')
const os = require('os')
// 开辟一个线程池
// 拿到系统CPU的最大核数，happypack 将编译工作灌满所有线程
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
// 实质是对loader做一层包装
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        // 拿到对应的id
        use: 'happypack/loader?id=js',
      },
    ],
  },
  plugins: [
    new HappyPack({
      // export id to use
      id: 'js',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'babel-loader',
        },
      ],
    }),
  ],
}
// production下避免MiniCssExtraction
module.exports = {
	module: {
        rules: [
            ...,
            {
                test: /\.css$/
                exclude: /node_modules/,
                use: [
                	// production下不能使用happypack包裹css
                    _mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'happypack/loader?id=css'
                ]
            }
        ]
    },
    plugins: [
        new HappyPack({
          id: 'css',
          threadPool: happyThreadPool,
          loaders: [
            'cache-loader',
            'css-loader',
            'postcss-loader',
          ],
        }),
    ],
}

// externals配合CDN实现第三方库抽离
module.exports = {
	// k是包名, v是CDN给的名字
	externals: {
		'react': 'React',
		'react-dom': 'ReactDom',
		'redux': 'Redux',
		'react-router-dom': 'ReactRouterDom'
	}
}