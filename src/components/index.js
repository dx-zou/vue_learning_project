import Vue from "vue";
import CommonTable from "./CommonTable/CommonTable";
import FnAlert from "./alert/alert";
import FnDateRange from "./dateRange/dateRange";
import CommonDialog from "./CommonDialog/CommonDialog";
const components = [CommonTable, FnAlert, FnDateRange, CommonDialog];
components.forEach(component => {
  component.install = function() {
    Vue.component(component.name, component);
  };
});
export default components;
