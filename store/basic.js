export const state = () => ({
  classes: [],
  cities: [],
  towns: []
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
  }
}

export const actions = {
  async fetchBasic({ commit }) {
    try {
      const data = await this.$axios.$get('auth/basic')
      commit('initClasses', data.classes)
      commit('initcities', data.cities)
      commit('inittowns', data.towns)
    } catch (err) {}
  }
}
