export const state = () => ({
  storeInfo: null
})

export const getters = {}

export const mutations = {
  initStore(state, data) {
    state.storeInfo = data
  }
}

export const actions = {
  async fetchStore({ commit }) {
    try {
      const data = await this.$axios.$get('S03/store')
      if (data.res === 'CODE0000') {
        commit('initStore', data.data.store)
      } else {
        commit('initStore', null)
      }
    } catch (err) {}
  }
}
