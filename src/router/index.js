import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'
import { getToken } from '@/utils/auth'
import { Modal } from 'ant-design-vue'
import NProgress from 'nprogress'
import '@/styles/nprogress.less'

import layout from '@/layout'

const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login'),
    meta: { title: '登录' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const generateRoutes = (arr) => {
  return getRoutes(arr)
  function getRoutes (arr) {
    arr.forEach(route => {
      if (route.children) {
        route.children = getRoutes(route.children)
      }
      const path = route.component
      route.component = route.component === 'layout' ? layout : () => import(`@/views${path}`)
    })
    return arr
  }
}

router.beforeEach(async (to, from, next) => {
  // const title = document.title.split(' - ')[1] || document.title.split(' - ')[0]
  // document.title = to.meta.title && title ? `${to.meta.title} - ${title}` : title
  const hasToken = getToken()
  if (hasToken) {
    NProgress.start()
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.routes.length > 0) {
        next()
      } else {
        try {
          const { routers } = await store.dispatch('user/getInfo')
          const dynamicRoutes = generateRoutes(routers)
          // router.addRoutes([ { path: '/', hidden: true, redirect: dynamicRoutes[0].path }, ...dynamicRoutes]) // 把获取到的第一个路由作为/的redirect
          dynamicRoutes.forEach(v => {
            router.addRoute(v)
          })
          // 如果 addRoute 并未完成，路由守卫会一层一层的执行执行，直到 addRoute 完成，找到对应的路由
          next({ ...to, replace: true })
        } catch (error) {
          await store.dispatch('user/resetToken')
          Modal.confirm({
            content: '获取用户信息错误'
          })
          // next('/login')
          NProgress.done()
        }
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
