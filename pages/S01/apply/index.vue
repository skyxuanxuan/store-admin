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
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-file-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-title>申請</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>

      <v-btn class="d-none d-sm-flex" color="#666666" width="140" dark>
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

                <template #item.actions="{}">
                  <v-tooltip bottom>
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
                        <v-icon> mdi-pencil </v-icon>
                      </v-btn>
                    </template>
                    <span>修改</span>
                  </v-tooltip>
                </template>

                <template #expanded-item="{ headers, item }">
                  <td
                    :colspan="headers.length"
                    :class="{
                      'ma-0 pa-0': true,
                      'expanded-closing': !transitioned[getItemId(item)]
                    }"
                    style="height: auto"
                  >
                    <v-expand-transition>
                      <div v-show="transitioned[getItemId(item)]">
                        <!-- container for content. replace with whatever you want -->
                        <div class="d-flex flex-column mb-6">
                          <v-card
                            class="pa-2"
                            outlined
                            tile
                          >
                            Flex item 123
                          </v-card>
                          <v-card
                            class="pa-2"
                            outlined
                            tile
                          >
                            Flex item 123
                          </v-card>
                          <v-card
                            class="pa-2"
                            outlined
                            tile
                          >
                            Flex item 123
                          </v-card>
                        </div>
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
    <to-top />
  </div>
</template>

<script>
import PageStatisticCard from '~/components/PageStatisticCard.vue'
import ToTop from '~/components/ToTop.vue'

export default {
  name: 'IndexPage',
  title: '門市票券(整批發行) - 申請歷史紀錄',
  components: { PageStatisticCard, ToTop },
  layout: 'adminLayout',
  data() {
    return {
      loadingStatus: true,
      CurrentPageSectionIndex: 0,
      title: '門市票券(整批發行) - 申請歷史紀錄',

      display_settings: [0, 1, 2, 3, 4, 5, 6],
      transitioned: [],
      closeTimeouts: {},

      pageStatisticCardItems: [
        {
          title: '尚未繳款',
          value: 0,
          type: 1
        },
        {
          title: '待審核',
          value: 0,
          type: 1
        },
        {
          title: '通過',
          value: 33333,
          type: 1,
          color: 'success--text'
        },
        {
          title: '退件',
          value: 0,
          type: 1,
          color: 'error--text'
        }
      ],

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
      sec1_data_expanded: []
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
  created() {
    this.sec1_data_list.push({
      d0: 1,
      d1: 'RB2022072200001',
      d2: 200,
      d3: 40000,
      d4: '2022-07-22 11:11:22',
      d5: '',
      d6: '尚未繳款'
    })
  },
  methods: {
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
</style>
