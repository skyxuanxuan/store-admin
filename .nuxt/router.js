import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2575aba9 = () => interopDefault(import('..\\pages\\change-password.vue' /* webpackChunkName: "pages/change-password" */))
const _d19b248c = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _be0b9a44 = () => interopDefault(import('..\\pages\\S00\\index.vue' /* webpackChunkName: "pages/S00/index" */))
const _aea84f86 = () => interopDefault(import('..\\pages\\S01\\index.vue' /* webpackChunkName: "pages/S01/index" */))
const _9f4504c8 = () => interopDefault(import('..\\pages\\S02\\index.vue' /* webpackChunkName: "pages/S02/index" */))
const _8fe1ba0a = () => interopDefault(import('..\\pages\\S03\\index.vue' /* webpackChunkName: "pages/S03/index" */))
const _807e6f4c = () => interopDefault(import('..\\pages\\S04\\index.vue' /* webpackChunkName: "pages/S04/index" */))
const _711b248e = () => interopDefault(import('..\\pages\\S05\\index.vue' /* webpackChunkName: "pages/S05/index" */))
const _52548f12 = () => interopDefault(import('..\\pages\\S07\\index.vue' /* webpackChunkName: "pages/S07/index" */))
const _42f14454 = () => interopDefault(import('..\\pages\\S08\\index.vue' /* webpackChunkName: "pages/S08/index" */))
const _46c14cee = () => interopDefault(import('..\\pages\\S01\\apply\\index.vue' /* webpackChunkName: "pages/S01/apply/index" */))
const _352c57d8 = () => interopDefault(import('..\\pages\\S08\\group-list.vue' /* webpackChunkName: "pages/S08/group-list" */))
const _153c6cd4 = () => interopDefault(import('..\\pages\\S01\\product\\create.vue' /* webpackChunkName: "pages/S01/product/create" */))
const _7be78435 = () => interopDefault(import('..\\pages\\S02\\product\\create.vue' /* webpackChunkName: "pages/S02/product/create" */))
const _0fe1607f = () => interopDefault(import('..\\pages\\S08\\group\\create.vue' /* webpackChunkName: "pages/S08/group/create" */))
const _31b0c884 = () => interopDefault(import('..\\pages\\S00\\send\\_id.vue' /* webpackChunkName: "pages/S00/send/_id" */))
const _7434b290 = () => interopDefault(import('..\\pages\\S01\\product\\_id.vue' /* webpackChunkName: "pages/S01/product/_id" */))
const _41df1451 = () => interopDefault(import('..\\pages\\S02\\product\\_id.vue' /* webpackChunkName: "pages/S02/product/_id" */))
const _668ca772 = () => interopDefault(import('..\\pages\\S08\\group\\_id.vue' /* webpackChunkName: "pages/S08/group/_id" */))
const _457836de = () => interopDefault(import('..\\pages\\first-enter\\_id.vue' /* webpackChunkName: "pages/first-enter/_id" */))
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
    path: "/change-password",
    component: _2575aba9,
    name: "change-password"
  }, {
    path: "/login",
    component: _d19b248c,
    name: "login"
  }, {
    path: "/S00",
    component: _be0b9a44,
    name: "S00"
  }, {
    path: "/S01",
    component: _aea84f86,
    name: "S01"
  }, {
    path: "/S02",
    component: _9f4504c8,
    name: "S02"
  }, {
    path: "/S03",
    component: _8fe1ba0a,
    name: "S03"
  }, {
    path: "/S04",
    component: _807e6f4c,
    name: "S04"
  }, {
    path: "/S05",
    component: _711b248e,
    name: "S05"
  }, {
    path: "/S07",
    component: _52548f12,
    name: "S07"
  }, {
    path: "/S08",
    component: _42f14454,
    name: "S08"
  }, {
    path: "/S01/apply",
    component: _46c14cee,
    name: "S01-apply"
  }, {
    path: "/S08/group-list",
    component: _352c57d8,
    name: "S08-group-list"
  }, {
    path: "/S01/product/create",
    component: _153c6cd4,
    name: "S01-product-create"
  }, {
    path: "/S02/product/create",
    component: _7be78435,
    name: "S02-product-create"
  }, {
    path: "/S08/group/create",
    component: _0fe1607f,
    name: "S08-group-create"
  }, {
    path: "/S00/send/:id?",
    component: _31b0c884,
    name: "S00-send-id"
  }, {
    path: "/S01/product/:id?",
    component: _7434b290,
    name: "S01-product-id"
  }, {
    path: "/S02/product/:id?",
    component: _41df1451,
    name: "S02-product-id"
  }, {
    path: "/S08/group/:id?",
    component: _668ca772,
    name: "S08-group-id"
  }, {
    path: "/first-enter/:id?",
    component: _457836de,
    name: "first-enter-id"
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
