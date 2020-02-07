import Vue from "vue";
const files = require.context(".", false, /\.vue$/);
files.keys().forEach(key => {
  const componentName = key.replace(/^\.\/(.*)\.\w+$/, "$1");
  Vue.component(componentName, files(key).default);
});
// const components = [
//   CommonTable,
//   FnAlert,
//   FnDateRange,
//   CommonDialog,
//   CommonSelect,
//   SvgIcon,
//   TableToolbar,
//   AddTopbar,
//   Pagination
// ];
// components.forEach(component => {
//   component.install = function() {
//     Vue.component(component.name, component);
//   };
//   Vue.use(component);
// });
// export default components;
