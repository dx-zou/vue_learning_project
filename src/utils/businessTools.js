import { Notification, MessageBox } from "element-ui";

/**
 * @description 全局toast提示方法
 *
 * @param {*} type
 * @param {*} message
 * @returns
 */
function toast(message = "", type = "success") {
  return Notification({
    duration: 2000,
    type,
    message
  });
}
/**
 * @description 删除提示方法
 *
 * @returns
 */
function deleteConfirm(value = "此操作将永久删除选择的数据, 是否继续?") {
  return new Promise(resolve => {
    MessageBox.confirm(value, "提示", {
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
export default {
  toast,
  deleteConfirm
};
