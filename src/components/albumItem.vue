<template>
  <div class="album-wrap">
    <img :src="albumInfo.blurPicUrl " style="width:100%;height:180px" @error="handleError" />
    <h5>{{albumInfo.name}}</h5>
    <h5>{{albumInfo.artist.name}}</h5>
    <div class="icondiv">
      <i class="iconfont icon-bofang"></i>
    </div>
  </div>
</template>
<script>
// 歌单组件
export default {
  name: 'AlbumItem',
  props: {
    albumInfo: {
      type: Object
    }
  },
  methods: {
    handleError(e) {
      e.target.src = reqiure('@/assets/imgs/default.png')
    }
  }
}
</script>
<style lang="less" scoped>
.album-wrap {
  width: 180px;
  height: 230px;
  margin-right: 20px;
  margin-bottom: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  position: relative;
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
</style>
