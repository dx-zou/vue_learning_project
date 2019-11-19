import login from "@/views/login/login";
import layout from "../layout";
const constantRouterMap = [
  {
    path: "/login",
    name: "login",
    component: login
  },
  {
    path: "/",
    redirect: "/dashboard"
  },
  // 首页
  {
    path: "/dashboard",
    component: layout,
    children: [
      {
        path: "",
        name: "dashboard",
        component: () => import("@/views/home/home"),
        meta: {}
      }
    ]
  },
  // 我的组件
  {
    path: "/components",
    component: layout,
    meta: { title: "components" },
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
        path: "table",
        name: "table",
        component: () => import("@/views/my-components/table"),
        meta: {
          breadcrumbs: ["components", "table"]
        }
      }
    ]
  },
  // 常用
  {
    path: "/css-world",
    component: layout,
    name: "css-world",
    children: [
      {
        path: "color",
        name: "color",
        component: () => import("../views/css-world/css-color/css-color"),
        meta: {
          breadcrumbs: ["css-world", "color"]
        }
      },
      {
        path: "skill",
        name: "skill",
        component: () => import("../views/css-world/css-skill/css-skill"),
        meta: {
          breadcrumbs: ["css-world", "skill"]
        }
      },
      {
        path: "skill-sticky",
        name: "sticky",
        component: () => import("../views/css-world/css-skill/sticky.vue"),
        meta: {
          breadcrumbs: ["css-world", "css-sticky"]
        }
      },
      {
        path: "skill-2",
        name: "skill-2",
        component: () => import("../views/css-world/skill-2"),
        meta: {
          breadcrumbs: ["css-world", "skill-2"]
        }
      }
    ]
  },
  // js-learning
  {
    path: "/js-learning",
    component: layout,
    name: "js-learning",
    children: [
      {
        path: "lodash",
        name: "lodash",
        component: () => import("../views/js/lodash-test"),
        meta: {
          breadcrumbs: ["js-learning", "lodash"]
        }
      },
      {
        path: "regExp",
        name: "regExp",
        component: () => import("../views/js/regExp"),
        meta: {
          breadcrumbs: ["js-learning", "regExp"]
        }
      },
      {
        path: "upload",
        name: "upload",
        component: () => import("../views/js/upload"),
        meta: {
          breadcrumbs: ["js-learning", "upload"]
        }
      }
    ]
  },
  // vue 学习
  {
    path: "/vue",
    component: layout,
    children: [
      {
        path: "router",
        name: "router",
        component: () => import("@/views/vue/vue-router"),
        meta: {
          breadcrumbs: ["vue", "route"]
        }
      },
      {
        name: "slot",
        path: "slot",
        component: () => import("@/views/vue/todo"),
        meta: {
          breadcrumbs: ["vue", "slot"]
        }
      },
      {
        path: "transition",
        name: "transition",
        component: () => import("@/views/vue/transition"),
        meta: {
          breadcrumbs: ["vue", "transiton"]
        }
      },
      {
        path: "computed",
        name: "computed",
        component: () => import("@/views/vue/computed"),
        meta: {
          breadcrumbs: ["vue", "computed"]
        }
      }
    ]
  },
  // 第三方插件
  {
    path: "/third-party",
    component: layout,
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
  // 404
  {
    path: "*",
    component: () => import("@/views/404")
  }
];
export default constantRouterMap;
