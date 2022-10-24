<template>
  <v-app>
    <v-fade-transition>
      <MyLoading v-if="showHideSpinner" />
    </v-fade-transition>

    <v-navigation-drawer
      v-model="drawer"
      dark
      :mini-variant.sync="miniVariant"
      fixed
      app
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="/logo_Sunpay.svg" contain />
        </v-list-item-avatar>

        <v-list-item-title>{{ userInfo.name }}</v-list-item-title>

        <v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider />

      <v-list nav dense class="custom-index-list">
        <v-list-item-group v-model="selectedItem">
          <v-list-item v-for="(item, i) in items" :key="i" nuxt :to="item.to">
            <v-list-item-icon>
              <v-icon v-text="item.icon" />
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <div class="pa-2">
        <v-btn v-show="!miniVariant" outlined block nuxt to="/change-password">
          修改密碼
        </v-btn>
        <v-btn v-show="miniVariant" icon block @click="userLogOut">
          <v-icon>mdi-account-edit</v-icon>
        </v-btn>
      </div>
      <div class="pa-2">
        <v-btn v-show="!miniVariant" outlined block @click="userLogOut">
          登出
        </v-btn>
        <v-btn v-show="miniVariant" icon block @click="userLogOut">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </div>
    </v-navigation-drawer>

    <v-main>
      <Nuxt @eventname="drawerChange()" />
    </v-main>

    <CustomNotify />
    <!-- Custom template example -->
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import util from '~/assets/js/util'
export default {
  name: 'AdminLayout',
  data() {
    return {
      showHideSpinner: true,
      drawer: true,

      selectedItem: 0,
      miniVariant: false
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
      items: 'userInfo/getFuncs'
    })
  },

  beforeCreate() {
    this.showHideSpinner = true
  },

  mounted() {
    this.showHideSpinner = false

    const pToken = this.userInfo.pToken
    this.$fire.messaging.getToken().then((token) => {
      if (pToken !== token) {
        console.log(token)
        const form = new FormData()
        form.append('token', token)
        this.$axios.put('/auth/p-token', form)
      }
    })

    this.$fire.messaging.onMessage((payload) => {
      const title = payload.notification.title ?? '小提示'
      const text = payload.notification.body ?? ''
      const data = payload.data
      if (data) {
        this.$store.dispatch('S07/addMessagesAction', {
          content: text,
          data: JSON.stringify(data),
          id: util._uuid(),
          sendTime: util.dateTime2String(new Date()),
          status: 0,
          title,
          type: 2
        })
        const type = payload.data.type ?? 'info'
        this.$notify({
          title,
          type,
          duration: 5000
        })
      }
    })
  },

  methods: {
    userLogOut() {
      this.$store.dispatch('userInfo/cleanInfo')
      this.$store.dispatch('S07/clearS07')
      this.$auth.logout()
    },

    drawerChange() {
      this.drawer = !this.drawer
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-index-list .v-list-item.v-list-item--active-primary {
  color: #2196f3 !important;
  caret-color: #2196f3 !important;
}
</style>
