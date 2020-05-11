const path = require("path");
const autoprefixer = require("autoprefixer");
// const pxtorem = require("postcss-pxtorem");
const resolve = dir => path.join(__dirname, dir);
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];

module.exports = {
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      return {
        plugins: [
          new CompressionWebpackPlugin({
            algorithm: "gzip",
            test: new RegExp(
              "\\.(" + productionGzipExtensions.join("|") + ")$"
            ),
            threshold: 10240, //对超过10k的数据进行压缩
            minRatio: 0.6 // 压缩比例，值为0 ~ 1
          })
        ]
      };
    } else {
      return {
        // devtool: "source-map"
      };
    }
  },
  css: {
    loaderOptions: {
      sass: {
        // 共享sass 全局变量
        data: `@import "~@/styles/variables.scss";`
      },
      postcss: {
        plugins: [
          autoprefixer()
          // pxtorem({
          //   rootValue: 100,
          //   propList: ["*"]
          // })
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
    config.module
      .rule("md")
      .test(/\.md/)
      .use("html-loader")
      .loader("html-loader")
      .end()
      .use("markdown-loader")
      .loader("markdown-loader");
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
