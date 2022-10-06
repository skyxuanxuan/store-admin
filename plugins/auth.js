export default function ({ $axios, $auth, store }) {
  // if ($auth.loggedIn) {
  // }

  $axios.onRequest((config) => {
    console.log('making request to ' + config.url)
    console.log('config ', config)
    return config
  })

  $axios.onResponse((response) => {
    console.log(response)
  })

  $axios.onError((error) => {
    console.log(error)
    if ($auth.loggedIn) {
      if (typeof error === 'object' && 'response' in error) {
        if (error.response.status === 401 || error.response.status === 403) {
          console.log('logout')
          store.dispatch('userInfo/cleanInfo')
          store.dispatch('S04/clearAll')
          $auth.logout()
        }
      }
    }
  })
}
