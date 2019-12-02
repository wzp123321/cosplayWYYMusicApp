<template>
  <a-layout id="components-layout-demo-custom-trigger" class="common-wrapper container">
    <div style="flex:1">
      <a-layout-header style="background:#fff;height:48px">
        <Header :collpased="collpased" @collapsedChange="collapsedChange"></Header>
      </a-layout-header>
      <a-layout-content>
        <Content></Content>
      </a-layout-content>
    </div>
    <!-- <a-layout-footer style="width:100%;height:120px;">
      <Footer></Footer>
    </a-layout-footer> -->
  </a-layout>
</template>

<script>
import { Layout } from 'ant-design-vue'
import Header from '../layout/header.vue'
import Content from '../layout/content.vue'
import Footer from '../layout/footer.vue'

export default {
  name: 'Index',
  components: {
    Header,
    Footer,
    Content,
    'a-layout': Layout,
    'a-layout-header': Layout.Header,
    'a-layout-content': Layout.Content,
    'a-layout-footer': Layout.Footer
  },
  data() {
    return {
      collpased: false,
      routeList: []
    }
  },

  methods: {
    collapsedChange() {
      this.collpased = !this.collpased
    },
    routeLinkTo(path) {
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

.container {
  display: flex;
  flex-direction: column;
}
</style>
