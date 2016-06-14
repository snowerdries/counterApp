var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',

  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './frontend/app.js'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  eslint: {
    configFile: '.eslintrc',
    failOnWarning: false,
    failOnError: false
  },

  module: {
    preLoaders: [
      {
        test: /\.jsx$|\.js$/,
        loader: 'eslint-loader',
        exclude: /(node_modules|public)/
      }
    ],
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'react-hot!babel',
        include: path.join(__dirname, 'frontend'),
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'frontend'),
        exclude: /node_modules/
      },
      {
        test: /\.scss?$/,
        loader: 'style!css!sass',
        include: path.join(__dirname, 'css')
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
        loader: 'url-loader?limit=10000',
      }
    ]
  }
}
