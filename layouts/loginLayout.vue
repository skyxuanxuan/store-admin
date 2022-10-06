<template>
  <v-app>
    <v-main class="bg">
      <v-container fill-height>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'LoginLayout',
  data() {
    return {}
  },
  created() {}
}
</script>

<style>
.bg {
  background: url('~/static/background.jpg');
  background-size: cover;
  height: 100vh;
}
</style>
