<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <v-app-bar color="white" app>
      <v-app-bar-nav-icon color="brownS1" @click="$parent.$emit('eventname')" />

      <v-toolbar-title class="custom-brown1-2--text">
        {{ title }}
      </v-toolbar-title>

      <v-spacer />
      <v-menu bottom left>
        <template #activator="{ on, attrs }">
          <v-btn class="d-flex d-sm-none" icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item-group>
            <v-list-item nuxt to="/S08/group-list">
              <v-list-item-icon>
                <v-icon color="brownS1">
                  mdi-account-group
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title class="custom-brown1-2--text">
                群組設定
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
      <v-btn
        class="d-none d-sm-flex right-10"
        color="brownS1"
        width="140"
        rounded
        dark
        nuxt
        to="/S08/group-list"
      >
        群組設定
      </v-btn>
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
                      <v-list-item @click="groupEditInit(item.d0)">
                        <v-list-item-icon>
                          <v-icon> mdi-pencil </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title> 編輯權限 </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider />
                      <v-list-item v-show="item.statusCode === 1">
                        <v-list-item-icon>
                          <v-icon color="other1">
                            mdi-close
                          </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title class="custom-other-1--text">
                            停用
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider v-show="item.statusCode === 1" />
                      <v-list-item v-show="item.statusCode === 0">
                        <v-list-item-icon>
                          <v-icon color="other1">
                            mdi-restart
                          </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title class="custom-other-1--text">
                            啟用
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider v-show="item.statusCode === 0" />
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
    <v-dialog v-model="groupEditDialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">編輯權限</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="4">
                稱謂
              </v-col>
              <v-col cols="8">
                {{ groupEditDialogObj.d1 }}
              </v-col>
              <v-col cols="4">
                信箱
              </v-col>
              <v-col cols="8">
                {{ groupEditDialogObj.d2 }}
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="groupEditDialogObj.group"
                  :items="groupsArr"
                  label="權限"
                  item-text="name"
                  item-value="id"
                  return-object
                  single-line
                  hide-details
                  dense
                  outlined
                  menu-props="auto"
                />
              </v-col>
            </v-row>
          </v-container>
          <!-- <small>*indicates required field</small> -->
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="other1"
            text
            width="80"
            @click="groupEditDialog = false"
          >
            取消
          </v-btn>
          <v-btn color="other2" text width="80" @click="groupEditSubmit">
            確定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="memberNewDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">新增人員</span>
        </v-card-title>
        <v-card-text>
          <small>*新增成功時會產生一組隨機密碼並發送信件通知新增人員</small>
          <v-form ref="modifyForm" v-model="memberNewDialogValid">
            <v-container>
              <v-row>
                <v-col cols="3">
                  稱謂
                </v-col>
                <v-col cols="9">
                  <v-text-field
                    v-model="memberNewDialogObj.d1"
                    label="請輸入稱謂"
                    outlined
                    dense
                    counter="20"
                    :rules="[rules.required, rules.length(20)]"
                  />
                </v-col>
                <v-col cols="3">
                  帳號
                </v-col>
                <v-col cols="9">
                  <v-text-field
                    v-model="memberNewDialogObj.d2"
                    label="請輸入帳號"
                    outlined
                    dense
                    counter="50"
                    :rules="[
                      rules.required,
                      rules.length(50),
                      rules.atleast(8)
                    ]"
                  />
                </v-col>
                <v-col cols="3">
                  信箱
                </v-col>
                <v-col cols="9">
                  <v-text-field
                    v-model="memberNewDialogObj.d3"
                    label="請輸入信箱"
                    outlined
                    dense
                    counter="200"
                    :rules="[rules.required, rules.length(200), rules.email]"
                  />
                </v-col>
                <v-col cols="3">
                  權限
                </v-col>
                <v-col cols="9">
                  <v-select
                    v-model="memberNewDialogObj.group"
                    :items="groupsArr"
                    label="請選擇權限"
                    item-text="name"
                    item-value="id"
                    single-line
                    hide-details
                    dense
                    outlined
                    menu-props="auto"
                    :rules="[rules.required]"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="other1"
            text
            width="80"
            @click="memberNewDialog = false"
          >
            取消
          </v-btn>
          <v-btn
            color="other2"
            text
            width="80"
            :disabled="!memberNewDialogValid"
            @click="memberNewSubmit"
          >
            確定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-tooltip top>
      <template #activator="{ on, attrs }">
        <v-btn
          v-scroll="onScroll"
          fab
          dark
          fixed
          right
          color="rgb(117, 73, 51, 0.8)"
          style="transition: bottom 0.5s"
          :style="{ bottom: (scoller_fab ? 88 : 16) + 'px' }"
          v-bind="attrs"
          v-on="on"
          @click="memberNewInit"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>新增人員</span>
    </v-tooltip>
    <to-top />
    <my-waiting :loading="loadingStatus" />
  </div>
