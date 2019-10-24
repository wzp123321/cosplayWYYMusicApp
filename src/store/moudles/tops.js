const tops = {
  state: {
    topList: [{
      key: '0',
      value: '云音乐新歌榜'
    },
    {
      key: '1',
      value: '云音乐热歌榜'
    },
    {
      key: '2',
      value: '网易原创歌曲榜'
    },
    {
      key: '3',
      value: '云音乐飙升榜'
    },
    {
      key: '4',
      value: '云音乐电音榜'
    },
    {
      key: '7',
      value: 'KTV嗨榜'
    },
    {
      key: '8',
      value: 'iTunes榜'
    },
    {
      key: '14',
      value: '中国TOP排行榜(港台榜)'
    },
    {
      key: '15',
      value: '中国TOP排行榜(内地榜)'
    },
    {
      key: '17',
      value: '华语金曲榜'
    },
    {
      key: '23',
      value: '云音乐说唱榜'
    },
    {
      key: '5',
      value: 'UK排行榜周榜'
    },
    {
      key: '6',
      value: '美国Billboard周榜'
    },
    {
      key: '29',
      value: '英国Q杂志中文版周榜'
    },
    {
      key: '10',
      value: '日本Oricon周榜'
    }, {
      key: '9',
      value: 'Hit FM Top榜'
    },
    {
      key: '11',
      value: '韩国Melon排行榜周榜'
    }
    ]
  },
  getters: {
    topList: function (state) {
      return state.topList
    }
  },
  mutations: {},
  actions: {}
}
export default tops
