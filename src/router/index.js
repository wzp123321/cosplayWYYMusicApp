import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/home',
  component: () => import('../pages/index.vue'),
  children: [{
    path: '/home/music',
    component: () => import('../pages/musics/index.vue'),
    meta: {
      name: '歌曲管理'
    }
  },
  {
    path: '/home/intro',
    component: () => import('../pages/introduce/index.vue'),
    meta: {
      name: '推荐'
    }
  },
  {
    path: '/home/order',
    component: () => import('../pages/order/index.vue'),
    meta: {
      name: '订单管理'
    }
  },
  {
    path: '/home',
    redirect: '/home/intro'
  }
  ]
},
{
  path: '/',
  redirect: '/home'
}
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
