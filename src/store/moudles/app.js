import {
  SET_IS_LOGIN,
  SET_USER_INFO
} from '../mutations'

const app = {
  state: {
    isLogin: false,
    userInfo: {}
  },
  getters: {
    isLogin: function (state) {
      return state.isLogin
    },
    userInfo: function (state) {
      return state.userInfo
    }
  },
  mutations: {
    [SET_IS_LOGIN](state, data) {
      state.isLogin = data
    },
    [SET_USER_INFO](state, data) {
      state.userInfo = data
    }
  },
  actions: {
    setIsLogin({
      commit
    }, data) {
      commit(SET_IS_LOGIN, data)
    },
    setUserInfo({
      commit
    }, data) {
      commit(SET_USER_INFO, data)
    }
  }
}

export default app
