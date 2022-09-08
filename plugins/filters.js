import Vue from 'vue'

// 輸出格式化數字 #,###
Vue.filter('numberWithCommas', (value) => {
  const parts = (value ?? '').toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
})

// 輸出格式化金錢 #,###
Vue.filter('toDollars', (value) => {
  const parts = (value ?? '').toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return 'NT$ ' + parts.join('.')
})

// 字串\n替換<br>
Vue.filter('htmlParse', (value) => {
  value = value ?? ''
  return value.toString().replace(/\n|\r\n/g, '<br>')
})

// notify icon transform<br>
Vue.filter('notifyIconTransform', (value) => {
  if (value === 'success') {
    return 'checkbox-marked-circle-outline'
  } else if (value === 'info') {
    return 'information-outline'
  } else if (value === 'warning') {
    return 'alert-outline'
  } else if (value === 'error') {
    return 'close-circle-outline'
  }

  return 'checkbox-marked-circle-outline'
})
