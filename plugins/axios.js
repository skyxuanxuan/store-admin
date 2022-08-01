export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    console.log('making request to ' + config.url)
    console.log('config ', config)
    return config
  })

  $axios.onResponse((response) => {
    console.log(response)
  })

  $axios.onError((err) => {
    console.log(err)
  })
}
