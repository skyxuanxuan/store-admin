export default function ({ $axios, redirect }) {
    $axios.onRequest((config) => {
        console.log('making request to ' + config.url);
        console.log('config ', config);
        return config
    })
}