import { Notification } from 'element-ui';
// 全局提示函数
function toast(type, message) {
  return Notification({
    duration: 2000,
    type,
    message
  });
}

export default {
  toast
}
