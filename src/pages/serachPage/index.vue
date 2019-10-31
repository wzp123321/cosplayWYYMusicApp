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
          <span slot="action" slot-scope="text,record">
            <i
              class="iconfont icon-bofang"
              @click="playMusic(record.id,record.name,record.artists[0].name,record.artists[0].img1v1Url)"
            ></i>
          </span>
        </a-table>
      </a-tab-pane>
      <a-tab-pane tab="mv" key="2" forceRender>
        <div style="display:flex;flex-wrap:wrap">
          <MVItem v-for="(mvItem,index) in mvs" :key="index" :mvInfo="mvItem"></MVItem>
        </div>
      </a-tab-pane>
      <a-tab-pane tab="视频" key="3" forceRender>
        <div style="display:flex;flex-wrap:wrap">
          <VideoItem v-for="(vItem,index) in videos" :key="index" :videoInfo="vItem"></VideoItem>
        </div>
      </a-tab-pane>
    </a-tabs>
    <MusicPlay
      @playEnd="playEnd"
      :musicInfo="musicInfo"
      v-if="JSON.stringify(musicInfo) !== '{}'"
      @close="closeMusic"
    ></MusicPlay>
  </div>
</template>
<script>
import HttpApi from '@/assets/api/index'
import { Table, Tabs } from 'ant-design-vue'
import { formatDuring } from '../../utils/formatDate'
import MusicPlay from '@/components/MusicPlay'
import MVItem from '@/components/MvItem'
import VideoItem from '@/components/VideoItem'
export default {
  name: 'SearchPage',
  components: {
    'a-table': Table,
    'a-tabs': Tabs,
    'a-tab-pane': Tabs.TabPane,
    MusicPlay,
    MVItem,
    VideoItem
  },
  data() {
    return {
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
    playEnd(obj) {
      this.musicInfo = obj
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
          this[arrays[index]] = item.data.result[arrays[index]]
        })
      }
    },
    getDate(time) {
      return formatDuring(time)
    },
    async playMusic(id, musicName, author, picUrl) {
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
