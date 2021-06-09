import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const routes = [
  {
    path: '/',
    redirect: '/login',
    // 是否数据缓存
    meta: {
      // keepAlive: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
  {
    path: '/merchantApp',
    name: 'merchantApp',
    component: () => import('../views/merchantApp'),
    children: [
      {
        path: '/merchantApp',
        redirect: '/merchantApp/home'
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/home'),
        children: [
          {
            path: 'myAddress',
            name: 'myAddress',
            component: () => import('../views/myAddress'),
            children: [
              {
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
          },
          {
            path: 'merchantOrder',
            name: 'merchantOrder',
            component: () => import('../views/merchantOrder')
          }
        ]
      },
      {
        path: 'goods',
        name: 'goods',
        component: () => import('../views/goods'),
        children: [{
          path: 'addGoods',
          name: 'addGoods',
          component: () => import('../views/addGoods')
        },
        {
          path: 'editGoods',
          name: 'editGoods',
          component: () => import('../views/editGoods')
        }]
      }
    ]

  },
  {
    path: '/administratorApp',
    name: 'administratorApp',
    component: () => import('../views/administratorApp'),
    children: [
      {
        path: '/administratorApp',
        redirect: '/administratorApp/administratorHome'
      },
      {
        path: 'administratorHome',
        name: 'administratorHome',
        component: () => import('../views/administratorHome')
      },
      {
        path: 'administratorGoods',
        name: 'administratorGoods',
        component: () => import('../views/administratorGoods'),
        children: [
          {
            path: 'seeGoods',
            name: 'seeGoods',
            component: () => import('../views/seeGoods')
          }]
      }
    ]

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
