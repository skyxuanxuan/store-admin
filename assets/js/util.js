const util = {
  _uuid() {
    let d = Date.now()
    if (
      typeof performance !== 'undefined' &&
      typeof performance.now === 'function'
    ) {
      d += performance.now() // use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
      }
    )
  },
  numberWithCommas(value) {
    return (value ?? '')
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },

  toDollars(value) {
    return (
      'NT$ ' +
      (value ?? '').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    )
  },

  reverseString(str) {
    if (str === undefined) {
      return ''
    } else {
      return str.split('').reverse().join('')
    }
  },

  paddingLeft(str, lenght) {
    if (str.length >= lenght) { return str } else { return this.paddingLeft('0' + str, lenght) }
  }

}

export default util
