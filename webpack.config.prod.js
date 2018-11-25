'use strict';

const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const cssExtract = require('mini-css-extract-plugin');
const cssOptimize = require('optimize-css-assets-webpack-plugin');
const HWP = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    path: __dirname + '/dist/',
    filename: 'game.js'
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
        use: [cssExtract.loader, 'css-loader', 'sass-loader'],
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
    new cssExtract({
      filename: 'style.css'
    }),
    new cssOptimize({})
  ]
}
