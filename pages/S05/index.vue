<template>
  <div>
    <v-app-bar color="white" app>
      <v-app-bar-nav-icon color="brownS1" @click="$parent.$emit('eventname')" />

      <v-toolbar-title class="custom-brown1-2--text">
        {{ title }}
      </v-toolbar-title>

      <v-spacer />

      <template #extension>
        <v-tabs
          v-model="CurrentPageSectionIndex"
          color="brownS1"
          align-with-title
        >
          <v-tabs-slider color="greenS1" />
          <v-tab class="custom-green-1--text">
            使用中
          </v-tab>

          <v-tab class="custom-green-1--text">
            報修/ 退還
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <div class="ma-4">
      <v-tabs-items v-model="CurrentPageSectionIndex" class="mt-8">
        <v-tab-item>
          <v-container>
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
                    <v-list-item-group v-model="display_settings" multiple>
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
                    'next-icon': '',
                    'prev-icon': ''
                  }"
                  @page-count="sec1_table_page_count = $event"
                >
                  <template #item.actions="{ item }">
                    <v-menu
                      open-on-hover
                      :close-on-content-click="false"
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
                          <v-list-item
                            v-show="item.status === 0"
                            @click="repairInit(item.d0)"
                          >
                            <v-list-item-icon>
                              <v-icon color="other2">
                                mdi-wrench-outline
                              </v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                              <v-list-item-title class="custom-other-2--text">
                                報修
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                          <v-divider v-show="item.status === 0" />
                          <v-list-item
                            v-show="item.status === 0"
                            @click="qrcodeInit(item.d0)"
                          >
                            <v-list-item-icon>
                              <v-icon color="other2">
                                mdi-book-refresh-outline
                              </v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                              <v-list-item-title class="custom-other-2--text">
                                更新上網憑證
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
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
        </v-tab-item>
        <v-tab-item class="background-color">
          <v-container class="mt-2 pa-3">
            <v-card flat class="pa-2">
              <v-toolbar dense flat>
                <v-text-field
                  v-model="sec2_search"
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
                    <v-list-item-group v-model="display_settings2" multiple>
                      <v-list-item
                        v-for="item in sec2_table_header"
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
                  :headers="sec2_showHeaders"
                  :items="sec2_data_list"
                  :items-per-page="10"
                  :search="sec2_search"
                  item-key="d0"
                  calculate-widths
                  :page.sync="sec2_table_page"
                  :footer-props="{
                    'next-icon': '',
                    'prev-icon': ''
                  }"
                  @page-count="sec2_table_page_count = $event"
                >
                  <template #item.actions="{ item }">
                    <v-menu
                      open-on-hover
                      :close-on-content-click="false"
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
                          <v-list-item
                            v-show="item.status === 1"
                            @click="repairCancel(item.d0)"
                          >
                            <v-list-item-icon>
                              <v-icon color="brownS2M">
                                mdi-close
                              </v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                              <v-list-item-title class="custom-brown2-2--text">
                                取消
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                          <v-divider v-show="item.status === 2" />
                        </v-list-item-group>
                      </v-list>
                    </v-menu>
                  </template>
                </v-data-table>
              </div>
              <div class="text-center pt-2">
                <v-pagination
                  v-model="sec2_table_page"
                  :length="sec2_table_page_count"
                  :total-visible="7"
                />
              </div>
            </v-card>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </div>
    <v-dialog v-model="repairDialog" width="700">
      <v-card>
        <v-card-title class="text-h5">
          報修申請
        </v-card-title>
        <v-form ref="modifyForm" v-model="repairDialogValid">
          <v-card v-resize="onResize" flat class="cus_mobile_card py-4 px-8">
            <div class="cus_mobile_card_row" :class="{ flex_col: xxs }">
              <div class="cus_mobile_card_header">
                流水號
              </div>
              <div class="cus_mobile_card_cell">
                {{ repairDialogModify.d1 }}
              </div>
            </div>
            <div class="cus_mobile_card_row flex_col">
              <div class="cus_mobile_card_header">
                問題說明
              </div>
              <div class="cus_mobile_card_cell" style="width: 100%">
                <v-textarea
                  v-model="repairDialogModify.d2"
                  outlined
                  color="#16261f"
                  counter="500"
                  label="請簡略說明掃描器問題"
                  auto-grow
                  single-line
                  :rules="[rules.required, rules.length(500)]"
                  rows="3"
                />
              </div>
            </div>
          </v-card>
        </v-form>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            class="right-10"
            color="other1"
            :width="mobile ? 40 : 140"
            outlined
            rounded
            @click="repairDialog = false"
          >
            取消
          </v-btn>
          <v-btn
            color="other2"
            :width="mobile ? 40 : 140"
            rounded
            :dark="repairDialogValid"
            :disabled="!repairDialogValid"
            @click="repairSubmit"
          >
            報修
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="qrcodeDialog"
      width="280"
      content-class="dialog-overflow-y"
    >
      <v-card>
        <v-btn
          color="grey darken-4"
          fab
          small
          outlined
          icon
          style="
            position: absolute;
            top: -1rem;
            right: -1rem;
            background-color: white;
          "
          @click="qrcodeDialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-container>
          <v-row justify="center" align="center" class="mt-2">
            <client-only>
              <v-card
                v-if="qrcodeDialogDetail.d2.length === 0"
                width="200"
                height="200"
                color="white"
              />
              <qrcode
                v-else
                :value="qrcodeDialogDetail.d2"
                :options="{ margin: 2, width: 200 }"
              />
            </client-only>
          </v-row>
          <v-row justify="center" align="center">
            <div class="mb-4">
              {{ qrcodeDialogDetail.d1 }}
            </div>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <to-top />
    <my-waiting :loading="loadingStatus" />
  </div>
