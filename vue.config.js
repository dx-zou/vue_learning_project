const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // 这里假设你有 `src/styles/variables.scss` 文件
        // 共享sass 全局变量
        data: `@import "~@/styles/variables.scss";`
      }
    }
  },
  chainWebpack(config) {
     // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
  // devServer: {
  //   proxy: {
  //     "/": {
  //       ws: false,
  //       target: "http://192.168.0.88:8100",
  //       changeOrigin: true,
  //       pathRewrite: {
  //         "/": ""
  //       }
  //     }
  //   }
  // }
};
