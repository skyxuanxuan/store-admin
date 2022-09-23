export const state = () => ({
  machineList: [],
  repairs: []
})

export const getters = {}

export const mutations = {
  initMachine(state, data) {
    state.machineList = data
  },
  initRepairForm(state, data) {
    state.repairs = data
  }
}

export const actions = {
  async fetchMachines({ commit }) {
    try {
      const data = await this.$axios.$get('S05/machines')
      if (data.res === 'CODE0000') {
        commit('initMachine', data.data.machines)
        commit('initRepairForm', data.data.repairs)
      } else {
        commit('initMachine', [])
        commit('initRepairForm', [])
      }
    } catch (err) {}
  }
}
