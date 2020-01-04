import { Notification, MessageBox } from "element-ui";
import Vue from "vue";
// 全局提示函数
function toast(type, message) {
  return Notification({
    duration: 2000,
    type,
    message
  });
}
function deleteConfirm() {
  return new Promise(resolve => {
    MessageBox.confirm("此操作将永久删除选择的数据, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        resolve(false);
      });
  });
}
Vue.prototype.$toast = toast;
Vue.prototype.$deleteConfirm = deleteConfirm;
export default {
  toast,
  deleteConfirm
};
