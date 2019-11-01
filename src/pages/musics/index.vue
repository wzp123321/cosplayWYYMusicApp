<template>
  <div class="music-wrapper frstart">
    <MusicMenu @search="musicSearch" :idx="idx"></MusicMenu>
    <div class="list-wrapper">
      <div class="list-header frstart">
        <img :src="topInfo.coverImgUrl" alt class="topimg" />
        <div class="topinfo">
          <h3>{{topInfo.name}}</h3>
          <p class="description">{{topInfo.description}}</p>
          <p class="time">
            最近更新
            <i class="iconfont icon-shijian"></i>
            <span>{{getDate() || ' '}}</span>
          </p>
          <div>
            <span>
              <i class="iconfont icon-bofang"></i>
              {{topInfo.playCount || 0}}
            </span>
            <span class="count">
              <i class="iconfont icon-fenxiang"></i>
              {{topInfo.shareCount || 0}}
            </span>
            <span>
              <i class="iconfont icon-pinglun"></i>
              {{topInfo.commentCount || 0}}
            </span>
          </div>
        </div>
      </div>
      <h1 style="text-align:left;margin-top:20px">歌曲列表</h1>
      <a-table
        style="flex:1"
        :rowKey="rowKey=>rowKey.id"
        bordered
        :columns="columns"
        :dataSource="data"
        :pagination="{}"
      >
        <span slot="picUrl" slot-scope="text,record">
          <img :src="record.al.picUrl" style="width:80px;height:80px;border-radius:5px" />
        </span>
        <span slot="author" slot-scope="text,record">{{record.ar[0].name}}</span>
        <span slot="description" slot-scope="text,record">{{record.alia[0] || '暂无描述'}}</span>
        <span slot="action" slot-scope="text, record">
          <a
            href="javascript:;"
            class="ant-dropdown-link"
            @click="playMusic(record.id,record.al.name,record.ar[0].name,record.al.picUrl)"
          >播放</a>
        </span>
      </a-table>
    </div>
    <MusicPlay
      :musicInfo="musicInfo"
      v-if="JSON.stringify(musicInfo) !== '{}'"
      @close="closeMusic"
      @playEnd="playEnd"
    ></MusicPlay>
  </div>
</template>
<script>
import MusicMenu from './music-menu.vue'
import { Table } from 'ant-design-vue'
import MusicPlay from '@/components/MusicPlay.vue'
import HttpApi from '../../assets/api/index'
import * as utils from '../../utils/formatDate'
export default {
  name: 'Musics',
  components: {
    MusicMenu,
    'a-table': Table,
    MusicPlay
  },
  data() {
    return {
      musicInfo: {},
      columns: [
        {
          title: '序号',
          key: 'sort',
          dataIndex: 'sort',
          customRender: (text, record, index) => 1 + index
        },
        {
          title: '歌名',
          dataIndex: 'name',
          key: 'name',
          customRender: (text, record, index) => record.al.name
        },
        {
          title: '封面',
          key: 'picUrl',
          dataIndex: 'picUrl',
          scopedSlots: { customRender: 'picUrl' }
        },
        {
          title: '作者',
          dataIndex: 'author',
          key: 'author',
          scopedSlots: { customRender: 'author' }
        },
        {
          title: '描述',
          key: 'description',
          dataIndex: 'description',
          scopedSlots: { customRender: 'description' }
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      data: [],
      idx: '0',
      topInfo: {}
    }
  },
  methods: {
    musicSearch(idx) {
      this.idx = idx
      this.getMusicList()
    },
    playEnd(obj) {
      this.musicInfo = obj
    },
    /* 点击根据id获取歌曲信息  */
    async playMusic(id, musicName, author, picUrl) {
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
    // 关闭
    closeMusic() {
      this.musicInfo = {}
    },
    // 请求数据
    async getMusicList() {
      // 这个接口是获取各个榜单的歌曲列表
      const res = await HttpApi.getTopMusicList({ idx: this.idx })
      if (res && res.data) {
        const data = res.data.playlist.tracks
        this.data = data
        this.topInfo = {}
        this.topInfo = Object.assign(this.topInfo, {
          name: res.data.playlist.name,
          coverImgUrl: res.data.playlist.coverImgUrl,
          trackUpdateTime: res.data.playlist.trackUpdateTime,
          playCount: res.data.playlist.playCount,
          description: res.data.playlist.description,
          tags: res.data.playlist.tags,
          shareCount: res.data.playlist.shareCount,
          commentCount: res.data.playlist.commentCount
        })
      }
    },
    getDate() {
      return utils.formatDate(this.topInfo.trackUpdateTime)
    }
  },
  async created() {
    await this.getMusicList()
  }
}
</script>
<style lang="less" scoped>
.music-wrapper {
  width: 100%;
  position: relative;
  .list-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    .list-header {
      width: 100%;
      height: 200px;
      border: 1px solid #eee;
      text-align: left;
      .topimg {
        width: 200px;
        height: 200px;
      }
      .topinfo {
        display: flex;
        flex-direction: column;
        justify-content: start;
        margin-left: 20px;
        margin-top: 20px;
        h3 {
          font-size: 24px;
          margin: 0;
        }
        .description {
          font-size: 14px;
          background: #eee;
        }
        .time {
          span {
            display: inline-block;
            margin-left: 5px;
          }
        }
        .count {
          display: inline-block;
          margin: 0 20px;
        }
      }
    }
  }
}
</style>
