// let plugins = [];
// 去除生产环境下的console.log
// if (process.env.NODE_ENV === "production") {
//   plugins.push("transform-remove-console");
// }

module.exports = {
  presets: ["@vue/app"],
  plugins: [
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
    ]
    // [
    //   "component",
    //   {
    //     libraryName: "element-ui",
    //     styleLibraryName: "theme-chalk"
    //   }
    // ]
  ]
};
