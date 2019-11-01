<template>
  <div class="album-wrap" :style="`width:${width}px;height:${height}px`"  @click="getSingerInfo(singerInfo.id)">
    <CommonImg
      :src="singerInfo.picUrl "
      :width="width"
    />
    <p>{{singerInfo.name}}</p>
    <div style="text-align:left;margin-left:5px">
      <a-tag v-for="(item,index) in singerInfo.alias" :key="index" color="pink">{{item}}</a-tag>
    </div>
  </div>
</template>
<script>
// 歌单组件
import CommonImg from './CommonIMG'
import { Tag } from 'ant-design-vue'
export default {
  name: 'SingerItem',
  components: {
    'a-tag': Tag,
    CommonImg
  },
  props: {
    singerInfo: {
      type: Object
    },
    width: {
      type: Number,
      default: 180
    },
    height: {
      type: Number,
      default: 240
    }
  },
  methods: {
    getSingerInfo(id) {
      console.log('1212')
      this.$router.push('/home/singer/detail/' + id)
    }
  }
}
</script>
<style lang="less" scoped>
.album-wrap {
  margin-right: 20px;
  margin-bottom: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  position: relative;
  color: #000;
  p {
    text-align: left;
    margin: 5px 0 5px 10px;
  }
}
</style>
