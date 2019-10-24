const singer = {
  state: {
    singerTypes: [{
      key: '5001',
      value: '入驻歌手'
    },
    {
      key: '1001',
      value: '华语男歌手'
    },
    {
      key: '1002',
      value: '华语女歌手'
    },
    {
      key: '1003',
      value: '华语组合/乐队'
    },
    {
      key: '2001',
      value: '欧美男歌手'
    },
    {
      key: '2002',
      value: '欧美女歌手'
    },
    {
      key: '2003',
      value: '欧美组合/乐队'
    },
    {
      key: '7001',
      value: '韩国男歌手'
    },
    {
      key: '7002',
      value: '韩国女歌手'
    },
    {
      key: '7003',
      value: '韩国组合/乐队'
    },
    {
      key: '4001',
      value: '其他男歌手'
    },
    {
      key: '4002',
      value: '其他女歌手'
    },
    {
      key: '4003',
      value: '其他组合/乐队'
    }
    ]
  },
  getters: {
    singerTypes: function (state) {
      return state.singerTypes
    }
  },
  mutations: {},
  actions: {}
}
export default singer
