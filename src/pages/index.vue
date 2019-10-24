<template>
  <a-layout id="components-layout-demo-custom-trigger" class="common-wrapper">
    <Header :collpased="collpased" @collapsedChange="collapsedChange"></Header>
    <Content></Content>
  </a-layout>
</template>

<script>
import { Layout } from 'ant-design-vue'
import Header from '../layout/header.vue'
import Content from '../layout/content.vue'

export default {
  name: 'Index',
  components: {
    Header,
    Content,
    'a-layout': Layout
  },
  data () {
    return {
      collpased: false,
      routeList: []
    }
  },

  methods: {
    collapsedChange () {
      this.collpased = !this.collpased
    },
    routeLinkTo (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang='less' scoped>
#components-layout-demo-custom-trigger {
  height: 100%;
  background: #fff;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
