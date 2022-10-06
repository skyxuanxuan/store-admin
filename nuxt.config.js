import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '紅陽優惠券店家後台 - %s',
    title: '店家後臺',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Noto+Sans+TC:100,300,400,500,700&display=swap'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@mdi/font/css/materialdesignicons.min.css', '~/assets/transition.css'],

  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    imgUrl: process.env.IMAGE_URL || 'http://localhost:8080/resources'
  },

  // server: {
  //   host: '0.0.0.0',
  //   port: '3000'
  // },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/lodash.js',
    '~/plugins/md5.js',
    '~/plugins/axios',
    '~/plugins/filters', // 全局過濾器
    // { src: '~/plugins/firebase', ssr: false }, // firebase
    { src: '~/plugins/notifications-ssr', ssr: true },
    { src: '~/plugins/notifications-client', ssr: false },
    { src: '~plugins/leaflet.js', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // sass auto import
    '@nuxtjs/style-resources'
  ],

  /*
   ** 這邊是要自己手動新加入的位置
   ** 樣式資源位置
   */
  styleResources: {
    scss: ['~/assets/scss/*.scss']
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/proxy',
    '@nuxtjs/auth-next',
    'vue-sweetalert2/nuxt',
    'vue2-editor/nuxt',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyA4Xumu_yNdH13ZAX4PjS2tc3nGiJ7Ww14',
          authDomain: 'spc-test-b345a.firebaseapp.com',
          projectId: 'spc-test-b345a',
          storageBucket: 'spc-test-b345a.appspot.com',
          messagingSenderId: '407295619258',
          appId: '1:407295619258:web:8eda3f05d6bc8b27351283',
          measurementId: 'G-TLQNQ2ZLBM'
        },
        services: {
          messaging: {
            createServiceWorker: false
          }
        }
      }
    ]
  ],

  sweetalert: {
    confirmButtonColor: '#587FFF',
    cancelButtonColor: '#EF6969'
  },

  auth: {
    plugins: [{ src: '~/plugins/axios', ssr: true }, '~/plugins/auth.js'],
    strategies: {
      localRefresh: {
        scheme: 'refresh',
        token: {
          property: 'accessToken',
          global: true,
          maxAge: 60
        },
        refreshToken: {
          property: 'refreshToken',
          data: 'refreshToken',
          tokenRequired: true,
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: false
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          logout: { url: '/auth/logout', method: 'post' },
          refresh: { url: '/auth/refresh', method: 'post' },
          user: false
        }
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/'
    },
    autoLogout: true,
    localStorage: false
  },

  router: {
    middleware: ['auth']
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    prefix: '/api/store'
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: '/'
  },

  proxy: {
    '/api/store': {
      target: process.env.BACKAND,
      pathRewrite: {
        '^/api/store': '/api/store'
      }
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    defaultAssets: false,
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          brownS1: '#986E57',
          brownS1P: '#754933',
          brownS1M: '#D6BEB2',
          brownS2: '#AA998F',
          brownS2P: '#7B6465',
          brownS2M: '#D4CCC7',
          brownS2MM: '#EBE6E3',
          brownS3: '#D1BE9C',
          greenS1: '#628275',
          greenS1P: '#4C6158',
          greenS1PP: '#1F3B2F',
          greenS1PPP: '#16261F',
          other1: '#EF6969',
          other2: '#587FFF'
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
