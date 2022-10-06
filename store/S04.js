export const state = () => ({
  orders1: [],
  orders2: []
})

export const getters = {
}

export const mutations = {
  initOrders1(state, data) {
    state.orders1 = data
  },
  initOrders2(state, data) {
    state.orders2 = data
  }
}

export const actions = {
  async fetchS04({ commit }) {
    try {
      const data = await this.$axios.$get('S04/load')
      if (data.res === 'CODE0000') {
        commit('initOrders1', data.data.order.filter(x => x.productType === 1))
        commit('initOrders2', data.data.order.filter(x => x.productType === 2))
      } else {
        commit('initOrders1', [])
        commit('initOrders2', [])
      }
    } catch (err) {}
  },

  clearAll({ commit }) {
    commit('initOrders1', [])
    commit('initOrders2', [])
  }
}
