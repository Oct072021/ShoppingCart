const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  // 入口文件
  entry: './src/index.ts',

  // 指定打包文件所在目录
  output: {
    //  指定打包目录
    path: path.resolve(__dirname, 'dist'),
    // 打包后的文件
    filename: 'bundle.js',
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
                      chrome: '116',
                    },
                    // 指定corejs版本
                    corejs: '3',
                    // 使用corejs的方式  usage表示按需加载
                    useBuiltIns: 'usage',
                  },
                ],
              ],
            },
          },
          'ts-loader',
        ],
        // 要排除的文件
        exclude: /node-modules/,
      },
    ],
  },

  // 配置webpack插件
  plugins: [
    new HTMLWebpackPlugin({
      title: 'demo',
    }),
    new CleanWebpackPlugin(),
  ],

  // 用来设置应用模块
  resolve: {
    extensions: ['.ts', '.js'],
  },

  mode: 'development',
}
