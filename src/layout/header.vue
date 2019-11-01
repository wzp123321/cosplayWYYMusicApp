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
          <a-menu-item @click="openBox">{{isLogin ? '个人中心' : '登录'}}</a-menu-item>
        </a-menu>
        <a-input-search @search="searInput" class="search-input" placeholder="请输入歌曲名或歌手搜索"></a-input-search>
      </div>
    </div>
    <a-modal
      title="用户登录"
      okText="登录"
      cancelText="取消"
      :visible="visible"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item label="手机号码" class="frstart">
          <a-input
            style="width:360px"
            v-decorator="[
          'phonenum',
          { rules: [{ required: true, message: isPhone? '请输入手机号码!':'请输入邮箱号码!' }] },
        ]"
            :placeholder="isPhone? '请输入手机号码':'请输入邮箱号码'"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item label="密码" class="frstart">
          <a-input
            style="width:360px"
            v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入密码!' }] },
        ]"
            type="password"
            placeholder="请输入密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item style="margin-left:20px">
          <a-radio :checked="isPhone" @change="isPhone = true">手机登录</a-radio>
          <a-radio :checked="!isPhone" @change="isPhone = false">邮箱登录</a-radio>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import {
  Menu,
  Input,
  Modal,
  Form,
  Icon,
  Radio,
  message
} from 'ant-design-vue'
import { mapGetters, mapActions } from 'vuex'
import HttpApi from '@/assets/api/index'

export default {
  name: 'Header',
  components: {
    'a-menu': Menu,
    'a-menu-item': Menu.Item,
    'a-input': Input,
    'a-input-search': Input.Search,
    'a-modal': Modal,
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-icon': Icon,
    'a-radio': Radio,
    message
  },
  //  isFixed: false, //导航栏是否吸顶
  computed: mapGetters(['routeList', 'isFixed', 'isLogin']),
  data() {
    return {
      animateSpeed: 40, //平滑滚动的速度
      anchorTop: 0, //导航栏的offsetTop
      anchorHeight: 0, //导航栏的高度
      activeIndex: 0, //导航栏高亮的索引
      visible: false,
      isPhone: true,
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  methods: {
    ...mapActions(['setIsFixed', 'setUserInfo', 'setIsLogin']),
    routeToPage(path) {
      this.$router.push(path)
    },
    searInput(value) {
      this.$router.push('/home/search/' + encodeURIComponent(value))
    },
    /**
      这里如果登录则跳转页面  如果未登录则弹出登录框
     */
    openBox() {
      if (!this.isLogin) {
        this.visible = true
      } else {
        this.$router.push('')
      }
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          let method = this.isPhone
            ? 'getUserLoginByPhone'
            : 'getUserLoginByEmail'
          let params = this.isPhone
            ? {
                phone: values.phonenum,
                password: values.password
              }
            : { email: values.phonenum, password: values.password }

          const res = await HttpApi[method](params)
          if (res && res.data) {
            this.setIsLogin(true)
            this.setUserInfo(res.data)
            this.visible = false
            window.localStorage.setItem('isLogin', true)
            this.$message.success('登录成功')
          } else {
            this.form.setFields({
              phonenum: { value: '', errors: new Error('账号或密码错误') }
            })
          }
        }
      })
    },
    handleCancel() {
      this.visible = false
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
    text-align: left;
    width: 800px;
    margin-left: 30px;
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
.ant-form-item-label {
  width: 80px;
  text-align: center;
}
</style>
