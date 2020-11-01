import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import nprogress from 'nprogress'

Vue.use(VueRouter)
import paths from './paths'

const routes: Array<RouteConfig> = paths

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const token = localStorage.getItem('token')
  if (authRequired && !token) next({ name: 'Login' })
  else next()
})

router.afterEach(() => {
  // ...
  nprogress.done()
})

export default router
