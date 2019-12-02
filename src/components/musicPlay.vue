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
    <div class="change-icon">
      <i class="iconfont icon-shangyishou" @click="changeMusicPlay('left')"></i>
      <i class="iconfont icon-xiayishou" @click="changeMusicPlay('right')"></i>
    </div>
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
    /**
     * 切换歌曲
     */
    changeMusicPlay(type) {
      if (type === 'left') {
        this.$emit('playEnd', this.sort - 1)
      } else {
        this.$emit('playEnd', this.sort + 1)
      }
    },
    /**
     * 获取歌词
     */
    async getLrc() {
      const id = this.musicInfo.id
      const res = await HttpApi.getMusicLyricById({ id })
      if (res && res.data && res.data.lrc) {
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
  .icon-guanbi {
    position: absolute;
    top: 4px;
    right: 8px;
  }
  .change-icon {
    position: absolute;
    top: 40px;
    left: 106px;
    .iconfont {
      display: inline-block;
      padding: 0 5px;
    }
    .iconfont:hover {
      font-size: 17px;
    }
  }
}
</style>
