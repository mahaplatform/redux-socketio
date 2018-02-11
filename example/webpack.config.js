const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env) => ({
  entry: {
    main: './src/client/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: './js/[name].[chunkhash].js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (module) => {
        return module.context && module.context.indexOf('node_modules') !== -1
      }
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'public', 'index.html'),
      template: path.resolve(__dirname, 'src', 'client', 'index.html'),
      title: 'Redux SocketIO Client'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader?+babelrc,+cacheDirectory'
        }
      }
    ]
  }
})
