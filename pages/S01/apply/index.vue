<template>
  <div>
    <v-app-bar color="white" app>
      <v-app-bar-nav-icon @click="$parent.$emit('eventname')" />

      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer />

      <v-menu bottom left>
        <template #activator="{ on, attrs }">
          <v-btn class="d-flex d-sm-none" icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item-group>
            <v-list-item @click="applyInit">
              <v-list-item-icon>
                <v-icon>mdi-file-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-title>申請</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>

      <v-btn
        class="d-none d-sm-flex"
        color="#666666"
        width="140"
        dark
        @click="applyInit"
      >
        申請
      </v-btn>
    </v-app-bar>
    <div class="pa-4">
      <v-tabs-items
        v-model="CurrentPageSectionIndex"
        :class="{ none: loadingStatus }"
      >
        <v-tab-item class="background-color">
          <PageStatisticCard :items="pageStatisticCardItems" />

          <v-container class="white mt-8">
            <v-toolbar dense flat>
              <v-toolbar-title>申請歷史紀錄</v-toolbar-title>
              <v-spacer />
              <v-text-field
                v-model="sec1_search"
                class="searchInput top-15 right-10"
                label="Search"
                outlined
                dense
              />

              <v-menu offset-y :close-on-content-click="false">
                <template #activator="{ on, attrs }">
                  <v-btn outlined width="80" v-bind="attrs" v-on="on">
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
                          <v-checkbox :input-value="active" color="primary" />
                        </v-list-item-action>

                        <v-list-item-content>
                          <v-list-item-title>{{ item.text }}</v-list-item-title>
                        </v-list-item-content>
                      </template>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-menu>
            </v-toolbar>
            <div>
              <v-data-table
                ref="vDataTable"
                mobile-breakpoint="770"
                :headers="sec1_showHeaders"
                :items="sec1_data_list"
                :items-per-page="10"
                :search="sec1_search"
                single-expand
                :expanded.sync="sec1_data_expanded"
                show-expand
                item-key="d0"
                calculate-widths
                class="vue-custom-fadeIn"
                :page.sync="sec1_table_page"
                :footer-props="{
                  'disable-pagination': true,
                  'next-icon': '',
                  'prev-icon': ''
                }"
                @page-count="sec1_table_page_count = $event"
              >
                <template #item.data-table-expand="props">
                  <v-icon
                    :class="{
                      'v-data-table__expand-icon': true,
                      'v-data-table__expand-icon--active':
                        props.isExpanded && transitioned[getItemId(props.item)]
                    }"
                    @click="toggleExpand(props)"
                  >
                    mdi-chevron-down
                  </v-icon>
                </template>

                <template #item.d2="{ item }">
                  {{ item.d2 | numberWithCommas }}
                </template>
                <template #item.d3="{ item }">
                  {{ item.d3 | toDollars }}
                </template>

                <template #item.actions="{ item }">
                  <v-tooltip v-if="item.status === 0" bottom>
                    <template #activator="{ on, attrs }">
                      <v-btn
                        class="white"
                        elevation="0"
                        color="primary"
                        fab
                        icon
                        x-small
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon> mdi-upload </v-icon>
                      </v-btn>
                    </template>
                    <span>上傳圖片</span>
                  </v-tooltip>
                </template>

                <template #expanded-item="{ headers, item }">
                  <td
                    :colspan="headers.length"
                    :class="{
                      'ma-0 pa-0': true,
                      'expanded-closing': !transitioned[getItemId(item)],
                      'expanded-display': isMobile
                    }"
                    style="height: auto"
                  >
                    <v-expand-transition>
                      <div v-show="transitioned[getItemId(item)]">
                        <!-- container for content. replace with whatever you want -->
                        <v-container>
                          <v-row
                            v-for="detail in item.detail"
                            :key="detail.dl0"
                            v-resize="onResize"
                            style="
                              border-bottom: thin solid rgba(0, 0, 0, 0.12);
                            "
                          >
                            <v-col md="4" cols="6">
                              面額「{{ detail.dl1 }}」
                            </v-col>
                            <v-col md="3" cols="6">
                              {{ detail.dl2 | numberWithCommas }} 張
                            </v-col>
                          </v-row>
                        </v-container>
                      </div>
                    </v-expand-transition>
                  </td>
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
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </div>
    <v-dialog v-model="sec1_apply_dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">申請整批發行</span>
          <v-spacer />

          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-btn
                color="pink"
                fab
                dark
                small
                v-bind="attrs"
                v-on="on"
                @click="applyNew"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>新增</span>
          </v-tooltip>
        </v-card-title>

        <v-card-text>
          <v-form
            ref="applyForm"
            v-model="sec1_apply_dialog_value.valid"
            lazy-validation
          >
            <v-card outlined>
              <v-container>
                <v-row>
                  <v-col cols="3">
                    總金額
                  </v-col>
                  <v-col cols="9">
                    {{ applyTotalAmt | toDollars }}
                  </v-col>
                  <v-col cols="3">
                    數量
                  </v-col>
                  <v-col cols="9">
                    {{ applyTotalNum | numberWithCommas }}
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
            <transition-group name="fadeLeft">
              <v-card
                v-for="(item, index) in sec1_apply_dialog_value.dl_arr"
                :key="item.dl0"
                outlined
                class="mt-4"
              >
                <v-btn
                  v-if="index !== 0"
                  class="mx-2"
                  fab
                  x-small
                  color="#CCCCCC"
                  depressed
                  outlined
                  absolute
                  top
                  style="right: -1.5rem; background-color: white"
                  @click="applyRemove(index)"
                >
                  <v-icon dark>
                    mdi-window-close
                  </v-icon>
                </v-btn>
                <v-container>
                  <v-row>
                    <v-col cols="3" class="align-self-center">
                      面額
                    </v-col>
                    <v-col cols="9">
                      <v-text-field
                        v-model="item.dl1"
                        label="面額*"
                        type="number"
                        :rules="[rules.required, rules.duplication]"
                        hide-spin-buttons
                      />
                    </v-col>
                    <v-col cols="3" class="align-self-center">
                      數量
                    </v-col>
                    <v-col cols="9">
                      <v-text-field
                        v-model="item.dl2"
                        label="數量*"
                        type="number"
                        :rules="[rules.required, rules.amount]"
                        hide-spin-buttons
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </transition-group>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="sec1_apply_dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="sec1_apply_dialog_submit">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <to-top />
  </div>
