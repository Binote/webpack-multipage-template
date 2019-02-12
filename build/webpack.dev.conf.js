const webpack = require('webpack')
const merge = require('webpack-merge')
// const path = require("path");
const autoprefixer = require('autoprefixer')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const config = require('../config')
const WebpackConf = require('./webpack.base.conf')
const entryHtmlPlugin = require('./entry-htmlPlugin')
const HTMLPlugins = entryHtmlPlugin.devHtmlWebpackPlugin
const portfinder = require('portfinder')
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
const devWebpackConfig = merge(WebpackConf, {
  mode: 'development',
  entry: entryHtmlPlugin.entry,
  devtool: config.dev.devtool,
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: false,
    contentBase: false,
    compress: true,
    hot: true, // 热加载
    // hotOnly:true, // 表示只会对可以热更新的部分进行热更新
    inline: true, // 自动刷新
    progress: true,
    open: config.dev.autoOpenBrowser, // 自动打开浏览器
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false, // 在浏览器上全屏显示编译的errors或warnings。
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true,
    watchOptions: {
      poll: config.dev.poll
    }
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'style-loader', // require.resolve('style-loader')
            options: {
              insertAt: 'top'
            }
          },
          {
            loader: 'css-loader', // require.resolve('css-loader'),
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader', // require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9'
                  ],
                  flexbox: 'no-2009'
                })
              ]
            }
          },
          {
            loader: 'sass-loader' // require.resolve('sass-loader')
          }
        ]
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), ...HTMLPlugins]
})
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${
                devWebpackConfig.devServer.host
              }:${port}`
            ]
          }
        })
      )

      resolve(devWebpackConfig)
    }
  })
})
