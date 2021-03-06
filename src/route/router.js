import login from "@/layout/login";

let constant_routes = [
  {
    path: "/login",
    name: "login",
    component: login
  },
  {
    path: "/",
    name: "0",
    redirect: "/dashboard"
  }
];

const files = require.context("./modules", false, /\.js$/);
files.keys().forEach(key => {
  constant_routes = constant_routes.concat(files(key).default);
});

const NotFound = [
  {
    path: "*",
    component: () => import("@/views/404")
  }
];

export default constant_routes.concat(NotFound);
