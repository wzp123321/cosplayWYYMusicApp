<template>
  <div>
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
    <MusicPlay :musicInfo="musicInfo" v-if="JSON.stringify(musicInfo) !== '{}'" @close="closeMusic"></MusicPlay>
  </div>
</template>
<script>
import HttpApi from '../../assets/api/index'
import { Table } from 'ant-design-vue'
import { formatDuring } from '../../utils/formatDate'
import MusicPlay from '../../components/musicPlay'
export default {
  name: 'SearchPage',
  components: {
    'a-table': Table,
    MusicPlay
  },
  data() {
    return {
      songs: [],
      musicInfo: {},
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
    async getSearchData() {
      const keywords = this.$route.params.key
      const res = await HttpApi.getSearchData({
        keywords
      })
      if (res && res.data) {
        const songs = res.data.result.songs
        this.songs = songs
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
