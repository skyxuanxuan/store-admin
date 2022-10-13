export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
  async nuxtServerInit({ dispatch }) {
    try {
      await dispatch('basic/fetchBasic')
      await dispatch('userInfo/fetchUserInfo')
      await dispatch('S03/fetchStore')
      await dispatch('S07/fetchMessages')
    } catch (err) {}
  }
}
