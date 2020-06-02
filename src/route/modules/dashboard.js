const layout = () => import("@/layout");

export default [
  // 首页
  {
    path: "/",
    component: layout,
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "@/views/home/home"),
        meta: {}
      }
    ]
  }
];
