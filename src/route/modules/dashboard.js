const layout = () => import("@/layout");

export default [
  // 首页
  {
    path: "/dashboard",
    component: layout,
    children: [
      {
        path: "",
        name: "dashboard",
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "@/views/home/home"),
        meta: {}
      }
    ]
  }
];
