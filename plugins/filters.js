import Vue from 'vue'

// 輸出格式化數字 #,###
Vue.filter('numberWithCommas', (value) => {
  return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
})

// 輸出格式化金錢 #,###
Vue.filter('toDollars', (value) => {
  return 'NT$ ' + value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
})

// 字串\n替換<br>
Vue.filter('htmlParse', (value) => {
  return value.toString().replace(/\n|\r\n/g, '<br>')
})
