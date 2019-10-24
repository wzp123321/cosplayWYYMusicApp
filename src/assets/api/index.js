/**
 * 包含n个接口请求函数的模块
 */
import {
  getRequest
} from './ajax.js'

export default {
  $$path: {
    getpcbanners: 'http://localhost:3000/banner',
    getintroduceplaylist: 'http://localhost:3000/personalized',
    getintroducealbumlist: 'http://localhost:3000/top/album',
    gettopmusiclist: 'http:/localhost:3000/top/list',
    getmusicdetail: 'http://localhost:3000/song/url',
    getmusiclyricbyid: 'http://localhost:3000/lyric',
    getsingerlistbycat: 'http://localhost:3000/artist/list',
    gethotsingerlist: 'http://localhost:3000/top/artists'
  },
  //   推荐页面banner
  getPCBannersList (params) {
    return getRequest(this.$$path.getpcbanners, params)
  },
  //   推荐歌单
  getIntroPlayList (params) {
    return getRequest(this.$$path.getintroduceplaylist, params)
  },
  //    新碟上市
  getAlbumList (params) {
    return getRequest(this.$$path.getintroducealbumlist, params)
  },
  //    获取排行榜歌曲列表
  getTopMusicList (params) {
    return getRequest(this.$$path.gettopmusiclist, params)
  },
  //    根据id获取歌曲详细信息
  getMusicInfoById (params) {
    return getRequest(this.$$path.getmusicdetail, params)
  },
  //    根据id获取歌曲歌词
  getMusicLyricById (params) {
    return getRequest(this.$$path.getmusiclyricbyid, params)
  },
  //    获取入驻歌手
  getSingerListByCat (params) {
    return getRequest(this.$$path.getsingerlistbycat, params)
  },
  //    获取热门歌手
  getHotSingerList (params) {
    return getRequest(this.$$path.gethotsingerlist, params)
  }
}
