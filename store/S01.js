import moment from 'moment'
import util from '~/assets/js/util'

export const state = () => ({
  bulkList: [],
  amount: 0,
  productsList: [],
  orders: [],
  bulkTickets: []
})

export const getters = {
  getBulkList: (state) => {
    const initArray = []
    state.bulkList.forEach((item, index) => {
      const initDetailArray = item.reviewBulkDetailDTOS.map(detail => ({
        dl0: detail.id,
        dl1: detail.reviewDetailPrice,
        dl2: detail.reviewDetailNum
      }))

      let d5 = ''
      if ((item.reviewTime ?? '').toString().length > 0) {
        d5 = item.reviewTime
      }
      let d6 = '未知'
      switch (item.reviewStatus) {
        case 0:
          d6 = '尚未繳款'
          break
        case 1:
          d6 = '通過'
          break
        case 2:
          d6 = '審核中'
          break
        case 8:
          d6 = '已取消'
          break
        case 9:
          d6 = '退件'
          break
      }

      const img = `${process.env.imgUrl}/store/${item.reviewId}/apply/${item.reviewImg}`

      initArray.push({
        d0: item.id,
        d1: item.id,
        d2: item.reviewAmt,
        d3: item.reviewNum,
        d4: moment(item.applicationTime, 'YYYYMMDDhhmmss').format(
          'YYYY-MM-DD hh:mm:ss'
        ),
        d5,
        d6,
        img,
        status: item.reviewStatus,
        detail: initDetailArray
      })
    })
    return initArray
  },
  getBulkTickets: (state) => {
    const groupList = state.bulkTickets.reduce((group, ticket) => {
      const { denomination } = ticket
      group[denomination] = group[denomination] ?? []
      group[denomination].push(ticket)
      return group
    }, {})

    const initArr = []
    for (const key in groupList) {
      initArr.push({
        bulk_type: key,
        bulk_num: groupList[key].length
      })
    }
    return initArr
  },
  getProductsNum: (state) => {
    return state.productsList.length
  },
  getBulkTicketsNum: (state) => {
    return state.bulkTickets.length
  },
  getSaleNum: (state) => {
    let saleNum = 0
    const nDate = new Date()
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
  initbulkList(state, bulkList) {
    state.bulkList = bulkList
  },

  initAmount(state, amount) {
    state.amount = amount
  },

  initProductList(state, products) {
    state.productsList = products
  },

  initOrderList(state, orders) {
    state.orders = orders
  },

  initBulkTicketsList(state, bulkTickets) {
    state.bulkTickets = bulkTickets
  }
}

export const actions = {
  async fetchBulkList({ commit }) {
    try {
      const data = await this.$axios.$get('S01/apply')
      commit('initbulkList', data.data.resultList)
      commit('initAmount', data.data.amount)
    } catch (err) {}
  },

  async fetchProductList({ commit }) {
    try {
      const data = await this.$axios.$get('S01/products')
      commit('initProductList', data.data.products)
    } catch (err) {}
  },

  async fetchOrdersList({ commit }) {
    try {
      const data = await this.$axios.$get('S01/orders')
      commit('initOrderList', data.data.orders)
    } catch (err) {}
  },

  async fetchBulkTicketsList({ commit }) {
    try {
      const data = await this.$axios.$get('S01/bulk-tickets')
      commit('initBulkTicketsList', data.data.bulkTickets)
    } catch (err) {}
  }
}
