<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <v-app-bar app>
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-app-bar-nav-icon v-bind="attrs" @click="$router.back()" v-on="on">
            <v-icon color="brownS1">
              mdi-arrow-left
            </v-icon>
          </v-app-bar-nav-icon>
        </template>
        <span>上一頁</span>
      </v-tooltip>

      <v-toolbar-title class="custom-brown1-2--text">
        {{ title }}
      </v-toolbar-title>

      <v-spacer />

      <v-menu v-if="product.productEdit === 1" bottom left>
        <template #activator="{ on, attrs }">
          <v-btn class="d-flex d-sm-none" icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item-group>
            <v-list-item
              v-if="CurrentPageSectionIndex === 0 && sec1ProductEdit"
              color="other1"
              @click="sec1ModifyCancel"
            >
              <v-list-item-icon>
                <v-icon color="other1">
                  mdi-close
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title class="custom-other-1--text">
                取消
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              v-if="CurrentPageSectionIndex === 0 && sec1ProductEdit"
              color="other2"
              @click="sec1Modify"
            >
              <v-list-item-icon>
                <v-icon color="other2">
                  mdi-pencil
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title class="custom-other-2--text">
                儲存
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              v-if="CurrentPageSectionIndex === 0 && !sec1ProductEdit"
              color="other2"
              @click="sec1Modify"
            >
              <v-list-item-icon>
                <v-icon color="other2">
                  mdi-pencil
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title class="custom-other-2--text">
                編輯
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              v-if="CurrentPageSectionIndex === 1"
              @click="CurrentPageSectionIndex = 2"
            >
              <v-list-item-icon>
                <v-icon>mdi-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-title>新增方案</v-list-item-title>
            </v-list-item>

            <v-list-item v-if="CurrentPageSectionIndex === 2">
              <v-list-item-icon>
                <v-icon>mdi-close</v-icon>
              </v-list-item-icon>
              <v-list-item-title>取消</v-list-item-title>
            </v-list-item>
            <v-list-item
              v-if="CurrentPageSectionIndex === 2"
              @click="sec3ModifySubmit"
            >
              <v-list-item-icon>
                <v-icon>mdi-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-title>新增</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>

      <v-btn
        v-if="
          CurrentPageSectionIndex === 0 &&
            sec1ProductEdit &&
            product.productEdit === 1
        "
        class="d-none d-sm-flex right-10"
        color="brownS1"
        width="140"
        outlined
        rounded
        @click="sec1ModifyCancel"
      >
        取消
      </v-btn>
      <v-btn
        v-if="
          CurrentPageSectionIndex === 0 &&
            sec1ProductEdit &&
            product.productEdit === 1
        "
        class="d-none d-sm-flex"
        color="brownS1"
        width="140"
        rounded
        :dark="sec1_valid"
        :disabled="!sec1_valid"
        @click="sec1Modify"
      >
        儲存
      </v-btn>
      <v-btn
        v-if="
          CurrentPageSectionIndex === 0 &&
            !sec1ProductEdit &&
            product.productEdit === 1
        "
        class="d-none d-sm-flex"
        color="brownS1"
        width="140"
        dark
        rounded
        @click="sec1Modify"
      >
        編輯
      </v-btn>

      <v-btn
        v-if="CurrentPageSectionIndex === 1 && product.productEdit === 1"
        class="d-none d-sm-flex"
        color="brownS1"
        width="140"
        dark
        rounded
        @click="sec3ModifyInit"
      >
        新增方案
      </v-btn>

      <v-btn
        v-if="CurrentPageSectionIndex === 2 && product.productEdit === 1"
        class="d-none d-sm-flex right-10"
        color="brownS1"
        width="140"
        outlined
        rounded
        @click="sec3ModifyCancel"
      >
        取消
      </v-btn>
      <v-btn
        v-if="CurrentPageSectionIndex === 2 && product.productEdit === 1"
        class="d-none d-sm-flex"
        color="brownS1"
        width="140"
        :dark="newPlanForm.valid"
        rounded
        :disabled="!newPlanForm.valid"
        @click="sec3ModifySubmit"
      >
        新增
      </v-btn>

      <template #extension>
        <v-tabs
          v-model="CurrentPageSectionIndex"
          color="brownS1"
          align-with-title
          :class="{
            'd-none': CurrentPageSectionIndex === 2 || sec1ProductEdit
          }"
        >
          <v-tabs-slider color="greenS1" />
          <v-tab class="custom-green-1--text">
            產品資訊
          </v-tab>

          <v-tab class="custom-green-1--text">
            方案列表
          </v-tab>
          <v-tab class="d-none">
            新增方案
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-tabs-items v-model="CurrentPageSectionIndex" touchless>
      <v-tab-item class="background-color">
        <v-card flat color="transparent">
          <v-card-text>
            <VueSlickCarousel
              class="pa-2"
              :arrows="false"
              :center-mode="true"
              :focus-on-select="true"
              :infinite="true"
              :slides-to-show="1"
              :center-padding="slidesPaddingCarousel"
              :autoplay="false"
              :autoplay-speed="3000"
              :slides-to-scroll="1"
              :swipe-to-slide="true"
            >
              <template #prevArrow>
                <v-btn
                  class="mx-2 custom-prev-carousel"
                  fab
                  dark
                  small
                  color="white"
                >
                  <v-icon color="black">
                    mdi-chevron-left
                  </v-icon>
                </v-btn>
              </template>
              <template #nextArrow>
                <v-btn
                  class="mx-2 custom-next-carousel"
                  fab
                  dark
                  small
                  color="white"
                >
                  <v-icon color="black">
                    mdi-chevron-right
                  </v-icon>
                </v-btn>
              </template>
              <v-card
                v-for="(pic, i) in productFiles"
                :key="`carousel-${i}`"
                class="my-caroousel"
              >
                <v-img :src="imgUrl + pic.filePath" eager aspect-ratio="2">
                  <template #placeholder>
                    <v-skeleton-loader type="image" />
                  </template>
                </v-img>
              </v-card>
            </VueSlickCarousel>
          </v-card-text>
        </v-card>
        <v-divider />
        <div
          v-touch="{
            right: e => touchEvt(e, 2),
            left: e => touchEvt(e, 1)
          }"
        >
          <v-card
            flat
            class="py-8 mx-auto"
            :class="{ 'mt-8': !mobile }"
            max-width="1150"
            :rounded="mobile ? false : 'xl'"
          >
            <div class="cus_ui_card">
              <v-card-title
                class="master_title custom-brown1-3--text pt-0"
                :class="{ 'px-8': !mobile }"
              >
                <span class="">產品基本資料</span>
              </v-card-title>
              <div class="cus_mobile_card" :class="{ mobile: mobile }">
                <div class="cus_mobile_card_row">
                  <div class="cus_mobile_card_header">
                    產品名稱
                  </div>
                  <div class="cus_mobile_card_cell">
                    {{ product.productName }}
                  </div>
                </div>
                <div class="cus_mobile_card_row">
                  <div class="cus_mobile_card_header">
                    產品簡介
                  </div>
                  <div class="cus_mobile_card_cell">
                    <ul style="list-style-type: none">
                      <li
                        v-for="(item, index) in productSimpleIntro"
                        :key="`simpleIntro${index}`"
                      >
                        <v-icon>mdi-circle-small</v-icon>{{ item }}
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="cus_mobile_card_row">
                  <div class="cus_mobile_card_header">
                    官方優惠活動
                    <v-tooltip bottom>
                      <template #activator="{ on, attrs }">
                        <v-icon small v-bind="attrs" class="pl-2" v-on="on">
                          mdi-information-outline
                        </v-icon>
                      </template>
                      <span> 說明 </span>
                    </v-tooltip>
                  </div>
                  <div class="cus_mobile_card_cell">
                    {{ productCoupon ? '參與' : '不參與' }}
                  </div>
                </div>
                <div class="cus_mobile_card_row">
                  <div class="cus_mobile_card_header">
                    產品類型
                  </div>
                  <div class="cus_mobile_card_cell">
                    {{ productUseType === '1' ? '商品類型' : '現金類型' }}
                  </div>
                </div>
                <div class="cus_mobile_card_row">
                  <div class="cus_mobile_card_header">
                    產品分類
                  </div>
                  <div class="cus_mobile_card_cell">
                    <v-chip
                      v-for="item in productClass"
                      :key="item.id"
                      :color="colors(item.color)"
                      dark
                      class="mx-1 my-2"
                    >
                      {{ item.name }}
                    </v-chip>
                  </div>
                </div>
              </div>
            </div>
          </v-card>
          <v-card
            flat
            class="py-8 mt-6 mx-auto"
            max-width="1150"
            :rounded="mobile ? false : 'xl'"
          >
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-btn
                  v-show="sec1ProductEdit && product.productEdit === 1"
                  color="pink"
                  dark
                  fab
                  small
                  absolute
                  right
                  top
                  v-bind="attrs"
                  v-on="on"
                  @click="sec1IntroAdd"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <span>新增說明</span>
            </v-tooltip>

            <v-form ref="sec1Form1" v-model="sec1_valid">
              <div class="cus_ui_card">
                <v-card-title
                  class="master_title custom-brown1-3--text pt-0"
                  :class="{ 'px-8': !mobile }"
                >
                  <span class="">產品說明</span>
                </v-card-title>

                <transition-group
                  name="fadeLeft"
                  tag="div"
                  class="cus_mobile_card"
                  :class="{ mobile: mobile }"
                >
                  <div
                    v-for="(item, index) in productIntroFilter"
                    :key="item.id"
                    class="cus_mobile_card_row flex_col pa-4 pb-4"
                    :class="{
                      border_error: item.valid,
                      border_bottom: introList.length - 1 !== index
                    }"
                  >
                    <div class="cus_mobile_card_header">
                      <div
                        v-if="!sec1ProductEdit || item.edit === 0"
                        :class="{ need: sec1_edit }"
                      >
                        {{ item.title }}
                      </div>
                      <div v-else>
                        <v-text-field
                          v-model="item.title"
                          dense
                          outlined
                          color="#16261f"
                          counter="20"
                          placeholder="請輸入標題"
                          :rules="[rules.required, rules.length(20)]"
                          label="請填寫標題"
                          single-line
                        />
                        <v-scroll-y-transition>
                          <div
                            v-show="item.valid"
                            class="v-text-field__details"
                            style="margin: 0"
                          >
                            <div
                              class="v-messages theme--light error--text"
                              role="alert"
                            >
                              <div class="v-messages__wrapper">
                                <div class="v-messages__message">
                                  此欄位為必填
                                </div>
                              </div>
                            </div>
                          </div>
                        </v-scroll-y-transition>
                      </div>
                    </div>
                    <div
                      class="cus_mobile_card_cell"
                      style="position: relative"
                    >
                      <v-tooltip bottom>
                        <template #activator="{ on, attrs }">
                          <v-btn
                            v-show="
                              sec1ProductEdit &&
                                product.productEdit === 1 &&
                                item.edit === 1
                            "
                            class="mx-2"
                            fab
                            x-small
                            color="#CCCCCC"
                            depressed
                            outlined
                            v-bind="attrs"
                            style="
                              position: absolute;
                              top: -0.5rem;
                              right: -0.8rem;
                              background-color: white;
                            "
                            v-on="on"
                            @click="sec1IntroRemove(index)"
                          >
                            <v-icon dark>
                              mdi-window-close
                            </v-icon>
                          </v-btn>
                        </template>
                        <span>刪除</span>
                      </v-tooltip>
                      <client-only>
                        <VueEditor
                          v-if="sec1ProductEdit && product.productEdit === 1"
                          v-model="item.content"
                          placeholder="請輸入內文"
                        />
                        <div
                          v-else
                          style="text-align: left"
                          v-html="item.content"
                        />
                      </client-only>
                    </div>
                  </div>
                </transition-group>
              </div>
            </v-form>
          </v-card>
        </div>
      </v-tab-item>
      <v-tab-item class="background-color" :class="{ 'pa-4': !mobile, 'pa-2': mobile }">
        <v-card
          v-touch="{
            right: e => touchEvt(e, 2),
            left: e => touchEvt(e, 1)
          }"
          flat
          color="transparent"
        >
          <v-container class="white mt-8">
            <v-toolbar dense flat>
              <v-text-field
                v-model="sec2Search"
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
                      v-for="item in sec2TableHeader"
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
            </v-toolbar>
            <v-data-table
              mobile-breakpoint="770"
              :headers="sec2_showHeaders"
              :items="sec2DataList"
              :items-per-page="10"
              :search="sec2Search"
              item-key="d0"
              calculate-widths
              :page.sync="sec2TablePage"
              :footer-props="{
                'disable-pagination': true,
                'next-icon': '',
                'prev-icon': ''
              }"
              @page-count="sec2TablePageCount = $event"
            >
              <template #item.d3="{ item }">
                <span>{{ item.d3 | toDollars }}</span>
              </template>
              <template #item.d4="{ item }">
                <span v-if="item.d4 !== -1">{{
                  item.d4 | numberWithCommas
                }}</span>
                <span v-else><v-icon>mdi-infinity</v-icon></span>
              </template>
              <template #item.d5="{ item }">
                <span>{{ item.d5 | numberWithCommas }}</span>
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
                      v-bind="attrs"
                      v-on="on"
                      @click="sec2PlanDetail(item.d0)"
                    >
                      <v-icon color="brownS1">
                        mdi-open-in-new
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>詳細資料</span>
                </v-tooltip>

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
                        v-show="item.display === 0"
                        @click="sec2PlanDisplay(item.d0, 1)"
                      >
                        <v-list-item-icon>
                          <v-icon color="brownS2P">
                            mdi-eye
                          </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title class="custom-brown2-4--text">
                            顯示
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider v-show="item.display === 0" />
                      <v-list-item
                        v-show="item.display === 1"
                        @click="sec2PlanDisplay(item.d0, 0)"
                      >
                        <v-list-item-icon>
                          <v-icon color="brownS2M">
                            mdi-eye-off
                          </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title class="custom-brown2-2--text">
                            隱藏
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider v-show="item.display === 1" />
                      <v-divider v-show="item.display === 0" />
                      <v-list-item
                        v-show="item.useType === 0"
                        color="success"
                        @click="planUseType(item.d0, 1)"
                      >
                        <v-list-item-icon>
                          <v-icon color="success">
                            mdi-restart
                          </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title class="success--text">
                            啟用
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider v-show="item.useType === 0" />
                      <v-list-item
                        v-show="item.useType === 1"
                        color="other1"
                        @click="planUseType(item.d0, 0)"
                      >
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
                    </v-list-item-group>
                  </v-list>
                </v-menu>
              </template>
            </v-data-table>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab-item class="background-color">
        <div>
          <v-form ref="vnewplanform" v-model="newPlanForm.valid">
            <v-card
              flat
              class="py-8 mx-auto"
              :class="{ 'mt-8': !mobile }"
              max-width="1150"
              :rounded="mobile ? false : 'xl'"
            >
              <div class="cus_ui_card">
                <v-card-title
                  class="master_title custom-brown1-3--text pt-0"
                  :class="{ 'px-8': !mobile }"
                >
                  <span class="">新增方案</span>
                </v-card-title>
                <div class="cus_mobile_card" :class="{ mobile: mobile }">
                  <div class="cus_mobile_card_row">
                    <div class="cus_mobile_card_header">
                      方案名稱
                    </div>
                    <div class="cus_mobile_card_cell">
                      <v-text-field
                        v-model="newPlanForm.item.p1"
                        dense
                        outlined
                        color="#16261f"
                        counter="100"
                        :rules="[rules.required, rules.length(200)]"
                        label="請填寫方案名稱"
                        single-line
                      />
                    </div>
                  </div>
                  <div class="cus_mobile_card_row">
                    <div class="cus_mobile_card_header">
                      產品簡介
                    </div>
                    <div class="cus_mobile_card_cell">
                      <v-textarea
                        v-model="newPlanForm.item.p2"
                        outlined
                        color="#16261f"
                        counter="100"
                        :rules="[rules.required, rules.length(250)]"
                        label="請填寫方案簡介"
                        auto-grow
                        single-line
                        rows="3"
                      >
                        <template #prepend-inner>
                          <v-tooltip bottom>
                            <template #activator="{ on, attrs }">
                              <v-icon small v-bind="attrs" v-on="on">
                                mdi-information-outline
                              </v-icon>
                            </template>
                            <span> 每項資訊以換行做為區隔 </span>
                          </v-tooltip>
                        </template>
                      </v-textarea>
                    </div>
                  </div>
                  <div class="cus_mobile_card_row">
                    <div class="cus_mobile_card_header">
                      使用期限
                      <v-tooltip bottom>
                        <template #activator="{ on, attrs }">
                          <v-icon small v-bind="attrs" class="pl-2" v-on="on">
                            mdi-information-outline
                          </v-icon>
                        </template>
                        <span>
                          如未填寫，系統將自動設定為無期限<br>請注意，本公司提供逐筆類型產品履保時間為購買後三個月
                        </span>
                      </v-tooltip>
                    </div>
                    <div class="cus_mobile_card_cell">
                      <v-radio-group
                        v-model="newPlanForm.item.p3"
                        class="mt-0 justify-end"
                        :rules="[rules.required]"
                        row
                      >
                        <v-radio
                          color="greenS1"
                          label="依購買日起計"
                          value="1"
                          class="label_size09"
                        />
                        <v-radio
                          color="greenS1"
                          label="固定到期日"
                          value="2"
                          class="label_size09"
                        />
                      </v-radio-group>
                      <v-expand-transition>
                        <v-card v-if="newPlanForm.item.p3 === '1'" flat>
                          <v-text-field
                            v-model="newPlanForm.item.p3_d"
                            color="#16261f"
                            label="請填寫天數"
                            single-line
                            type="number"
                            hide-spin-buttons
                          />
                        </v-card>
                      </v-expand-transition>
                      <v-expand-transition>
                        <v-card
                          v-if="newPlanForm.item.p3 === '2'"
                          flat
                          :class="{ 'd-flex': !mobile }"
                        >
                          <date-picker
                            v-model="newPlanForm.item.p3_t[0]"
                            type="date"
                            placeholder="請選擇開始時間"
                            :editable="false"
                            :confirm="true"
                            :style="{ width: mobile ? '100%' : 'auto' }"
                            @change="changeDate(1)"
                          />
                          <v-card
                            flat
                            tile
                            :class="{ 'px-2': !mobile, 'py-2': mobile }"
                          >
                            <v-icon v-show="!mobile">
                              mdi-tilde
                            </v-icon>
                          </v-card>
                          <date-picker
                            v-model="newPlanForm.item.p3_t[1]"
                            type="date"
                            placeholder="請選擇結束時間"
                            :editable="false"
                            :confirm="true"
                            :style="{ width: mobile ? '100%' : 'auto' }"
                            @change="changeDate(1)"
                          />
                        </v-card>
                      </v-expand-transition>
                    </div>
                  </div>
                  <div class="cus_mobile_card_row">
                    <div class="cus_mobile_card_header">
                      販售期限
                    </div>
                    <div class="cus_mobile_card_cell">
                      <v-card flat :class="{ 'd-flex': !mobile }">
                        <date-picker
                          v-model="newPlanForm.item.p4[0]"
                          type="datetime"
                          placeholder="請選擇開始時間"
                          :editable="false"
                          :confirm="true"
                          :style="{ width: mobile ? '100%' : 'auto' }"
                          @change="changeDate(2)"
                        />
                        <v-card
                          flat
                          tile
                          :class="{ 'px-2': !mobile, 'py-2': mobile }"
                        >
                          <v-icon v-show="!mobile">
                            mdi-tilde
                          </v-icon>
                        </v-card>
                        <date-picker
                          v-model="newPlanForm.item.p4[1]"
                          type="datetime"
                          placeholder="請選擇結束時間"
                          :editable="false"
                          :confirm="true"
                          :style="{ width: mobile ? '100%' : 'auto' }"
                          @change="changeDate(2)"
                        />
                      </v-card>
                    </div>
                  </div>
                  <div class="cus_mobile_card_row">
                    <div class="cus_mobile_card_header">
                      原價
                    </div>
                    <div class="cus_mobile_card_cell">
                      <v-text-field
                        v-model="newPlanForm.item.p5"
                        type="number"
                        prefix="NT$"
                        hide-spin-buttons
                        :rules="[rules.required, rules.positive, rules.integer]"
                        class="pt-0"
                      />
                    </div>
                  </div>
                  <div class="cus_mobile_card_row">
                    <div class="cus_mobile_card_header">
                      售價
                    </div>
                    <div class="cus_mobile_card_cell">
                      <v-text-field
                        v-model="newPlanForm.item.p6"
                        type="number"
                        hide-spin-buttons
                        prefix="NT$"
                        :rules="[rules.required, rules.positive, rules.integer]"
                        class="pt-0"
                      />
                    </div>
                  </div>
                  <div class="cus_mobile_card_row">
                    <div class="cus_mobile_card_header">
                      販售數量
                    </div>
                    <div class="cus_mobile_card_cell">
                      <v-switch
                        v-model="newPlanForm.item.p7_sw"
                        :label="newPlanForm.item.p7_sw ? '開啟' : '無上限'"
                        class="mt-0"
                      />
                      <v-expand-transition>
                        <v-text-field
                          v-if="newPlanForm.item.p7_sw"
                          v-model="newPlanForm.item.p7"
                          type="number"
                          class="text-with-plus-minus"
                          dense
                          outlined
                          hide-spin-buttons
                          color="brownS1"
                          label="數量"
                          :rules="[rules.required]"
                          single-line
                        >
                          <template #append-outer>
                            <v-btn
                              color="#aa998f"
                              dark
                              fab
                              x-small
                              @click="sec3NumModify(1, 3)"
                            >
                              <v-icon> mdi-plus-thick </v-icon>
                            </v-btn>
                          </template>

                          <template #prepend>
                            <v-btn
                              color="#aa998f"
                              dark
                              fab
                              x-small
                              @click="sec3NumModify(2, 3)"
                            >
                              <v-icon> mdi-minus-thick </v-icon>
                            </v-btn>
                          </template>
                        </v-text-field>
                      </v-expand-transition>
                    </div>
                  </div>
                  <div class="cus_mobile_card_row">
                    <div class="cus_mobile_card_header">
                      單次購買上限
                    </div>
                    <div class="cus_mobile_card_cell">
                      <v-switch
                        v-model="newPlanForm.item.p8_sw"
                        :label="newPlanForm.item.p8_sw ? '開啟' : '無上限'"
                        class="mt-0"
                      />
                      <v-expand-transition>
                        <v-text-field
                          v-if="newPlanForm.item.p8_sw"
                          v-model="newPlanForm.item.p8"
                          type="number"
                          class="text-with-plus-minus"
                          dense
                          outlined
                          hide-spin-buttons
                          color="brownS1"
                          label="單次購買上限"
                          :rules="[rules.required]"
                          single-line
                        >
                          <template #append-outer>
                            <v-btn
                              color="#aa998f"
                              dark
                              fab
                              x-small
                              @click="sec3NumModify(1, 4)"
                            >
                              <v-icon> mdi-plus-thick </v-icon>
                            </v-btn>
                          </template>

                          <template #prepend>
                            <v-btn
                              color="#aa998f"
                              dark
                              fab
                              x-small
                              @click="sec3NumModify(2, 4)"
                            >
                              <v-icon> mdi-minus-thick </v-icon>
                            </v-btn>
                          </template>
                        </v-text-field>
                      </v-expand-transition>
                    </div>
                  </div>
                </div>
              </div>
            </v-card>
          </v-form>
        </div>
      </v-tab-item>
    </v-tabs-items>
    <v-dialog v-model="planDetailDialog" max-width="580">
      <v-card>
        <v-card-title class="text-h5 font-weight-bold">
          詳細資料 - {{ planDetailDialogDetail.d1 }}
        </v-card-title>
        <v-card class="ma-4" flat>
          <v-container>
            <v-row dense class="border_bottom">
              <v-col cols="12" md="4">
                <span>
                  <v-icon style="top: -3px" color="brownS1">
                    mdi-circle-small
                  </v-icon>
                </span>
                <span
                  class="text-subtitle-1 font-weight-bold font_size1-1 custom-brown1-2--text"
                >產品名稱</span>
              </v-col>
              <v-col cols="12" md="8" class="text-subtitle-1">
                <div class="px-2">
                  {{ planDetailDialogDetail.d1 }}
                </div>
              </v-col>
            </v-row>
            <v-row dense class="border_bottom">
              <v-col cols="12" md="4">
                <span>
                  <v-icon style="top: -3px" color="brownS1">
                    mdi-circle-small
                  </v-icon>
                </span>
                <span
                  class="text-subtitle-1 font-weight-bold font_size1-1 custom-brown1-2--text"
                >產品簡介</span>
              </v-col>
              <v-col cols="12" md="8" class="text-subtitle-1">
                <div class="px-2" v-html="planDetailDialogDetail.d2" />
              </v-col>
            </v-row>
            <v-row dense class="border_bottom">
              <v-col cols="12" md="4">
                <span>
                  <v-icon style="top: -3px" color="brownS1">
                    mdi-circle-small
                  </v-icon>
                </span>
                <span
                  class="text-subtitle-1 font-weight-bold font_size1-1 custom-brown1-2--text"
                >使用期限</span>
              </v-col>
              <v-col cols="12" md="8" class="text-subtitle-1">
                <div class="px-2">
                  {{ planDetailDialogDetail.d3 }}
                </div>
              </v-col>
            </v-row>
            <v-row dense class="border_bottom">
              <v-col cols="12" md="4">
                <span>
                  <v-icon style="top: -3px" color="brownS1">
                    mdi-circle-small
                  </v-icon>
                </span>
                <span
                  class="text-subtitle-1 font-weight-bold font_size1-1 custom-brown1-2--text"
                >販售時間</span>
              </v-col>
              <v-col cols="12" md="8" class="text-subtitle-1">
                <div class="px-2">
                  {{ planDetailDialogDetail.d4 }}
                </div>
              </v-col>
            </v-row>
            <v-row dense class="border_bottom">
              <v-col cols="12" md="4">
                <span>
                  <v-icon style="top: -3px" color="brownS1">
                    mdi-circle-small
                  </v-icon>
                </span>
                <span
                  class="text-subtitle-1 font-weight-bold font_size1-1 custom-brown1-2--text"
                >原價</span>
              </v-col>
              <v-col cols="12" md="8" class="text-subtitle-1">
                <div class="px-2">
                  {{ planDetailDialogDetail.d5 | toDollars }}
                </div>
              </v-col>
            </v-row>
            <v-row dense class="border_bottom">
              <v-col cols="12" md="4">
                <span>
                  <v-icon style="top: -3px" color="brownS1">
                    mdi-circle-small
                  </v-icon>
                </span>
                <span
                  class="text-subtitle-1 font-weight-bold font_size1-1 custom-brown1-2--text"
                >售價</span>
              </v-col>
              <v-col cols="12" md="8" class="text-subtitle-1">
                <div class="px-2">
                  {{ planDetailDialogDetail.d6 | toDollars }}
                </div>
              </v-col>
            </v-row>
            <v-row dense class="border_bottom">
              <v-col cols="12" md="4">
                <span>
                  <v-icon style="top: -3px" color="brownS1">
                    mdi-circle-small
                  </v-icon>
                </span>
                <span
                  class="text-subtitle-1 font-weight-bold font_size1-1 custom-brown1-2--text"
                >販售數量</span>
              </v-col>
              <v-col cols="12" md="8" class="text-subtitle-1">
                <div v-if="planDetailDialogDetail.d7 !== -1" class="px-2">
                  {{ planDetailDialogDetail.d7 | numberWithCommas }}
                </div>
                <div v-else class="px-2">
                  <v-icon>mdi-infinity</v-icon>
                </div>
              </v-col>
            </v-row>
            <v-row dense class="border_bottom">
              <v-col cols="12" md="4">
                <span>
                  <v-icon style="top: -3px" color="brownS1">
                    mdi-circle-small
                  </v-icon>
                </span>
                <span
                  class="text-subtitle-1 font-weight-bold font_size1-1 custom-brown1-2--text"
                >單次購買上限</span>
              </v-col>
              <v-col cols="12" md="8" class="text-subtitle-1">
                <div class="px-2">
                  {{ planDetailDialogDetail.d8 | numberWithCommas }}
                </div>
              </v-col>
            </v-row>
            <v-row dense class="border_bottom">
              <v-col cols="12" md="4">
                <span>
                  <v-icon style="top: -3px" color="brownS1">
                    mdi-circle-small
                  </v-icon>
                </span>
                <span
                  class="text-subtitle-1 font-weight-bold font_size1-1 custom-brown1-2--text"
                >狀態</span>
              </v-col>
              <v-col cols="12" md="8" class="text-subtitle-1">
                <div class="px-2">
                  {{ planDetailDialogDetail.d9 }}
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <v-card-actions>
          <v-spacer />
          <v-btn color="green darken-1" text @click="planDetailDialog = false">
            確定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <to-top />
    <my-waiting :loading="loadingStatus" />
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import DatePicker from 'vue2-datepicker'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue2-datepicker/index.css'
import util from '~/assets/js/util'

