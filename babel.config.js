let plugins = [];
// 去除生产环境下的console.log
if (process.env.NODE_ENV === "production") {
  plugins.push("transform-remove-console");
}

module.exports = {
  plugins: plugins,
  presets: ["@vue/app"]
};
