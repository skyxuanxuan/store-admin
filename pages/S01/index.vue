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
            <v-list-item nuxt to="/S01/apply">
              <v-list-item-icon>
                <v-icon>mdi-file-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-title>票券庫</v-list-item-title>
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
        to="/S01/apply"
      >
        票券庫
      </v-btn>
    </v-app-bar>
    <div :class="{'pa-4': !mobile}">
      <v-tabs-items
        v-model="CurrentPageSectionIndex"
        :class="{ none: loadingStatus }"
      >
        <v-tab-item class="background-color">
          <PageStatisticCard :items="pageStatisticCardItems" />

          <v-container class="mt-2 pa-3">
            <v-card flat class="pa-2">
              <v-toolbar dense flat>
                <v-text-field
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
                      style="top: 2px"
                      v-bind="attrs"
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
                            <v-checkbox :input-value="active" color="primary" />
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
                  mobile-breakpoint="770"
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
                    <v-tooltip bottom>
                      <template #activator="{ on, attrs }">
                        <v-btn
                          class="no-backgroud-hover white"
                          elevation="0"
                          color="white"
                          fab
                          x-small
                          v-bind="attrs"
                          nuxt
                          :to="'/S01/product/' + item.d0"
                          v-on="on"
                        >
                          <v-icon color="brownS1">
                            mdi-open-in-new
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>詳細資料</span>
                    </v-tooltip>
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
          nuxt
          to="/S01/product/create"
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>新增產品</span>
    </v-tooltip>
    <to-top />
    <my-waiting :loading="loadingStatus" />
  </div>
</template>

<script>
// import util from '~/assets/js/util'
import MyWaiting from '~/components/MyWaiting.vue'
import PageStatisticCard from '~/components/PageStatisticCard.vue'
import ToTop from '~/components/ToTop.vue'

export default {
  name: 'S01',
  title: '門市票券(整批發行)',
  components: { PageStatisticCard, ToTop, MyWaiting },
  layout: 'adminLayout',
  async asyncData({ store }) {
    await store.dispatch('S01/fetchS01')
  },
  data() {
    return {
      loadingStatus: false,
      CurrentPageSectionIndex: 0,
      title: '門市票券(整批發行)',
      scoller_fab: false,

      display_settings: [0, 1, 2, 3, 4, 5, 6],

      productClasses: this.$store.getters['basic/getClasses'],
      products: this.$store.state.S01.productsList,
      orders: this.$store.state.S01.orders,

      /* Table1 */
      sec1_table_header: [
        {
          text: '產品編號',
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
          text: '剩餘',
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
    pageStatisticCardItems() {
      return [
        {
          title: '門市架上產品 (個)',
          value: this.$store.getters['S01/getProductsNum'],
          type: 1,
          icon: 'mdi-store-outline'
        },
        {
          title: '本月銷售票券 (張)',
          value: this.$store.getters['S01/getSaleNum'],
          type: 1,
          icon: 'mdi-ticket-confirmation-outline'
        },
        {
          title: '本月銷售金額 (元)',
          value: this.$store.getters['S01/getSaleAmt'],
          type: 2,
          icon: 'mdi-cash-multiple'
        },
        {
          title: '庫存空白票券 (張)',
          value: this.$store.getters['S01/getBulkTicketsNum'],
          type: 1,
          icon: 'mdi-note-outline'
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
        .filter(x => x.status === 1 || x.status === 9)
        .map(x => x.orderDetailDTOSet)
        .flat()

      const initArr = []
      this.products.forEach((item) => {
        const planSet = []
        const classesArr = item.productClass.split(';')

        let saleNum = 0
        orderDetailFlat
          .filter(
            detail =>
              detail.specId ===
              item.productPlanDTOSet[0].productSpecificationDTOSet[0]
                .specificationId
          )
          .forEach((detail) => {
            saleNum += detail.totalNum
          })

        const salePrice =
          item.productPlanDTOSet[0].productSpecificationDTOSet[0].sellingPrice
        const totalSaleNum =
          item.productPlanDTOSet[0].productSpecificationDTOSet[0].sellingNum
        const remaining = totalSaleNum - saleNum // 尚未扣除已賣出

        initArr.push({
          d0: item.productId,
          d1: item.productNo,
          d2: item.productName,
          d3: this.productClasses
            .filter(x => classesArr.includes(x.id))
            .map(x => x.name)
            .join('/ '),
          d4: salePrice,
          d5: saleNum,
          d6: remaining,
          planSet
        })
      })

      return initArr
    }
  },
  methods: {
    onScroll(e) {
      if (typeof window === 'undefined') {
        return
      }
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.scoller_fab = top > 20
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