const integerRegex = /[^0-9]/
export default {
  name: 'S02ProductId',
  title: '商城票券(逐筆發行) - 編輯產品',
  components: { VueSlickCarousel, DatePicker },
  beforeRouteLeave(to, from, next) {
    if (
      (this.sec1ProductEdit || this.sec3_edit) &&
      this.product.productEdit === 1
    ) {
      this.$swal
        .fire({
          title: '確定要捨棄編輯嗎？',
          html: '',
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
            next()
          }
        })
    } else {
      next()
    }
  },
  layout: 'adminLayout',

  async asyncData({ params, store, redirect, $axios }) {
    const id = params.id
    if (id.length === 0) {
      redirect('/S02')
    }
    try {
      await store.dispatch('S02/fetchOrdersList')
      const data = await $axios.$get(`S02/product/${id}`)
      if (data.res === 'CODE0000') {
        if (data.data.product.productType === 2) {
          const imgUrl = `${process.env.imgUrl}/store/${store.state.userInfo.user.storeId}/products/${data.data.product.productId}/`
          return {
            product: data.data.product,
            imgUrl,
            introCount: data.data.product.productIntroDTOSet.length,
            introList: data.data.product.productIntroDTOSet
              .map((x) => {
                return {
                  id: x.id.toString(),
                  pkId: x.id,
                  valid: false,
                  title: x.introTitle,
                  content: x.introText,
                  order: x.introOrder,
                  edit: x.introEdit,
                  type: '0'
                }
              })
              .sort((a, b) => a.order - b.order)
          }
        } else {
          redirect('/S02')
        }
      } else {
        redirect('/S02')
      }
    } catch (err) {
      console.log(err)
      redirect('/')
    }
  },
  data() {
    return {
      loadingStatus: false,
      CurrentPageSectionIndex: 0,

      basicProductClasses: this.$store.getters['basic/getClasses'],
      sec1_edit: false,
      sec1_valid: false,
      sec3_edit: false,
      time2: null,
      rules: {
        length: len => v => (v || '').length <= len || `長度不得超過 ${len}`,
        required: v => !!v || '此欄位為必填',
        buyLimit: v =>
          (!!v && parseInt(v) >= 1 && parseInt(v) <= 20) ||
          '單次購買上限範圍 1 ~ 20',
        positive: v => (!!v && parseInt(v) >= 0) || '價格不能為負值',
        integer: v => (!!v && !integerRegex.test(v.toString())) || '價格為整數'
      },

      orders: this.$store.state.S02.orders,
      display_settings: [0, 1, 2, 3, 4, 5, 6, 7],
      sec2TableHeader: [
        {
          text: '序號',
          align: 'start',
          value: 'd1'
        },
        {
          text: '名稱',
          align: 'start',
          value: 'd2'
        },
        {
          text: '售價',
          align: 'start',
          value: 'd3',
          filterable: false
        },
        {
          text: '販售數量',
          align: 'start',
          value: 'd4',
          filterable: false
        },
        {
          text: '售出',
          align: 'start',
          value: 'd5',
          filterable: false
        },
        {
          text: '顯示/隱藏',
          align: 'start',
          value: 'd7',
          filterable: false
        },
        {
          text: '狀態',
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
      sec2DataList: [],
      sec2Search: '',
      sec2TablePage: 1,
      sec2TablePageCount: 0,

      /* 新增方案 */
      newPlanForm: {
        valid: false,
        item: {
          id: util._uuid(),
          p1: '',
          p2: '',
          p3: '1',
          p3_d: null,
          p3_t: [null, null],
          p4: [null, null],
          p5: null,
          p6: null,
          p7_sw: false,
          p7: null,
          p8_sw: false,
          p8: 20
        }
      },

      /* 詳細資料 */
      planDetailDialog: false,
      planDetailDialogDetail: {
        d1: '',
        d2: '',
        d3: '',
        d4: '',
        d5: '',
        d6: '',
        d7: '',
        d8: '',
        d9: ''
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
    title() {
      return `商城票券(逐筆發行) - ${this.product.productName}`
    },
    slidesPaddingCarousel() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '0px'
        case 'sm':
          return '0px'
        case 'md':
          return '200px'
        case 'lg':
          return '300px'
        case 'xl':
          return '500px'
      }

      return '0px'
    },
    sec1ProductEdit() {
      return this.sec1_edit
    },

    productFiles() {
      return this.product.productFileDTOSet
    },
    productSimpleIntro() {
      return this.product.productIntro.split('\n')
    },
    productCoupon() {
      return this.product.productCoupon === 1
    },
    productUseType() {
      return (this.product.productUseType ?? '').toString()
    },
    productClass() {
      const initArr = []
      this.product.productClass.split(';').forEach((item) => {
        const obj = this.basicProductClasses.find(x => x.id === item)
        if (obj) {
          initArr.push(obj)
        }
      })
      return initArr
    },
    productIntroFilter() {
      return this.introList.filter(x => x.type !== '-1')
    },
    sec2_showHeaders() {
      const arr = []
      for (let i = 0; i < this.sec2TableHeader.length; i++) {
        if (this.display_settings.includes(i)) {
          arr.push(this.sec2TableHeader[i])
        }
      }
      return arr
    }
  },
  created() {
    this.sec2_data_init()
  },
  methods: {
    touchEvt(e, direct) {
      if (direct === 1) {
        if (this.CurrentPageSectionIndex < 1) {
          this.CurrentPageSectionIndex++
        }
      } else if (direct === 2) {
        if (this.CurrentPageSectionIndex > 0) {
          this.CurrentPageSectionIndex--
        }
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
    colors(index) {
      if (index === 0) {
        return 'primary'
      } else if (index === 1) {
        return 'red'
      } else if (index === 2) {
        return 'deep-purple'
      } else if (index === 3) {
        return 'cyan'
      }
      return 'teal'
    },
    changeDate(col) {
      if (col === 1) {
        const sdate = this.newPlanForm.item.p3_t[0]
        const edate = this.newPlanForm.item.p3_t[1]
        if (sdate !== null && edate !== null) {
          if (sdate.getTime() > edate.getTime()) {
            this.newPlanForm.item.p3_t = [edate, sdate]
          }
        }
      } else if (col === 2) {
        const sdate = this.newPlanForm.item.p4[0]
        const edate = this.newPlanForm.item.p4[1]
        if (sdate !== null && edate !== null) {
          if (sdate.getTime() > edate.getTime()) {
            this.newPlanForm.item.p4 = [edate, sdate]
          }
        }
      }
    },
    sec1Modify() {
      if (this.sec1_edit) {
        this.sec1ModifySubmit()
      } else {
        this.loading(true)
        this.sec1_edit = true
        this.$refs.sec1Form1.validate()
        this.loading(false)
      }
    },
    sec1ModifyCancel() {
      this.$swal
        .fire({
          title: '確定要捨棄編輯嗎？',
          html: '',
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
            this.introCount = this.product.productIntroDTOSet.length
            this.introList = this.product.productIntroDTOSet
              .map((x) => {
                return {
                  id: x.id,
                  pkId: x.id,
                  valid: false,
                  title: x.introTitle,
                  content: x.introText,
                  order: x.introOrder,
                  edit: x.introEdit,
                  type: '0'
                }
              })
              .sort((a, b) => a.order - b.order)
            this.sec1_edit = false
            this.loading(false)
          }
        })
    },
    sec1IntroAdd() {
      if (this.introList.length >= 6) {
        this.$notify({
          title: '小提示',
          text: '產品說明新增上限為2個',
          type: 'warning',
          duration: 5000
        })
        return
      }

      this.introList.push({
        id: util._uuid(),
        pkId: -1,
        valid: false,
        title: '',
        content: '',
        order: this.introCount++,
        edit: 1,
        type: '1'
      })
    },
    sec1IntroRemove(index) {
      if (this.introList[index].edit === 1) {
        if (this.introList[index].type === '1') {
          this.introList.splice(index, 1)
        } else if (this.introList[index].type === '0') {
          this.introList[index].type = this.$set(
            this.introList[index],
            'type',
            '-1'
          )
        }
      }
    },
    sec1ModifySubmit() {
      let check = true
      let checkMsg = ''

      this.introList.forEach((item) => {
        this.$set(item, 'valid', false)
        if (item.title.length === 0) {
          this.$set(item, 'valid', true)
          checkMsg = '請填寫產品說明標題'
          check = false
        }
        if (item.content.length === 0) {
          this.$set(item, 'valid', true)
          checkMsg = `請填寫「${item.title}」`
          check = false
        }
      })

      if (!check) {
        this.$swal.fire('小提示', checkMsg)
        return
      }

      const title = '確定要修改產品資訊嗎'
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

            const initArr = []
            this.introList
              .sort((a, b) => a.order - b.order)
              .forEach((item, index) => {
                initArr.push({
                  id: item.id.toString(),
                  pkId: item.pkId,
                  title: item.title,
                  content: item.content,
                  order: index,
                  edit: item.edit.toString(),
                  type: item.type.toString()
                })
              })

            const form = {
              introList: initArr
            }
            const submitProductId = this.product.productId
            this.$axios
              .put(`/S02/product/${submitProductId}`, form)
              .then((response) => {
                const data = response.data
                if (data.res === 'CODE0000') {
                  this.$axios
                    .$get(`S02/product/${submitProductId}`)
                    .then((newData) => {
                      this.product = newData.data.product
                      this.introCount =
                        newData.data.product.productIntroDTOSet.length
                      this.introList = newData.data.product.productIntroDTOSet
                        .map((x) => {
                          return {
                            id: x.id.toString(),
                            pkId: x.id,
                            valid: false,
                            title: x.introTitle,
                            content: x.introText,
                            order: x.introOrder,
                            edit: x.introEdit,
                            type: '0'
                          }
                        })
                        .sort((a, b) => a.order - b.order)
                    })

                  this.sec1_edit = false
                  this.$swal.fire('小提示', '修改成功', 'success')
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

    sec2_data_init() {
      const initArr = []
      const orderDetailFlat = this.orders.map(x => x.orderDetailDTOSet).flat()
      const planList = this.product.productPlanDTOSet
      planList.forEach((item, index) => {
        let saleNum = 0
        orderDetailFlat
          .filter(
            detail =>
              detail.specId ===
              item.productSpecificationDTOSet[0].specificationId
          )
          .forEach((detail) => {
            saleNum += detail.totalNum
          })

        // 目前方案綁定一規格
        const planSalePrice = item.productSpecificationDTOSet[0].sellingPrice
        const planSaleNum = item.productSpecificationDTOSet[0].sellingNum

        let d6 = '未知'
        if (item.useType === 1) {
          d6 = '啟用'
        } else if (item.useType === 0) {
          d6 = '停用'
        }
        let d7 = '未知'
        if (item.display === 1) {
          d7 = '顯示'
        } else if (item.display === 0) {
          d7 = '隱藏'
        }
        initArr.push({
          d0: item.planId,
          d1: index + 1,
          d2: item.planName,
          d3: planSalePrice,
          d4: planSaleNum,
          d5: saleNum,
          d6,
          d7,
          useType: item.useType,
          display: item.display
        })
      })
      this.sec2DataList = initArr
    },
    sec2PlanDetail(id) {
      const planList = this.product.productPlanDTOSet
      const detail = planList.find(x => x.planId === id)
      if (detail) {
        let d3 = ''
        if (detail.useDays > 0) {
          d3 = `依購買後起訖 ${detail.useDays}天`
        } else if (
          detail.useDays === -1 &&
          detail.useStime.length === 0 &&
          detail.useEtime.length === 0
        ) {
          d3 = '無期限'
        } else {
          const stime =
            detail.useStime.length === 0
              ? ''
              : util.formatTimeMinus(detail.useStime).substring(0, 10)
          const etime =
            detail.useEtime.length === 0
              ? ''
              : util.formatTimeMinus(detail.useEtime).substring(0, 10)
          d3 = `${stime.length > 0 ? stime : ''} ~ ${
            etime.length > 0 ? etime : ''
          }`
        }

        let d4 = ''
        if (
          detail.sellingStime.length === 0 &&
          detail.sellingEtime.length === 0
        ) {
          d4 = '無期限'
        } else {
          const stime =
            detail.sellingStime.length === 0
              ? ''
              : util.formatTimeMinus(detail.sellingStime)
          const etime =
            detail.sellingEtime.length === 0
              ? ''
              : util.formatTimeMinus(detail.sellingEtime)
          d4 = `${stime.length > 0 ? stime : ''} ~ ${
            etime.length > 0 ? etime : ''
          }`
        }

        // 目前採單一規格
        const d5 = detail.productSpecificationDTOSet[0].unitPrice
        const d6 = detail.productSpecificationDTOSet[0].sellingPrice
        const d7 = detail.productSpecificationDTOSet[0].sellingNum
        const d8 = detail.productSpecificationDTOSet[0].sellingLimit
        const d9 =
          detail.productSpecificationDTOSet[0].useType === 1 ? '啟用' : '停用'

        const initObj = {
          d1: detail.planName,
          d2: detail.planIntro.replace(/\n|\r\n/g, '<br>'),
          d3,
          d4,
          d5,
          d6,
          d7,
          d8,
          d9
        }

        this.planDetailDialogDetail = Object.assign({}, initObj)
        this.planDetailDialog = true
      }
    },
    sec2PlanDisplay(id, type) {
      let opt = ''
      if (type === 1) {
        opt = '顯示'
      } else {
        opt = '隱藏'
      }
      const title = `確定要${opt}此方案嗎`
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
              .put(
                `/S02/product/${this.product.productId}/plan/${id}/display/${type}`
              )
              .then((response) => {
                const data = response.data
                if (data.res === 'CODE0000') {
                  const oldPlan = this.product.productPlanDTOSet.find(
                    x => x.planId === id
                  )

                  if (oldPlan !== undefined) {
                    const index =
                      this.product.productPlanDTOSet.indexOf(oldPlan)
                    this.$set(this.product.productPlanDTOSet, index, data.plan)
                  }
                  this.sec2_data_init()
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
    planUseType(id, type) {
      let opt = ''
      if (type === 1) {
        opt = '啟用'
      } else {
        opt = '停用'
      }
      const title = `確定要${opt}此方案嗎`
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
              .put(
                `/S02/product/${this.product.productId}/plan/${id}/use/${type}`
              )
              .then((response) => {
                const data = response.data
                if (data.res === 'CODE0000') {
                  const oldPlan = this.product.productPlanDTOSet.find(
                    x => x.planId === id
                  )

                  if (oldPlan !== undefined) {
                    const index =
                      this.product.productPlanDTOSet.indexOf(oldPlan)
                    this.$set(this.product.productPlanDTOSet, index, data.plan)
                  }
                  this.sec2_data_init()
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
    sec3ModifyInit() {
      this.newPlanForm = {
        valid: false,
        item: {
          id: util._uuid(),
          p1: '',
          p2: '',
          p3: '1',
          p3_d: null,
          p3_t: [null, null],
          p4: [null, null],
          p5: null,
          p6: null,
          p7_sw: false,
          p7: null,
          p8_sw: false,
          p8: 20
        }
      }
      this.sec3_edit = true
      this.CurrentPageSectionIndex = 2
    },
    sec3ModifyCancel() {
      this.$swal
        .fire({
          title: '確定要捨棄編輯嗎？',
          html: '',
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
            this.sec3_edit = false
            this.CurrentPageSectionIndex = 1
          }
        })
    },
    sec3NumModify(type, col) {
      if (col === 1) {
        if (this.newPlanForm.item.p5 === null) {
          this.$set(this.newPlanForm.item, 'p5', 0)
        }

        const value = parseInt(this.newPlanForm.item.p5)
        if (type === 1) {
          this.$set(this.newPlanForm.item, 'p5', value + 1)
        } else if (value > 0) {
          this.$set(this.newPlanForm.item, 'p5', value - 1)
        }
      } else if (col === 2) {
        if (this.newPlanForm.item.p6 === null) {
          this.$set(this.newPlanForm.item, 'p6', 0)
        }

        const value = parseInt(this.newPlanForm.item.p6)
        if (type === 1) {
          this.$set(this.newPlanForm.item, 'p6', value + 1)
        } else if (value > 0) {
          this.$set(this.newPlanForm.item, 'p6', value - 1)
        }
      } else if (col === 3) {
        if (this.newPlanForm.item.p7 === null) {
          this.$set(this.newPlanForm.item, 'p7', 0)
        }

        const value = parseInt(this.newPlanForm.item.p7)
        if (type === 1) {
          this.$set(this.newPlanForm.item, 'p7', value + 1)
        } else if (value > 0) {
          this.$set(this.newPlanForm.item, 'p7', value - 1)
        }
      } else if (col === 4) {
        if (this.newPlanForm.item.p8 === null) {
          this.$set(this.newPlanForm.item, 'p8', 0)
        }

        const value = parseInt(this.newPlanForm.item.p8)
        if (type === 1) {
          this.$set(this.newPlanForm.item, 'p8', value + 1)
        } else if (value > 0) {
          this.$set(this.newPlanForm.item, 'p8', value - 1)
        }
      }
    },
    sec3ModifySubmit() {
      if (!this.newPlanForm.valid) {
        this.$swal.fire('Oops!', '部分項目填寫錯誤，請重新確認', 'info')
        return
      }

      if (
        parseInt(this.newPlanForm.item.p5) < parseInt(this.newPlanForm.item.p6)
      ) {
        this.$swal.fire('Oops!', '售價不得大於原價', 'info')
        return
      }

      let days = this.newPlanForm.item.p3_d
      if (this.newPlanForm.item.p3 === '1') {
        if (days === null || days.toString() === '0') {
          days = '-1'
        } else if (parseInt(days) <= 0) {
          this.$swal.fire('小提示', '使用期限不得小於0')
          return
        }
      }

      const form = {}
      form.id = this.product.productId
      form.plan = {
        p1: this.newPlanForm.item.p1,
        p2: this.newPlanForm.item.p2,
        p3: this.newPlanForm.item.p3,
        p3_d: (days ?? '-1').toString(),
        p3_t: [
          util.dateTime2String(this.newPlanForm.item.p3_t[0]),
          util.dateTime2String(this.newPlanForm.item.p3_t[1])
        ],
        p4: [
          util.dateTime2String(this.newPlanForm.item.p4[0]),
          util.dateTime2String(this.newPlanForm.item.p4[1])
        ],
        p5: this.newPlanForm.item.p5.toString(),
        p6: this.newPlanForm.item.p6.toString(),
        p7: this.newPlanForm.item.p7_sw
          ? this.newPlanForm.item.p7.toString()
          : '-1',
        p8: this.newPlanForm.item.p8_sw
          ? this.newPlanForm.item.p8.toString()
          : '20'
      }

      this.$axios
        .post('/S02/product/plan', form)
        .then((response) => {
          const data = response.data
          if (data.res === 'CODE0000') {
            this.product.productPlanDTOSet.push(data.plan)
            this.sec2_data_init()
            this.$swal.fire('小提示', '新增方案成功', 'success')
            this.sec3_edit = false
            this.CurrentPageSectionIndex = 1
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

:deep(.slick-slide) {
  padding: 0 6px !important;
}

.border_title {
  background-color: transparent !important;
  position: absolute;
  top: -25px;
  background-color: white;
}

.row_title {
  align-items: center;
  display: flex;
  height: 48px;
  font-size: 1rem;
  font-weight: 400;
  padding: 0 16px 0 16px;
}

.row_content {
  padding-top: 0.5rem !important;
  align-items: center;
  display: flex;
  font-size: 1rem;
  font-weight: 400;
  padding: 0 16px 0 16px;
}

.border_bottom {
  transition: border 0.6s linear;
  border-bottom: 2px solid rgba(0, 0, 0, 0.12);
}

.border_error {
  border: thin solid #f95454;
  border-radius: 20px;
}

.font_size1-1 {
  font-size: 1.1rem !important;
}

:deep(.text-with-plus-minus .v-input__append-outer) {
  margin-top: 4px !important;
}
:deep(.text-with-plus-minus .v-input__prepend-outer) {
  margin-top: 4px !important;
}
</style>
