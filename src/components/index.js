import Vue from "vue";
import CommonTable from "./CommonTable/CommonTable";
import fnAlert from "./alert/alert";
import fnTodo from "./todo/todo";
import fnDateRange from "./dateRange/dateRange";
import CommonDialog from "./CommonDialog/CommonDialog";
const components = [CommonTable, fnAlert, fnTodo, fnDateRange, CommonDialog];
components.forEach(component => {
  component.install = function() {
    Vue.component(component.name, component);
  };
});
export default components;
