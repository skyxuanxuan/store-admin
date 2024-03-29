export const state = () => ({
  classes: [],
  cities: [],
  towns: [],
  payKind: null,
  orderLog: null
})

export const getters = {
  getClasses: (state) => {
    const initArr = []
    state.classes.forEach((item) => {
      initArr.push({
        color: item.classOrder % 5,
        id: item.id,
        name: item.className
      })
    })
    return initArr
  },
  getCitiesArr: (state) => {
    return state.cities.map((x) => {
      return {
        id: x.cityId,
        name: x.cityChName
      }
    })
  },
  getTownsArr: (state) => {
    return state.towns.map((x) => {
      return {
        id: x.townId,
        name: x.townChName,
        cityId: x.cityId
      }
    })
  }
}

export const mutations = {
  initClasses(state, value) {
    state.classes = value
  },
  initcities(state, value) {
    state.cities = value
  },
  inittowns(state, value) {
    state.towns = value
  },
  initPayKind(state, value) {
    state.payKind = value
  },
  initOrderLog(state, value) {
    state.orderLog = value
  }
}

export const actions = {
  async fetchBasic({ commit }) {
    try {
      const data = await this.$axios.$get('auth/basic')
      commit('initClasses', data.classes)
      commit('initcities', data.cities)
      commit('inittowns', data.towns)
      commit('initPayKind', data.payKind)
      commit('initOrderLog', data.param.orderlog)
    } catch (err) {}
  }
}
