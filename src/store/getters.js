export default {
  // sidebar 是否收起
  sidebarCollapse: state => state.settings.sidebarCollapse,
  // 是否显示logo
  showLogo: state => state.settings.showLogo,
  // 是否旋转logo
  rotateLogo: state => state.settings.rotateLogo,
  // 菜单布局
  sideLayout: state => state.settings.sideLayout,
  // 固定头部
  fixedHeader: state => state.settings.fixedHeader,
  // 显示设置抽屉
  showSetting: state => state.settings.showSetting,
  // 暗黑主题
  darkTheme: state => state.settings.darkTheme,
  // 暗黑主题
  fullHeader: state => state.settings.fullHeader,
  // 设备类型
  device: state => state.app.device,
  // 活动的菜单项的index
  activeIndex: state => state.app.activeIndex,
  // 显示隐藏消息框
  showMsgBox: state => state.app.showMsgBox,
  // 用户名称
  userInfo: state => state.user.userInfo,
  // 菜单栏列表
  menuList: state => state.user.menuList,
  // 菜单名称
  menuName: state => state.user.menuName,
  // 登录用户头像
  profilePicture: state => state.socket.profilePicture,
  // 登录用户id
  userId: state => state.socket.userId,
  // 语言
  locale: state => state.settings.locale
};
