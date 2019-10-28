<template>
  <div class="album-wrap">
    <img :src="djInfo.picUrl " style="width:100%;height:160px" @error="handleError" />
    <h5>{{djInfo.name}}</h5>
    <h5 class="rcmdtext">{{djInfo.rcmdtext}}</h5>
  </div>
</template>
<script>
// 歌单组件
export default {
  name: 'DJItem',
  props: {
    djInfo: {
      type: Object
    }
  },
  methods: {
    handleError(e) {
      e.target.src = reqiure('../assets/imgs/default.png')
    }
  }
}
</script>
<style lang="less" scoped>
.album-wrap {
  width: 160px;
  height: 210px;
  margin-right: 20px;
  margin-bottom: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  position: relative;
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
</style>
