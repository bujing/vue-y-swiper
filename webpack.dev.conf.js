const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    host: '0.0.0.0',
    port: 2019
  },
  entry: {
    app: './src/main.js'
  },
  mode: 'development',
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
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'src/index.html')
    }),

    new VueLoaderPlugin()
  ]
}