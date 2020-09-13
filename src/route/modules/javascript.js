import layout from "@/layout";
export default [
  // js-learning
  {
    path: "/js-learning",
    component: layout,
    name: "js-learning",
    sort: 3,
    children: [
      {
        path: "ES6",
        name: "ES6",
        component: () =>
          import(/* webpackChunkName: "js-group" */ "@/views/js/es6"),
        meta: {
          breadcrumbs: ["js-learning", "ES6"]
        }
      },
      {
        path: "regExp",
        name: "regExp",
        component: () =>
          import(/* webpackChunkName: "js-group" */ "@/views/js/regExp"),
        meta: {
          breadcrumbs: ["js-learning", "regExp"]
        }
      },
      {
        path: "canvas-1",
        name: "canvas-1",
        component: () =>
          import(/* webpackChunkName: "js-group" */ "@/views/js/canvas/index"),
        meta: {
          breadcrumbs: ["js-learning", "canvas", "canva-1"]
        }
      },
      {
        path: "canvas-2",
        name: "canvas-2",
        component: () =>
          import(/* webpackChunkName: "js-group" */ "@/views/js/canvas/index2"),
        meta: {
          breadcrumbs: ["js-learning", "canvas", "canva-2"]
        }
      },
      {
        path: "upload",
        name: "upload",
        component: () =>
          import(/* webpackChunkName: "js-group" */ "@/views/js/upload"),
        meta: {
          breadcrumbs: ["js-learning", "upload"]
        }
      },
      {
        path: "snake",
        name: "snake",
        component: () =>
          import(/* webpackChunkName: "js-group" */ "@/views/js/snake"),
        meta: {
          breadcrumbs: ["js-learning", "snake"]
        }
      },
      {
        path: "drag",
        name: "drag",
        component: () =>
          import(/* webpackChunkName: "js-group" */ "@/views/js/drag"),
        meta: {
          breadcrumbs: ["js-learning", "drag"]
        }
      }
    ]
  }
];
