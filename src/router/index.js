import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/home',
    meta: {
      name: '首页'
    },
    component: () => import('@/pages/index.vue'),
    children: [{
        path: '/home/music',
        component: () => import('@/pages/musics/index.vue'),
        meta: {
          name: '歌曲管理'
        }
      },
      {
        path: '/home/intro',
        component: () => import('@/pages/introduce/index.vue'),
        meta: {
          name: '推荐'
        }
      },
      {
        path: '/home/radio',
        component: () => import('@/pages/radio/index.vue'),
        meta: {
          name: '电台'
        }
      },
      {
        path: '/home/singer',
        meta: {
          name: '歌手页面'
        },
        component: () => import('@/pages/singer/index.vue'),
        children: [{
            path: '/home/singer/main',
            component: () => import('@/pages/singer/main.vue'),
            meta: {
              name: '歌手预览'
            }
          },
          {
            path: '/home/singer/total/:id',
            component: () => import('@/pages/singer/total.vue'),
            meta: {
              name: '歌手总览'
            }
          },
          {
            path: '/home/singer/detail/:id',
            title: '歌手详情',
            component: () => import('@/pages/singer/singerinfo.vue'),
            meta: {
              name: '歌手详情'
            }
          },
          {
            path: '/home/mv/detail/:id',
            component: () => import('@/pages/singer/mvdetail.vue'),
            meta: {
              name: 'mv详情'
            }
          },
          {
            path: '/home/singer',
            redirect: '/home/singer/main'
          }
        ]
      },
      {
        path: '/home/mv',
        meta: {
          name: 'mv页',
        },
        component: () => import('@/pages/mvpage/index.vue')
      },
      {
        path: '/home/search/:key',
        meta: {
          name: '搜索页',
        },
        component: () => import('@/pages/serachPage/index.vue')
      },
      {
        path: '/home/video/:vid',
        meta: {
          name: 'video页面'
        },
        component: () => import('@/pages/serachPage/videoinfo.vue')
      },
      {
        path: '/home/playlist/:id',
        component: () => import('@/pages/detail/playListDetail.vue'),
        meta: {
          name: '歌单详情'
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