</template>

<script>
import util from '~/assets/js/util'
import MyWaiting from '~/components/MyWaiting.vue'
import ToTop from '~/components/ToTop.vue'

export default {
  name: 'IndexPage',
  title: '掃碼器',
  components: { ToTop, MyWaiting },
  layout: 'adminLayout',
  async asyncData({ store }) {
    await store.dispatch('S05/fetchMachines')
  },
  data() {
    return {
      loadingStatus: false,
      CurrentPageSectionIndex: 0,
      title: '掃碼器',
      xxs: false,

      machines: this.$store.state.S05.machineList,
      repairs: this.$store.state.S05.repairs,

      display_settings: [0, 1, 2, 3, 4],

      /* Table1 */
      sec1_table_header: [
        {
          text: '序',
          align: 'start',
          value: 'd1'
        },
        {
          text: '流水號',
          align: 'start',
          value: 'd2'
        },
        {
          text: '出廠時間',
          align: 'start',
          value: 'd3'
        },
        {
          text: '狀態',
          align: 'start',
          value: 'd4'
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

      /* Table2 */
      display_settings2: [0, 1, 2, 3, 4],

      sec2_table_header: [
        {
          text: '序',
          align: 'start',
          value: 'd1'
        },
        {
          text: '流水號',
          align: 'start',
          value: 'd2'
        },
        {
          text: '出廠時間',
          align: 'start',
          value: 'd3'
        },
        {
          text: '狀態',
          align: 'start',
          value: 'd5'
        },
        {
          text: '操作',
          align: 'center',
          value: 'actions',
          filterable: false,
          sortable: false
        }
      ],
      sec2_search: '',
      sec2_table_page: 1,
      sec2_table_page_count: 0,

      /* Repair Dialog */
      repairDialog: false,
      repairDialogValid: false,
      repairDialogModify: {
        d0: '',
        d1: '',
        d2: ''
      },

      rules: {
        length: len => v => (v || '').length <= len || `長度不得超過 ${len}`,
        required: v => !!v || '此欄位為必填'
      },

      /* QR code */
      qrcodeDialog: false,
      qrcodeDialogDetail: {
        d1: '',
        d2: ''
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
    sec1_showHeaders() {
      const arr = []
      for (let i = 0; i < this.sec1_table_header.length; i++) {
        if (this.display_settings.includes(i)) {
          arr.push(this.sec1_table_header[i])
        }
      }
      return arr
    },
    sec1_data_list() {
      const initArr = []
      this.machines.forEach((item, index) => {
        let d3 = ''
        if (item.productionDate.length > 0) {
          d3 = util.formatTimeMinus(item.productionDate).substring(0, 10)
        }

        let d4 = '未知'
        if (item.startUse === 0) {
          d4 = '未啟用'
        } else if (item.startUse === 1) {
          d4 = '已啟用'
        } else if (item.startUse === 9) {
          d4 = '退還'
        }
        let d5 = '無'
        let status = 0
        const repairForm = this.repairs.find(
          x => x.machineId === item.machineId
        )

        if (repairForm) {
          status = repairForm.status
          if (repairForm.status === 2) {
            d5 = '報修中'
          } else if (repairForm.status === 3) {
            d5 = '受理中'
          } else if (repairForm.status === 4) {
            d5 = '配件遺失'
          }
        }
        if (status === 0) {
          initArr.push({
            d0: item.machineId,
            d1: index + 1,
            d2: item.machineNo,
            d3,
            d4,
            d5,
            status
          })
        }
      })
      return initArr
    },

    sec2_showHeaders() {
      const arr = []
      for (let i = 0; i < this.sec2_table_header.length; i++) {
        if (this.display_settings.includes(i)) {
          arr.push(this.sec2_table_header[i])
        }
      }
      return arr
    },
    sec2_data_list() {
      const initArr = []
      this.machines.forEach((item, index) => {
        let d3 = ''
        if (item.productionDate.length > 0) {
          d3 = util.formatTimeMinus(item.productionDate).substring(0, 10)
        }

        let d4 = '未知'
        if (item.startUse === 0) {
          d4 = '未啟用'
        } else if (item.startUse === 1) {
          d4 = '已啟用'
        } else if (item.startUse === 9) {
          d4 = '退還'
        }
        let d5 = '無'
        let status = 0
        const repairForm = this.repairs.find(
          x => x.machineId === item.machineId
        )
        if (repairForm) {
          status = repairForm.status
          if (repairForm.status === 2) {
            d5 = '報修中'
          } else if (repairForm.status === 3) {
            d5 = '受理中'
          } else if (repairForm.status === 4) {
            d5 = '配件遺失'
          }
        }
        if (status !== 0) {
          initArr.push({
            d0: item.machineId,
            d1: index + 1,
            d2: item.machineNo,
            d3,
            d4,
            d5,
            status
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
    loading(flag) {
      if (flag) {
        this.loadingStatus = true
      } else {
        setTimeout(() => {
          this.loadingStatus = false
        }, 500)
      }
    },
    repairInit(id) {
      const detail = this.machines.find(x => x.machineId === id)
      if (detail) {
        this.repairDialogModify = Object.assign(
          {},
          {
            d0: detail.machineId,
            d1: detail.machineNo,
            d2: ''
          }
        )
        this.repairDialog = true
        this.$nextTick(() => {
          this.$refs.modifyForm.reset()
        })
      } else {
        this.$swal.fire('小提示', 'Oops!發生了點錯誤!!')
      }
    },
    repairCancel(id) {
      const title = '確定要取消此次報修嗎'
      const content = ''
      this.$swal
        .fire({
          title,
          html: content,
          icon: 'warning',
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
        .then((result) => {
          if (result.isConfirmed) {
            this.loading(true)

            this.$axios
              .delete(`/S05/repair/${id}`)
              .then((response) => {
                const data = response.data
                if (data.res === 'CODE0000') {
                  this.$store.dispatch('S05/fetchMachines').then(() => {
                    this.machines = this.$store.state.S05.machineList
                    this.repairs = this.$store.state.S05.repairs
                  })
                  this.$swal.fire('小提示', '已取消', 'success')
                } else {
                  this.$swal.fire('小提示', data.msg, 'error')
                }
                this.loading(false)
              })
              .catch((err) => {
                this.loading(false)
                this.$notify({
                  title: '小提示',
                  text: '網路連線異常',
                  type: 'error',
                  duration: 2000
                })
                console.log(err)
              })
          }
        })
    },
    repairSubmit() {
      const title = '確定要報修嗎'
      const content = `
      <div style="align-items: center;
                  display: flex;
                  justify-content: flex-start;
                  word-break: break-all;">
        <div style="padding-right: 20px">流水號</div>
        <div style="padding-top: 2px;">${this.repairDialogModify.d1}</div>
      </div>
      <br>
      <div style="align-items: flex-start;
                  display: flex;
                  justify-content: flex-start;
                  word-break: break-all;
                  flex-direction: column;">
        <div style="text-align: left;">報修後請依照指定流程交還掃碼器，我們會迅速配發新掃碼器給您~</div>
        <div style="text-align: left;">報修受理後即不能取消！</div>
      </div>
      <br>
      <div>確定要報修嗎？</div>
      `
      this.$swal
        .fire({
          title,
          html: content,
          icon: 'warning',
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
        .then((result) => {
          if (result.isConfirmed) {
            this.loading(true)

            const form = {}
            form.note = this.repairDialogModify.d2

            this.$axios
              .post(`/S05/repair/${this.repairDialogModify.d0}`, form)
              .then((response) => {
                const data = response.data
                if (data.res === 'CODE0000') {
                  this.$store.dispatch('S05/fetchMachines').then(() => {
                    this.machines = this.$store.state.S05.machineList
                    this.repairs = this.$store.state.S05.repairs
                    this.repairDialog = false
                    this.$swal.fire('小提示', '報修成功', 'success')
                  })
                } else {
                  this.$swal.fire('小提示', data.msg, 'error')
                }
                this.loading(false)
              })
              .catch((err) => {
                this.loading(false)
                this.$notify({
                  title: '小提示',
                  text: '網路連線異常',
                  type: 'error',
                  duration: 2000
                })
                console.log(err)
              })
          }
        })
    },
    qrcodeInit(id) {
      this.qrcodeDialogDetail = Object.assign(
        {},
        {
          d1: '',
          d2: ''
        }
      )
      const detail = this.machines.find(x => x.machineId === id)

      if (detail) {
        const series = `TOK${detail.machineId}${detail.token}1200`
        if (series.length === 59) {
          this.qrcodeDialogDetail = Object.assign(
            {},
            {
              d1: detail.machineNo,
              d2: series
            }
          )
          this.$nextTick(() => {
            this.qrcodeDialog = true
          })
        } else {
          this.$swal.fire('小提示', 'QR Code 格式錯誤', 'error')
        }
      } else {
        this.$swal.fire('小提示', '找不到此掃碼器', 'error')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.background-color {
  background-color: $store_admin_background_color !important;
}

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

:deep(.dialog-overflow-y) {
  overflow-y: visible !important;
}
</style>
