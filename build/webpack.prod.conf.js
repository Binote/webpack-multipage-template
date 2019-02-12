// const webpack = require('webpack')
const merge = require('webpack-merge')
// const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const config = require('../config')
const autoprefixer = require('autoprefixer')
// const CleanWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const WebpackConf = require('./webpack.base.conf')
const entryHtmlPlugin = require('./entry-htmlPlugin')

const HTMLPlugins = entryHtmlPlugin.HtmlWebpackPlugin
let webpackConfig = merge(WebpackConf, {
  mode: 'production',
  entry: entryHtmlPlugin.entry,
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false
          }
        },
        sourceMap: config.build.productionSourceMap,
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          chunks: 'initial', // initial表示提取入口文件的公共部分
          test: /node_modules/,
          name: 'vendor',
          priority: 10
          // enforce: true
        },
        commons: {
          chunks: 'initial', // initial表示提取入口文件的公共部分
          minChunks: 2, // 表示提取公共部分最少的文件数
          minSize: 0, // 表示提取公共部分最小的大小
          name: 'commons' // 提取出来的文件命名
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
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
  plugins: [
    // new CleanWebpackPlugin(['dist'], { root: path.join(__dirname, '../') }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
      chunkFilename: 'css/[name].[hash:8].css'
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g, // 一个正则表达式，指示应优化\最小化的资产的名称。提供的正则表达式针对配置中ExtractTextPlugin实例导出的文件的文件名运行，而不是源CSS文件的文件名。默认为/\.css$/g
      cssProcessor: require('cssnano'), // 用于优化\最小化CSS的CSS处理器，默认为cssnano。这应该是一个跟随cssnano.process接口的函数（接收CSS和选项参数并返回一个Promise）。
      cssProcessorOptions: { safe: true, discardComments: { removeAll: true } }, // 传递给cssProcessor的选项，默认为{}
      canPrint: true // 一个布尔值，指示插件是否可以将消息打印到控制台，默认为true
    }),
    ...HTMLPlugins
  ]
})
if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')
  const options = {
    // asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: new RegExp(
      '\\.(' + config.build.productionGzipExtensions.join('|') + ')$'
    ),
    threshold: 10240,
    minRatio: 0.8
  }
  webpackConfig.plugins.push(new CompressionWebpackPlugin(options))
}
if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
module.exports = webpackConfig
