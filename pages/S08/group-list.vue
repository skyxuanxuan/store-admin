<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <v-app-bar color="white" app>
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-app-bar-nav-icon v-bind="attrs" @click="$router.back()" v-on="on">
            <v-icon color="brownS1">
              mdi-arrow-left
            </v-icon>
          </v-app-bar-nav-icon>
        </template>
        <span>上一頁</span>
      </v-tooltip>

      <v-toolbar-title class="custom-brown1-2--text">
        {{ title }}
      </v-toolbar-title>

      <v-spacer />
    </v-app-bar>
    <div class="ma-4">
      <v-container class="mt-2 pa-3">
        <v-card flat class="pa-2">
          <v-toolbar dense flat>
            <v-text-field
              v-model="sec1_search"
              class="searchInput top-15"
              label="Search"
              outlined
              dense
            />

            <v-menu offset-y :close-on-content-click="false">
              <template #activator="{ on, attrs }">
                <v-btn
                  class="left-10"
                  outlined
                  width="80"
                  v-bind="attrs"
                  style="top: 2px"
                  v-on="on"
                >
                  顯示
                </v-btn>
              </template>
              <v-list flat>
                <v-list-item-group v-model="display_settings1" multiple>
                  <v-list-item
                    v-for="item in sec1_table_header"
                    :key="item.text"
                  >
                    <template #default="{ active }">
                      <v-list-item-action>
                        <v-checkbox :input-value="active" color="greenS1" />
                      </v-list-item-action>

                      <v-list-item-content>
                        <v-list-item-title>
                          {{ item.text }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>

            <v-spacer />
          </v-toolbar>
          <div>
            <v-data-table
              :headers="sec1_showHeaders"
              :items="sec1_data_list"
              :items-per-page="10"
              :search="sec1_search"
              item-key="d0"
              calculate-widths
              :page.sync="sec1_table_page"
              :footer-props="{
                'disable-pagination': true,
                'next-icon': '',
                'prev-icon': ''
              }"
              @page-count="sec1_table_page_count = $event"
            >
              <template #item.actions="{ item }">
                <v-menu
                  open-on-hover
                  transition="slide-x-transition"
                  offset-y
                  bottom
                  right
                >
                  <template #activator="{ on, attrs }">
                    <v-btn
                      v-if="item.admin !== 1"
                      class="no-backgroud-hover white"
                      elevation="0"
                      color="white"
                      fab
                      x-small
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon> mdi-dots-vertical </v-icon>
                    </v-btn>
                  </template>
                  <v-list dense class="py-0">
                    <v-list-item-group no-action>
                      <v-list-item nuxt :to="'/S08/group/' + item.d0">
                        <v-list-item-icon>
                          <v-icon> mdi-pencil </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title> 編輯 </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider />
                      <v-list-item @click="groupCancel(item.d0)">
                        <v-list-item-icon>
                          <v-icon color="other1">
                            mdi-delete
                          </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title class="custom-other-1--text">
                            刪除
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider />
                    </v-list-item-group>
                  </v-list>
                </v-menu>
              </template>
            </v-data-table>
          </div>
          <div class="text-center pt-2">
            <v-pagination
              v-model="sec1_table_page"
              :length="sec1_table_page_count"
              :total-visible="7"
            />
          </div>
        </v-card>
      </v-container>
    </div>
    <v-tooltip top>
      <template #activator="{ on, attrs }">
        <v-btn
          v-scroll="onScroll"
          fab
          dark
          fixed
          right
          color="rgb(155, 110, 87, 0.8)"
          style="transition: bottom 0.5s"
          :style="{ bottom: (scoller_fab ? 88 : 16) + 'px' }"
          v-bind="attrs"
          nuxt
          to="/S08/group/create"
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>新增群組</span>
    </v-tooltip>
    <to-top />
    <my-waiting :loading="loadingStatus" />
  </div>
