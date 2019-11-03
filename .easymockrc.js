module.exports = {
  output: "api",
  template: "axios",
  projects: [
    {
      id: "5c949a926811807c6b28d8c0",
      name: "user", // 生成到 api/user 目录下。
      black: [
        "/query" // 排除 query 接口
      ]
    },
    {
      id: "5c949a926811807c6b28d8c0",
      name: "top", // 生成到 api/top 目录下。
      white: [
        "/proxy" // 只生成 proxy 接口
      ]
    }
  ]
};
