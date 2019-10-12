import { Notification, MessageBox } from "element-ui";
import $http from "@/http/request";
import Vue from "vue";
// 全局提示函数
function toast(type, message) {
  return Notification({
    duration: 2000,
    type,
    message
  });
}
function deleteDataFromTable(url, id) {
  return new Promise((resolve, reject) => {
    MessageBox.confirm("此操作将永久删除选择的数据, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        $http({
          url: $api[url] + `/${id}`,
          method: "delete"
          // data: {ids}
        }).then(res => {
          resolve();
        });
      })
      .catch(() => {
        reject();
      });
  });
}
Vue.prototype.$toast = toast;
Vue.prototype.$deleteDataFromTable = deleteDataFromTable;
export default {
  toast,
  deleteDataFromTable
};
