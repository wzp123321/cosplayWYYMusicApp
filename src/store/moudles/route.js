const route = {
  state: {
    routeList: [{
      path: '/home/intro',
      title: '推荐'
    },
    {
      path: '/home/singer/main',
      title: '歌手'
    },
    {
      path: '/home/music',
      title: '榜单'
    },
    {
      path: '/home/mv',
      title: 'mv'
    },
    {
      path: '/home/radio',
      title: '电台'
    }
    ]
  },
  getters: {
    routeList: function (state) {
      return state.routeList
    }
  },
  mutations: {},
  actions: {}
}

export default route
