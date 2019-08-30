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
        title: 'router'
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
    title: 'css-world',
    icon: 'icon-changyong',
    children: [
      {
        id: 10,
        index: '3-2',
        title: 'css-color'
      },
      {
        id: 11,
        index: '3-3',
        title: 'css-skill'
      }
    ]
  },
  {
    id: 12,
    index: '4',
    title: 'components',
    icon: 'icon-zujian',
    children: [
      {
        id: 13,
        index: '4-1',
        title: 'date'
      },
      {
        id: 14,
        index: '4',
        title: 'table'
      }
    ]
  },
  {
    id: 15,
    index: '5',
    title: 'plugins',
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
        title: 'editor'
      }
    ]
  }
]

export default MENU
