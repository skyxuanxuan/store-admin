import Middleware from './middleware'
import { Auth, authMiddleware, ExpiredAuthSessionError } from '~auth/runtime'

// Active schemes
import { RefreshScheme } from '~auth/runtime'

Middleware.auth = authMiddleware

export default function (ctx, inject) {
  // Options
  const options = {
  "resetOnError": false,
  "ignoreExceptions": false,
  "scopeKey": "scope",
  "rewriteRedirects": true,
  "fullPathRedirect": false,
  "watchLoggedIn": true,
  "redirect": {
    "login": "/login",
    "logout": "/login",
    "home": "/",
    "callback": "/login"
  },
  "vuex": {
    "namespace": "auth"
  },
  "cookie": {
    "prefix": "auth.",
    "options": {
      "path": "/"
    }
  },
  "localStorage": false,
  "defaultStrategy": "localRefresh",
  "autoLogout": true
}

  // Create a new Auth instance
  const $auth = new Auth(ctx, options)

  // Register strategies
  // localRefresh
  $auth.registerStrategy('localRefresh', new RefreshScheme($auth, {
  "token": {
    "property": "accessToken",
    "global": true,
    "maxAge": 60
  },
  "refreshToken": {
    "property": "refreshToken",
    "data": "refreshToken",
    "tokenRequired": true,
    "maxAge": 2592000
  },
  "user": {
    "property": false
  },
  "endpoints": {
    "login": {
      "url": "/auth/login",
      "method": "post"
    },
    "logout": {
      "url": "/auth/logout",
      "method": "post"
    },
    "refresh": {
      "url": "/auth/refresh",
      "method": "post"
    },
    "user": false
  },
  "name": "localRefresh"
}))

  // Inject it to nuxt context as $auth
  inject('auth', $auth)
  ctx.$auth = $auth

  // Initialize auth
  return $auth.init().catch(error => {
    if (process.client) {
      // Don't console log expired auth session errors. This error is common, and expected to happen.
      // The error happens whenever the user does an ssr request (reload/initial navigation) with an expired refresh
      // token. We don't want to log this as an error.
      if (error instanceof ExpiredAuthSessionError) {
        return
      }

      console.error('[ERROR] [AUTH]', error)
    }
  })
}
