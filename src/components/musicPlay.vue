<template>
  <vue-drag-resize :isActive="true" :isDraggable="true" class="play-wrap">
    <a-player
      autoplay
      :music="{
        title: musicInfo.musicName,
        author: musicInfo.author,
        url: musicInfo.url,
        pic: musicInfo.picUrl,
        lrc: musicInfo.lyric
    }"
    ></a-player>
    <i class="iconfont icon-guanbi" @click="closeMusic"></i>
  </vue-drag-resize>
</template>
<script>
import VueAplayer from 'vue-aplayer'
import VueDragResize from 'vue-drag-resize'
export default {
  name: 'MusicPlay',
  components: {
    'a-player': VueAplayer,
    'vue-drag-resize': VueDragResize
  },
  props: {
    musicInfo: {
      type: Object
    }
  },
  methods: {
    closeMusic () {
      this.$emit('close')
    }
  }
}
</script>
<style lang="less" scoped>
.play-wrap {
  width: calc(100% - 250px) !important;
  position: fixed !important;
  z-index: 999;
  top: 70% !important;
  left: 210px !important;
  .iconfont {
    position: absolute;
    top: 4px;
    right: 8px;
  }
}
</style>
