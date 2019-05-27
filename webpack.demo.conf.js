const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: './src/main.js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'demo'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, './src/index.html')
    }),
    new VueLoaderPlugin()
  ]
}