<template>
  <div class="content">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'Content'
}
</script>
<style lang="less" scoped>
.content {
  height: 100%;
  margin: 15px 10px;
  padding: 10px;
  background: #fff;
}
</style>
