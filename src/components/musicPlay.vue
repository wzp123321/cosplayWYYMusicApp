<template>
  <div class="play-wrap">
    <a-player
      :showLrc="true"
      mode="single"
      @error="playError"
      @ended="palyEnd"
      :music="{
        title: musicInfo.musicName,
        author: musicInfo.author,
        url: musicInfo.url,
        pic: musicInfo.picUrl,
        lrc: lyric
    }"
    ></a-player>
    <i class="iconfont icon-guanbi" @click="closeMusic"></i>
  </div>
</template>
<script>
import HttpApi from '@/assets/api/index'
import { message } from 'ant-design-vue'
import VueAplayer from 'vue-aplayer'

export default {
  name: 'MusicPlay',
  components: {
    'a-player': VueAplayer,
    message
  },
  props: {
    musicInfo: {
      type: Object
    },
    sort: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      lyric: ''
    }
  },
  methods: {
    closeMusic() {
      this.$emit('close')
    },
    palyEnd() {
      this.$emit('playEnd', this.sort)
    },
    playError() {
      this.$message.error('播放错误')
    },
    async getLrc() {
      const id = this.musicInfo.id
      const res = await HttpApi.getMusicLyricById({ id })
      if (res && res.data) {
        const lyric = res.data.lrc.lyric
        this.lyric = lyric
      }
    }
  },
  watch: {
    musicInfo: function(newVal, oldVal) {
      this.getLrc()
    }
  },
  created() {
    this.$nextTick(() => {
      document.getElementsByTagName('audio')[0].setAttribute('autoplay', true)
      this.getLrc()
    })
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
