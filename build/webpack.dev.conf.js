const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')

module.exports = merge(baseWebpackConfig, {
  devServer: {
    contentBase: path.join(__dirname, '../src'),
    host: '0.0.0.0',
    port: 2019
  },
  entry: {
    app: path.resolve(__dirname, '../src/demo/main.js')
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../src/demo/index.html')
    })
  ]
})
