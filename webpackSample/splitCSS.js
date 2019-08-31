module: {
	loaders:[{
		test: /\.jsx?$/,
		loader: 'babel'
	}, {
		test: /\.scss$/,
		// exclude将公共部分抽出去
		exclude: path.resolve(__dirname, 'src/styles'),
		loader: 'style!css?modules&localIdentName=[name]__[local]!sass?sourceMap=true'
	}, {
		test: /\.scss$/,
		include: path.resolve(__dirname, 'src/styles'),
		loader: 'style!css!sass?sourceMap=true',
	}]
}