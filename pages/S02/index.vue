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
            <v-list-item nuxt to="/S02/product/create">
              <v-list-item-icon>
                <v-icon>mdi-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-title>建立產品</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>

      <!-- <v-btn class="d-none d-sm-flex" color="#666666" width="140" dark>
        發送票券
      </v-btn> -->
    </v-app-bar>
    <div class="pa-4">
      <v-tabs-items v-model="CurrentPageSectionIndex">
        <v-tab-item class="background-color">
          <PageStatisticCard :items="pageStatisticCardItems" />

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

                <v-btn
                  class="right-10 d-none d-sm-flex"
                  width="160"
                  dark
                  color="brownS1"
                  rounded
                  nuxt
                  to="/S02/product/create"
                >
                  建立產品
                </v-btn>
              </v-toolbar>
              <div>
                <v-data-table
                  ref="vDataTable"
                  mobile-breakpoint="770"
                  :headers="sec1_showHeaders"
                  :items="sec1_data_list"
                  :items-per-page="10"
                  :search="sec1_search"
                  item-key="d0"
                  :expanded.sync="sec1_data_expanded"
                  show-expand
                  single-expand
                  calculate-widths
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
                          props.isExpanded &&
                          transitioned[getItemId(props.item)]
                      }"
                      @click="toggleExpand(props)"
                    >
                      mdi-chevron-down
                    </v-icon>
                  </template>

                  <template #item.actions="{ item }">
                    <v-tooltip bottom>
                      <template #activator="{ on, attrs }">
                        <v-btn
                          class="no-backgroud-hover white"
                          elevation="0"
                          color="white"
                          fab
                          x-small
                          nuxt
                          :to="'/S02/product/' + item.d0"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon color="other2">
                            mdi-pencil
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>編輯</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template #activator="{ on, attrs }">
                        <v-btn
                          v-if="item.statusCode === '11'"
                          class="no-backgroud-hover white"
                          elevation="0"
                          color="white"
                          fab
                          x-small
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon color="other1">
                            mdi-close
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>停用</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                      <template #activator="{ on, attrs }">
                        <v-btn
                          v-if="item.statusCode === '10'"
                          class="no-backgroud-hover white"
                          elevation="0"
                          color="white"
                          fab
                          x-small
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon color="other1">
                            mdi-restart
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>啟用</span>
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
                        <div
                          v-show="transitioned[getItemId(item)]"
                          v-resize="onResize"
                        >
                          <v-container class="d-none d-sm-flex flex-column">
                            <v-row>
                              <v-col>方案</v-col>
                              <v-col>價格</v-col>
                              <v-col>剩餘</v-col>
                            </v-row>
                            <v-row v-for="plan in item.planSet" :key="plan.dl0">
                              <v-col>{{ plan.dl1 }}</v-col>
                              <v-col>{{ plan.dl2 | toDollars }}</v-col>
                              <v-col v-if="plan.dlSaleNum !== -1">
                                {{ plan.dl3 | numberWithCommas }}
                              </v-col>
                              <v-col v-else>
                                <v-icon>mdi-infinity</v-icon>
                              </v-col>
                            </v-row>
                          </v-container>
                          <v-card
                            v-for="plan in item.planSet"
                            :key="plan.dl0"
                            flat
                            color="transparent"
                            class="d-flex d-sm-none flex-column"
                          >
                            <v-card
                              flat
                              color="transparent"
                              class="expanded-mobil-card"
                            >
                              <div>方案「{{ plan.dl1 }}」</div>
                            </v-card>
                            <v-card flat class="expanded-mobil-card">
                              <div class="text-body-2">
                                價格
                              </div>
                              <div
                                class="text-body-2 expanded-mobil-card-content"
                              >
                                {{ plan.dl2 | toDollars }}
                              </div>
                            </v-card>
                            <v-card flat class="expanded-mobil-card">
                              <div class="text-body-2">
                                剩餘
                              </div>
                              <div
                                v-if="plan.dlSaleNum !== -1"
                                class="text-body-2 expanded-mobil-card-content"
                              >
                                {{ plan.dl3 | numberWithCommas }}
                              </div>
                              <div
                                v-else
                                class="text-body-2 expanded-mobil-card-content"
                              >
                                <v-icon>mdi-infinity</v-icon>
                              </div>
                            </v-card>
                            <v-divider />
                          </v-card>
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
            </v-card>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </div>
    <to-top />
    <my-waiting :loading="loadingStatus" />
  </div>
</template>

<script>
import util from '~/assets/js/util'
import MyWaiting from '~/components/MyWaiting.vue'
import PageStatisticCard from '~/components/PageStatisticCard.vue'
import ToTop from '~/components/ToTop.vue'

