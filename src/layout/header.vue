<template>
  <div>
    <div id="ceilEle" class="ceil" :class="{ 'fixed animated slow fadeIn': isFixed }">
      <div class="header-wrapper frs">
        <a-menu mode="horizontal" class="header-menu">
          <a-menu-item
            :class="$route.path===routeItem.path?'ant-menu-item-selected' :''"
            v-for="(routeItem,index) in routeList"
            :key="index"
            @click="routeToPage(routeItem.path)"
          >{{routeItem.title}}</a-menu-item>
        </a-menu>
        <a-input-search @search="searInput" class="search-input" placeholder="请输入歌曲名或歌手搜索"></a-input-search>
      </div>
    </div>
  </div>
</template>
<script>
import { Menu, Input } from 'ant-design-vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Header',
  components: {
    'a-menu': Menu,
    'a-menu-item': Menu.Item,
    'a-input-search': Input.Search
  },
  //  isFixed: false, //导航栏是否吸顶
  computed: mapGetters(['routeList', 'isFixed']),
  data() {
    return {
      animateSpeed: 40, //平滑滚动的速度
      anchorTop: 0, //导航栏的offsetTop
      anchorHeight: 0, //导航栏的高度
      activeIndex: 0 //导航栏高亮的索引
    }
  },
  methods: {
    ...mapActions(['setIsFixed']),
    routeToPage(path) {
      this.$router.push(path)
    },
    searInput(value) {
      this.$router.push('/home/search/' + encodeURIComponent(value))
    },
    /**
     * 窗口的滚动监听
     */
    winScrollHandler() {
      //是否fixed
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      if (this.anchorTop <= scrollTop) {
        this.setIsFixed(true)
      } else {
        this.setIsFixed(false)
      }

      //高亮
      let anchorContentList = document.querySelectorAll('.anchorContent')
      //变量windowHeight是可视区的高度
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight
      //变量scrollHeight是滚动条的总高度
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight
    },
    /**
     * 锚定位
     */
    goAnchor(selector, index, name) {
      let anchor = this.$el.querySelector(`#${selector}`)
      let targetTop = anchor.offsetTop
      let distance =
        document.documentElement.scrollTop || document.body.scrollTop
      let rate = Math.abs(targetTop - distance) / this.animateSpeed
      if (targetTop > distance) {
        // 目标元素的top大于现有的top，向下滚动
        this.smoothDown(rate, distance, targetTop, index)
      } else if (targetTop < distance) {
        //目标元素的top小于现有的top，向上滚动
        this.smoothUp(rate, distance, targetTop, index)
      }
    },
    /**
     * 向下滚动
     */
    smoothDown(rate, distance, targetTop, index) {
      let inter = setInterval(() => {
        if (distance < targetTop) {
          distance += rate
          document.documentElement.scrollTop = distance - this.anchorHeight
          document.body.scrollTop = distance - this.anchorHeight
        } else {
          document.documentElement.scrollTop = targetTop - this.anchorHeight
          document.body.scrollTop = targetTop - this.anchorHeight
          clearInterval(inter)
          this.activeIndex = index
        }
      }, 10)
    },
    /**
     * 向上滚动
     */
    smoothUp(rate, distance, targetTop, index) {
      rate *= 1.3
      let inter = setInterval(() => {
        if (distance > targetTop) {
          distance -= rate
          document.documentElement.scrollTop = distance - this.anchorHeight
          document.body.scrollTop = distance - this.anchorHeight
        } else {
          document.documentElement.scrollTop = targetTop - this.anchorHeight
          document.body.scrollTop = targetTop - this.anchorHeight
          clearInterval(inter)
          this.activeIndex = index
        }
      }, 10)
    }
  },
  created() {
    this.$nextTick(() => {
      this.anchorTop = this.$el.querySelector('#ceilEle').offsetTop
      this.anchorHeight = this.$el.querySelector('#ceilEle').offsetHeight
      window.addEventListener('scroll', this.winScrollHandler) //滚动事件监听
    })
  }
}
</script>
<style lang="less" scoped>
.ceil {
  height: 48px;
  line-height: 48px;
  background: #fff;
  &.fixed {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
  }
}
.header-wrapper {
  position: relative;
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
