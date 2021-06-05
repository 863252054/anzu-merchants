import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const routes = [
  {
    path: '/',
    redirect: '/home',
    // 是否数据缓存
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home'),
    children: [{
      path: 'myAddress',
      name: 'myAddress',
      component: () => import('../views/myAddress'),
      children: [{
        // 添加地址
        path: 'addAddress',
        name: 'addAddress',
        component: () => import('../views/addAddress')
      }, {
        // 编辑地址
        path: 'editAddress',
        name: 'editAddress',
        component: () => import('../views/editAddress')
      }]
    }]
  }, {
    path: '/goods',
    name: 'goods',
    component: () => import('../views/goods')
  }
]

const router = new Router({
  // 解决路由跳转页面没有置顶
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes
})

export default router