</template>

<script>
import moment from 'moment'
import util from '~/assets/js/util'
import PageStatisticCard from '~/components/PageStatisticCard.vue'
import ToTop from '~/components/ToTop.vue'

export default {
  name: 'IndexPage',
  title: '門市票券(整批發行) - 申請歷史紀錄',
  components: { PageStatisticCard, ToTop },
  layout: 'adminLayout',
  async asyncData({ params, $axios }) {
    const { data } = await $axios.get('S01/apply/load')
    console.log(data)
    return { initData: data.data, store_amount: data.data.amount }
  },
  data() {
    return {
      isMobile: false,
      loadingStatus: true,
      CurrentPageSectionIndex: 0,
      title: '門市票券(整批發行) - 申請歷史紀錄',

      display_settings: [0, 1, 2, 3, 4, 5, 6],
      transitioned: [],
      closeTimeouts: {},

      /* Table1 */
      sec1_table_header: [
        {
          text: '審核編號',
          align: 'start',
          value: 'd1'
        },
        {
          text: '申請數量',
          align: 'start',
          value: 'd2'
        },
        {
          text: '申請金額',
          align: 'start',
          value: 'd3'
        },
        {
          text: '申請時間',
          align: 'start',
          value: 'd4',
          filterable: false
        },
        {
          text: '審核時間',
          align: 'center',
          value: 'd5',
          filterable: false
        },
        {
          text: '狀態',
          align: 'center',
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
      sec1_data_list: [],
      sec1_data_expanded: [],

      /* apply Dialog */
      sec1_apply_dialog: false,
      sec1_apply_dialog_value: {
        valid: false,
        dl_arr: []
      },

      rules: {
        length: len => v => (v || '').length <= len || `長度不得超過 ${len}`,
        required: v => !!v || '此欄位為必填',
        amount: (v) => {
          let amt = 0
          this.sec1_apply_dialog_value.dl_arr.forEach((item) => {
            if (
              (item.dl1 ?? '').toString().length > 0 &&
              (item.dl2 ?? '').toString().length > 0
            ) {
              amt += parseInt(item.dl1) * parseInt(item.dl2)
            }
          })
          if (amt > this.store_amount) {
            return `超過店家核許額度 ${util.numberWithCommas(
              this.store_amount
            )}`
          }
          return true
        },
        duplication: v =>
          ((v || '').toString().length > 0 &&
            this.sec1_apply_dialog_value.dl_arr.filter(
              x =>
                (x.dl1 || '').toString().length > 0 &&
                x.dl1.toString() === v.toString()
            ).length <= 1) ||
          '面額不能重複'
      }
    }
  },
  computed: {
    pageStatisticCardItems() {
      return [
        {
          title: '尚未繳款',
          value: this.initData.resultList.filter(x => x.reviewStatus === 0)
            .length,
          type: 1
        },
        {
          title: '待審核',
          value: this.initData.resultList.filter(x => x.reviewStatus === 2)
            .length,
          type: 1
        },
        {
          title: '通過',
          value: this.initData.resultList.filter(x => x.reviewStatus === 1)
            .length,
          type: 1,
          color: 'success--text'
        },
        {
          title: '退件',
          value: this.initData.resultList.filter(x => x.reviewStatus === 9)
            .length,
          type: 1,
          color: 'error--text'
        }
      ]
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
    applyTotalAmt() {
      let amt = 0
      this.sec1_apply_dialog_value.dl_arr.forEach((item) => {
        if (
          (item.dl1 ?? '').toString().length > 0 &&
          (item.dl2 ?? '').toString().length > 0
        ) {
          amt += parseInt(item.dl1) * parseInt(item.dl2)
        }
      })
      return amt
    },
    applyTotalNum() {
      let num = 0
      this.sec1_apply_dialog_value.dl_arr.forEach((item) => {
        if ((item.dl2 ?? '').toString().length > 0) {
          num += parseInt(item.dl2)
        }
      })
      return num
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      const initArray = []
      this.initData.resultList.forEach((item, index) => {
        const initDetailArray = item.reviewBulkDetailDTOS.map(detail => ({
          dl0: detail.id,
          dl1: detail.reviewDetailPrice,
          dl2: detail.reviewDetailNum
        }))

        let d5 = ''
        if ((item.reviewTime ?? '').toString().length > 0) {
          d5 = item.reviewTime
        }
        let d6 = '未知'
        switch (item.reviewStatus) {
          case 0:
            d6 = '尚未繳款'
            break
          case 1:
            d6 = '通過'
            break
          case 2:
            d6 = '審核中'
            break
          case 9:
            d6 = '退件'
            break
        }

        initArray.push({
          d0: item.id,
          d1: item.id,
          d2: item.reviewAmt,
          d3: item.reviewNum,
          d4: moment(item.applicationTime, 'YYYYMMDDhhmmss').format(
            'YYYY-MM-DD hh:mm:ss'
          ),
          d5,
          d6,
          status: item.reviewStatus,
          detail: initDetailArray
        })
      })
      this.sec1_data_list = initArray
    },
    applyInit() {
      this.sec1_apply_dialog_value.dl_arr = [
        {
          dl0: util._uuid(),
          dl1: null,
          dl2: null
        }
      ]

      this.sec1_apply_dialog = true
      this.$nextTick(() => this.$refs.applyForm.reset())
    },
    applyNew() {
      this.sec1_apply_dialog_value.dl_arr.push({
        dl0: util._uuid(),
        dl1: null,
        dl2: null
      })
    },
    applyRemove(index) {
      this.sec1_apply_dialog_value.dl_arr.splice(index, 1)
      this.$refs.applyForm.validate()
    },
    sec1_apply_dialog_submit() {
      this.$refs.applyForm.validate()

      if (!this.sec1_apply_dialog_value.valid) {
        this.$swal.fire('Oops!', '部分項目錯誤，請重新確認', 'error')
        return
      }

      const form = {
        arr: this.sec1_apply_dialog_value.dl_arr
      }

      const title = '確定要申請此次整批發行嗎'
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
            this.$axios
              .post('/S01/apply', form)
              .then((response) => {
                const data = response.data
                if (data.res === 'CODE0000') {
                  this.sec1_apply_dialog = false
                  this.$swal.fire('小提示', '申請成功', 'success')
                } else {
                  this.$swal.fire('小提示', data.msg, 'error')
                }
              })
              .catch((err) => {
                console.log(err)
              })
          }
        })
    },

    onResize() {
      if (window.innerWidth < 777) {
        this.isMobile = true
      } else {
        this.isMobile = false
      }
    },
    getItemId(item) {
      return item.d0 // Must be uid of record (would be nice if v-data-table exposed a "getItemKey" method)
    },
    toggleExpand(props) {
      const item = props.item
      const id = this.getItemId(item)
      if (props.isExpanded && this.transitioned[id]) {
        // If we're expanded and not in the process of closing, close
        this.closeExpand(item)
      } else {
        // If we're closed or in the process of closing, expand
        // Stop us from closing if a close transition was started
        clearTimeout(this.closeTimeouts[id])
        // Tell v-data-table to add the expansion content for the item
        props.expand(true)
        // Show expansion content with transition animation after it's had time to get added to the DOM
        this.$nextTick(() => this.$set(this.transitioned, id, true))
        // Hide all other expanded items if single-expand
        if (this.singleExpand) {
          this.$nextTick(() =>
            this.sec1_data_expanded.forEach(
              i => i !== item && this.closeExpand(i)
            )
          )
        }
      }
    },
    closeExpand(item) {
      const id = this.getItemId(item)
      // Mark that this item is in the process of closing
      this.$set(this.transitioned, id, false)
      // Remove expansion content from DOM after transition animation has had enough time to finish
      this.closeTimeouts[id] = setTimeout(
        () => this.$refs.vDataTable.expand(item, false),
        600
      )
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

.vue-custom-fadeIn tr {
  opacity: 0;
  animation-name: fadeIn;
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

:deep(.v-data-table__expanded__content) {
  box-shadow: none !important;
  background-color: #e8eaf6;
}

.expand__color {
  background-color: #e8eaf6;
}

.expanded-closing {
  border-bottom: none !important;
}

.expanded-display {
  display: block;
}
</style>
