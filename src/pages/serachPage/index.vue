<template>
  <div>
    <a-tabs defaultActiveKey="1" @change="callback">
      <a-tab-pane tab="单曲" key="1">
        <a-table :columns="columns" :dataSource="songs" :rowKey="rowKey=>rowKey.id">
          <span slot="singer" slot-scope="text,record">{{record.artists[0].name}}</span>
          <span slot="img" slot-scope="text,record">
            <img :src="record.artists[0].img1v1Url" style="width:60px;height:60px" alt />
          </span>
          <span slot="time" slot-scope="text,record">{{getDate(record.duration)}}</span>
          <span slot="action" slot-scope="text,record,index">
            <i
              class="iconfont icon-bofang"
              @click="playMusic(record.id,record.name,record.artists[0].name,record.artists[0].img1v1Url,index)"
            ></i>
          </span>
        </a-table>
      </a-tab-pane>
      <a-tab-pane tab="mv" key="2" forceRender>
        <div style="display:flex;flex-wrap:wrap" v-if="JSON.stringify(mvs) !== '[]'">
          <MVItem v-for="(mvItem,index) in mvs" :key="index" :mvInfo="mvItem"></MVItem>
        </div>
        <a-empty style="margin-top:150px" v-else description="暂无数据" />
      </a-tab-pane>
      <a-tab-pane tab="视频" key="3" forceRender>
        <div style="display:flex;flex-wrap:wrap" v-if="JSON.stringify(videos) !== '[]'">
          <VideoItem v-for="(vItem,index) in videos" :key="index" :videoInfo="vItem"></VideoItem>
        </div>
        <a-empty style="margin-top:150px" v-else description="暂无数据" />
      </a-tab-pane>
    </a-tabs>
    <MusicPlay
      @playEnd="playEnd"
      :musicInfo="musicInfo"
      :sort="sort"
      v-if="JSON.stringify(musicInfo) !== '{}'"
      @close="closeMusic"
    ></MusicPlay>
  </div>
</template>
<script>
import HttpApi from '@/assets/api/index'
import { Table, Tabs, Empty } from 'ant-design-vue'
import * as utils from '../../utils/formatDate'
import MusicPlay from '@/components/MusicPlay'
import MVItem from '@/components/MvItem'
import VideoItem from '@/components/VideoItem'
export default {
  name: 'SearchPage',
  components: {
    'a-table': Table,
    'a-tabs': Tabs,
    'a-tab-pane': Tabs.TabPane,
    'a-empty': Empty,
    MusicPlay,
    MVItem,
    VideoItem
  },
  data() {
    return {
      sort: 0,
      songs: [],
      musicInfo: {},
      mvs: [],
      videos: [],
      columns: [
        {
          key: 'sort',
          title: '序号',
          customRender: (text, record, index) => index + 1
        },
        {
          title: '歌名',
          key: 'musicname',
          customRender: (text, record, index) => record.name
        },
        {
          title: '歌手',
          key: 'singer',
          scopedSlots: { customRender: 'singer' }
        },
        {
          title: '缩略图',
          key: 'img',
          scopedSlots: { customRender: 'img' }
        },
        {
          title: '主播电台',
          key: 'radio',
          customRender: (text, record, index) => record.artists[0].name
        },
        {
          title: '时长',
          key: 'time',
          scopedSlots: { customRender: 'time' }
        },
        {
          title: '播放',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  methods: {
    // 播放完成
    playEnd(sort) {
      playMusic(
        this.songs[sort + 1].id,
        this.songs[sort + 1].name,
        this.songs[sort + 1].artists[0].name,
        this.songs[sort + 1].artists[0].img1v1Url,
        sort + 1
      )
    },
    callback(key) {},
    async getSearchData() {
      const keywords = this.$route.params.key
      const promiseAll = [
        HttpApi.getSearchData({
          keywords
        }),
        HttpApi.getSearchData({
          keywords,
          type: '1004'
        }),
        HttpApi.getSearchData({
          keywords,
          type: '1014'
        })
      ]
      const arrays = ['songs', 'mvs', 'videos']

      const resolveAll = await Promise.all(promiseAll)
      if (resolveAll) {
        resolveAll.forEach((item, index) => {
          if (item && item.data && item.data.result) {
            this[arrays[index]] = item.data.result[arrays[index]] || []
          }
        })
      }
    },
    getDate(time) {
      return utils.formatDuring(time)
    },
    async playMusic(id, musicName, author, picUrl, sort) {
      this.sort = sort
      const res = await HttpApi.getMusicInfoById({ id })
      if (res && res.data) {
        const musicInfo = res.data.data[0]
        this.musicInfo = Object.assign(musicInfo, { musicName, author, picUrl })
      }
    },
    closeMusic() {
      this.musicInfo = {}
    }
  },
  // 监视路由变化
  watch: {
    $route(newVal, oldVal) {
      this.getSearchData()
    }
  },
  created() {
    this.getSearchData()
  }
}
</script>
<style lang="less" scoped>
</style>
