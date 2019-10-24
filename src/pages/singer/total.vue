<template>
  <div class="intro-play-list">
    <SingerItem v-for="(singerItem,index) in singList" :singerInfo="singerItem" :key="index"></SingerItem>
  </div>
</template>
<script>
import HttpApi from '../../assets/api/index'
import SingerItem from '../../components/singerItem'
export default {
  name: 'SingerDetail',
  components: {
    SingerItem
  },
  data () {
    return {
      singList: []
    }
  },
  async created () {
    const res = await HttpApi.getSingerListByCat({ cat: this.$route.params.id })
    if (res && res.data) {
      const singList = res.data.artists
      this.singList = singList
    }
  }
}
</script>
<style lang="less" scoped>
.intro-play-list {
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
}
</style>
