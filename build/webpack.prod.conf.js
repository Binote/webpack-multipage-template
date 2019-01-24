// const webpack = require('webpack')
const merge = require('webpack-merge')
// const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require('autoprefixer')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const WebpackConf = require('./webpack.base.conf')
const mapDir = require('./config')
const HTMLPlugins = mapDir.HtmlWebpackPlugin
module.exports = merge(WebpackConf, {
  entry: mapDir.entry,
  optimization: {
    // runtimeChunk: {
    //   name: 'manifest'
    // },
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /node_modules\//,
          name: 'static/js/vendor',
          priority: 10,
          enforce: true
        },
        commons: {
          test: /utils\//,
          name: 'js/commons',
          priority: 2,
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
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
  plugins: [
    new CleanWebpackPlugin(['../dist']),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
      chunkFilename: 'css/[name].[hash:8].css'
    }),
    ...HTMLPlugins
  ]
})
