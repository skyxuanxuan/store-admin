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
            產品列表
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <div class="pa-4">
      <v-tabs-items v-model="CurrentPageSectionIndex">
        <v-tab-item class="background-color">
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
                          :to="'/S00/send/' + item.d0"
                          v-on="on"
                        >
                          <v-icon color="other2">
                            mdi-send
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>發送票券</span>
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
    <to-top />
    <my-waiting :loading="loadingStatus" />
  </div>
</template>

<script>
// import util from '~/assets/js/util'
import MyWaiting from '~/components/MyWaiting.vue'
import ToTop from '~/components/ToTop.vue'

export default {
  name: 'IndexPage',
  title: '發送票券',
  components: { ToTop, MyWaiting },
  layout: 'adminLayout',
  async asyncData({ store, redirect }) {
    const permission = await store.dispatch('userInfo/fetchPermission', 'S00')
    if (permission >= 2) {
      await store.dispatch('S01/fetchS01')
    } else {
      console.log('Permission deny')
      redirect('/')
    }
  },
  data() {
    return {
      loadingStatus: false,
      CurrentPageSectionIndex: 0,
      title: '發送票券',
      xxs: false,

      productClasses: this.$store.getters['basic/getClasses'],
      products: this.$store.state.S01.productsList,
      orders: this.$store.state.S01.orders,

      display_settings: [0, 1, 2, 3, 4, 5, 6],

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
      sec1_table_page_count: 0,

      rules: {
        length: len => v => (v || '').length <= len || `長度不得超過 ${len}`,
        required: v => !!v || '此欄位為必填'
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
      const orderDetailFlat = this.orders.map(x => x.orderDetailDTOSet).flat()

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

    sendInit(id) {
      this.CurrentPageSectionIndex = 1
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
