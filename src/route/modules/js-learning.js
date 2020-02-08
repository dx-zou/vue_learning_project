const layout = () => import("@/layout");

export default [
  // js-learning
  {
    path: "/js-learning",
    component: layout,
    name: "js-learning",
    sort: 3,
    children: [
      {
        path: "lodash",
        name: "lodash",
        component: () => import("@/views/js/lodash-test"),
        meta: {
          breadcrumbs: ["js-learning", "lodash"]
        }
      },
      {
        path: "regExp",
        name: "regExp",
        component: () => import(/* webpackChunkName: "js-group" */"@/views/js/regExp"),
        meta: {
          breadcrumbs: ["js-learning", "regExp"]
        }
      },
      {
        path: "canvas",
        name: "canvas",
        component: () => import(/* webpackChunkName: "js-group" */"@/views/js/canvas"),
        meta: {
          breadcrumbs: ["js-learning", "canvas"]
        }
      },
      {
        path: "upload",
        name: "upload",
        component: () => import(/* webpackChunkName: "js-group" */"@/views/js/upload"),
        meta: {
          breadcrumbs: ["js-learning", "upload"]
        }
      }
    ]
  }
];
