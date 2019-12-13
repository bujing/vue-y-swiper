const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')

module.exports = [
  // YSwiper
  merge(baseWebpackConfig, {
    entry: {
      swiper: path.resolve(__dirname, '../src/core/index.js')
    },
    mode: 'production',
    output: {
      path: path.resolve(__dirname, '../dist/lib'),
      libraryTarget: 'umd',
      umdNamedDefine: true
    }
  }),

  // Demo
  merge(baseWebpackConfig, {
    entry: {
      app: path.resolve(__dirname, '../src/demo/main.js')
    },
    mode: 'production',
    output: {
      path: path.resolve(__dirname, '../dist/demo')
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(__dirname, '../src/demo/index.html')
      })
    ]
  })
]
