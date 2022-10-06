<template>
  <v-app>
    <v-fade-transition>
      <MyLoading v-if="showHideSpinner" />
    </v-fade-transition>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      showHideSpinner: true
    }
  },
  computed: {},
  beforeCreate() {
    this.showHideSpinner = true
  },
  created() {},

  mounted() {
    this.showHideSpinner = false
  },
  methods: {}
}
</script>
