const layout = () => import("@/layout");

export default [
  // 第三方插件
  {
    path: "/plugins",
    component: layout,
    sort: 5,
    children: [
      {
        path: "editor",
        name: "editor",
        component: () =>
          import(
            /* webpackChunkName: "plugins-group" */ "@/views/plugins/quill-editor"
          ),
        meta: { breadcrumbs: ["plugins", "editor"] }
      },
      {
        path: "cropper",
        name: "cropper",
        component: () =>
          import(
            /* webpackChunkName: "plugins-group" */ "@/views/plugins/cropper"
          ),
        meta: { breadcrumbs: ["plugins", "cropper"] }
      },
      {
        path: "pdf",
        name: "pdf",
        component: () =>
          import(/* webpackChunkName: "plugins-group" */ "@/views/plugins/pdf"),
        meta: { breadcrumbs: ["plugins", "pdf"] }
      }
      // {
      //   path: "chat",
      //   name: "chat",
      //   component: () =>
      //     import(
      //        webpackChunkName: "plugins-group"  "@/views/plugins/chat"
      //     ),
      //   meta: { breadcrumbs: ["plugins", "chat"] }
      // }
    ]
  }
];
