<template>
  <div class="audio-play">
    <audio
      ref="audio"
      :volume="volume/100"
      @load="musicLoad"
      @play="play"
      @timeupdate="timeupdate"
      @progress="progress"
      @volumechange="volumechange"
      src="http://m7.music.126.net/20191111150555/f18961e1a2b149fbafeb37180a21743c/ymusic/025d/060f/5552/57889b144f1e3beccb57b81709c72094.mp3"
    ></audio>
    <div class="img-div">
      <img :src="musicInfo.pic" alt />
    </div>
    <div class="operation-div">
      <div class="title">{{musicInfo.name}}/{{musicInfo.author}}</div>
      <div class="choose">
        <div>
          <i class="iconfont icon-shangyishou"></i>
          <i :class="['iconfont',isPlay? 'icon-zanting':'icon-bofang1']" @click="getMusicPlay"></i>
          <i class="iconfont icon-xiayishou"></i>
        </div>
        <div>
          <i class="iconfont icon-yinliang"></i>
          <el-slider :max="100" v-model="volume"></el-slider>
          <i class="iconfont icon-xunhuan" v-if="mode%3===0" @click="chooseMode"></i>
          <i class="iconfont icon-danquxunhuan" v-if="mode%3===1" @click="chooseMode"></i>
          <i class="iconfont icon-suiji" v-if="mode%3===2" @click="chooseMode"></i>
        </div>
      </div>
      <div class="progress">
        <el-progress :percentage="(currentTime/272)*100" :show-text="false" status="success"></el-progress>
      </div>
    </div>
  </div>
</template>
<script>
import { Progress, Slider } from 'element-ui'
export default {
  name: 'AudioPlay',
  components: {
    'el-progress': Progress,
    'el-slider': Slider
  },
  props: {
    musicInfo: {
      type: Object
    }
  },
  data() {
    return {
      isPlay: false,
      currentTime: 0, // 音频播放当前时间
      volume: 50,
      ismodeshow: true,
      mode: 0
    }
  },
  methods: {
    getMusicPlay() {
      if (this.isPlay) {
        this.isPlay = false
        this.$refs.audio.pause()
      } else {
        this.isPlay = true
        this.$refs.audio.play()
      }
    },
    musicLoad(e) {
      console.log('load-e', e)
    },
    // 音频播放事件
    play(e) {
      console.log('play-e', e)
    },
    // 进度条事件
    progress(e) {
      console.log('progress-e', e)
    },
    // 时间更新事件
    timeupdate() {
      this.currentTime = this.$refs.audio.currentTime
    },
    // 音量改变
    volumechange(value) {
      console.log(value)
    },
    // 选择模式
    chooseMode() {
      this.mode++
    }
  }
}
</script>
<style lang="less" scoped>
.audio-play {
  width: 80%;
  height: 100px;
  //   position: absolute;
  //   bottom: 40px;
  //   left: 10%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  .img-div {
    width: 100px;
    height: 100px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .operation-div {
    display: flex;
    flex: 1;
    flex-direction: column;
    text-align: left;
    .title {
      font-size: 14px;
      padding: 5px;
    }
    .choose {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      div:first-child {
        .iconfont {
          display: inline-block;
          padding: 0 7px;
        }
        .iconfont:hover {
          cursor: pointer;
          font-size: 17px;
        }
      }
      div:last-child {
        .iconfont {
          font-size: 12px;
          display: inline-block;
          margin: 0 6px;
        }
        .el-slider {
          width: 60px;
          height: 23px;
          display: inline-block;
        }
      }
    }
    .progress {
      width: 100%;
      padding: 15px 10px;
    }
  }
}
</style>