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
      .reduce((a, b) => a + b)
  },
  getSaleAmt: (state) => {
    return state.orders
      .filter(x => x.status === '1')
      .map(x => x.totalAmt)
      .reduce((a, b) => a + b)
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
    const data = await this.$axios.$get('S02/load')
    console.log(data)
    commit('initProductsList', data.data.products)
    commit('initOrdersList', data.data.orders)
  },

  async fetchProductById({ state }, id) {
    const product = state.productsList.find(x => x.productId === id)
    console.log(product)
    if (product) {
      return product
    }
    const data = await this.$axios.$get(`S02/product/${id}`)
    console.log(data)
    if (data.res === 'CODE0000') {
      return data.data.product
    }

    return undefined
  }
}
