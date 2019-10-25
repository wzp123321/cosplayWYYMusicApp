<template>
  <div>
    <a-table :columns="columns" :dataSource="hotSongList" :rowKey="rowKey=>rowKey.id">
      <span slot="alimgs" slot-scope="text,record">
        <img :src="record.al.picUrl" style="width:100px;height:100px" alt />
      </span>
      <span slot="action" slot-scope="text,record">
        <span @click="playMusic(record.id,  record.name,record.ar[0].name,record.al.picUrl)">播放</span>
      </span>
    </a-table>
    <MusicPlay :musicInfo="musicInfo" v-if="JSON.stringify(musicInfo) !== '{}'" @close="closeMusic"></MusicPlay>
  </div>
</template>
<script>
import { Table } from 'ant-design-vue'
import MusicPlay from '../../../components/musicPlay'
import HttpApi from '../../../assets/api/index'
export default {
  name: 'SingerMusic',
  components: {
    'a-table': Table,
    MusicPlay
  },
  data() {
    return {
      columns: [
        {
          key: 'sort',
          title: '序号',
          customRender: (text, record, index) => index
        },
        {
          title: '歌名',
          key: 'name',
          customRender: (text, record, index) => record.name
        },
        {
          title: '歌手',
          key: 'singerName',
          customRender: (text, record, index) => record.ar[0].name
        },
        {
          title: '所属专辑',
          key: 'album',
          customRender: (text, record, index) => record.al.name
        },
        {
          title: '专辑封面',
          key: 'alimgs',
          scopedSlots: { customRender: 'alimgs' }
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      data: [],
      musicInfo: {}
    }
  },
  props: {
    hotSongList: {
      type: Array
    }
  },
  methods: {
    closeMusic() {
      this.musicInfo = {}
    },
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
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>