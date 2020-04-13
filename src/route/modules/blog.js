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
      },
      {
        path: "add-blog",
        name: "addBlog",
        component: () =>
          import(/* webpackChunkName: "blog-group" */ "@/views/blog/add"),
        meta: { breadcrumbs: ["blog", "add-blog"] }
      },
      {
        path: "edit-blog/:id",
        name: "editBlog",
        props: true,
        component: () =>
          import(/* webpackChunkName: "blog-group" */ "@/views/blog/add"),
        meta: { breadcrumbs: ["blog", "edit-blog"] }
      }
    ]
  }
];
