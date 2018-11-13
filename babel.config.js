module.exports = {
  presets: [
    ['@vue/app', {
      polyfills: [
         // promise polyfill alone doesn't work in IE,
          // needs this as well. see: #1642
          'es6.array.iterator',
          // this is required for webpack code splitting, vuex etc.
          'es6.promise',
          // #2012 es6.promise replaces native Promise in FF and causes missing finally
          'es7.promise.finally',
          'es6.symbol'
      ]
    }]
  ]
}