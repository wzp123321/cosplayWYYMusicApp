<template>
  <div class="singer-info frstart">
    <div class="singer-data">
      <img :src="singerInfo.picUrl" class="singer-img" alt />
      <a-tabs defaultActiveKey="1" @change="callback">
        <a-tab-pane tab="个人单曲" key="1">
          <SingerMusic :hotSongList="hotSongList"></SingerMusic>
        </a-tab-pane>
        <a-tab-pane tab="MV" key="2" forceRender>
          <SingerMV :id="$route.params.id"></SingerMV>
        </a-tab-pane>
        <a-tab-pane tab="专辑" key="3">Content of Tab Pane 3</a-tab-pane>
        <a-tab-pane tab="歌手信息" key="4">
          <div v-for="(item,index) in singerDesc.introduction" :key="index">
            <h1>{{item.ti}}</h1>
            <div>{{item.txt}}</div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="award-wrap">
      <h1>简介</h1>
      <div>{{singerDesc.briefDesc}}</div>
    </div>
  </div>
</template>
<script>
import HttpApi from '@/assets/api/index'
import { Tabs } from 'ant-design-vue'
import SingerMusic from './singerinformation/music'
import SingerMV from './singerinformation/mv'

export default {
  name: 'SingerInfo',
  components: {
    'a-tabs': Tabs,
    'a-tab-pane': Tabs.TabPane,
    SingerMusic,
    SingerMV
  },
  data() {
    return {
      singerInfo: {},
      singerDesc: {},
      hotSongList: []
    }
  },
  methods: {
    // 获取歌手描述
    async getSingerDesc() {
      const res = await HttpApi.getSingerDescbyId({ id: this.$route.params.id })
      if (res && res.data) {
        const data = res.data
        this.singerDesc = data
      }
    },
    // 获取歌手单曲
    async getSingerArtist() {
      const res = await HttpApi.getSingerArtist({ id: this.$route.params.id })
      if (res && res.data) {
        const artist = res.data.artist
        this.singerInfo = artist
        const hotSongList = res.data.hotSongs
        this.hotSongList = hotSongList
      }
    },
    // tabs切换
    callback(key) {}
  },
  created() {
    this.$nextTick(() => {
      this.getSingerDesc()
      this.getSingerArtist()
    })
  }
}
</script>
<style lang="less" scoped>
.singer-info {
  position: relative;
  .singer-data {
    flex: 1;
    margin-right: 50px;
    .singer-img {
      width: 700px;
      height: 300px;
      margin: 0 auto;
      border-radius: 5px;
    }
  }
  .award-wrap {
    width: 280px;
    h1 {
      text-align: left;
      font-size: 18px;
    }
  }
}
</style>
