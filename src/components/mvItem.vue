<template>
  <div class="album-wrap" @click="toMvDetail(mvInfo.id||mvInfo.vid)">
    <CommonImg :src="mvInfo.imgurl||mvInfo.cover||mvInfo.coverUrl" />
    <h5 class="title">{{mvInfo.name|| mvInfo.title}}</h5>
    <div class="name frs">
      <h5>{{mvInfo.artistName || mvInfo.creator.userName}}</h5>
      <h5>{{mvInfo.publishTime||''}}</h5>
    </div>
    <div class="icondiv frs">
      <div>{{getDate(mvInfo.duration || mvInfo.durationms)}}</div>
      <div>
        <i class="iconfont icon-bofang"></i>
        {{mvInfo.playCount}}
      </div>
    </div>
  </div>
</template>
<script>
// mv组件
import CommonImg from './CommonIMG'
import * as utils from '../utils/formatDate'
export default {
  name: 'MVItem',
  components: {
    CommonImg
  },
  props: {
    mvInfo: {
      type: Object
    }
  },
  methods: {
    toMvDetail(id) {
      this.$router.push('/home/mv/detail/' + id)
    },
    getDate(time) {
      return utils.formatDuring(time)
    }
  }
}
</script>
<style lang="less" scoped>
.album-wrap {
  width: 185px;
  height: 230px;
  margin-right: 20px;
  margin-bottom: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  position: relative;
  color: #000;
  img {
    width: 100%;
    height: 160px;
  }
  .title {
    text-align: left;
    font-size: 12px;
  }
  .title,
  .name h5 {
    margin: 8px 5px 0 5px;
  }
  .icondiv {
    width: 100%;
    height: 40px;
    position: absolute;
    top: 120px;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
    font-size: 13px;
    div {
      margin: 14px 5px 0 5px;
    }
    .iconfont {
      font-size: 13px;
    }
  }
}
</style>
