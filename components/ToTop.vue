<template>
  <v-fab-transition>
    <v-btn
      v-show="scoller_fab"
      v-scroll="onScroll"
      fab
      dark
      fixed
      bottom
      right
      color="rgb(0, 0, 0, 0.5)"
      @click="toTop"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </v-fab-transition>
</template>
<script>
export default {
  data() {
    return {
      scoller_fab: false
    }
  },
  methods: {
    onScroll(e) {
      if (typeof window === 'undefined') {
        return
      }
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.scoller_fab = top > 20
    },
    toTop() {
      this.$vuetify.goTo(0)
    }
  }
}
</script>
