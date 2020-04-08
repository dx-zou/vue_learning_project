const layout = () => import("@/layout");

export default [
  // 第三方插件
  {
    path: "/third-party",
    component: layout,
    sort: 5,
    children: [
      {
        path: "editor",
        name: "editor",
        component: () =>
          import(
            /* webpackChunkName: "third-party-group" */ "@/views/third-party/quill-editor"
          ),
        meta: { breadcrumbs: ["third-party", "editor"] }
      },
      {
        path: "cropper",
        name: "cropper",
        component: () =>
          import(
            /* webpackChunkName: "third-party-group" */ "@/views/third-party/cropper"
          ),
        meta: { breadcrumbs: ["third-party", "cropper"] }
      },
      // {
      //   path: "chat",
      //   name: "chat",
      //   component: () =>
      //     import(
      //        webpackChunkName: "third-party-group"  "@/views/third-party/chat"
      //     ),
      //   meta: { breadcrumbs: ["third-party", "chat"] }
      // }
    ]
  }
];
