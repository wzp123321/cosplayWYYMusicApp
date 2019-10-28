import {
  SET_IS_FIXED
} from '../mutations'
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
    ],
    isFixed: false
  },
  getters: {
    routeList: function (state) {
      return state.routeList
    },
    isFixed: function (state) {
      return state.isFixed
    }
  },
  mutations: {
    [SET_IS_FIXED](state,data){
      return state.isFixed = data
    }
  },
  actions: {
    setIsFixed({
      commit
    }, data) {
      commit(SET_IS_FIXED,data)
    }
  }
}

export default route
