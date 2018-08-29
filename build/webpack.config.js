'use strict'

const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const resolve = dir => path.join(__dirname, '../', dir)

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    index: './index.js'
  },
  output: {
    path: resolve('lib'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'index',
    libraryExport: 'default',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/
      }
    ]
  },
  plugins: isProd
    ? [
      new UglifyJsPlugin({
        parallel: true,
        uglifyOptions: {
          compress: {
            warnings: false
          },
          mangle: true
        },
        sourceMap: true
      })
    ]
    : [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ]
}
