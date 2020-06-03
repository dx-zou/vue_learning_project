const layout = () => import("@/layout");

export default [
  // 第三方插件
  {
    path: "/plugins",
    component: layout,
    sort: 5,
    children: [
      {
        path: "quill-editor",
        name: "quill-editor",
        component: () =>
          import(
            /* webpackChunkName: "plugins-group" */ "@/views/plugins/quill-editor"
          ),
        meta: { breadcrumbs: ["plugins", "quill-editor"] }
      },
      {
        path: "wow",
        name: "wow",
        component: () =>
          import(/* webpackChunkName: "plugins-group" */ "@/views/plugins/wow"),
        meta: { breadcrumbs: ["plugins", "wow"] }
      },
      {
        path: "pdf",
        name: "pdf",
        component: () =>
          import(/* webpackChunkName: "plugins-group" */ "@/views/plugins/pdf"),
        meta: { breadcrumbs: ["plugins", "pdf"] }
      },
      {
        path: "other",
        name: "other",
        component: () =>
          import(/*webpackChunkName: "plugins-group"*/ "@/views/plugins/other"),
        meta: { breadcrumbs: ["plugins", "other"] }
      }
    ]
  }
];
