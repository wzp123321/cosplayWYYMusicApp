<template>
  <a-list class="music-list" bordered :dataSource="topList">
    <a-list-item
      slot="renderItem"
      @click="handleTypeChange(item.key)"
      slot-scope="item, index"
      :key="index"
      :class="idx===item.key? 'isactive':''"
    >{{item.value}}</a-list-item>
  </a-list>
</template>
<script>
import { List } from 'ant-design-vue'
import store from '../../store/index'
import { mapGetters } from 'vuex'

export default {
  name: 'MusicMenu',
  store,
  components: {
    'a-list': List,
    'a-list-item': List.Item
  },
  props: {
    idx: {
      type: String,
      default: '0'
    }
  },
  computed: mapGetters(['topList']),
  data () {
    return {}
  },
  methods: {
    handleTypeChange (idx) {
      this.$emit('search', idx)
    }
  }
}
</script>
<style lang="less" scoped>
.music-list {
  width: 220px;
  height: 100%;
  margin-right: 40px;
  .isactive {
    color: #06a5ff;
    font-size: 20px;
    transition: 500ms all;
  }
}
</style>
<style>
.ant-list-item-content {
  width: 100%;
  display: inline-block;
  text-align: center;
}
</style>
