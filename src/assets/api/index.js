/**
 * 包含n个接口请求函数的模块
 */
import {
  getRequest
} from './ajax.js'

export default {
  $$path: {
    getpcbanners: 'http://10.5.130.191:3000/banner',
    getintroduceplaylist: 'http://10.5.130.191:3000/personalized',
    getintroducealbumlist: 'http://10.5.130.191:3000/top/album',
    gettopmusiclist: 'http://10.5.130.191:3000/top/list',
    getmusicdetail: 'http://10.5.130.191:3000/song/url',
    getmusiclyricbyid: 'http://10.5.130.191:3000/lyric'
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
  }
}
