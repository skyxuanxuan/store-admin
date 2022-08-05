import moment from 'moment'

export const state = () => ({
  bulkList: [],
  amount: 0
})

export const getters = {
  getUserInfo: (state) => {
    if (state.user !== null) {
      return state.user
    }
    return { username: '無' }
  },

  getBulkList: (state) => {
    const initArray = []
    state.bulkList.forEach((item, index) => {
      const initDetailArray = item.reviewBulkDetailDTOS.map(detail => ({
        dl0: detail.id,
        dl1: detail.reviewDetailPrice,
        dl2: detail.reviewDetailNum
      }))

      let d5 = ''
      if ((item.reviewTime ?? '').toString().length > 0) {
        d5 = item.reviewTime
      }
      let d6 = '未知'
      switch (item.reviewStatus) {
        case 0:
          d6 = '尚未繳款'
          break
        case 1:
          d6 = '通過'
          break
        case 2:
          d6 = '審核中'
          break
        case 8:
          d6 = '已取消'
          break
        case 9:
          d6 = '退件'
          break
      }

      initArray.push({
        d0: item.id,
        d1: item.id,
        d2: item.reviewAmt,
        d3: item.reviewNum,
        d4: moment(item.applicationTime, 'YYYYMMDDhhmmss').format(
          'YYYY-MM-DD hh:mm:ss'
        ),
        d5,
        d6,
        status: item.reviewStatus,
        detail: initDetailArray
      })
    })
    return initArray
  }
}

export const mutations = {
  initbulkList(state, bulkList) {
    state.bulkList = bulkList
  },

  initAmount(state, amount) {
    state.amount = amount
  }
}

export const actions = {
  async fetchBulkList({ commit }) {
    const data = await this.$axios.$get('S01/apply')
    commit('initbulkList', data.data.resultList)
    commit('initAmount', data.data.amount)
  }
}
