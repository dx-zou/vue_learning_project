import layout from "@/layout";
export default [
  // 我的组件
  {
    path: "/components",
    component: layout,
    meta: { title: "components" },
    sort: 2,
    children: [
      {
        path: "date-select",
        name: "date",
        component: () => import("@/views/my-components/dateSelect"),
        meta: {
          breadcrumbs: ["components", "date"]
        }
      },
      {
        path: "indentify-code",
        name: "indentifyCode",
        component: () => import("@/views/my-components/indentify-code"),
        meta: {
          breadcrumbs: ["components", "indentifyCode"]
        }
      }
    ]
  }
];
