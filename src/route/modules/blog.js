import layout from "@/layout";
export default [
  {
    path: "/blog",
    component: layout,
    sort: 6,
    children: [
      {
        path: "list",
        name: "blog-node",
        component: () => import("@/views/blog"),
        meta: { breadcrumbs: ["blog", "blog-node"] }
      },
      {
        path: "add-blog",
        name: "addBlog",
        component: () => import("@/views/blog/add"),
        meta: { breadcrumbs: ["blog", "add-blog"] }
      },
      {
        path: "edit-blog/:id",
        name: "editBlog",
        component: () => import("@/views/blog/add"),
        meta: { breadcrumbs: ["blog", "edit-blog"] }
      }
    ]
  },
]