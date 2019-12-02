<template>
  <div class="album-wrap">
    <CommonImg :src="djInfo.picUrl " :width="160"/>
    <h5>{{djInfo.name}}</h5>
    <h5 class="rcmdtext">{{djInfo.rcmdtext}}</h5>
  </div>
</template>
<script>
import CommonImg from './CommonIMG'
// 歌单组件
export default {
  name: 'DJItem',
  components: {
    CommonImg
  },
  props: {
    djInfo: {
      type: Object
    }
  }
}
</script>
<style lang="less" scoped>
.album-wrap {
  width: 170px;
  height: 210px;
  margin-right: 20px;
  margin-bottom: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  position: relative;
  bottom: 0;
  color: #000;
  h5 {
    text-align: left;
    margin-top: 5px;
    margin-left: 5px;
  }
  .rcmdtext {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.album-wrap:hover{
  bottom: 4px;
}
</style>
