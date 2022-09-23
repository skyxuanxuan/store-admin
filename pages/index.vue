<template>
  <div>
    <v-app-bar color="white" app>
      <v-app-bar-nav-icon color="brownS1" @click="$parent.$emit('eventname')" />

      <v-toolbar-title class="custom-brown1-2--text">
        {{ title }}
      </v-toolbar-title>

      <v-spacer />
    </v-app-bar>
    <v-container>
      <v-row justify="center" align="center" class="mt-8">
        <client-only>
          <v-card
            v-if="qrcodeValue.series.length === 0"
            width="200"
            height="200"
            color="white"
          />
          <qrcode
            v-else
            :value="qrcodeValue.series"
            :options="{ margin: 2, width: 200 }"
          />
        </client-only>
      </v-row>
      <v-row justify="center" align="center" class="ma-8">
        <div class="text-h4">
          店家碼
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Vue from 'vue'
import VueQrcode from '@chenfengyuan/vue-qrcode'

Vue.component(VueQrcode.name, VueQrcode)

export default {
  name: 'IndexPage',
  title: '首頁',
  layout: 'adminLayout',
  data() {
    return {
    }
  },
  computed: {
    title() {
      return `首頁 - ${this.$store.getters['userInfo/getUserInfo'].storeName}`
    },
    ...mapGetters({
      qrcodeValue: 'userInfo/getUserInfo'
    })
  }
}
</script>
