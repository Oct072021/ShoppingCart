const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	// 入口文件
	entry: './src/index.ts',

	// 指定打包文件所在目录
	output: {
		//  指定打包目录
		path: path.resolve(__dirname, 'dist'),
		// 打包后的文件
		filename: 'static/js/index.js',
		clean: true
	},

	// 指定webpack打包时要使用的模块
	module: {
		// 指定要加载的规则
		rules: [
			{
				// 指定规则生效的文件
				test: /\.ts$/,
				// 要使用的loader
				use: [
					// 配置babel
					{
						// 指定加载器
						loader: 'babel-loader',
						// 设置babel
						options: {
							// 预置环境
							presets: [
								[
									//指定环境插件
									'@babel/preset-env',
									// 配置信息
									{
										// 要兼容的目标浏览器
										targets: {
											chrome: '116'
										},
										// 指定corejs版本
										corejs: '3',
										// 使用corejs的方式  usage表示按需加载
										useBuiltIns: 'usage'
									}
								]
							]
						}
					},
					'ts-loader'
				],
				// 要排除的文件
				exclude: /node-modules/
			},

			// 处理scss文件
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					{
						// 配置postcss    兼容更多浏览器
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [['postcss-preset-env', { browsers: 'last 2 versions' }]]
							}
						}
					},
					'sass-loader'
				]
			},

			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},

			// 处理图片
			{
				test: /\.(jpg|png)$/,
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: 8 * 1024
					}
				},
				generator: {
					filename: 'static/images/[hash][ext][query]'
				}
			},

			{
				// 对img标签路径进行处理
				test: /\.html$/,
				// html-loader使用commonJS规范对img标签路径进行处理
				loader: 'html-withimg-loader'
			}
		]
	},

	// 配置webpack插件
	plugins: [
		new HTMLWebpackPlugin({
			template: './public/index.html'
			// limit: 8 * 1024,
		})
	],

	// 用来设置应用模块
	resolve: {
		extensions: ['.ts', '.js']
	},

	mode: 'production'
}
