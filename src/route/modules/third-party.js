import layout from "@/layout";
export default [
  // 第三方插件
  {
    path: "/third-party",
    component: layout,
    sort: 5,
    children: [
      {
        name: "easy-mock",
        path: "user",
        component: () => import("@/views/third-party/easy-mock"),
        props: {
          name: "feng"
        },
        meta: {
          breadcrumbs: ["third-party", "mock"]
        }
      },
      {
        path: "editor",
        name: "editor",
        component: () => import("@/views/third-party/quill-editor"),
        meta: { breadcrumbs: ["third-party", "editor"] }
      },
      {
        path: "cropper",
        name: "cropper",
        component: () => import("@/views/third-party/cropper"),
        meta: { breadcrumbs: ["third-party", "cropper"] }
      },
      {
        path: "chat",
        name: "chat",
        component: () => import("@/views/third-party/chat"),
        meta: { breadcrumbs: ["third-party", "chat"] }
      }
    ]
  },
]
