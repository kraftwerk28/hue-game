'use strict';

const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HWP = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: __dirname + '/dist/',
    filename: 'game.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s(c|a)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HWP({
      minify: true,
      template: 'src/template.html'
    }),
  ],
  devServer: {
    compress: true,
    host: '0.0.0.0',
    overlay: true,
    stats: 'minimal',
    // lazy: true,
  }
}
