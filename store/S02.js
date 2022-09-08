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
    return state.orders
      .filter(x => x.status === '1')
      .map(x => x.totalNum)
      .reduce((a, b) => a + b, 0)
  },
  getSaleAmt: (state) => {
    return state.orders
      .filter(x => x.status === '1')
      .map(x => x.totalAmt)
      .reduce((a, b) => a + b, 0)
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