export default {
  name: 'IndexPage',
  title: '商城票券(逐筆發行)',
  components: { PageStatisticCard, ToTop, MyWaiting },
  layout: 'adminLayout',
  async asyncData({ store }) {
    await store.dispatch('S02/fetchProductsList')
    await store.dispatch('S02/fetchOrdersList')
  },
  data() {
    return {
      loadingStatus: false,
      CurrentPageSectionIndex: 0,
      title: '網路票券(逐筆發行)',

      display_settings: [0, 1, 2, 3, 4, 5, 6],

      productClasses: this.$store.getters['basic/getClasses'],
      products: this.$store.state.S02.productsList,
      orders: this.$store.state.S02.orders,
      /* Table1 */
      sec1_table_header: [
        {
          text: '編號',
          align: 'start',
          value: 'd1'
        },
        {
          text: '產品',
          align: 'start',
          value: 'd2'
        },
        {
          text: '分類標籤',
          align: 'start',
          value: 'd3'
        },
        {
          text: '售價',
          align: 'start',
          value: 'd4',
          filterable: false
        },
        {
          text: '售出',
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

      sec1_data_expanded: [],
      isMobile: false,
      transitioned: [],
      closeTimeouts: {}
    }
  },
  computed: {
    pageStatisticCardItems() {
      return [
        {
          title: '商城架上產品 (個)',
          value: this.$store.getters['S02/getProductsNum'],
          type: 1,
          icon: 'mdi-store-outline'
        },
        {
          title: '商城架上方案 (個)',
          value: this.$store.getters['S02/getPlansNum'],
          type: 1,
          icon: 'mdi-format-list-text'
        },
        {
          title: '本月銷售票券 (張)',
          value: this.$store.getters['S02/getSaleNum'],
          type: 1,
          icon: 'mdi-ticket-confirmation-outline'
        },
        {
          title: '本月銷售金額 (元)',
          value: this.$store.getters['S02/getSaleAmt'],
          type: 2,
          icon: 'mdi-cash-multiple'
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
    sec1_data_list() {
      const orderDetailFlat = this.orders
        .filter(x => x.status === '1')
        .map(x => x.orderDetailDTOSet)
        .flat()
      const initArr = []
      this.products.forEach((item) => {
        const planSet = []
        const classesArr = item.productClass.split(';')
        let saleMin = 999999999
        let saleMax = 0
        let saleNum = 0
        item.productPlanDTOSet.forEach((y) => {
          orderDetailFlat
            .filter(
              detail =>
                detail.specId ===
                y.productSpecificationDTOSet[0].specificationId
            )
            .forEach((detail) => {
              saleNum += detail.totalNum
            })

          // 目前方案綁定一規格
          const planSalePrice = y.productSpecificationDTOSet[0].sellingPrice
          const planSaleNum = y.productSpecificationDTOSet[0].sellingNum
          const PlanRemaining = planSaleNum - saleNum // 尚未扣除已賣出

          if (y.productSpecificationDTOSet[0].sellingPrice < saleMin) {
            saleMin = y.productSpecificationDTOSet[0].sellingPrice
          }
          if (y.productSpecificationDTOSet[0].sellingPrice > saleMax) {
            saleMax = y.productSpecificationDTOSet[0].sellingPrice
          }

          planSet.push({
            dl0: y.planId,
            dl1: y.planName,
            dl2: planSalePrice,
            dl3: PlanRemaining,
            dlSaleNum: planSaleNum
          })
        })
        let status = '未知'
        let statusCode = '-1'
        if (item.approval === 0) {
          if (item.reviewProductDTO.reviewStatus === 0) {
            status = '待審核'
            statusCode = '00'
          } else if (item.reviewProductDTO.reviewStatus === 9) {
            status = '已退回'
            statusCode = '09'
          }
        } else if (item.approval === 1) {
          if (item.useType === 0) {
            status = '停用'
            statusCode = '10'
          } else if (item.useType === 1) {
            status = '審核通過'
            statusCode = '11'
          }
        }
        initArr.push({
          d0: item.productId,
          d1: item.productNo,
          d2: item.productName,
          d3: this.productClasses
            .filter(x => classesArr.includes(x.id))
            .map(x => x.name)
            .join('/ '),
          d4:
            saleMin === saleMax
              ? `NT$ ${util.numberWithCommas(saleMin)}`
              : `NT$ ${util.numberWithCommas(
                  saleMin
                )} ~ NT$ ${util.numberWithCommas(saleMax)}`,
          d5: saleNum,
          d6: status,
          planSet,
          statusCode
        })
      })

      return initArr
    }
  },
  mounted() {},
  methods: {
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

// expand card
.expanded-mobil-card {
  align-items: center;
  display: flex;
  justify-content: space-between;
  min-height: 48px;
  padding-right: 16px !important;
  padding-left: 16px !important;
  background-color: transparent;
}

.expanded-mobil-card .expanded-mobil-card-content {
  text-align: right;
}
</style>
