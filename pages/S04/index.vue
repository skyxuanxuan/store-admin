<!-- eslint-disable vue/no-v-html -->
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
            門市訂單
          </v-tab>
          <v-tab class="custom-green-1--text">
            商城訂單
          </v-tab>
          <v-tab class="custom-green-1--text">
            詳細資料
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
                  <template #item.d5="{ item }">
                    <span>{{ item.d5 | numberWithCommas }}</span>
                  </template>
                  <template #item.d6="{ item }">
                    <span>{{ item.d6 | numberWithCommas }}</span>
                  </template>

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
                          <v-list-item @click="moreInfo(item.d0)">
                            <v-list-item-icon>
                              <v-icon> mdi-open-in-new </v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                              <v-list-item-title> 詳細資料 </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                          <v-divider />
                          <v-list-item
                            v-show="item.statusCode === '9'"
                            @click="applyCancel(item.d0)"
                          >
                            <v-list-item-icon>
                              <v-icon color="other1">
                                mdi-close
                              </v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                              <v-list-item-title class="custom-other-1--text">
                                申請取消
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                          <v-divider v-show="item.statusCode === '9'" />
                          <v-list-item
                            v-show="item.statusCode === 'A'"
                            @click="checkImg(item.img)"
                          >
                            <v-list-item-icon>
                              <v-icon color="other1">
                                mdi-eye
                              </v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                              <v-list-item-title class="custom-other-1--text">
                                查看圖片
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                          <v-divider v-show="item.statusCode === 'A'" />
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
                  :headers="sec2_showHeaders"
                  :items="sec2_data_list"
                  :items-per-page="10"
                  :search="sec2_search"
                  item-key="d0"
                  calculate-widths
                  :page.sync="sec2_table_page"
                  :footer-props="{
                    'disable-pagination': true,
                    'next-icon': '',
                    'prev-icon': ''
                  }"
                  @page-count="sec2_table_page_count = $event"
                >
                  <template #item.d5="{ item }">
                    <span>{{ item.d5 | numberWithCommas }}</span>
                  </template>
                  <template #item.d6="{ item }">
                    <span>{{ item.d6 | numberWithCommas }}</span>
                  </template>
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
                          <v-list-item @click="moreInfo(item.d0)">
                            <v-list-item-icon>
                              <v-icon> mdi-open-in-new </v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                              <v-list-item-title> 詳細資料 </v-list-item-title>
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
                  v-model="sec2_table_page"
                  :length="sec2_table_page_count"
                  :total-visible="7"
                />
              </div>
            </v-card>
          </v-container>
        </v-tab-item>
        <v-tab-item class="background-color">
          <v-card
            max-width="1150"
            flat
            color="transparent"
            class="mt-2 pa-3"
            style="margin: 0 auto; margin-bottom: 64px"
          >
            <v-card flat color="transparent">
              <v-container :class="{ 'pa-0': mobile }">
                <v-row class="">
                  <v-col>
                    <v-card
                      class="cus_ui_card py-4"
                      :class="{ 'mt-4': !mobile }"
                      :flat="mobile"
                      :rounded="!mobile ? 'xl' : ''"
                    >
                      <v-toolbar dense flat>
                        <div :class="{ 'pl-8': !mobile }">
                          {{ mobile ? '編號' : '訂單編號' }}
                        </div>
                        <v-text-field
                          v-model="detailNo"
                          class="searchInput pl-4 pt-4"
                          label="Search"
                          dense
                          single-line
                        />
                        <v-btn color="other2" icon @click="sec3Search">
                          <v-icon>mdi-magnify</v-icon>
                        </v-btn>
                        <v-spacer />
                      </v-toolbar>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
            <v-card flat color="transparent" class="mt-4">
              <v-container :class="{ 'pa-0': mobile }">
                <v-row class="">
                  <v-col>
                    <v-card
                      class="cus_ui_card py-4"
                      :flat="mobile"
                      :rounded="!mobile ? 'xl' : ''"
                    >
                      <v-card-title class="custom-brown1-3--text pt-0">
                        <span
                          class="master_title"
                          :class="{ ori: !mobile }"
                        >基本資料</span>
                      </v-card-title>

                      <v-card
                        flat
                        class="cus_mobile_card"
                        :class="{ mobile: mobile }"
                      >
                        <div class="cus_mobile_card_row">
                          <div class="cus_mobile_card_header">
                            編號
                          </div>
                          <div
                            class="cus_mobile_card_cell"
                            :class="{ 'text-left': !mobile }"
                          >
                            {{ detailObj.d1 }}
                          </div>
                        </div>
                        <div class="cus_mobile_card_row">
                          <div class="cus_mobile_card_header">
                            類型
                          </div>
                          <div
                            class="cus_mobile_card_cell"
                            :class="{ 'text-left': !mobile }"
                          >
                            {{ detailObj.d2 }}
                          </div>
                        </div>
                        <div class="cus_mobile_card_row">
                          <div class="cus_mobile_card_header">
                            購買會員
                          </div>
                          <div
                            class="cus_mobile_card_cell"
                            :class="{ 'text-left': !mobile }"
                          >
                            {{ detailObj.d3 }}
                          </div>
                        </div>
                        <div class="cus_mobile_card_row">
                          <div class="cus_mobile_card_header">
                            付款方式
                          </div>
                          <div
                            class="cus_mobile_card_cell"
                            :class="{ 'text-left': !mobile }"
                          >
                            {{ detailObj.d4 }}
                          </div>
                        </div>
                        <div class="cus_mobile_card_row">
                          <div class="cus_mobile_card_header">
                            交易序號
                          </div>
                          <div
                            class="cus_mobile_card_cell"
                            :class="{ 'text-left': !mobile }"
                          >
                            {{ detailObj.d5 }}
                          </div>
                        </div>
                        <div class="cus_mobile_card_row">
                          <div class="cus_mobile_card_header">
                            狀態
                          </div>
                          <div
                            class="cus_mobile_card_cell"
                            :class="{ 'text-left': !mobile }"
                          >
                            {{ detailObj.d6 }}
                          </div>
                        </div>
                      </v-card>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row v-if="detailObj.pType === 2" class="">
                  <v-col>
                    <v-card
                      class="cus_ui_card py-4"
                      :flat="mobile"
                      :rounded="!mobile ? 'xl' : ''"
                    >
                      <v-card-title class="custom-brown1-3--text pt-0">
                        <span
                          class="master_title"
                          :class="{ ori: !mobile }"
                        >購買人資訊</span>
                      </v-card-title>

                      <v-card
                        flat
                        class="cus_mobile_card"
                        :class="{ mobile: mobile }"
                      >
                        <div class="cus_mobile_card_row">
                          <div class="cus_mobile_card_header">
                            手機號碼
                          </div>
                          <div
                            class="cus_mobile_card_cell"
                            :class="{ 'text-left': !mobile }"
                          >
                            {{ detailObj.d7 }}
                          </div>
                        </div>
                        <div class="cus_mobile_card_row">
                          <div class="cus_mobile_card_header">
                            姓名
                          </div>
                          <div
                            class="cus_mobile_card_cell"
                            :class="{ 'text-left': !mobile }"
                          >
                            {{ detailObj.d8 }}
                          </div>
                        </div>
                        <div class="cus_mobile_card_row">
                          <div class="cus_mobile_card_header">
                            電子信箱
                          </div>
                          <div
                            class="cus_mobile_card_cell"
                            :class="{ 'text-left': !mobile }"
                          >
                            {{ detailObj.d9 }}
                          </div>
                        </div>
                      </v-card>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row class="">
                  <v-col>
                    <v-card
                      class="cus_ui_card py-4"
                      :flat="mobile"
                      :rounded="!mobile ? 'xl' : ''"
                    >
                      <v-card-title class="custom-brown1-3--text pt-0">
                        <span
                          class="master_title"
                          :class="{ ori: !mobile }"
                        >訂單內容</span>
                      </v-card-title>
                      <v-card
                        flat
                        class="cus_mobile_card"
                        :class="{ mobile: mobile }"
                      >
                        <div class="cus_mobile_card_row">
                          <div class="cus_mobile_card_header">
                            票券數量
                          </div>
                          <div
                            class="cus_mobile_card_cell"
                            :class="{ 'text-left': !mobile }"
                          >
                            {{ detailObj.d10 | numberWithCommas }}
                          </div>
                        </div>
                        <div class="cus_mobile_card_row">
                          <div class="cus_mobile_card_header">
                            訂單總額
                          </div>
                          <div
                            class="cus_mobile_card_cell"
                            :class="{ 'text-left': !mobile }"
                          >
                            {{ detailObj.d11 | toDollars }}
                          </div>
                        </div>
                        <div
                          v-show="detailObj.pType === 1"
                          class="cus_mobile_card_row"
                        >
                          <div class="cus_mobile_card_header">
                            交易金額
                          </div>
                          <div
                            class="cus_mobile_card_cell"
                            :class="{ 'text-left': !mobile }"
                          >
                            {{ detailObj.d12 | toDollars }}
                          </div>
                        </div>
                        <div
                          v-show="detailObj.pType === 1"
                          class="cus_mobile_card_row"
                        >
                          <div class="cus_mobile_card_header">
                            備註
                          </div>
                          <div
                            class="cus_mobile_card_cell"
                            :class="{ 'text-left': !mobile }"
                            v-html="detailObj.d13.replace(/\n/g, '<br>')"
                          />
                        </div>
                      </v-card>
                      <v-card-title class="mt-4 custom-brown1-3--text pt-0">
                        <span
                          class="master_title"
                          :class="{ ori: !mobile }"
                        >產品列表</span>
                      </v-card-title>
                      <v-card
                        flat
                        class="cus_mobile_card"
                        :class="{ mobile: mobile }"
                      >
                        <v-expansion-panels
                          accordion
                          flat
                          focusable
                          class="mt-4"
                          style="border-radius: 0; border: thin #e0e0e0 solid"
                        >
                          <v-expansion-panel
                            v-for="item in detailObj.products"
                            :key="item.key"
                          >
                            <v-expansion-panel-header>
                              {{ item.name }}
                            </v-expansion-panel-header>
                            <v-expansion-panel-content
                              class="pink lighten-5 pa-0"
                            >
                              <v-row no-gutters>
                                <v-col cols="12" sm="4">
                                  {{ item.name }}
                                </v-col>
                                <v-col cols="12" sm="4">
                                  {{ item.price | toDollars }}
                                </v-col>
                                <v-col cols="12" sm="4">
                                  x {{ item.num | numberWithCommas }}
                                </v-col>
                              </v-row>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </v-card>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row class="">
                  <v-col>
                    <v-card
                      class="cus_ui_card py-4"
                      :flat="mobile"
                      :rounded="!mobile ? 'xl' : ''"
                    >
                      <v-card-title class="custom-brown1-3--text pt-0">
                        <span
                          class="master_title"
                          :class="{ ori: !mobile }"
                        >時間</span>
                      </v-card-title>

                      <v-card flat>
                        <v-timeline align-top dense>
                          <v-timeline-item
                            v-for="(item, index) in detailObj.timeLine"
                            :key="item.key"
                            :color="index % 2 === 0 ? 'pink' : 'teal lighten-3'"
                            small
                          >
                            <v-row class="pt-1">
                              <v-col cols="12" sm="3">
                                <strong>{{ item.time }}</strong>
                              </v-col>
                              <v-col cols="12" sm="3">
                                <strong>{{ item.event }}</strong>
                              </v-col>
                            </v-row>
                          </v-timeline-item>
                        </v-timeline>
                      </v-card>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </div>
    <FileUpload
      v-model="cancelDialog"
      title="上傳訂單取消佐證"
      :files="[]"
      :max-files="1"
      :multi-files="false"
      @get-files="step2_upload_get_files"
    />
    <to-top />
    <my-waiting :loading="loadingStatus" />
  </div>
