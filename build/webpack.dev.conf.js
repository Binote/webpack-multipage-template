// const webpack = require('webpack')
const merge = require('webpack-merge')
// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require('autoprefixer')

const WebpackConf = require('./webpack.base.conf')
const mapDir = require('./config')
const HTMLPlugins = mapDir.devHtmlWebpackPlugin
module.exports = merge(WebpackConf, {
  entry: mapDir.entry,
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: false,
    contentBase: false,
    compress: true,
    hot: true, // 热加载
    // hotOnly:true, // 表示只会对可以热更新的部分进行热更新
    inline: true, // 自动刷新
    progress: true,
    open: true, // 自动打开浏览器
    host: 'localhost',
    port: 8088,
    overlay: {
      warnings: true,
      errors: false
    }, // 在浏览器上全屏显示编译的errors或warnings。
    publicPath: '/',
    proxy: {},
    quiet: true,
    watchOptions: {
      poll: false
    }
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: require.resolve('style-loader')
          },
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1
            }
          },
          {
            loader: require.resolve('postcss-loader'),
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
            loader: require.resolve('sass-loader')
          }
        ]
      }
    ]
  },
  plugins: [...HTMLPlugins]
})
