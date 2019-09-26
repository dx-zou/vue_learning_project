module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // 这里假设你有 `src/styles/variables.scss` 文件
        // 共享sass 全局变量
        data: `@import "~@/styles/variables.scss";`
      }
    }
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
