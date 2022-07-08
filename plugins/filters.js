import Vue from 'vue'

// 輸出格式化數字 #,###
Vue.filter('numberWithCommas', (value) => {
  return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
})

// 輸出格式化金錢 #,###
Vue.filter('toDollars', (value) => {
  return '$ ' + value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
})
