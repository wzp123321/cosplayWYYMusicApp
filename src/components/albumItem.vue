<template>
  <div class="album-wrap">
    <CommonImg :src="albumInfo.blurPicUrl"></CommonImg>
    <h5>{{albumInfo.name}}</h5>
    <h5>{{albumInfo.artist.name}}</h5>
    <div class="icondiv">
      <i class="iconfont icon-bofang"></i>
    </div>
  </div>
</template>
<script>
// 歌单组件
import CommonImg from './CommonIMG'

export default {
  name: 'AlbumItem',
  components: {
    CommonImg
  },
  props: {
    albumInfo: {
      type: Object
    }
  },
  computed: {
    defaultImg() {
      return 'this.src="' + require('../assets/imgs/default.png') + '"'
    }
  },
  methods: {
    imgError(e) {
      console.log('e', e)
      e.target
    }
  }
}
</script>
<style lang="less" scoped>
.album-wrap {
  width: 210px;
  height: 230px;
  margin-right: 20px;
  margin-bottom: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  position: relative;
  bottom: 0;
  color: #000;
  h5 {
    text-align: center;
    margin-top: 5px;
  }
  h5:last-child {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .icondiv {
    width: 100%;
    height: 40px;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 140px;
    right: 0;
    z-index: 999;
    color: #fff;
    text-align: right;
  }
  .iconfont {
    display: none;
    margin-top: 7px;
    margin-right: 4px;
  }
  .icondiv:hover {
    cursor: pointer;
    .iconfont {
      display: inline-block;
    }
  }
}
.album-wrap :hover {
  bottom: 5px;
}
</style>
