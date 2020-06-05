const layout = () => import("@/layout");

export default [
  {
    path: "/css-world",
    component: layout,
    name: "css-world",
    sort: 1,
    children: [
      {
        path: "color",
        name: "color",
        component: () =>
          import(
            /* webpackChunkName: "css-world" */ "@/views/css-world/css-color/css-color"
          ),
        meta: {
          breadcrumbs: ["css-world", "color"]
        }
      },
      {
        path: "palette",
        name: "palette",
        component: () =>
          import(
            /* webpackChunkName: "css-world" */ "@/views/css-world/css-color/palette"
          ),
        meta: {
          breadcrumbs: ["css-world", "palette"]
        }
      },
      {
        path: "skill",
        name: "skill",
        component: () =>
          import(
            /* webpackChunkName: "css-world" */ "@/views/css-world/css-skill/css-skill"
          ),
        meta: {
          breadcrumbs: ["css-world", "skill"]
        }
      },
      {
        path: "skill-sticky",
        name: "sticky",
        component: () =>
          import(
            /* webpackChunkName: "css-world" */ "@/views/css-world/css-skill/sticky.vue"
          ),
        meta: {
          breadcrumbs: ["css-world", "css-sticky"]
        }
      },
      {
        path: "waterfall-flow",
        name: "waterfall",
        component: () =>
          import(
            /* webpackChunkName: "css-world" */ "@/views/css-world/waterfall-flow"
          ),
        meta: {
          breadcrumbs: ["css-world", "waterfall"]
        }
      },
      {
        path: "skill-2",
        name: "skill-2",
        component: () =>
          import(
            /* webpackChunkName: "css-world" */ "@/views/css-world/skill-2"
          ),
        meta: {
          breadcrumbs: ["css-world", "skill-2"]
        }
      },
      {
        path: "snow",
        name: "snow",
        component: () =>
          import(/* webpackChunkName: "css-world" */ "@/views/css-world/snow"),
        meta: {
          breadcrumbs: ["css-world", "snow"]
        }
      },
      {
        path: "animation",
        name: "animation",
        component: () =>
          import(
            /* webpackChunkName: "css-world" */ "@/views/css-world/animation"
          ),
        meta: {
          breadcrumbs: ["css-world", "animation"]
        }
      },
      {
        path: "shape",
        name: "shape",
        component: () =>
          import(/* webpackChunkName: "css-world" */ "@/views/css-world/shape"),
        meta: {
          breadcrumbs: ["css-world", "shape"]
        }
      }
    ]
  }
];
