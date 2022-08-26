<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <v-app-bar color="white" app>
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-app-bar-nav-icon v-bind="attrs" @click="$router.back()" v-on="on">
            <v-icon>mdi-arrow-left</v-icon>
          </v-app-bar-nav-icon>
        </template>
        <span>上一頁</span>
      </v-tooltip>

      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer />

      <v-menu bottom left>
        <template #activator="{ on, attrs }">
          <v-btn class="d-flex d-sm-none" icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
      </v-menu>
    </v-app-bar>
    <div class="pa-4">
      <v-stepper v-model="e1" class="background-color elevation-0">
        <v-stepper-header class="white">
          <v-stepper-step :complete="e1 > 1" step="1">
            填寫產品資訊
          </v-stepper-step>
          <v-divider />
          <v-stepper-step :complete="e1 > 2" step="2">
            新增產品圖片
          </v-stepper-step>
          <v-divider />
          <v-stepper-step :complete="e1 > 3" step="3">
            新增方案
          </v-stepper-step>
          <v-divider />
          <v-stepper-step :complete="e1 > 4" step="4">
            確認產品
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items class="mt-2">
          <v-stepper-content step="1" class="pa-0">
            <v-card flat color="transparent" style="margin-bottom: 64px">
              <v-card-title class="justify-center text-h4">
                新增產品資訊
              </v-card-title>
              <v-form ref="step1form" v-model="step1_form.valid">
                <v-container>
                  <v-row class="">
                    <v-col>
                      <v-card class="pa-4" rounded="xl">
                        <v-subheader class="base-color--text border_title">
                          <v-chip color="brown lighten-3" dark>
                            產品基本資料
                          </v-chip>
                        </v-subheader>
                        <v-row dense class="px-4 py-2">
                          <v-col cols="12" sm="3" md="2">
                            <div class="row_title font-weight-medium need">
                              產品名稱
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="step1_form.p1"
                              dense
                              outlined
                              color="#16261f"
                              counter="100"
                              :rules="[rules.required, rules.length(100)]"
                              label="請填寫產品名稱"
                              single-line
                            />
                          </v-col>
                        </v-row>
                        <v-row dense class="px-4 py-2">
                          <v-col cols="12" sm="3" md="2">
                            <div class="row_title font-weight-medium need">
                              產品簡介
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-textarea
                              v-model="step1_form.p2"
                              outlined
                              color="#16261f"
                              counter="100"
                              :rules="[rules.required, rules.length(100)]"
                              label="請填寫產品簡介"
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
                          </v-col>
                        </v-row>
                        <v-row dense class="px-4">
                          <v-col
                            cols="12"
                            sm="5"
                            md="3"
                            class="align-self-center"
                          >
                            <div class="row_title font-weight-medium">
                              是否參與官方優惠活動
                              <v-tooltip bottom>
                                <template #activator="{ on, attrs }">
                                  <v-icon
                                    small
                                    v-bind="attrs"
                                    class="pl-2"
                                    v-on="on"
                                  >
                                    mdi-information-outline
                                  </v-icon>
                                </template>
                                <span> 說明 </span>
                              </v-tooltip>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-switch
                              v-model="step1_form.p3"
                              :label="step1_form.p3 ? '參與' : '目前不用'"
                              color="success"
                              hide-details
                              hide-spin-buttons
                              class="mt-2"
                              @change="joinCoupon"
                            />
                          </v-col>
                        </v-row>
                        <v-row dense class="px-4">
                          <v-col cols="12" sm="3" class="align-self-center">
                            <div class="row_title font-weight-medium">
                              產品類型
                            </div>
                          </v-col>
                          <v-col cols="12" sm="9">
                            <v-radio-group
                              v-model="step1_form.p4"
                              row
                              hide-details
                              class="mt-2"
                            >
                              <v-radio label="商品類型" value="1" />
                              <v-radio label="現金類型" value="2" />
                            </v-radio-group>
                          </v-col>
                        </v-row>
                        <v-row dense class="px-4">
                          <v-col cols="12" sm="3" md="2">
                            <div class="row_title font-weight-medium need">
                              產品分類
                            </div>
                          </v-col>
                          <v-col cols="12" sm="9">
                            <v-select
                              v-model="step1_form.p5"
                              :items="productClasses"
                              item-value="id"
                              item-text="name"
                              outlined
                              return-object
                              single-line
                              label="請選擇產品分類"
                              multiple
                              chips
                              dense
                              menu-props
                              :rules="[rules.required, rules.classesLen(5)]"
                            >
                              <template #selection="{ item, index }">
                                <div class="ma-2">
                                  <v-chip
                                    :color="colors(item.color)"
                                    dark
                                    close
                                    @click:close="
                                      step1_form.p5.splice(index, 1)
                                    "
                                  >
                                    {{ item.name }}
                                  </v-chip>
                                </div>
                              </template>
                            </v-select>
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-col>
                  </v-row>
                  <v-row class="mt-8">
                    <v-col>
                      <v-card class="pa-4" rounded="xl">
                        <v-tooltip bottom>
                          <template #activator="{ on, attrs }">
                            <v-btn
                              absolute
                              color="pink"
                              dark
                              fab
                              small
                              right
                              top
                              v-bind="attrs"
                              v-on="on"
                              @click="step1_new"
                            >
                              <v-icon>mdi-plus</v-icon>
                            </v-btn>
                          </template>
                          <span>新增說明</span>
                        </v-tooltip>

                        <v-subheader class="base-color--text border_title">
                          <v-chip color="brown lighten-3" dark>
                            產品說明
                          </v-chip>
                        </v-subheader>
                        <v-row
                          v-for="item in step1_form.infoArr"
                          :key="item.id"
                          class="px-4 py-2 border_bottom"
                          :class="{ border_error: item.valid }"
                        >
                          <v-col
                            cols="12"
                            sm="3"
                            md="2"
                            class="align-self-start pb-0"
                          >
                            <div class="need">
                              {{ item.title }}
                            </div>
                            <v-scroll-y-transition>
                              <div
                                v-show="item.valid"
                                class="v-text-field__details"
                              >
                                <div
                                  class="v-messages theme--light error--text"
                                  style=""
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
                          </v-col>
                          <v-col cols="12" sm="9">
                            <client-only>
                              <VueEditor v-model="item.content" />
                            </client-only>
                          </v-col>
                        </v-row>
                        <transition-group
                          name="fadeLeft"
                          tag="div"
                          class="mt-4"
                        >
                          <v-row
                            v-for="(item, index) in step1_form.infoCus"
                            :key="item.id"
                            class="px-4 py-2 border_error"
                          >
                            <v-col
                              cols="12"
                              sm="3"
                              md="2"
                              class="align-self-start pb-0"
                            >
                              <v-text-field
                                v-model="item.title"
                                dense
                                outlined
                                color="#16261f"
                                counter="20"
                                :rules="[rules.required, rules.length(20)]"
                                label="請填寫標題"
                                single-line
                              />
                            </v-col>
                            <v-col cols="12" sm="9" style="position: relative">
                              <v-tooltip bottom>
                                <template #activator="{ on, attrs }">
                                  <v-btn
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
                                    @click="step1_remove(index)"
                                  >
                                    <v-icon dark>
                                      mdi-window-close
                                    </v-icon>
                                  </v-btn>
                                </template>
                                <span>刪除</span>
                              </v-tooltip>

                              <client-only>
                                <VueEditor v-model="item.content" />
                              </client-only>
                            </v-col>
                          </v-row>
                        </transition-group>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
              <v-divider />
              <v-card-actions>
                <v-btn text outlined @click="step1_reset">
                  清除資料
                </v-btn>
                <v-spacer />
                <v-btn
                  color="primary"
                  :disabled="!step1_form.valid"
                  @click="step1ToStep2"
                >
                  下一步
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
          <v-stepper-content step="2" class="pa-0">
            <v-card flat color="transparent" style="margin-bottom: 64px">
              <v-card-title class="justify-center text-h4">
                新增產品圖片
              </v-card-title>
              <v-toolbar flat color="transparent">
                <v-toolbar-title class="font-weight-bold">
                  產品圖片
                  <v-tooltip bottom>
                    <template #activator="{ on, attrs }">
                      <v-icon small v-bind="attrs" style="top: -3px" v-on="on">
                        mdi-information-outline
                      </v-icon>
                    </template>
                    <span>
                      1. 首張圖片默認為首頁縮圖<br>
                      2. 圖片比例盡量採 aaa x bbbb<br>
                      3. 圖片至少一張，最多10張<br>
                      4. 每張圖片上限為5MB
                    </span>
                  </v-tooltip>
                </v-toolbar-title>
                <v-spacer />
                <v-btn outlined color="indigo" @click="step2_upload_init">
                  上傳圖片
                </v-btn>
              </v-toolbar>

              <ImgViewer
                :images="step2_form.imgArr"
                :show-first-tag="true"
                @order-files="step2_upload_order"
              />

              <v-divider />
              <v-card-actions>
                <v-btn outlined :disabled="!step1_form.valid" @click="e1 = 1">
                  上一步
                </v-btn>
                <v-btn text outlined @click="step2_reset">
                  清除資料
                </v-btn>
                <v-spacer />
                <v-btn
                  color="primary"
                  :disabled="step2_form.imgArr.length === 0"
                  @click="step2ToStep3"
                >
                  下一步
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
          <v-stepper-content step="3" class="pa-0">
            <v-card flat color="transparent" style="margin-bottom: 64px">
              <v-card-title class="justify-center text-h4">
                填寫方案
                <v-tooltip bottom>
                  <template #activator="{ on, attrs }">
                    <v-icon small v-bind="attrs" class="pl-2" v-on="on">
                      mdi-information-outline
                    </v-icon>
                  </template>
                  <span>
                    1.至少一項方案<br>
                    2.產品審核通過時仍可新增方案
                  </span>
                </v-tooltip>
              </v-card-title>
              <v-form ref="step3form" v-model="step3_form.valid">
                <v-container>
                  <transition-group name="fadeLeft" tag="div" class="mt-4">
                    <v-col
                      v-for="(item, index) in step3_form.pArr"
                      :key="item.id"
                      cols="12"
                      class="pa-0 pb-8"
                    >
                      <v-card class="pa-4" rounded="xl">
                        <v-tooltip v-if="index === 0" bottom>
                          <template #activator="{ on, attrs }">
                            <v-btn
                              absolute
                              color="pink"
                              dark
                              fab
                              small
                              right
                              top
                              v-bind="attrs"
                              v-on="on"
                              @click="step3_new"
                            >
                              <v-icon>mdi-plus</v-icon>
                            </v-btn>
                          </template>
                          <span>新增方案</span>
                        </v-tooltip>
                        <v-tooltip v-if="index !== 0" bottom>
                          <template #activator="{ on, attrs }">
                            <v-btn
                              absolute
                              depressed
                              outlined
                              fab
                              small
                              right
                              top
                              v-bind="attrs"
                              style="background-color: white; right: -12px"
                              v-on="on"
                              @click="step3_remove(index)"
                            >
                              <v-icon>mdi-close</v-icon>
                            </v-btn>
                          </template>
                          <span>刪除</span>
                        </v-tooltip>
                        <v-subheader class="base-color--text border_title">
                          <v-chip color="brown lighten-3" dark>
                            方案 {{ index + 1 }}
                          </v-chip>
                        </v-subheader>
                        <v-row dense class="px-4 py-2">
                          <v-col cols="12" sm="3" md="2">
                            <div class="row_title font-weight-medium need">
                              方案名稱
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="item.p1"
                              dense
                              outlined
                              color="#16261f"
                              counter="100"
                              :rules="[rules.required, rules.length(200)]"
                              label="請填寫方案名稱"
                              single-line
                            />
                          </v-col>
                        </v-row>
                        <v-row dense class="px-4 py-2">
                          <v-col cols="12" sm="3" md="2">
                            <div class="row_title font-weight-medium need">
                              方案簡介
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-textarea
                              v-model="item.p2"
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
                          </v-col>
                        </v-row>
                        <v-row dense class="px-4 py-2">
                          <v-col cols="12" sm="3" md="2">
                            <div class="row_title font-weight-medium">
                              使用期限
                            </div>
                          </v-col>
                          <v-col cols="12" sm="9">
                            <v-radio-group
                              v-model="item.p3"
                              class="mt-0"
                              :rules="[rules.required]"
                              row
                            >
                              <v-radio
                                label="依購買日起計"
                                value="1"
                                class="label_size09"
                              />
                              <v-radio
                                label="固定到期日"
                                value="2"
                                class="label_size09"
                              />
                            </v-radio-group>
                            <v-expand-transition>
                              <v-card v-if="item.p3 === '1'" flat>
                                <v-text-field
                                  v-model="item.p3_d"
                                  color="#16261f"
                                  label="請填寫天數，如未填寫則以90天計算"
                                  single-line
                                  type="number"
                                  hide-spin-buttons
                                />
                              </v-card>
                            </v-expand-transition>
                            <v-expand-transition>
                              <v-card v-if="item.p3 === '2'" flat>
                                <v-card
                                  class="justify-start d-none d-sm-flex"
                                  flat
                                  tile
                                >
                                  <v-card class="pa-2" flat tile>
                                    <date-picker
                                      v-model="item.p3_t[0]"
                                      type="date"
                                      placeholder="請選擇開始時間"
                                      :editable="false"
                                    />
                                  </v-card>
                                  <v-card class="pa-2" flat tile>
                                    <v-icon> mdi-tilde </v-icon>
                                  </v-card>
                                  <v-card class="pa-2" flat tile>
                                    <date-picker
                                      v-model="item.p3_t[1]"
                                      type="date"
                                      placeholder="請選擇結束時間"
                                      :editable="false"
                                    />
                                  </v-card>
                                </v-card>
                                <v-card
                                  flat
                                  tile
                                  class="d-flex d-sm-none flex-column"
                                >
                                  <v-card flat>
                                    <date-picker
                                      v-model="item.p3_t[0]"
                                      type="date"
                                      placeholder="請選擇開始時間"
                                      :editable="false"
                                      :confirm="true"
                                    />
                                  </v-card>
                                  <v-card class="mt-4" flat tile>
                                    <date-picker
                                      v-model="item.p3_t[1]"
                                      type="date"
                                      placeholder="請選擇結束時間"
                                      :editable="false"
                                      :confirm="true"
                                    />
                                  </v-card>
                                </v-card>
                              </v-card>
                            </v-expand-transition>
                          </v-col>
                        </v-row>
                        <v-row dense class="px-4 py-2">
                          <v-col cols="12" sm="3" md="2">
                            <div class="row_title font-weight-medium">
                              販售時間
                              <v-tooltip bottom>
                                <template #activator="{ on, attrs }">
                                  <v-icon
                                    small
                                    v-bind="attrs"
                                    class="pl-2"
                                    v-on="on"
                                  >
                                    mdi-information-outline
                                  </v-icon>
                                </template>
                                <span>
                                  如未點選開始時間，系統將自動以當前時間帶入
                                </span>
                              </v-tooltip>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-card
                              class="justify-start d-none d-sm-flex"
                              flat
                              tile
                            >
                              <v-card class="pa-2" flat tile>
                                <v-card flat>
                                  <date-picker
                                    v-model="item.p4[0]"
                                    type="datetime"
                                    placeholder="請選擇開始時間"
                                    :editable="false"
                                    :confirm="true"
                                    @change="changeDate(index, 1)"
                                  />
                                </v-card>
                              </v-card>
                              <v-card class="pa-2" flat tile>
                                <v-icon> mdi-tilde </v-icon>
                              </v-card>
                              <v-card class="pa-2" flat tile>
                                <date-picker
                                  v-model="item.p4[1]"
                                  type="datetime"
                                  placeholder="請選擇結束時間"
                                  :editable="false"
                                  :confirm="true"
                                  @change="changeDate(index, 1)"
                                />
                              </v-card>
                            </v-card>
                            <v-card
                              flat
                              tile
                              class="d-flex d-sm-none flex-column"
                            >
                              <v-card flat>
                                <date-picker
                                  v-model="item.p4[0]"
                                  type="datetime"
                                  placeholder="請選擇開始時間"
                                  :editable="false"
                                  :confirm="true"
                                  @change="changeDate(index, 1)"
                                />
                              </v-card>
                              <v-card flat class="mt-4">
                                <date-picker
                                  v-model="item.p4[1]"
                                  type="datetime"
                                  placeholder="請選擇開始時間"
                                  :editable="false"
                                  :confirm="true"
                                  @change="changeDate(index, 1)"
                                />
                              </v-card>
                            </v-card>
                          </v-col>
                        </v-row>
                        <v-row dense class="px-4 py-2">
                          <v-col cols="6" sm="3" md="2">
                            <div class="row_title font-weight-medium need">
                              原價
                            </div>
                          </v-col>
                          <v-col cols="6" sm="6">
                            <v-text-field
                              v-model="item.p5"
                              type="number"
                              prefix="NT$"
                              hide-spin-buttons
                              :rules="[rules.required, rules.positive]"
                              class="pt-0"
                            />
                          </v-col>
                        </v-row>
                        <v-row dense class="px-4 py-2">
                          <v-col cols="6" sm="3" md="2">
                            <div class="row_title font-weight-medium need">
                              售價
                            </div>
                          </v-col>
                          <v-col cols="6" sm="6">
                            <v-text-field
                              v-model="item.p6"
                              type="number"
                              hide-spin-buttons
                              prefix="NT$"
                              :rules="[rules.required, rules.positive]"
                              class="pt-0"
                            />
                          </v-col>
                        </v-row>
                        <v-row dense class="px-4 py-2">
                          <v-col cols="6" sm="3" md="2">
                            <div class="row_title font-weight-medium need">
                              販售數量
                            </div>
                          </v-col>
                          <v-col cols="6" sm="6">
                            <v-switch
                              v-model="item.p7_sw"
                              :label="item.p7_sw ? '開啟' : '無上限'"
                              class="mt-2"
                            />
                            <v-expand-transition>
                              <v-text-field
                                v-if="item.p7_sw"
                                v-model="item.p7"
                                type="number"
                                hide-spin-buttons
                                class="pt-0"
                              >
                                <v-icon
                                  slot="append-outer"
                                  color="red"
                                  @click="step3_num_modify(1, index, 3)"
                                >
                                  mdi-plus
                                </v-icon>
                                <v-icon
                                  slot="prepend"
                                  color="green"
                                  @click="step3_num_modify(2, index, 3)"
                                >
                                  mdi-minus
                                </v-icon>
                              </v-text-field>
                            </v-expand-transition>
                          </v-col>
                        </v-row>
                        <v-row dense class="px-4 py-2">
                          <v-col cols="6" sm="3" md="2">
                            <div class="row_title font-weight-medium">
                              單次購買上限
                              <v-tooltip bottom>
                                <template #activator="{ on, attrs }">
                                  <v-icon
                                    small
                                    v-bind="attrs"
                                    class="pl-2"
                                    v-on="on"
                                  >
                                    mdi-information-outline
                                  </v-icon>
                                </template>
                                <span> 單次購買上限最多為20 </span>
                              </v-tooltip>
                            </div>
                          </v-col>
                          <v-col cols="6" sm="6">
                            <v-switch
                              v-model="item.p8_sw"
                              :label="item.p8_sw ? '開啟' : '無上限'"
                              class="mt-2"
                            />
                            <v-expand-transition>
                              <v-text-field
                                v-if="item.p8_sw"
                                v-model="item.p8"
                                type="number"
                                hide-spin-buttons
                                :rules="[rules.buyLimit]"
                                class="pt-0"
                              >
                                <v-icon
                                  slot="append-outer"
                                  color="red"
                                  @click="step3_num_modify(1, index, 4)"
                                >
                                  mdi-plus
                                </v-icon>
                                <v-icon
                                  slot="prepend"
                                  color="green"
                                  @click="step3_num_modify(2, index, 4)"
                                >
                                  mdi-minus
                                </v-icon>
                              </v-text-field>
                            </v-expand-transition>
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-col>
                  </transition-group>
                </v-container>
              </v-form>
              <v-divider />
              <v-card-actions>
                <v-btn outlined @click="e1 = 2">
                  上一步
                </v-btn>
                <v-btn text outlined @click="step3_reset">
                  清除資料
                </v-btn>
                <v-spacer />
                <v-btn
                  color="primary"
                  :disabled="!step3_form.valid"
                  @click="step3ToStep4"
                >
                  下一步
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
          <v-stepper-content step="4">
            <v-card class="mb-12" flat color="transparent">
              <v-card-title class="justify-center text-h4">
                產品確認
              </v-card-title>
              <v-simple-table>
                <template #default>
                  <tbody>
                    <tr>
                      <td>產品名稱</td>
                      <td>
                        {{ step1_form.p1 }}
                      </td>
                    </tr>
                    <tr>
                      <td>產品簡介</td>
                      <td>{{ step1_form.p2 }}</td>
                    </tr>
                    <tr>
                      <td>是否餐與官方優惠活動</td>
                      <td>{{ step1_form.p3 ? '參與' : '不參與' }}</td>
                    </tr>
                    <tr>
                      <td>產品類型</td>
                      <td>
                        {{ step1_form.p4 === '1' ? '商品票券' : '現金票券' }}
                      </td>
                    </tr>
                    <tr>
                      <td>產品分類</td>
                      <td>{{ final_class }}</td>
                    </tr>
                    <tr v-for="item in step1_form.infoArr" :key="item.id">
                      <td>{{ item.title }}</td>
                      <td>
                        <div class="ma-2" v-html="item.content" />
                      </td>
                    </tr>
                    <tr v-for="item in step1_form.infoCus" :key="item.id">
                      <td>{{ item.title }}</td>
                      <td>
                        <div class="ma-2" v-html="item.content" />
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <v-divider />
              <v-expansion-panels flat>
                <v-expansion-panel
                  v-for="(item, index) in step3_form.pArr"
                  :key="item.id"
                >
                  <v-expansion-panel-header>
                    方案{{ index + 1 }} - {{ item.p1 }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content class="pink lighten-5">
                    <v-simple-table class="pink lighten-5">
                      <template #default>
                        <tbody>
                          <tr>
                            <td>方案名稱</td>
                            <td>{{ item.p1 }}</td>
                          </tr>
                          <tr>
                            <td>方案說明</td>
                            <td v-html="item.p2.replace(/\n/g, '<br>')" />
                          </tr>
                          <tr>
                            <td>使用期限</td>
                            <td>{{ final_use_time(item) }}</td>
                          </tr>
                          <tr>
                            <td>販售期限</td>
                            <td>{{ final_sale_time(item) }}</td>
                          </tr>
                          <tr>
                            <td>原價</td>
                            <td>{{ item.p5 | toDollars }}</td>
                          </tr>
                          <tr>
                            <td>售價</td>
                            <td>{{ item.p6 | toDollars }}</td>
                          </tr>
                          <tr>
                            <td>數量</td>
                            <td v-if="item.p7_sw">
                              {{ item.p7 | numberWithCommas }}
                            </td>
                            <td v-else>
                              無上限
                            </td>
                          </tr>
                          <tr>
                            <td>購買上限</td>
                            <td v-if="item.p8_sw">
                              {{ item.p8 | numberWithCommas }}
                            </td>
                            <td v-else>
                              無上限
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
              <v-divider />
              <v-card-actions>
                <v-btn outlined @click="e1 = 3">
                  上一步
                </v-btn>
                <v-spacer />
                <v-btn color="primary" @click="final_submit">
                  送出
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </div>
    <FileUpload
      v-model="step2_form.imgArr_dialog"
      title="上傳產品圖片"
      :files="step2_form.imgArr_init"
      :max-files="10"
      :multi-files="true"
      @get-files="step2_upload_get_files"
    />
    <my-waiting :loading="loadingStatus" />
    <to-top />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import DatePicker from 'vue2-datepicker'
import moment from 'moment'
import 'vue2-datepicker/index.css'
import util from '~/assets/js/util'
import ToTop from '~/components/ToTop.vue'

export default {
  name: 'IndexPage',
  title: '商城票券(逐筆發行) - 新增產品',
  components: { ToTop, DatePicker },
  layout: 'adminLayout',
  data() {
    return {
      loadingStatus: false,
      title: '商城票券(逐筆發行) - 新增產品',
      time2: null,
      e1: 1,
      bulk_arr: [
        {
          bulk_type: 500,
          bulk_num: 100
        },
        {
          bulk_type: 1000,
          bulk_num: 1000
        }
      ],
      bulk_selection: null,
      step2_check_bulk: false,

      step1_form: {
        valid: false,
        p1: '',
        p2: '',
        p3: false,
        p4: '1',
        p5: [],
        infoArr: [
          {
            id: util._uuid(),
            title: '商品資訊',
            content: '',
            valid: false
          },
          {
            id: util._uuid(),
            title: '如何使用',
            content:
              '<p><strong style="color: rgb(0, 138, 0);">[範例]</strong></p><p><strong>憑證使用方式</strong></p><ul><li>現場請出示 QR code </li><li>持紅陽APP QRcode憑證入場核銷，核銷後即可使用。 </li></ul><p><br></p><p><strong>憑證兌換期限</strong></p><ul><li>需要按照預訂日期及當天開放時間內兌換，逾期失效。</li></ul>',
            valid: false
          },
          {
            id: util._uuid(),
            title: '取消政策',
            content:
              '<p><span style="color: rgb(0, 138, 0);">[範例]</span></p><ol><li>活動期間商品採限量供應，請儘早至門市完成兌換。最後取貨日為20xx/xx/xx。</li><li>本券可兌換券上所載之指定商品 ，兌換時不開立發票。 </li><li>本券僅限兌換一次，不得重複使用，因商品電子兌換憑證為不記名，任何人持有皆可兌換，請自行妥善保管，如遭他人盜用，不再補發。 </li><li>本券請勿擅自偽造、變造以免受罰。 </li><li>詳細活動辦法依本公司公告為主。凡參與本活動，即視同承認及接受本活動注意事項及相關規定，本公司保有隨時修正、暫停或終止本活動之權利，若有未盡事宜，悉依本公司之相關公告辦理；本公司保留最終解釋及決定權利。</li></ol>',
            valid: false
          },
          {
            id: util._uuid(),
            title: '履約保證',
            content:
              '<p><strong style="color: rgb(255, 153, 0);">發行商資訊 </strong></p><p><strong>紅陽科技股份有限公司 </strong></p><p>地址：台北市大安區敦化南路二段65號13樓 </p><p>統一編號：70828783 </p><p>負責人：呂寶麟 </p><p>實收資本額：390,000,000元 </p><p><br></p><p>客服電話：(02) 2502-6969 </p><p>客服信箱：service@esafe.com.tw </p><p>客服時段：星期一至五，早上九點半至下午六點，不含國定假日與政府機關公佈之停止上班日 </p><p><br></p><p><strong style="color: rgb(255, 153, 0);">履約保障 </strong></p><p>本服務所發行的電子禮券皆自發行日起存入發行人於聯邦銀行開立之信託帳戶，專款專用，信託期間至少一年。</p>',
            valid: false
          }
        ],
        infoCus: []
      },
      step2_form: {
        imgArr_dialog: false,
        imgArr_init: [],
        imgArr: []
      },

      step3_form: {
        valid: false,
        pArr: [
          {
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
        ]
      },

      rules: {
        length: len => v => (v || '').length <= len || `長度不得超過 ${len}`,
        classesLen: len => v => v.length <= len || `分類不得超過 ${len}項`,
        required: v => !!v || '此欄位為必填',
        buyLimit: v =>
          (!!v && parseInt(v) >= 1 && parseInt(v) <= 20) ||
          '單次購買上限範圍 1 ~ 20',
        positive: v => (!!v && parseInt(v) >= 0) || '價格不能為負值'
      }
    }
  },
  computed: {
    ...mapGetters({
      productClasses: 'basic/getClasses'
    }),
    final_class() {
      return this.step1_form.p5.map(x => x.name).join('/ ')
    }
  },
  methods: {
    final_use_time(item) {
      if (item.p3 === '1') {
        const day = item.p3_d ?? 90
        return `依購買日起迄 ${day}天`
      } else {
        const sdate = item.p3_t[0]
        const edate = item.p3_t[1]
        if (sdate === null && edate === null) {
          return '無使用期限'
        } else {
          return (
            (sdate === null ? '' : moment(sdate).format('YYYY-MM-DD hh:mm')) +
            ' ~ ' +
            (edate === null ? '' : moment(edate).format('YYYY-MM-DD hh:mm'))
          )
        }
      }
    },
    final_sale_time(item) {
      const sdate = item.p4[0]
      const edate = item.p4[1]
      if (sdate === null && edate === null) {
        return '無販售期限'
      } else {
        return (
          (sdate === null ? '' : moment(sdate).format('YYYY-MM-DD hh:mm')) +
          ' ~ ' +
          (edate === null ? '' : moment(edate).format('YYYY-MM-DD hh:mm'))
        )
      }
    },
    changeDate(index, col) {
      if (col === 1) {
        const sdate = this.step3_form.pArr[index].p4[0]
        const edate = this.step3_form.pArr[index].p4[1]
        if (sdate !== null && edate !== null) {
          if (sdate.getTime() > edate.getTime()) {
            this.step3_form.pArr[index].p4 = [edate, sdate]
          }
        }
      }
    },
    joinCoupon() {
      if (this.step1_form.p3) {
        this.$swal.fire('小提示', '開啟參與官方優惠活動')
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
    step1ToStep2() {
      let check = true
      let checkMsg = ''
      this.step1_form.infoArr.forEach((item) => {
        this.$set(item, 'valid', false)
        if (item.content.length === 0) {
          this.$set(item, 'valid', true)
          checkMsg = `請填寫「${item.title}」`
          check = false
        }
      })
      this.step1_form.infoCus.forEach((item) => {
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

      if (check) {
        this.e1 = 2
      } else {
        this.$swal.fire('小提示', checkMsg, 'warning')
      }
    },
    step2ToStep3() {
      this.e1 = 3
    },
    step3ToStep4() {
      this.e1 = 4
    },

    // step1
    step1_reset() {
      this.step1_form.p4_t = [null, null]
      this.step1_form.p5 = [null, null]
      this.step1_form.infoArr = [
        {
          id: util._uuid(),
          title: '商品資訊',
          content: '',
          valid: false
        },
        {
          id: util._uuid(),
          title: '如何使用',
          content:
            '<p><strong style="color: rgb(0, 138, 0);">[範例]</strong></p><p><strong>憑證使用方式</strong></p><ul><li>現場請出示 QR code </li><li>持紅陽APP QRcode憑證入場核銷，核銷後即可使用。 </li></ul><p><br></p><p><strong>憑證兌換期限</strong></p><ul><li>需要按照預訂日期及當天開放時間內兌換，逾期失效。</li></ul>',
          valid: false
        },
        {
          id: util._uuid(),
          title: '取消政策',
          content:
            '<p><span style="color: rgb(0, 138, 0);">[範例]</span></p><ol><li>活動期間商品採限量供應，請儘早至門市完成兌換。最後取貨日為20xx/xx/xx。</li><li>本券可兌換券上所載之指定商品 ，兌換時不開立發票。 </li><li>本券僅限兌換一次，不得重複使用，因商品電子兌換憑證為不記名，任何人持有皆可兌換，請自行妥善保管，如遭他人盜用，不再補發。 </li><li>本券請勿擅自偽造、變造以免受罰。 </li><li>詳細活動辦法依本公司公告為主。凡參與本活動，即視同承認及接受本活動注意事項及相關規定，本公司保有隨時修正、暫停或終止本活動之權利，若有未盡事宜，悉依本公司之相關公告辦理；本公司保留最終解釋及決定權利。</li></ol>',
          valid: false
        },
        {
          id: util._uuid(),
          title: '履約保證',
          content:
            '<p><strong style="color: rgb(255, 153, 0);">發行商資訊 </strong></p><p><strong>紅陽科技股份有限公司 </strong></p><p>地址：台北市大安區敦化南路二段65號13樓 </p><p>統一編號：70828783 </p><p>負責人：呂寶麟 </p><p>實收資本額：390,000,000元 </p><p><br></p><p>客服電話：(02) 2502-6969 </p><p>客服信箱：service@esafe.com.tw </p><p>客服時段：星期一至五，早上九點半至下午六點，不含國定假日與政府機關公佈之停止上班日 </p><p><br></p><p><strong style="color: rgb(255, 153, 0);">履約保障 </strong></p><p>本服務所發行的電子禮券皆自發行日起存入發行人於聯邦銀行開立之信託帳戶，專款專用，信託期間至少一年。</p>',
          valid: false
        }
      ]
      this.step1_form.infoCus = []
      this.$refs.step1form.reset()
    },
    step1_new() {
      if (this.step1_form.infoCus.length >= 2) {
        this.$notify({
          title: '小提示',
          text: '產品說明新增上限為2個',
          type: 'warning',
          duration: 5000
        })
        return
      }
      this.step1_form.infoCus.push({
        id: util._uuid(),
        title: '新增標題',
        content: ''
      })
    },
    step1_remove(index) {
      this.step1_form.infoCus.splice(index, 1)
      this.$refs.step1form.validate()
    },

    // step2
    step2_upload_init() {
      const initArr = []
      this.step2_form.imgArr_init = []
      this.$nextTick(function () {
        this.step2_form.imgArr.forEach((item) => {
          initArr.push(item.file)
        })
        this.step2_form.imgArr_init = initArr
        this.step2_form.imgArr_dialog = true
      })
    },
    async step2_upload_get_files(arr) {
      const initArr = []
      for (let i = 0; i < arr.length; i++) {
        const furl = await util.getBase64(arr[i].file)
        initArr.push({
          id: util._uuid(),
          src: furl,
          file: arr[i].file
        })
      }

      this.step2_form.imgArr = initArr
      this.step2_form.imgArr_dialog = false
    },
    step2_upload_order(arr) {
      this.step2_form.imgArr = arr
    },
    step2_reset() {
      this.step2_form.imgArr_init = []
      this.step2_form.imgArr = []
    },

    // step3
    step3_new() {
      this.step3_form.pArr.push({
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
      })
    },
    step3_remove(index) {
      this.step3_form.pArr.splice(index, 1)
      this.$refs.step3form.validate()
    },
    step3_num_modify(type, val, col) {
      if (col === 1) {
        if (this.step3_form.pArr[val].p5 === null) {
          this.$set(this.step3_form.pArr[val], 'p5', 0)
        }

        const value = parseInt(this.step3_form.pArr[val].p5)
        if (type === 1) {
          this.$set(this.step3_form.pArr[val], 'p5', value + 1)
        } else if (value > 0) {
          this.$set(this.step3_form.pArr[val], 'p5', value - 1)
        }
      } else if (col === 2) {
        if (this.step3_form.pArr[val].p6 === null) {
          this.$set(this.step3_form.pArr[val], 'p6', 0)
        }

        const value = parseInt(this.step3_form.pArr[val].p6)
        if (type === 1) {
          this.$set(this.step3_form.pArr[val], 'p6', value + 1)
        } else if (value > 0) {
          this.$set(this.step3_form.pArr[val], 'p6', value - 1)
        }
      } else if (col === 3) {
        if (this.step3_form.pArr[val].p7 === null) {
          this.$set(this.step3_form.pArr[val], 'p7', 0)
        }

        const value = parseInt(this.step3_form.pArr[val].p7)
        if (type === 1) {
          this.$set(this.step3_form.pArr[val], 'p7', value + 1)
        } else if (value > 0) {
          this.$set(this.step3_form.pArr[val], 'p7', value - 1)
        }
      } else if (col === 4) {
        if (this.step3_form.pArr[val].p8 === null) {
          this.$set(this.step3_form.pArr[val], 'p8', 0)
        }

        const value = parseInt(this.step3_form.pArr[val].p8)
        if (type === 1) {
          this.$set(this.step3_form.pArr[val], 'p8', value + 1)
        } else if (value > 0) {
          this.$set(this.step3_form.pArr[val], 'p8', value - 1)
        }
      }
    },

    step3_reset() {
      this.$refs.step3form.reset()
    },

    final_submit() {
      if (!this.step1_form.valid) {
        this.$swal.fire('Oops!', '步驟一部分項目錯誤，請重新確認', 'error')
        return
      }

      let check1 = true
      this.step1_form.infoArr.forEach((item) => {
        if ((item.content ?? '').length === 0) {
          check1 = false
        }
      })
      if (!check1) {
        this.$swal.fire('Oops!', '步驟一部分項目錯誤，請重新確認', 'error')
        return
      }

      if (this.step2_form.imgArr.length === 0) {
        this.$swal.fire('Oops!', '產品圖片只少需一張', 'error')
        return
      }

      if (!this.step3_form.valid) {
        this.$swal.fire('Oops!', '步驟三部分項目錯誤，請重新確認', 'error')
        return
      }
      const s1 = {}
      s1.p1 = this.step1_form.p1
      s1.p2 = this.step1_form.p2
      s1.p3 = this.step1_form.p3
      s1.p4 = this.step1_form.p4
      s1.p5 = this.step1_form.p5.map(x => x.id).join(';')
      s1.infoArr = this.step1_form.infoArr.map((x) => {
        return {
          title: x.title,
          content: x.content
        }
      })
      s1.infoCus = this.step1_form.infoCus.map((x) => {
        return {
          title: x.title,
          content: x.content
        }
      })

      const s3 = {}
      const initS3Arr = []
      this.step3_form.pArr.forEach((item) => {
        let days = item.p3_d
        if (item.p3 === '1') {
          if (days === null || days === 0) {
            days = 90
          }
        }
        initS3Arr.push({
          p1: item.p1,
          p2: item.p2,
          p3: item.p3,
          p3_d: days,
          p3_t: [
            util.dateTime2String(item.p3_t[0]),
            util.dateTime2String(item.p3_t[1])
          ],
          p4: [
            util.dateTime2String(item.p4[0]),
            util.dateTime2String(item.p4[1])
          ],
          p5: item.p5.toString(),
          p6: item.p6.toString(),
          p7: item.p7_sw ? item.p7.toString() : '-1',
          p8: item.p8_sw ? item.p8.toString() : '20'
        })
      })
      s3.pArr = initS3Arr

      const form = {}
      form.s1 = s1
      form.s3 = s3

      const title = '確定要新增產品嗎'
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
            this.loadingStatus = true

            this.$axios
              .post('/S02/product', form)
              .then((response) => {
                const data = response.data
                if (data.res === 'CODE0000') {
                  const imgaeForm = new FormData()
                  imgaeForm.append('id', data.id)
                  this.step2_form.imgArr.forEach((file) => {
                    imgaeForm.append('files', file.file)
                  })

                  return this.$axios.post('/S02/product-l2', imgaeForm)
                } else {
                  this.$swal.fire('小提示', data.msg, 'error')
                }
              })
              .then((response) => {
                this.loadingStatus = false
                const data = response.data
                if (data.res === 'CODE0000') {
                  this.$swal
                    .fire('小提示', '產品新增成功', 'success')
                    .then((result) => {
                      this.$router.push({
                        name: 'S02'
                      })
                    })
                } else {
                  this.$swal.fire('小提示', data.msg, 'error')
                }
              })
              .catch((err) => {
                this.loadingStatus = false
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

.border_title {
  background-color: transparent !important;
  position: absolute;
  top: -25px;
  background-color: white;
}
.need:after {
  content: '*';
  color: #f95454;
}
.row_title {
  align-items: center;
  display: flex;
  height: 48px;
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
  border-radius: inherit;
  border-radius: inherit;
}
</style>
