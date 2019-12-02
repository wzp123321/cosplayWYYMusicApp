<template>
  <div class="playlist-wrap" @click="toPlayListDetail(playListInfo.id)">
    <CommonImg :src="playListInfo.picUrl"></CommonImg>
    <div class="playlist-content">
      <span class="title">{{playListInfo.name}}</span>
    </div>
    <div class="icon-area frs">
      <div style="margin-top:10px;margin-left:5px">
        <i class="iconfont icon-erji"></i>
        {{Math.floor(playListInfo.playCount/10000)}}万
      </div>
      <div style="margin-top:10px;margin-right:5px">
        <i class="iconfont icon-bofang"></i>
      </div>
    </div>
  </div>
</template>
<script>
// 歌单组件
import CommonImg from './CommonIMG'
export default {
  name: 'PlayList',
  components: {
    CommonImg
  },
  props: {
    playListInfo: {
      type: Object
    }
  },
  methods: {
    toPlayListDetail(id) {
      this.$router.push('/home/playlist/' + id)
    }
  }
}
</script>
<style lang="less" scoped>
.playlist-wrap {
  width: 180px;
  height: 230px;
  margin-right: 20px;
  margin-bottom: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  position: relative;
  bottom: 0;
  display: flex;
  flex-direction: column;
  .playlist-content {
    position: relative;
    .title {
      display: inline-block;
      color: #000;
      font-size: 14px;
      padding: 3px 5px;
    }
  }
  .icon-area {
    color: #fff;
    position: absolute;
    top: 140px;
    width: 100%;
    height: 40px;
    background: rgba(0, 0, 0, 0.5);
  }
}

.playlist-wrap:hover {
  bottom: 3px;
}
</style>
