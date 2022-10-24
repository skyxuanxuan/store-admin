import util from '~/assets/js/util'

export const state = () => ({
  messages: null
})

export const getters = {
  dataList: (state) => {
    const initArr = []
    if (state.messages !== null) {
      state.messages.forEach((item) => {
        const itemData = JSON.parse(item.data)
        let jump = 0
        let url = ''
        if (item.func === 2) {
          jump = 1
          url = itemData.url
        }
        initArr.push({
          d0: item.id,
          d1: item.title,
          d2: item.content,
          d3: util.formatTimeMinus(item.sendTime),
          jump,
          url,
          status: item.status
        })
      })
    }
    return initArr
  }
}

export const mutations = {
  initMessages(state, data) {
    state.messages = data
  },
  addMessages(state, data) {
    if (state.messages === null) {
      state.messages = []
    }

    state.messages.unshift(data)
  }
}

export const actions = {
  async fetchMessages({ commit }) {
    try {
      const data = await this.$axios.$get('S07/load')
      if (data.res === 'CODE0000') {
        commit('initMessages', data.data.messages)
      } else {
        commit('initMessages', [])
      }
    } catch (err) {}
  },
  addMessagesAction({ commit }, data) {
    commit('addMessages', data)
  },
  clearS07({ commit }) {
    commit('initMessages', null)
  }
}
