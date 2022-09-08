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
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-send</v-icon>
              </v-list-item-icon>
              <v-list-item-title>發送票券</v-list-item-title>
            </v-list-item>
            <v-list-item nuxt to="/S01/product/create">
              <v-list-item-icon>
                <v-icon>mdi-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-title>建立產品</v-list-item-title>
            </v-list-item>
            <v-list-item nuxt to="/S01/apply">
              <v-list-item-icon>
                <v-icon>mdi-file-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-title>申請空白票券</v-list-item-title>
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

      <v-btn class="d-none d-sm-flex" color="brownS1" width="140" rounded dark>
        發送票券
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
                          <v-list-item-title>{{ item.text }}</v-list-item-title>
                        </v-list-item-content>
                      </template>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-menu>

              <v-spacer />

              <v-btn
                class="right-10 d-none d-sm-flex"
                color="brownS1"
                width="160"
                dark
                nuxt
                to="/S01/product/create"
              >
                建立產品
              </v-btn>
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
                <template #item.actions="{}">
                  <v-tooltip bottom>
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
                        <v-icon color="primary">
                          mdi-pencil
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>修改</span>
                  </v-tooltip>
                  <v-tooltip bottom>
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
                        <v-icon color="error">
                          mdi-delete
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>刪除</span>
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
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </div>
    <to-top />
  </div>
</template>

<script>
import PageStatisticCard from '~/components/PageStatisticCard.vue'
import ToTop from '~/components/ToTop.vue'

export default {
  name: 'IndexPage',
  title: '門市票券(整批發行)',
  components: { PageStatisticCard, ToTop },
  layout: 'adminLayout',
  data() {
    return {
      loadingStatus: true,
      CurrentPageSectionIndex: 0,
      title: '門市票券(整批發行)',

      display_settings: [0, 1, 2, 3, 4, 5, 6],

      pageStatisticCardItems: [
        {
          title: '門市架上產品 (個)',
          value: 0,
          type: 1
        },
        {
          title: '本月銷售票券 (張)',
          value: 0,
          type: 1
        },
        {
          title: '本月銷售金額 (元)',
          value: 33333,
          type: 2
        },
        {
          title: '庫存空白票券 (張)',
          value: 0,
          type: 1
        }
      ],

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
      sec1_data_list: []
    }
  },
  computed: {
    sec1_showHeaders() {
      const arr = []
      for (let i = 0; i < this.sec1_table_header.length; i++) {
        if (this.display_settings.includes(i)) {
          arr.push(this.sec1_table_header[i])
        }
      }
      return arr
    }
  },
  methods: {}
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
</style>
