import Vue from "vue";
import CommonTable from "./CommonTable/CommonTable";
import FnAlert from "./alert/alert";
import FnDateRange from "./dateRange/dateRange";
import CommonDialog from "./CommonDialog/CommonDialog";
import CommonSelect from "./CommonSelect";
import SvgIcon from "./icons/IconBase";
const components = [
  CommonTable,
  FnAlert,
  FnDateRange,
  CommonDialog,
  CommonSelect,
  SvgIcon
];
components.forEach(component => {
  component.install = function() {
    Vue.component(component.name, component);
  };
  Vue.use(component);
});
export default components;
