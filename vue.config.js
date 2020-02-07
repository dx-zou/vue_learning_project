const path = require("path");
const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        // 共享sass 全局变量
        data: `@import "~@/styles/variables.scss";`
      },
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 100,
            propList: ["*"]
          })
        ]
      }
    }
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
  }
  // devServer: {
  //   proxy: {
  //     "/": {
  //       ws: false,
  //       // target: "http://127.0.0.1:3000",
  //       changeOrigin: true,
  //       pathRewrite: {
  //         "/": ""
  //       }
  //     }
  //   }
  // }
};
