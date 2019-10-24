<template>
  <div class="header-wrapper frs">
    <a-menu mode="horizontal" class="header-menu">
      <a-menu-item
        :class="$route.path===routeItem.path?'ant-menu-item-selected' :''"
        v-for="(routeItem,index) in routeList"
        :key="index"
        @click="routeToPage(routeItem.path)"
      >{{routeItem.title}}</a-menu-item>
    </a-menu>
    <a-input-search class="search-input" placeholder="请输入歌曲名或歌手搜索"></a-input-search>
  </div>
</template>
<script>
import { Menu, Input } from 'ant-design-vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Header',
  components: {
    'a-menu': Menu,
    'a-menu-item': Menu.Item,
    'a-input-search': Input.Search
  },
  computed: mapGetters(['routeList']),
  data () {
    return {
    }
  },
  methods: {
    routeToPage (path) {
      this.$router.push(path)
    }
  }
}
</script>
<style lang="less" scoped>
.header-wrapper {
  width: 100%;
  .header-menu {
    width: 800px;
    margin-left: 20px;
  }
  .search-input {
    width: 300px;
    margin-top: 10px;
    height: 32px;
  }
}
</style>
<style>
.ant-menu-item-selected {
  transition: 500ms all;
}
</style>
