const layout = () => import("@/layout");

export default [
  // 我的组件
  {
    path: "/docs",
    component: layout,
    meta: { title: "docs" },
    children: [
      {
        path: "vue",
        name: "vue-doc",
        component: () =>
          import(/* webpackChunkName: "components-docs" */ "@/views/docs"),
        meta: {
          breadcrumbs: ["docs", "vue-doc"]
        }
      }
    ]
  }
];
