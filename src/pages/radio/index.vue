<template>
  <div class="radio.-wrap">
    <!-- 跑马灯 -->
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="(bannerItem,index) in bannerlist" :key="index">
        <img :src="bannerItem.pic" class="bannerimg" />
      </el-carousel-item>
    </el-carousel>
    <h1 style="text-align:left">热门电台</h1>
    <div class="hot">
      <DJItem v-for="(djItem,index) in hotDjList" :key="index" :djInfo="djItem"></DJItem>
    </div>
  </div>
</template>
<script>
import HttpApi from '../../assets/api/index'
import { Carousel, CarouselItem } from 'element-ui'
import DJItem from '../../components/djItem'
export default {
  name: 'Order',
  components: {
    'el-carousel': Carousel,
    'el-carousel-item': CarouselItem,
    DJItem
  },
  data() {
    return {
      bannerlist: [],
      hotDjList: []
    }
  },
  methods: {
    async getBannerList() {
      const res = await HttpApi.getDJBannerList()
      if (res && res.data) {
        const bannerlist = res.data.data
        this.bannerlist = bannerlist
      }
    },
    async getHotDjList() {
      const res = await HttpApi.getHotDJList()
      if (res && res.data) {
        const hotDjList = res.data.djRadios
        this.hotDjList = hotDjList
      }
    }
  },
  created() {
    this.getBannerList()
    this.getHotDjList()
  }
}
</script>
<style lang="less" scoped>
.bannerimg {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.hot {
  display: flex;
  flex-wrap: wrap;
}
</style>
