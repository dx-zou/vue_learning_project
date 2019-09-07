const steps = [
  {
    element: '#sidebar',
    popover: {
      title: '菜单导航',
      description: '点击菜单可切换右侧菜单内容',
      position: 'right'
    },
    padding: 0
  },
  {
    element: '#toggleSidebar',
    popover: {
      title: '折叠按钮',
      description: '点击收缩和展开菜单导航',
      position: 'bottom'
    }
  },
  {
    element: '#breadCrumbs',
    popover: {
      title: '面包屑导航',
      description: '用于显示当前菜单的位置',
      position: 'bottom'
    }
  },
  {
    element: '#message',
    popover: {
      title: '通知',
      description: '点击图标，右侧会弹出显示通知消息',
      position: 'left'
    }
  },
  {
    element: '#userCenter',
    popover: {
      title: '个人中心',
      description: '鼠标悬浮，显示个人中心下拉框',
      position: 'left'
    }
  }
]
export default steps