</template>
<script>
import util from '~/assets/js/util'
export default {
  name: 'S08GroupList',
  title: '群組設定',
  layout: 'adminLayout',
  async asyncData({ store, redirect, $axios }) {
    const permission = await store.dispatch('userInfo/fetchPermission', 'S08')
    if (permission >= 2) {
      try {
        const data = await $axios.$get('S08/groups')
        if (data.res === 'CODE0000') {
          return {
            groups: data.data.groups
          }
        } else {
          redirect('/')
        }
      } catch (err) {
        console.log('Permission deny')
        redirect('/')
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
      title: '群組設定',
      xxs: false,
      scoller_fab: false,

      display_settings1: [0, 1, 2, 3, 4, 5, 6, 7],
      sec1_table_header: [
        {
          text: '序',
          align: 'start',
          value: 'd1'
        },
        {
          text: '群組名稱',
          align: 'start',
          value: 'd2'
        },
        {
          text: '更新時間',
          align: 'start',
          value: 'd3',
          filterable: false
        },
        {
          text: '狀態',
          align: 'start',
          value: 'd4',
          sortable: false,
          filterable: false
        },
        {
          text: '操作',
          align: 'center',
          value: 'actions',
          filterable: false,
          sortable: false
        }
      ],
      sec1_search: '',
      sec1_table_page: 1,
      sec1_table_page_count: 0
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
    sec1_showHeaders() {
      const arr = []
      for (let i = 0; i < this.sec1_table_header.length; i++) {
        if (this.display_settings1.includes(i)) {
          arr.push(this.sec1_table_header[i])
        }
      }
      return arr
    },
    sec1_data_list() {
      const initArr = []
      this.groups.forEach((item, index) => {
        initArr.push({
          d0: item.id,
          d1: index + 1,
          d2: item.name,
          d3: util.formatTimeMinus(new Date(item.updatetime)),
          d4: item.admin === 1 ? '預設' : '自訂',
          admin: item.admin
        })
      })
      return initArr
    }
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
    },
    async groupCancel(id) {
      try {
        const response = await this.$axios.get(`/S08/group/${id}`)
        const data = response.data
        if (data.res === 'CODE0000') {
          const title = '確定要刪除群組嗎？'
          let content = ''
          if (data.data.acnum > 0) {
            content = `群組「${data.data.group.name}」目前連動「<font style="color: red;">${data.data.acnum}</font>」組帳號
            <br>刪除時會連同帳號一併刪除
            <br>確認要刪除嗎？`
          }
          this.$swal
            .fire({
              title,
              html: content,
              showCancelButton: true,
              cancelButtonText: '取消',
              confirmButtonText: '確定',
              reverseButtons: true,
              showClass: {
                popup: '',
                backdrop: 'swal2-backdrop-show',
                icon: 'swal2-icon-show'
              }
            })
            .then(async (result) => {
              if (result.isConfirmed) {
                try {
                  const response = await this.$axios.delete(`/S08/group/${id}`)
                  const data = response.data
                  if (data.res === 'CODE0000') {
                    const initRes = await this.$axios.get('S08/groups')
                    const initData = initRes.data
                    if (initData.res === 'CODE0000') {
                      this.groups = initData.data.groups
                    }
                    this.$swal.fire('小提示', data.msg, 'success')
                  } else {
                    this.$swal.fire('小提示', data.msg, 'error')
                  }
                } catch (err) {
                  this.loading(false)
                  this.$notify({
                    title: '小提示',
                    text: '網路連線異常',
                    type: 'error',
                    duration: 2000
                  })
                  console.log(err)
                }
              }
            })
        } else {
          this.$swal.fire('小提示', data.msg, 'error')
        }
      } catch (err) {
        this.loading(false)
        this.$notify({
          title: '小提示',
          text: '網路連線異常',
          type: 'error',
          duration: 2000
        })
        console.log(err)
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
</style>
