module.exports = {
  // baseUrl: './',
  chainWebpack:  config => {
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
