export default {
  // sidebar 是否收起
  sidebarCollapse: state => state.settings.sidebarCollapse,
  // 是否显示logo
  showLogo: state => state.settings.showLogo,
  // 是否旋转logo
  rotateLogo: state => state.settings.rotateLogo,
  // 设备
  device: state => state.app.device,
  // 活动的菜单项的index
  activeIndex: state => state.app.activeIndex,
  // 固定头部
  fixedHeader: state => state.settings.fixedHeader,
  // 显示隐藏消息框
  showMsgBox: state => state.app.showMsgBox,
  // 用户名称
  userInfo: state => state.user.userInfo,
  // 菜单栏列表
  menuList: state => state.user.menuList,
  // 菜单名称
  menuName: state => state.user.menuName
};
