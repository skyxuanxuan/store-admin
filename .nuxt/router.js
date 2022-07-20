import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _162ea66b = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _d19b248c = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _aea84f86 = () => interopDefault(import('..\\pages\\S01\\index.vue' /* webpackChunkName: "pages/S01/index" */))
const _153c6cd4 = () => interopDefault(import('..\\pages\\S01\\product\\create.vue' /* webpackChunkName: "pages/S01/product/create" */))
const _64ea6aba = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/inspire",
    component: _162ea66b,
    name: "inspire"
  }, {
    path: "/login",
    component: _d19b248c,
    name: "login"
  }, {
    path: "/S01",
    component: _aea84f86,
    name: "S01"
  }, {
    path: "/S01/product/create",
    component: _153c6cd4,
    name: "S01-product-create"
  }, {
    path: "/",
    component: _64ea6aba,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
