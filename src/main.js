import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入ant-design-vue
import 'ant-design-vue/dist/antd.css'
// 引入公共css
import '../public/css/common.css'
// 引入iconfont
import '../public/css/iconfont.css'
// 引入element-ui
import 'element-ui/lib/theme-chalk/index.css'
// 引入nprogress
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  document.title = to.meta.name
  Nprogress.start()
  next()
})

router.afterEach(transition => {
  Nprogress.done()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
