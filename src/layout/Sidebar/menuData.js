const MENU = [
  {
    id: 1,
    index: '1',
    title: 'dashboard',
    icon: 'icon-shouye1'
  },
  {
    id: 2,
    index: '2',
    title: 'Vue',
    icon: 'icon-vuejs',
    children: [
      {
        id: 3,
        index: '2-1',
        title: 'vue',
        children: [
          {
            id: 4,
            index: '2-1-1',
            title: '路由导航守卫'
          }
        ]
      },
      {
        id: 4,
        index: '2-2',
        title: 'slot'
      },
      {
        id: 5,
        index: '2-3',
        title: 'computed'
      },
      {
        id: 6,
        index: '2-4',
        title: 'transition'
      }
    ]
  },
  {
    id: 7,
    index: '3',
    title: '常用',
    icon: 'icon-changyong',
    children: [
      {
        id: 8,
        index: '3-1',
        title: '小球动画'
      },
      {
        id: 9,
        index: '3-2',
        title: 'css-world',
        children: [
          {
            id: 10,
            index: '3-2-1',
            title: 'css-color'
          },
          {
            id: 11,
            index: '3-2-2',
            title: 'css-skill'
          }
        ]
      }
    ]
  },
  {
    id: 12,
    index: '4',
    title: '组件',
    icon: 'icon-zujian',
    children: [
      {
        id: 13,
        index: '4-1',
        title: '日期选择'
      },
      {
        id: 14,
        index: '4',
        title: '表格组件'
      }
    ]
  },
  {
    id: 15,
    index: '5',
    title: '第三方',
    icon: 'icon-disanfang',
    children: [
      {
        id: 16,
        index: '5-1',
        title: 'easy-mock'
      },
      {
        id: 17,
        index: '5-2',
        title: '富文本编辑器'
      }
    ]
  }
]

export default MENU
