export const state = () => ({
  productsList: []
})

export const getters = {
}

export const mutations = {
  initProductsList(state, dataList) {
    state.productsList = dataList
  }
}

export const actions = {
  async fetchBulkList({ commit }) {
    const data = await this.$axios.$get('S02')
    commit('initProductsList', data.data.resultList)
  }
}
