export const state = () => ({
  user: null
})

export const getters = {
  getUserInfo: (state) => {
    if (state.user !== null) {
      return state.user
    }
    return {
      name: '無',
      storeId: '',
      storeNo: '',
      series: '',
      pToken: '',
      storeName: '',
      userName: '',
      userEmail: '',
      userGroup: ''
    }
  },
  getFuncs: (state) => {
    const funcArr = [{ text: '首頁', icon: 'mdi-home-outline', to: '/' }]
    if (state.user !== null) {
      return funcArr.concat(state.user.func)
    }
    return funcArr
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
      if (data.res === 'CODE0000') {
        commit('initInfo', data.data)
      }
    } catch (err) {}
  },

  fetchPermission({ state }, id) {
    if (state.user !== null) {
      const funcArr = state.user.func
      const func = funcArr.find(x => x.id === id)
      if (func) {
        return func.permission
      }
    }
    return 0
  },

  cleanInfo({ commit }) {
    commit('initInfo', null)
  }
}
