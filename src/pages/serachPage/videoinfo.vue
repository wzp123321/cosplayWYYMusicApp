<template>
  <div class="mv-wrap">
    <div class="title frstart">
      <h2>{{videoInfo.title}}</h2>
      <span v-if="videoInfo.creator">{{videoInfo.creator.nickname || ''}}</span>
    </div>
    <div class="icon-wrap">
      <span>
        <i class="iconfont icon-bofang"></i>
        {{videoInfo.playTime}}
      </span>
      <span>
        <i class="iconfont icon-shoucang"></i>
        {{videoInfo.subscribeCount}}
      </span>
      <span>
        <i class="iconfont icon-fenxiang"></i>
        {{videoInfo.shareCount}}
      </span>
      <span>
        <i class="iconfont icon-xihuan"></i>
        {{videoInfo.praisedCount}}
      </span>
      <span>
        <i class="iconfont icon-pinglun"></i>
        {{videoInfo.commentCount}}
      </span>
    </div>
    <div class="desc">
      <span>时长:{{getDate(videoInfo.durationms)}}</span>
      <span>
        <i class="iconfont icon-shijian"></i>
        {{videoInfo.publishTime}}
      </span>
    </div>
    <div style="width: 900px;
  height: 500px;">
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
      ></video-player>
    </div>
    <div style="margin-top:50px">
      <h1>概述</h1>
      <div style="background:#eee;width:900px">{{videoInfo.description || '暂无描述'}}</div>
      <h1 style="margin-top:30px">评论</h1>
      <div>
        <a-list
          class="comment-list"
          :header="`${comments.length}条评论`"
          itemLayout="horizontal"
          :dataSource="comments"
        >
          <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
            <a-comment :author="item.user.nickname" :avatar="item.user.avatarUrl">
              <p slot="content">{{item.content}}</p>
              <span>{{formattime(item.time)}}</span>
            </a-comment>
          </a-list-item>
        </a-list>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import HttpApi from '@/assets/api/index'
import * as tuils from '@/utils/formatDate'
import { videoPlayer } from 'vue-video-player'
import { List, Comment } from 'ant-design-vue'
import 'video.js/dist/video-js.css'
export default {
  name: 'MvDetail',
  components: {
    'video-player': videoPlayer,
    'a-list': List,
    'a-list-item': List.Item,
    'a-comment': Comment
  },
  data() {
    return {
      moment,
      videoInfo: {},
      playerOptions: {},
      url: '',
      comments: []
    }
  },
  methods: {
    async getVideoDetail() {
      const res = await HttpApi.getVideoInfoById({ id: this.$route.params.vid })
      if (res && res.data) {
        const videoInfo = res.data.data
        this.videoInfo = videoInfo
        this.playerOptions = {
          playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          poster: this.videoInfo.coverUrl, //你的封面地址
          // width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true //全屏按钮
          }
        }
      }
    },
    getDate(time) {
      return tuils.formatDuring(time)
    },
    formattime(time) {
      return tuils.updateTime(time)
    },
    // 获取mv评论
    async getCommentList() {
      const res = await HttpApi.getVideoCommentById({
        id: this.$route.params.vid
      })
      if (res && res.data) {
        const comments = res.data.comments
        this.comments = comments
      }
    },
    // 根据id获取播放地址
    async getUrlById() {
      const res = await HttpApi.getVideoUrlById({
        id: this.$route.params.vid
      })
      if (res && res.data) {
        console.log('res.data', res.data)
        const src = res.data.urls[0].url
        this.playerOptions = Object.assign(this.playerOptions, {
          sources: [
            {
              src, // 路径
              type: 'video/mp4' // 类型
            }
          ]
        })
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.getVideoDetail()
      this.getCommentList()
      this.getUrlById()
    })
  }
}
</script>
<style lang="less" scoped>
.mv-wrap {
  text-align: left;
  margin-left: 100px;
  display: flex;
  flex-direction: column;
  .title span {
    font-size: 12px;
    margin-top: 10px;
    margin-left: 5px;
  }
  .icon-wrap {
    span {
      display: inline-block;
      padding: 5px 10px;
    }
  }
  .desc {
    margin-left: 10px;
    span {
      display: inline-block;
      margin-right: 20px;
    }
  }
}
</style>
<style>
.video-js .vjs-big-play-button {
  top: 50%;
  left: 50%;
}
.video-player {
  position: relative;
  border: 1px solid #eee;
  margin-top: 20px;
  width: 900px;
  height: 500px !important;
}
</style>