</template>
<script>
import util from '~/assets/js/util'
export default {
  name: 'S08',
  title: '操作權限',
  layout: 'adminLayout',
  async asyncData({ store, redirect, $axios }) {
    const permission = await store.dispatch('userInfo/fetchPermission', 'S08')
    if (permission >= 1) {
      try {
        const data = await $axios.$get('S08/load')
        if (data.res === 'CODE0000') {
          return {
            members: data.data.members,
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
      title: '操作權限',
      xxs: false,
      scoller_fab: false,

      display_settings1: [0, 1, 2, 3, 4, 5, 6],
      sec1_table_header: [
        {
          text: '序',
          align: 'start',
          value: 'd1'
        },
        {
          text: '稱謂',
          align: 'start',
          value: 'd2'
        },
        {
          text: '信箱',
          align: 'start',
          value: 'd3',
          filterable: false
        },
        {
          text: '權限',
          align: 'start',
          value: 'd4',
          filterable: false
        },
        {
          text: '狀態',
          align: 'start',
          value: 'd5',
          filterable: false
        },
        {
          text: '更新時間',
          align: 'start',
          value: 'd6',
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
      sec1_table_page_count: 0,

      /* 編輯權限 */
      groupEditDialog: false,
      groupEditDialogObj: {
        id: -1,
        group: -1
      },
      /* 新增人員 */
      memberNewDialog: false,
      memberNewDialogValid: false,
      memberNewDialogObj: {
        d1: '',
        d2: '',
        d3: '',
        group: null
      },

      rules: {
        length: len => v => (v || '').length <= len || `長度不得超過 ${len}`,
        required: v => !!v || '此欄位為必填',
        atleast: len => v => (v || '').length >= len || `長度至少 ${len}碼`,
        email: v =>
          (!!v && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(v)) ||
          '信箱格式錯誤'
      }
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
    groupsArr() {
      const initArr = []
      this.groups.forEach((item) => {
        initArr.push({
          id: item.id,
          name: item.name
        })
      })
      return initArr
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
      this.members.forEach((item, index) => {
        const group = this.groups.find(x => x.id === item.storeGroup)
        if (group) {
          const date = new Date(item.updatetime)
          let status = '未知'
          const statusCode = item.useType
          if (statusCode === 1) {
            status = '正常'
          } else if (statusCode === 1) {
            status = '停用'
          }
          initArr.push({
            d0: item.id,
            d1: index + 1,
            d2: item.name,
            d3: item.email,
            d4: group.name,
            d5: status,
            d6: util.formatTimeMinus(date),
            statusCode
          })
        }
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
    groupEditInit(id) {
      const member = this.members.find(x => x.id === id)
      if (member) {
        const group = this.groups.find(x => x.id === member.storeGroup)
        if (group) {
          this.groupEditDialogObj = Object.assign(
            {},
            {
              id,
              d1: member.name,
              d2: member.email,
              group: group.id
            }
          )
          this.groupEditDialog = true
        }
      }
    },
    async groupEditSubmit() {
      const member = this.members.find(x => x.id === this.groupEditDialogObj.id)
      if (member) {
        const group = this.groups.find(x => x.id === member.storeGroup)
        if (group) {
          if (member.storeGroup === this.groupEditDialogObj.group) {
            this.groupEditDialog = false
          } else {
            try {
              const response = await this.$axios.put('S08/account')
              const data = response.data
              if (data.res === 'CODE0000') {
                const newRes = await this.$axios.get('S08/load')
                const newData = newRes.data
                if (newData.res === 'CODE0000') {
                  this.members = newData.data.members
                  this.groups = newData.data.groups
                }
                this.$swal.fire('小提示', '修改成功', 'success')
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
    },

    memberNewInit() {
      this.memberNewDialog = true
      this.$nextTick(() => {
        this.$refs.modifyForm.reset()
      })
    },
    memberNewSubmit() {
      if (this.memberNewDialogObj.d1.length === 0) {
        this.$swal.fire('小提示', '請輸入稱謂')
        return
      }
      if (this.memberNewDialogObj.d2.length === 0) {
        this.$swal.fire('小提示', '請輸入帳號')
        return
      }
      if (this.memberNewDialogObj.d2.length < 8) {
        this.$swal.fire('小提示', '帳號長度至少八碼')
        return
      }
      if (this.memberNewDialogObj.d3.length === 0) {
        this.$swal.fire('小提示', '請輸入信箱')
        return
      }

      if (this.memberNewDialogValid) {
        const content = `
        <div>
          帳號
        </div>
        `
        this.$swal
          .fire({
            title: '確定要新增帳號嗎？',
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
              this.loading(true)
              const form = {}
              form.name = this.memberNewDialogObj.d1
              form.ac = this.memberNewDialogObj.d2
              form.email = this.memberNewDialogObj.d3
              form.group = this.memberNewDialogObj.group
              try {
                const response = await this.$axios.post('/S08/account', form)
                const data = response.data
                if (data.res === 'CODE0000') {
                  this.$swal.fire('小提示', '修改成功', 'success')
                } else {
                  this.$swal.fire('小提示', data.msg, 'error')
                }
                this.$nextTick(() => {
                  this.loading(false)
                })
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
        this.$swal.fire('小提示', '部分項目錯誤')
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
