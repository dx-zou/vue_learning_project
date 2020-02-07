import login from "@/views/login/login";
import layout from "../layout";
let routerList = [
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
  }
];
const files = require.context("./modules", false, /\.js$/);
files.keys().forEach(key => {
  routerList = routerList.concat(files(key).default);
});
const NotFound = [
  {
    path: "*",
    component: () => import("@/views/404")
  }
];

export default routerList.concat(NotFound);
