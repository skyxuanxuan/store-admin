<template>
  <v-container>
    <v-row justify="center" align="center" class="mt-8  ">
      <client-only>
        <qrcode :value="value" :options="{ margin: 2, width: 200 }" />
      </client-only>
    </v-row>
    <v-row justify="center" align="center" class="ma-8">
      <div class="text-h4">
        店家碼
      </div>
    </v-row>
  </v-container>
</template>

<script>
import Vue from 'vue'
import VueQrcode from '@chenfengyuan/vue-qrcode'

Vue.component(VueQrcode.name, VueQrcode)

export default {
  name: 'IndexPage',
  title: '首頁',
  layout: 'adminLayout',
  data() {
    return {
      value: this.$store.state.userInfo.user.storeId
    }
  },
  mounted() {}
}
</script>
