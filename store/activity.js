export const state = () => ({
  activities: [
  ],
  activityClicks: [
  ],
  popularTags: [
  ],
  carousels: [
  ],
  paginations: [
  ]
})

export const getters = {
  getActivities: (state) => {
    return state.activities
  },
  getActivityClicks: (state) => {
    return state.activityClicks
  },
  getCarousels: (state) => {
    return state.carousels
  },
  getPopularTags: (state) => {
    return state.popularTags
  },
  getPaginations: (state) => {
    return state.paginations
  }
}

export const mutations = {
  initActivities (state, activities) {
    state.activities = [...activities]
  },
  initActivityClicks (state, activityClicks) {
    state.activityClicks = [...activityClicks]
  },
  initPopularTags (state, popularTags) {
    state.popularTags = [...popularTags]
  },
  initCarousels (state, carousels) {
    state.carousels = [...carousels]
  },
  initPaginations (state, paginations) {
    state.paginations = [...paginations]
  }
}

export const actions = {
  async fetchActivity ({ commit }) {
    const activities = await this.$axios.$get('/api/activity')
    commit('initActivities', activities)
  },
  async fetchActivityClick ({ commit }) {
    const activityClicks = await this.$axios.$get('/api/activityClick')
    commit('initActivityClicks', activityClicks)
  },
  async fetchPopularTag ({ commit }) {
    const popularTags = await this.$axios.$get('/api/activityPopularTag')
    commit('initPopularTags', popularTags)
  },
  async fetchCarousel ({ commit }) {
    const carousels = await this.$axios.$get('/api/activityCarousel')
    commit('initCarousels', carousels)
  },
  async fetchPagination ({ commit }) {
    const paginations = await this.$axios.$get('/api/pagination')
    commit('initPaginations', paginations)
  }
}
