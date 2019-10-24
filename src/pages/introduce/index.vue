<template>
  <div class="common-wrapper">
    <!-- 跑马灯 -->
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="(bannerItem,index) in banners" :key="index">
        <img :src="bannerItem.imageUrl" class="bannerimg" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <h1 class="intro-title">推荐歌单</h1>
    <div class="intro-play-list">
      <PlayList v-for="(playlistItem,index) in playlists" :key="index" :playListInfo="playlistItem"></PlayList>
    </div>
    <h1 class="intro-title">新碟上市</h1>
    <div class="intro-play-list">
      <AlbumItem v-for="(albumItem,index) in albums" :key="index" :albumInfo="albumItem"></AlbumItem>
    </div>
  </div>
</template>
<script>
import { Carousel, CarouselItem } from 'element-ui'
import HttpApi from '../../assets/api/index'
import PlayList from '../../components/playList.vue'
import AlbumItem from '../../components/albumItem.vue'
export default {
  name: 'Introduce',
  components: {
    'el-carousel': Carousel,
    'el-carousel-item': CarouselItem,
    PlayList,
    AlbumItem
  },
  data () {
    return {
      banners: [],
      playlists: [],
      albums: []
    }
  },
  methods: {
    // 获取banners
    async getBannersList () {
      const res = await HttpApi.getPCBannersList({ type: 0 })
      if (res && res.data) {
        const banners = res.data.banners
        this.banners = banners
      }
    },
    // 获取推荐歌单
    async getIntroPlayList () {
      const res = await HttpApi.getIntroPlayList()
      if (res && res.data) {
        const playlists = res.data.result
        this.playlists = playlists
      }
    },
    // 获取新碟上架
    async getNewAlbum () {
      const res = await HttpApi.getAlbumList()
      if (res && res.data) {
        const albums = res.data.albums
        this.albums = albums
      }
    }
  },
  created () {
    this.$nextTick(() => {
      this.getBannersList()
      this.getIntroPlayList()
      this.getNewAlbum()
    })
  }
}
</script>
<style lang="less" scoped>
.bannerimg {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.intro-title {
  margin-top: 20px;
  width: 150px;
  border-bottom: 1px solid #eee;
}
.intro-play-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
