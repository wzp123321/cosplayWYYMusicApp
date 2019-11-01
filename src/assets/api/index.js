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
    gettopmusiclist: 'http://localhost:3000/top/list',
    getmusicdetail: 'http://localhost:3000/song/url',
    getmusiclyricbyid: 'http://localhost:3000/lyric',
    getsingerlistbycat: 'http://localhost:3000/artist/list',
    gethotsingerlist: 'http://localhost:3000/top/artists',
    getsingerdescbyid: 'http://localhost:3000/artist/desc',
    getsingerartist: 'http://localhost:3000/artists',
    getsingermvlist: 'http://localhost:3000/artist/mv',
    getmvdetailbyid: 'http://localhost:3000/mv/detail',
    getmvcommentlist: 'http://localhost:3000/comment/mv',
    getdjbannerlist: 'http://localhost:3000/dj/banner',
    gethotdjlist: 'http://localhost:3000/dj/hot',
    getsearchdata: 'http://localhost:3000/search',
    getmvbytypearea: 'http://localhost:3000/mv/all',
    getuserloginbyphone: 'http://localhost:3000/login/cellphone',
    getuserloginbyemail: 'http://localhost:3000/login',
    getalbuminfobyid:'http://localhost:3000/album',
    getalbumdatacountbyid:'http://localhost:3000/album/detail/dynamic',
    getvideoinfo:'http://localhost:3000/video/detail',
    getvideourlbyid:'http://localhost:3000/video/url',
    getvideocommentbyid:'http://localhost:3000/comment/video',
    getplaylistinfo:'http://localhost:3000/playlist/detail'
  },
  //   推荐页面banner
  getPCBannersList(params) {
    return getRequest(this.$$path.getpcbanners, params)
  },
  //   推荐歌单
  getIntroPlayList(params) {
    return getRequest(this.$$path.getintroduceplaylist, params)
  },
  //    新碟上市
  getAlbumList(params) {
    return getRequest(this.$$path.getintroducealbumlist, params)
  },
  //    获取排行榜歌曲列表
  getTopMusicList(params) {
    return getRequest(this.$$path.gettopmusiclist, params)
  },
  //    根据id获取歌曲详细信息
  getMusicInfoById(params) {
    return getRequest(this.$$path.getmusicdetail, params)
  },
  //    根据id获取歌曲歌词
  getMusicLyricById(params) {
    return getRequest(this.$$path.getmusiclyricbyid, params)
  },
  //    获取入驻歌手
  getSingerListByCat(params) {
    return getRequest(this.$$path.getsingerlistbycat, params)
  },
  //    获取热门歌手
  getHotSingerList(params) {
    return getRequest(this.$$path.gethotsingerlist, params)
  },
  //    根据id获取歌手描述
  getSingerDescbyId(params) {
    return getRequest(this.$$path.getsingerdescbyid, params)
  },
  //    根据id获取歌手单曲
  getSingerArtist(params) {
    return getRequest(this.$$path.getsingerartist, params)
  },
  //    根据id获取歌手单曲
  getSingerMVList(params) {
    return getRequest(this.$$path.getsingermvlist, params)
  },
  //    根据id获取歌手单曲
  getMvDetailByd(params) {
    return getRequest(this.$$path.getmvdetailbyid, params)
  },
  //    根据id获取mv评论
  getMvCommentByid(params) {
    return getRequest(this.$$path.getmvcommentlist, params)
  },
  //    获取电台banner
  getDJBannerList(params) {
    return getRequest(this.$$path.getdjbannerlist, params)
  },
  //    获取热门电台
  getHotDJList(params) {
    return getRequest(this.$$path.gethotdjlist, params)
  },
  //    搜索
  getSearchData(params) {
    return getRequest(this.$$path.getsearchdata, params)
  },
  //    根据地区 类型获取mv
  getMvListByAreaType(params) {
    return getRequest(this.$$path.getmvbytypearea, params)
  },
  //    用户手机号码登录
  getUserLoginByPhone(params) {
    return getRequest(this.$$path.getuserloginbyphone, params)
  },
  //    用户邮箱登录
  getUserLoginByEmail(params) {
    return getRequest(this.$$path.getuserloginbyemail, params)
  },
  //    根据id获取专辑信息
  getAlbumInfoById(params) {
    return getRequest(this.$$path.getalbuminfobyid, params)
  },
  // 调用此接口 , 传入专辑 id, 可获得专辑动态信息,如是否收藏,收藏数,评论数,分享数
  getAlbumDataCountById(params) {
    return getRequest(this.$$path.getalbumdatacountbyid, params)
  },
  //    根据id获取视频信息
  getVideoInfoById(params) {
    return getRequest(this.$$path.getvideoinfo, params)
  },
  // 根据id获取视频播放地址
  getVideoUrlById(params) {
    return getRequest(this.$$path.getvideourlbyid, params)
  },
   // 根据id获取视频评论
   getVideoCommentById(params) {
    return getRequest(this.$$path.getvideocommentbyid, params)
  },
   // 根据id获取歌单详情
   getPlayListDetailById(params) {
    return getRequest(this.$$path.getplaylistinfo, params)
  },
}
