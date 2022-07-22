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

        <v-list-item-title>{{ userInfo.username }}</v-list-item-title>

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
      <template #append>
        <div class="pa-2">
          <v-btn dark block @click="userLogOut">
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar> -->

    <v-main>
      <Nuxt @eventname="drawerChange()" />
    </v-main>

    <CustomNotify />
    <!-- Custom template example -->

    <!-- <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <!-- <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DefaultLayout',
  data() {
    return {
      showHideSpinner: true,
      drawer: true,

      selectedItem: 0,
      items: [
        { text: '首頁', icon: 'mdi-home-outline', to: '/' },
        {
          text: '門市票券(整批發行)',
          icon: 'mdi-storefront-outline',
          to: '/S01'
        },
        { text: '商城票券(逐筆發行)', icon: 'mdi-cloud-outline', to: '/S02' },
        { text: '店家資訊', icon: 'mdi-book-open-variant', to: '/S03' },
        { text: '訂單', icon: 'mdi-sticker-text-outline', to: '/S04' },
        { text: '報告', icon: 'mdi-poll', to: '/S05' },
        { text: '通知中心', icon: 'mdi-bell-outline', to: '/S06' },
        { text: '操作權限', icon: 'mdi-account-multiple', to: '/S07' }
      ],
      miniVariant: false
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo'
    })
  },

  beforeCreate() {
    this.showHideSpinner = true
  },

  mounted() {
    this.showHideSpinner = false
  },

  created() {
    // this.items.splice(7, 1);
    if (this.$store.state.userInfo.user === null) {
      // this.$store.dispatch('userInfo/fetchUserInfo');
    }
  },

  methods: {
    userLogOut() {
      this.$store.dispatch('userInfo/cleanInfo')
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

.theme--light.v-application {
  background: #e8ecf5;
  color: rgba(0, 0, 0, 0.87);
}
</style>
