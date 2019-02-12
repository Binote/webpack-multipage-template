// const webpack = require('webpack')
const merge = require('webpack-merge')
// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require('autoprefixer')

const WebpackConf = require('./webpack.base.conf')
const entryHtmlPlugin = require('./entry-htmlPlugin')
const HTMLPlugins = entryHtmlPlugin.devHtmlWebpackPlugin
module.exports = merge(WebpackConf, {
  mode: 'development',
  entry: entryHtmlPlugin.entry,
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
  plugins: [...HTMLPlugins]
})
