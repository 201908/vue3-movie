import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      // name: 'index',
      component: () => import('@/views/Index.vue'),
      children: [{
          path: '',
          redirect: '/home'
        },
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/Home.vue')
        },
        {
          path: '/add',
          name: 'add',
          component: () => import('@/views/Add.vue')
        },
        {
          path: '/miniprogram',
          name: 'miniprogram',
          component: () => import('@/views/Miniprogram.vue')
        }
      ]
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('@/views/Edit.vue')
    }
  ]
})