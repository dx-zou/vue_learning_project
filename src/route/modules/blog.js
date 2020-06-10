const layout = () => import("@/layout");
export default [
  {
    path: "/blog",
    component: layout,
    sort: 6,
    children: [
      {
        path: "list",
        name: "blog-node",
        component: () =>
          import(/* webpackChunkName: "blog-group" */ "@/views/blog"),
        meta: { breadcrumbs: ["blog", "blog-node"] }
      }
    ]
  }
];
