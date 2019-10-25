<template>
  <div style="display:flex;flex-wrap:wrap">
    <MVItem v-for="(mvItem,index) in mvlist" :key="index" :mvInfo="mvItem"></MVItem>
  </div>
</template>
<script>
import MVItem from '../../../components/mvItem'
import HttpApi from '../../../assets/api/index'
export default {
  name: 'SingerMV',
  components: {
    MVItem
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      mvlist: []
    }
  },
  methods: {
    async getMVList() {
      const res = await HttpApi.getSingerMVList({ id: this.id })
      if (res && res.data) {
        const mvs = res.data.mvs
        this.mvlist = mvs
      }
    }
  },
  created() {
    this.getMVList()
  }
}
</script>
<style lang="less" scoped>
</style>