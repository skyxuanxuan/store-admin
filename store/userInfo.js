export const state = () => ({
  user: null
})

export const getters = {
  getUserInfo: (state) => {
    if (state.user !== null) {
      return state.user
    }
    return { username: '無' }
  }
}

export const mutations = {
  initInfo(state, info) {
    state.user = info
  }
}

export const actions = {
  async fetchUserInfo({ commit }) {
    const data = await this.$axios.$get('auth/info')
    commit('initInfo', data)
  },

  cleanInfo({ commit }) {
    commit('initInfo', null)
  }
}
