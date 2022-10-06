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
    const parts = (value ?? '').toString().split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return parts.join('.')
  },

  toDollars(value) {
    return (
      'NT$ ' + (value ?? '').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    )
  },

  reverseString(str) {
    if (str === undefined) {
      return ''
    } else {
      return str.split('').reverse().join('')
    }
  },

  paddingLeft(str, length) {
    if (str.length >= length) {
      return str
    } else {
      return this.paddingLeft('0' + str, length)
    }
  },

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  },
  dateTime2String(str) {
    let reStr = ''
    if (str instanceof Date) {
      reStr =
        this.paddingLeft(str.getFullYear().toString(), 4) +
        this.paddingLeft((str.getMonth() + 1).toString(), 2) +
        this.paddingLeft(str.getDate().toString(), 2) +
        this.paddingLeft(str.getHours().toString(), 2) +
        this.paddingLeft(str.getMinutes().toString(), 2) +
        this.paddingLeft(str.getSeconds().toString(), 2)
    } else if ((str ?? '').length > 0) {
      reStr = str.replace(/[-/\s:]/g, '')
    }
    return reStr
  },
  formatTimeMinus(str) {
    let reStr = ''
    if (str instanceof Date) {
      reStr =
        this.paddingLeft(str.getFullYear().toString(), 4) +
        '-' +
        this.paddingLeft((str.getMonth() + 1).toString(), 2) +
        '-' +
        this.paddingLeft(str.getDate().toString(), 2) +
        ' ' +
        this.paddingLeft(str.getHours().toString(), 2) +
        ':' +
        this.paddingLeft(str.getMinutes().toString(), 2) +
        ':' +
        this.paddingLeft(str.getSeconds().toString(), 2)
    } else if ((str ?? '').toString().length === 14) {
      reStr = `${str.substring(0, 4)}-${str.substring(4, 6)}-${str.substring(
        6,
        8
      )} ${str.substring(8, 10)}:${str.substring(10, 12)}:${str.substring(
        12,
        14
      )}`
    } else if ((str ?? '').toString().length === 12) {
      reStr = `${str.substring(0, 4)}-${str.substring(4, 6)}-${str.substring(
        6,
        8
      )} ${str.substring(8, 10)}:${str.substring(10, 12)}`
    } else if ((str ?? '').toString().length === 8) {
      reStr = `${str.substring(0, 4)}-${str.substring(4, 6)}-${str.substring(
        6,
        8
      )}`
    }

    return reStr
  },
  formatTel(str) {
    let reStr = ''
    if ((str ?? '').toString().length === 10) {
      reStr = `${str.substring(0, 2)}-${str.substring(2, 6)}-${str.substring(
        6,
        10
      )}`
    }
    return reStr
  }
}

export default util
