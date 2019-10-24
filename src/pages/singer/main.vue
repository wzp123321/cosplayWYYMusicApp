<template>
  <div class="singer-wrap frstart">
    <div class="list-wrap">
      <a-list class="music-list" bordered :dataSource="singerTypes">
        <a-list-item
          slot="renderItem"
          @click="handleTypeChange(item.key)"
          slot-scope="item, index"
          :key="index"
          :class="singerKey===item.key? 'isactive':''"
        >{{item.value}}</a-list-item>
      </a-list>
    </div>
    <div class="table-wrap">
      <div class="frs">
        <h1 class="title">入驻歌手</h1>
        <h6 @click="handleTypeChange('5001')">查看全部>>></h6>
      </div>
      <div class="intro-play-list">
        <SingerItem
          v-for="(singerItem,index) in liveSingerList"
          :singerInfo="singerItem"
          :key="index"
        ></SingerItem>
      </div>
      <h1 class="title">热门歌手</h1>
      <div class="intro-play-list">
        <SingerItem
          v-for="(singerItem,index) in hotSingerList"
          :singerInfo="singerItem"
          :key="index"
        ></SingerItem>
      </div>
    </div>
  </div>
</template>
<script>
import { List } from 'ant-design-vue'
import { mapGetters } from 'vuex'
import SingerItem from '../../components/singerItem'
import HttpApi from '../../assets/api/index'
export default {
  name: 'SingerModule',
  components: {
    'a-list': List,
    'a-list-item': List.Item,
    SingerItem
  },
  data () {
    return {
      singerKey: '5001',
      singerInfo: {},
      liveSingerList: [],
      hotSingerList: []
    }
  },
  computed: mapGetters(['singerTypes']),

  methods: {
    handleTypeChange (key) {
      this.singerKey = key
      this.$router.push(`/home/singer/detail/${key}`)
    },
    // 入驻歌手
    async getSingerList () {
      const res = await HttpApi.getSingerListByCat({ cat: this.singerKey })
      if (res && res.data) {
        const liveSingerList = res.data.artists.splice(0, 8)
        this.liveSingerList = liveSingerList
      }
    },
    // 热门歌手
    async getHotSinger () {
      const res = await HttpApi.getHotSingerList()
      if (res && res.data) {
        const hotSingerList = res.data.artists.splice(0, 8)
        this.hotSingerList = hotSingerList
      }
    }
  },
  created () {
    this.$nextTick(() => {
      this.getSingerList()
      this.getHotSinger()
    })
  }
}
</script>
<style lang="less" scoped>
.music-list {
  width: 220px;
  margin-right: 40px;
  .isactive {
    color: #06a5ff;
    font-size: 20px;
    transition: 500ms all;
  }
}
.table-wrap {
  .title {
    text-align: left;
    margin-top: 20px;
  }
}
.intro-play-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
<style>
.ant-list-item-content {
  width: 100%;
  display: inline-block;
  text-align: center;
}
</style>
