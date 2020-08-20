import layout from "@/layout";
export default [
  {
    path: "/vue",
    component: layout,
    sort: 4,
    children: [
      {
        path: "router",
        name: "router",
        component: () =>
          import(/* webpackChunkName: "vue-group" */ "@/views/vue/vue-router"),
        meta: {
          breadcrumbs: ["vue", "route"]
        }
      },
      {
        path: "transition",
        name: "transition",
        component: () =>
          import(
            /* webpackChunkName: "vue-group" */ "@/views/vue/vue-transiton"
          ),
        meta: {
          breadcrumbs: ["vue", "transiton"]
        }
      },
      {
        path: "anchor",
        name: "anchor",
        component: () =>
          import(/* webpackChunkName: "vue-group" */ "@/views/vue/anchor"),
        meta: {
          breadcrumbs: ["vue", "anchor"]
        }
      },
      {
        path: "computed",
        name: "computed",
        component: () =>
          import(/* webpackChunkName: "vue-group" */ "@/views/vue/computed"),
        meta: {
          breadcrumbs: ["vue", "computed"]
        }
      }
    ]
  }
];
