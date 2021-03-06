const webpack = require('webpack');
const path = require('path');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = {
  entry: './client/src/index.js',
  devtool: 'source-map',
  output: {
    path: './dist',
    publicPath: './dist',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dev'),
      },
    }),
    new TransferWebpackPlugin([
      { from: 'www' },
    ], path.resolve(__dirname, 'client')),
  ],
  module: {
    loaders: [
      { test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
        },
      },
    ],
  },
};
