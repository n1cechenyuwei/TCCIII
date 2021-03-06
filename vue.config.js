const webpack = require('webpack');
// import '@babel/polyfill';
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
  // entry: {
  //   app: ['babel-polyfill', './src/main.js'],
  // },
  devServer: {
    open: true,
    host: '192.168.1.93',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: null,
    before: app => {
    }
  }
};
