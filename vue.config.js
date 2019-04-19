const webpack = require('webpack');
module.exports = {
  baseUrl: './',
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        videojs: 'video.js'
      })
    ]
  },
  chainWebpack: config => {
    config
    .entry('index')
      .add('babel-polyfill')
  },
  devServer: {
    open: true,
    host: '127.0.0.1',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: null,
    before: app => {
    }
  }
};
