import createApp from './app.js'

import messagingService from './service.messaging.js'

const appConfig = {"apiKey":"AIzaSyA4Xumu_yNdH13ZAX4PjS2tc3nGiJ7Ww14","authDomain":"spc-test-b345a.firebaseapp.com","projectId":"spc-test-b345a","storageBucket":"spc-test-b345a.appspot.com","messagingSenderId":"407295619258","appId":"1:407295619258:web:8eda3f05d6bc8b27351283","measurementId":"G-TLQNQ2ZLBM"}

export default async (ctx, inject) => {
  const { firebase, session } = await createApp(appConfig, ctx)

  let servicePromises = []

  if (process.client) {
    servicePromises = [
      messagingService(session, firebase, ctx, inject),

    ]
  }

  const [
    messaging
  ] = await Promise.all(servicePromises)

  const fire = {
    messaging: messaging
  }

    inject('fireModule', firebase)
    ctx.$fireModule = firebase

  inject('fire', fire)
  ctx.$fire = fire
}

function forceInject (ctx, inject, key, value) {
  inject(key, value)
  const injectKey = '$' + key
  ctx[injectKey] = value
  if (typeof window !== "undefined" && window.$nuxt) {
  // If clause makes sure it's only run when ready() is called in a component, not in a plugin.
    window.$nuxt.$options[injectKey] = value
  }
}