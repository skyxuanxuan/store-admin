import moment from 'moment'
import util from '~/assets/js/util'

export const state = () => ({
  productsList: [],
  orders: []
})

export const getters = {
  getProductsNum: (state) => {
    return state.productsList.length
  },
  getPlansNum: (state) => {
    let num = 0
    state.productsList.forEach((item) => {
      num += item.productPlanDTOSet.length
    })
    return num
  },
  getSaleNum: (state) => {
    let saleNum = 0
    const nDate = moment().toDate()
    state.orders.filter(x => x.status === '1').forEach((item) => {
      if (item.payTime.length > 0) {
        const payDate = new Date(util.formatTimeMinus(item.payTime))
        if (nDate.getFullYear() === payDate.getFullYear() && nDate.getMonth() === payDate.getMonth()) {
          saleNum += item.totalNum
        }
      }
    })
    return saleNum
  },
  getSaleAmt: (state) => {
    let saleAmt = 0
    const nDate = new Date()
    state.orders.filter(x => x.status === '1').forEach((item) => {
      if (item.payTime.length > 0) {
        const payDate = new Date(util.formatTimeMinus(item.payTime))
        if (nDate.getFullYear() === payDate.getFullYear() && nDate.getMonth() === payDate.getMonth()) {
          saleAmt += item.totalAmt
        }
      }
    })
    return saleAmt
  }
}

export const mutations = {
  initProductsList(state, dataList) {
    state.productsList = dataList
  },
  initOrdersList(state, dataList) {
    state.orders = dataList
  }
}

export const actions = {
  async fetchProductsList({ commit }) {
    try {
      const data = await this.$axios.$get('S02/products')
      commit('initProductsList', data.data.products)
    } catch (err) {}
  },

  async fetchOrdersList({ commit }) {
    try {
      const data = await this.$axios.$get('S02/orders')
      commit('initOrdersList', data.data.orders)
    } catch (err) {}
  }
}