</template>

<script>
import { api as viewerApi } from 'v-viewer'
import util from '~/assets/js/util'
import MyWaiting from '~/components/MyWaiting.vue'
import ToTop from '~/components/ToTop.vue'
import 'viewerjs/dist/viewer.css'

export default {
  name: 'S04',
  title: '訂單',
  components: { ToTop, MyWaiting },
  layout: 'adminLayout',
  async asyncData({ store, redirect }) {
    const permission = await store.dispatch('userInfo/fetchPermission', 'S04')
    if (permission >= 1) {
      await store.dispatch('S04/fetchS04')
      const imgUrl = `${process.env.imgUrl}/store/${store.state.userInfo.user.storeId}/orders`
      return {
        imgUrl
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
      title: '訂單',
      xxs: false,

      payKind: this.$store.state.basic.payKind,
      orderLog: this.$store.state.basic.orderLog,
      orders1: this.$store.state.S04.orders1,
      orders2: this.$store.state.S04.orders2,

      display_settings1: [0, 1, 2, 3, 4, 5, 6, 7],
      display_settings2: [0, 1, 2, 3, 4, 5, 6, 7],

      /* Table1 */
      sec1_table_header: [
        {
          text: '訂單編號',
          align: 'start',
          value: 'd1'
        },
        {
          text: '買家',
          align: 'start',
          value: 'd2'
        },
        {
          text: '成立時間',
          align: 'center',
          value: 'd3',
          filterable: false
        },
        {
          text: '付款方式',
          align: 'center',
          value: 'd4',
          filterable: false
        },
        {
          text: '票券數量',
          align: 'start',
          value: 'd5'
        },
        {
          text: '總額',
          align: 'start',
          value: 'd6',
          filterable: false
        },
        {
          text: '狀態',
          align: 'center',
          value: 'd7',
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

      /* Table2 */
      sec2_table_header: [
        {
          text: '訂單編號',
          align: 'start',
          value: 'd1'
        },
        {
          text: '買家',
          align: 'start',
          value: 'd2'
        },
        {
          text: '成立時間',
          align: 'center',
          value: 'd3',
          filterable: false
        },
        {
          text: '付款方式',
          align: 'center',
          value: 'd4',
          filterable: false
        },
        {
          text: '票券數量',
          align: 'start',
          value: 'd5'
        },
        {
          text: '總額',
          align: 'start',
          value: 'd6',
          filterable: false
        },
        {
          text: '狀態',
          align: 'center',
          value: 'd7',
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
      sec2_search: '',
      sec2_table_page: 1,
      sec2_table_page_count: 0,

      rules: {
        length: len => v => (v || '').length <= len || `長度不得超過 ${len}`,
        required: v => !!v || '此欄位為必填'
      },

      /* Detail */
      detailNo: '',
      detailObj: {
        d0: '',
        pType: 0,
        d1: '',
        d2: '',
        d3: '',
        d4: '',
        d5: '',
        d6: '',
        d7: '',
        d8: '',
        d9: '',
        d10: '',
        d11: '',
        d12: '',
        d13: '',
        timeLine: [],
        products: []
      },
      /* 取消 */
      cancelDialog: false,
      cancelDialogId: ''
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
      this.orders1.forEach((item) => {
        let createTime = ''
        if (item.createTime.length > 0) {
          createTime = util.formatTimeMinus(item.createTime)
        }

        let status = '未知'
        const statusCode = item.status
        if (statusCode === '1') {
          status = '訂單完成'
        } else if (statusCode === '9') {
          status = '尚未歸戶'
        } else if (statusCode === 'C') {
          status = '取消'
        } else if (statusCode === 'A') {
          status = '申請取消'
        }

        initArr.push({
          d0: item.id,
          d1: item.id,
          d2: item.buyTel,
          d3: createTime,
          d4: this.payKind.offline[item.payKind],
          d5: item.totalNum,
          d6: item.totalAmt,
          d7: status,
          statusCode,
          img: `${this.imgUrl}/${item.note}`
        })
      })

      return initArr
    },
    sec2_showHeaders() {
      const arr = []
      for (let i = 0; i < this.sec2_table_header.length; i++) {
        if (this.display_settings2.includes(i)) {
          arr.push(this.sec2_table_header[i])
        }
      }
      return arr
    },
    sec2_data_list() {
      const initArr = []
      this.orders2.forEach((item) => {
        let createTime = ''
        if (item.createTime.length > 0) {
          createTime = util.formatTimeMinus(item.createTime)
        }

        let status = '未知'
        const statusCode = item.status
        if (statusCode === '1') {
          status = '訂單完成'
        } else if (statusCode === '0') {
          status = '待付款'
        } else if (statusCode === 'C') {
          status = '取消'
        }

        if (statusCode !== 'T') {
          initArr.push({
            d0: item.id,
            d1: item.id,
            d2: item.buyTel,
            d3: createTime,
            d4: this.payKind.online[item.payKind],
            d5: item.totalNum,
            d6: item.totalAmt,
            d7: status,
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
    loading(flag) {
      if (flag) {
        this.loadingStatus = true
      } else {
        setTimeout(() => {
          this.loadingStatus = false
        }, 500)
      }
    },
    sec3Search() {
      this.moreInfo(this.detailNo)
    },
    async moreInfo(id) {
      this.loading(true)
      this.detailNo = id
      try {
        const response = await this.$axios.get(`/S04/detail/${id}`)
        const data = response.data
        console.log(data)
        if (data.res === 'CODE0000') {
          const initObj = {}
          const orderInfo = data.data.order
          const userInfo = data.data.user
          const logInfo = data.data.log
          const productInfo = data.data.products

          initObj.d0 = orderInfo.id
          initObj.pType = orderInfo.productType
          initObj.d1 = orderInfo.id

          let productType = '未知'
          let payKind = '未知'
          let status = '未知'

          if (orderInfo.productType === 1) {
            productType = '門市'
            payKind = this.payKind.offline[orderInfo.payKind]

            if (orderInfo.status === '9') {
              status = '尚未歸戶'
            } else if (orderInfo.status === '1') {
              status = '訂單完成'
            } else if (orderInfo.status === 'C') {
              status = '訂單取消'
            } else if (orderInfo.status === 'A') {
              status = '申請取消'
            }
          } else if (orderInfo.productType === 2) {
            productType = '商城'
            payKind = this.payKind.online[orderInfo.payKind]

            if (orderInfo.status === '0') {
              status = '尚未付款'
            } else if (orderInfo.status === '1') {
              status = '訂單完成'
            } else if (orderInfo.status === 'C') {
              status = '訂單取消'
            }
          }

          const initTimeLine = []
          logInfo.forEach((item, index) => {
            initTimeLine.push({
              key: item.id,
              time: util.formatTimeMinus(item.time).substring(0, 10),
              event: this.orderLog[item.event] ?? '未知'
            })
            if (index === logInfo.length - 1) {
              if (item.event === 'CREATE') {
                initTimeLine.push({
                  key: item.id,
                  time: util.formatTimeMinus(item.time).substring(0, 10),
                  event: '尚未歸戶'
                })
              } else if (item.event === 'PAY' || item.event === 'GETDATA') {
                initTimeLine.push({
                  key: item.id,
                  time: util.formatTimeMinus(item.time).substring(0, 10),
                  event: '訂單完成'
                })
              }
            }
          })

          const initProducts = []
          productInfo.forEach((item) => {
            initProducts.push({
              key: util._uuid(),
              name: item.name,
              price: item.price,
              num: item.num
            })
          })

          initObj.d2 = productType
          initObj.d3 = `${util.formatTel(userInfo.tel)} ( ${userInfo.name} )`
          initObj.d4 = payKind
          initObj.d5 = orderInfo.payNo
          initObj.d6 = status
          initObj.d7 = orderInfo.buyTel
          initObj.d8 = orderInfo.buyName
          initObj.d9 = orderInfo.buyEmail
          initObj.d10 = orderInfo.totalNum
          initObj.d11 = orderInfo.totalAmt
          initObj.d12 = orderInfo.payNote
          initObj.d13 = orderInfo.payNote2
          initObj.products = initProducts
          initObj.timeLine = initTimeLine.reverse()

          this.detailObj = Object.assign({}, initObj)
          if (this.CurrentPageSectionIndex !== 2) {
            this.CurrentPageSectionIndex = 2
          }
        } else {
          this.$swal.fire('小提示', data.msg)
        }

        this.loading(false)
      } catch (err) {
        this.loading(false)
      }
    },
    applyCancel(id) {
      this.cancelDialog = true
      this.cancelDialogId = id
    },
    checkImg(img) {
      console.log(img)
      viewerApi({
        images: [img]
      })
    },
    step2_upload_get_files(arr) {
      console.log(arr)
      if (arr.length === 0) {
        this.$swal.fire('小提示', '請選擇圖片').then(() => {
          this.cancelDialog = true
        })

        return
      }

      if (this.cancelDialogId.length === 0) {
        this.$swal.fire('小提示', '訂單序號錯誤')
        return
      }

      const title = '確定要申請取消嗎'
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
            const form = new FormData()
            form.append('file', arr[0].file)
            this.$axios
              .post(`/S04/cancel/${this.cancelDialogId}`, form)
              .then((response) => {
                const data = response.data
                if (data.res === 'CODE0000') {
                  this.$swal.fire('小提示', '修改成功', 'success')
                  this.$store.dispatch('S03/fetchStore').then(() => {
                    this.storeInfo = this.$store.state.S03.storeInfo
                    this.storeEdit = false
                  })
                } else {
                  this.$swal.fire('小提示', data.msg, 'error')
                }
                this.$nextTick(() => {
                  this.loading(false)
                })
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

            this.loading(false)
          }
        })
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

:deep(.v-expansion-panel-content__wrap) {
  padding: 10px 32px;
}

:deep(.dialog-overflow-y) {
  overflow-y: visible !important;
}
</style>
