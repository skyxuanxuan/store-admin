export const state = () => ({
  user: null
})

export const getters = {
  getUserInfo: (state) => {
    if (state.user !== null) {
      return state.user
    }
    return { name: '無', storeId: '', storeNo: '' }
  }
}

export const mutations = {
  initInfo(state, info) {
    state.user = info
  }
}

export const actions = {
  async fetchUserInfo({ commit }) {
    try {
      const data = await this.$axios.$get('auth/info')
      commit('initInfo', data)
    } catch (err) {}
  },

  cleanInfo({ commit }) {
    commit('initInfo', null)
  }
}
