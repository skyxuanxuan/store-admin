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
    return state.orders.filter(x => x.totalNum).reduce((a, b) => a + b)
  },
  getSaleAmt: (state) => {
    return state.orders.filter(x => x.totalAmt).reduce((a, b) => a + b)
  }
}

export const mutations = {
  initProductsList(state, dataList) {
    state.productsList = dataList
  },
  initOrdersList(state, dataList) {
    state.productsList = dataList
  }
}

export const actions = {
  async fetchProductsList({ commit }) {
    const data = await this.$axios.$get('S02/load')
    console.log(data)
    commit('initProductsList', data.data.products)
    commit('initOrdersList', data.data.orders)
  }
}
