<template>
  <div class="content" :style="{marginTop: isFixed?'80px':'15px'}">
    <router-view></router-view>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Content',
  computed: mapGetters(['isFixed'])
}
</script>
<style lang="less" scoped>
.content {
  height: 100%;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 10px;
  padding: 10px;
  background: #fff;
}
</style>
