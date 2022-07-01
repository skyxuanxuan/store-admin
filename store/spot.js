export const state = () => ({
  spots: [
  ],
  spotClicks: [
  ],
  popularTags: [
  ],
  carousels: [
  ]
})

export const getters = {
  getSpots: (state) => {
    return state.spots
  },
  getSpotClicks: (state) => {
    return state.spotClicks
  },
  getCarousels: (state) => {
    return state.carousels
  },
  getPopularTags: (state) => {
    return state.popularTags
  }
}

export const mutations = {
  initSpots (state, spots) {
    state.spots = [...spots]
  },
  initSpotClicks (state, spotClicks) {
    state.spotClicks = [...spotClicks]
  },
  initPopularTags (state, popularTags) {
    state.popularTags = [...popularTags]
  },
  initCarousels (state, carousels) {
    state.carousels = [...carousels]
  }
}

export const actions = {
  async fetchSpot ({ commit }) {
    const spots = await this.$axios.$get('/api/spot')
    commit('initSpots', spots)
  },
  async fetchSpotClick ({ commit }) {
    const spotClicks = await this.$axios.$get('/api/spotClick')
    commit('initSpotClicks', spotClicks)
  },
  async fetchPopularTag ({ commit }) {
    const popularTags = await this.$axios.$get('/api/spotPopularTag')
    commit('initPopularTags', popularTags)
  },
  async fetchCarousel ({ commit }) {
    const carousels = await this.$axios.$get('/api/spotCarousel')
    commit('initCarousels', carousels)
  }
}
