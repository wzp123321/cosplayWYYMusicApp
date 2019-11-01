<template>
  <div class="play-list-wrap frstart">
    <!-- 细节 -->
    <div class="play-list-info fc">
      <div class="info-header frstart">
        <img :src="playListInfo.coverImgUrl" style="width:280px;height:auto" alt />
        <div class="info">
          <h1>{{playListInfo.name}}</h1>
          <p>创建时间:{{formatDate(1,playListInfo.createTime)}}</p>
          <p>上次更新:{{formatDate(1,playListInfo.updateTime)}}</p>
          <div class="icon-wrap">
            <span>
              <i class="iconfont icon-bofang"></i>
              {{playListInfo.playCount}}
            </span>
            <span>
              <i class="iconfont icon-shoucang"></i>
              {{playListInfo.subscribedCount}}
            </span>
            <span>
              <i class="iconfont icon-fenxiang"></i>
              {{playListInfo.shareCount}}
            </span>
            <span>
              <i class="iconfont icon-xihuan"></i>
              {{playListInfo.trackCount}}
            </span>
            <span>
              <i class="iconfont icon-pinglun"></i>
              {{playListInfo.commentCount}}
            </span>
          </div>
          <div>
            标签:
            <span v-if="JSON.stringify(playListInfo.tags)!=='[]'">
              <a-tag color="pink" v-for="(item,index) in playListInfo.tags" :key="index">{{item}}</a-tag>
            </span>
            <span v-else>暂无标签</span>
          </div>
        </div>
      </div>
      <div class="info-list">
        <h1>歌曲列表</h1>
        <a-table :columns="columns" :dataSource="playListInfo.tracks" :rowKey="rowKey=>rowKey.id">
          <span slot="time" slot-scope="text,record">{{formatDate(0,record.dt)}}</span>
          <span slot="action" slot-scope="text,record,index">
            <i
              style="color:#06a5ff"
              class="iconfont icon-bofang"
              @click="toPlayMusic(record.id,record.name,record.ar[0].name,record.al.picUrl,index)"
            ></i>
          </span>
        </a-table>
      </div>
    </div>
    <!-- 数据 -->
    <div class="play-list-data">
      <div class="frstart" v-if="playListInfo.creator">
        <img :src="playListInfo.creator.avatarUrl" class="uavatar" alt />
        <div class="creator fc">
          <h2>{{playListInfo.creator.nickname}}</h2>
          <p>{{playListInfo.creator.signature}}</p>
        </div>
      </div>
      <div class="sub-list">
        <h1>喜欢这个歌单的人</h1>
        <div class="fw">
          <img
            v-for="(item,idx) in playListInfo.subscribers"
            :key="idx"
            :src="item.avatarUrl"
            style="width:40px;height:40px;margin:5px 10px"
            alt
          />
        </div>
      </div>
    </div>
    <MusicPlay
      :musicInfo="musicInfo"
      :sort="sort"
      v-if="JSON.stringify(musicInfo) !== '{}'"
      @playEnd="playEnd"
      @close="closeMusic"
    ></MusicPlay>
  </div>
</template>
<script>
import HttpApi from '@/assets/api/index'
import { Tag, Table } from 'ant-design-vue'
import * as utils from '../../utils/formatDate'
import MusicPlay from '@/components/MusicPlay.vue'

export default {
  name: 'PlayListDetail',
  components: {
    'a-tag': Tag,
    'a-table': Table,
    MusicPlay
  },
  data() {
    return {
      playListInfo: {},
      columns: [
        {
          key: 'sort',
          title: '序号',
          customRender: (text, record, index) => index + 1
        },
        {
          key: 'name',
          title: '歌名',
          dataIndex: 'name'
        },
        {
          key: 'singername',
          title: '歌手',
          customRender: (text, record, index) => record.ar[0].name
        },
        {
          key: 'time',
          title: '时长',
          scopedSlots: { customRender: 'time' }
        },
        {
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      musicInfo: {},
      sort: 0
    }
  },
  methods: {
    playEnd(sort) {
      const { playListInfo } = this
      this.toPlayMusic(
        playListInfo.tracks[sort + 1].id,
        playListInfo.tracks[sort + 1].name,
        playListInfo.tracks[sort + 1].ar[0].name,
        playListInfo.tracks[sort + 1].al.picUrl,
        sort + 1
      )
    },
    formatDate(num, time) {
      return num === 1 ? utils.formatDate(time) : utils.formatDuring(time)
    },
    async getPlayListInfo() {
      const res = await HttpApi.getPlayListDetailById({
        id: this.$route.params.id
      })

      if (res && res.data) {
        const playListInfo = res.data.playlist
        this.playListInfo = playListInfo
      }
    },
    async toPlayMusic(id, musicName, author, picUrl, index) {
      this.sort = index
      const res = await HttpApi.getMusicInfoById({ id })
      if (res && res.data) {
        const dataSource = res.data.data[0]
        this.musicInfo = dataSource
        this.musicInfo = Object.assign(this.musicInfo, {
          musicName,
          author,
          picUrl
        })
        this.getLyricById(id)
      }
    },
    //  根据id获取歌词
    async getLyricById(id) {
      const res = await HttpApi.getMusicLyricById({ id })
      if (res && res.data) {
        const lyric = res.data.lrc.lyric
        this.musicInfo = Object.assign(this.musicInfo, { lyric })
      }
    },
    closeMusic() {
      this.musicInfo = {}
    }
  },
  created() {
    this.getPlayListInfo()
  }
}
</script>
<style lang="less" scoped>
.play-list-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  .play-list-info {
    flex: 1;
    .info-header {
      .info {
        text-align: left;
        margin-left: 15px;
        h1 {
          font-size: 24px;
        }
        h1,
        p {
          margin-bottom: 25px;
        }
        .icon-wrap {
          margin-bottom: 25px;
          span:nth-child(2),
          span:nth-child(3),
          span:nth-child(4) {
            display: inline-block;
            padding: 0 10px;
          }
        }
      }
    }
  }
  .play-list-data {
    margin-top: 30px;
    width: 275px;
    .creator {
      margin-left: 10px;
      text-align: left;
      flex: 1;
      h2 {
        font-size: 16px;
        margin-bottom: 0px;
      }
      p {
        width: 100%;
        background: #eee;
      }
    }
    .sub-list {
      h1 {
        font-size: 16px;
        text-align: left;
        margin-top: 10px;
        border-bottom: 1px solid #eee;
        padding-bottom: 4px;
      }
    }
  }
}
</style>