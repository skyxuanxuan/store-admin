<template>
  <div>
    <v-app-bar color="white" app>
      <v-app-bar-nav-icon color="brownS1" @click="$parent.$emit('eventname')" />

      <v-toolbar-title class="custom-brown1-2--text">
        {{ title }}
      </v-toolbar-title>

      <v-spacer />
    </v-app-bar>
    <v-container v-if="mobile">
      <v-row justify="center" align="center" class="mt-8">
        <client-only>
          <v-card
            v-if="qrcodeValue.series.length === 0"
            width="200"
            height="200"
            color="white"
          />
          <qrcode
            v-else
            :value="qrcodeValue.series"
            :options="{ margin: 2, width: 200 }"
          />
        </client-only>
      </v-row>
      <v-row justify="center" align="center" class="ma-8">
        <div class="text-h4">
          店家碼
        </div>
      </v-row>
    </v-container>
    <div class="ma-4">
      <v-card
        max-width="1150"
        flat
        color="transparent"
        style="margin: 0 auto; margin-bottom: 64px"
      >
        <v-card :class="{ 'mt-2': !mobile }" flat color="transparent">
          <v-container :class="{ 'pa-0': mobile }">
            <v-row class="">
              <v-col>
                <v-card
                  class="cus_ui_card py-4"
                  :class="{ 'mt-4': !mobile }"
                  :flat="mobile"
                  :rounded="!mobile ? 'xl' : ''"
                >
                  <v-card-title class="custom-brown1-3--text pt-0">
                    <span
                      class="master_title"
                      :class="{ ori: !mobile }"
                    >個人資料</span>
                  </v-card-title>
                  <v-card
                    v-if="mobile"
                    flat
                    class="cus_mobile_card"
                    :class="{ mobile: mobile }"
                  >
                    <div class="cus_mobile_card_row">
                      <div class="cus_mobile_card_header">
                        稱謂
                      </div>
                      <div class="cus_mobile_card_cell">
                        {{ userInfo.userName }}
                      </div>
                    </div>
                    <div class="cus_mobile_card_row">
                      <div class="cus_mobile_card_header">
                        信箱
                      </div>
                      <div class="cus_mobile_card_cell">
                        <v-icon>mdi-cog-outline</v-icon>
                        {{ userInfo.userEmail }}
                      </div>
                    </div>
                    <div class="cus_mobile_card_row">
                      <div class="cus_mobile_card_header">
                        權限
                      </div>
                      <div class="cus_mobile_card_cell">
                        {{ userInfo.userGroup }}
                      </div>
                    </div>
                    <div class="cus_mobile_card_row">
                      <div class="cus_mobile_card_header">
                        店家名稱
                      </div>
                      <div class="cus_mobile_card_cell">
                        {{ userInfo.storeName }}
                      </div>
                    </div>
                  </v-card>

                  <v-card v-else flat>
                    <v-row>
                      <v-col cols="8">
                        <v-row class="mt-4 px-4">
                          <v-col cols="12" sm="3" md="2" class="col_min_width">
                            <div class="row_title">
                              <span>
                                <v-icon color="brownS1">
                                  mdi-circle-small
                                </v-icon>
                              </span>
                              <span
                                class="font-weight-bold font_size1-1 custom-brown1-2--text"
                              >
                                稱謂
                              </span>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <div class="row_content font-weight-light">
                              {{ userInfo.userName }}
                            </div>
                          </v-col>
                        </v-row>
                        <v-row class="px-4">
                          <v-col cols="12" sm="3" md="2" class="col_min_width">
                            <div class="row_title">
                              <span>
                                <v-icon color="brownS1">
                                  mdi-circle-small
                                </v-icon>
                              </span>
                              <span
                                class="font-weight-bold font_size1-1 custom-brown1-2--text"
                              >
                                信箱
                              </span>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <div class="row_content font-weight-light">
                              {{ userInfo.userEmail }}
                              <v-icon>mdi-cog-outline</v-icon>
                            </div>
                          </v-col>
                        </v-row>
                        <v-row class="px-4">
                          <v-col cols="12" sm="3" md="2" class="col_min_width">
                            <div class="row_title">
                              <span>
                                <v-icon color="brownS1">
                                  mdi-circle-small
                                </v-icon>
                              </span>
                              <span
                                class="font-weight-bold font_size1-1 custom-brown1-2--text"
                              >
                                權限
                              </span>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <div class="row_content font-weight-light">
                              {{ userInfo.userGroup }}
                            </div>
                          </v-col>
                        </v-row>
                        <v-row class="px-4">
                          <v-col cols="12" sm="3" md="2" class="col_min_width">
                            <div class="row_title">
                              <span>
                                <v-icon color="brownS1">
                                  mdi-circle-small
                                </v-icon>
                              </span>
                              <span
                                class="font-weight-bold font_size1-1 custom-brown1-2--text"
                              >
                                店家名稱
                              </span>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <div class="row_content font-weight-light">
                              {{ userInfo.storeName }}
                            </div>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="4" class="text-center">
                        <client-only>
                          <v-card
                            v-if="qrcodeValue.series.length === 0"
                            width="200"
                            height="200"
                            color="white"
                          />
                          <qrcode
                            v-else
                            :value="qrcodeValue.series"
                            :options="{ margin: 2, width: 200 }"
                          />
                        </client-only>
                        <div class="text-h4">
                          店家碼
                        </div>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Vue from 'vue'
import VueQrcode from '@chenfengyuan/vue-qrcode'

Vue.component(VueQrcode.name, VueQrcode)

export default {
  name: 'IndexPage',
  title: '首頁',
  layout: 'adminLayout',
  asyncData({ store, redirect }) {},
  data() {
    return {}
  },
  computed: {
    title() {
      return `首頁 - ${this.$store.getters['userInfo/getUserInfo'].storeName}`
    },
    mobile() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return true
      }

      return false
    },
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
      qrcodeValue: 'userInfo/getUserInfo'
    })
  }
}
</script>
<style lang="scss" scoped>
.info_box {
  padding: 0px 64px;
  padding-bottom: 16px;
  .info_box_row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    word-break: break-all;
    .info_box_row_header {
      font-size: 1rem;
      font-weight: bold !important;
      padding-right: 16px;
      min-width: 120px;
    }
    .info_box_row_cell {
      text-align: right;
      font-weight: 300;
      width: 100%;
    }
  }
}

.info_box_row + .info_box_row {
  margin-top: 15px;
}

.col_min_width {
  min-width: 190px;
}

.row_title {
  font-size: 1rem;
  padding-left: 2rem;
}

.row_content {
  font-size: 1rem;
  padding: 0 16px 0 16px;
}
</style>
