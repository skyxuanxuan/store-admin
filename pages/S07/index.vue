<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <v-app-bar color="white" app>
      <v-app-bar-nav-icon color="brownS1" @click="$parent.$emit('eventname')" />

      <v-toolbar-title class="custom-brown1-2--text">
        {{ title }}
      </v-toolbar-title>

      <v-spacer />
    </v-app-bar>
    <v-card flat>
      <transition-group name="fadeLeft" tag="div">
        <template v-for="(item, index) in dataList">
          <v-list-item :key="item.d0" class="px-4 pt-2" three-line>
            <v-list-item-icon
              style="margin: 8px 4px 8px 0px !important"
            >
              <v-icon v-if="item.status === 0" color="brownS1">
                mdi-circle-medium
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.d1 }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ item.d2 }}
              </v-list-item-subtitle>
              <v-list-item-subtitle class="pt-2">
                {{ item.d3 }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action v-if="item.jump === 1">
              <v-btn icon target="_blank" :href="item.url">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider v-if="index !== dataList.length - 1" :key="item.d0" />
        </template>
      </transition-group>

      <v-footer padless color="#EEEBE9">
        <v-col
          class="text-center"
          cols="12"
          style="color: #aa998f; font-size: 14px"
        >
          -沒有其他通知-
        </v-col>
      </v-footer>
    </v-card>

    <to-top />
    <my-waiting :loading="loadingStatus" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'S07',
  title: '通知',
  layout: 'adminLayout',
  async asyncData({ store, redirect }) {
    const permission = await store.dispatch('userInfo/fetchPermission', 'S08')
    if (permission >= 1) {
      if (store.state.S07.messages === null) {
        await store.dispatch('S07/fetchMessages')
      }
    } else {
      console.log('Permission deny')
      redirect('/')
    }
  },
  data() {
    return {
      loadingStatus: false,
      CurrentPageSectionIndex: 0,
      title: '通知',
      xxs: false,

      pageIndex: 1,
      pageSize: 2
    }
  },
  computed: {
    mobile() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return true
      }

      return false
    },
    ...mapGetters({
      dataList: 'S07/dataList'
    })
  },
  mounted() {},
  methods: {
    onResize() {
      if (window.innerWidth < 350) {
        this.xxs = true
      } else {
        this.xxs = false
      }
    },
    onScroll(e) {
      if (typeof window === 'undefined') {
        return
      }
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.scoller_fab = top > 20
    },
    loading(flag) {
      if (flag) {
        this.loadingStatus = true
      } else {
        setTimeout(() => {
          this.loadingStatus = false
        }, 500)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.right-10 {
  right: 10px;
}

.left-10 {
  left: 10px;
}

.left-20 {
  left: 20px;
}

.top-15 {
  top: 15px;
}

.searchInput.v-text-field {
  max-width: 250px;
  width: 250px;
}

.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
