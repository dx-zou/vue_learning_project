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
  fixedHeader: state => state.settings.fixedHeader,
  showMsgBox: state => state.app.showMsgBox
};
