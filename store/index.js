export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
  async nuxtServerInit({ dispatch }) {
    try {
      await dispatch('userInfo/fetchUserInfo')
      await dispatch('basic/fetchBasic')
    } catch (err) {}
  }
}
