import layout from "@/layout";
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
        component: () => import("@/views/css-world/css-color/css-color"),
        meta: {
          breadcrumbs: ["css-world", "color"]
        }
      },
      {
        path: "skill",
        name: "skill",
        component: () => import("@/views/css-world/css-skill/css-skill"),
        meta: {
          breadcrumbs: ["css-world", "skill"]
        }
      },
      {
        path: "skill-sticky",
        name: "sticky",
        component: () => import("@/views/css-world/css-skill/sticky.vue"),
        meta: {
          breadcrumbs: ["css-world", "css-sticky"]
        }
      },
      {
        path: "flip-clock",
        name: "flipClock",
        component: () => import("@/views/css-world/flip-clock"),
        meta: {
          breadcrumbs: ["css-world", "flipClock"]
        }
      },
      {
        path: "waterfall-flow",
        name: "waterfall",
        component: () => import("@/views/css-world/waterfall-flow"),
        meta: {
          breadcrumbs: ["css-world", "waterfall"]
        }
      },
      {
        path: "skill-2",
        name: "skill-2",
        component: () => import("@/views/css-world/skill-2"),
        meta: {
          breadcrumbs: ["css-world", "skill-2"]
        }
      },
      {
        path: "snow",
        name: "snow",
        component: () => import("@/views/css-world/snow"),
        meta: {
          breadcrumbs: ["css-world", "snow"]
        }
      }
    ]
  }
]