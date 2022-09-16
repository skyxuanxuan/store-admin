<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <v-app-bar color="white" app>
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
              <v-list-item-title>申請空白票券</v-list-item-title>
            </v-list-item>
            <v-list-item @click="step2_check_bulk = true">
              <v-list-item-icon>
                <v-icon>mdi-magnify</v-icon>
              </v-list-item-icon>
              <v-list-item-title>查看現存票券</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>

      <v-btn
        class="d-none d-sm-flex right-10"
        color="brownS1"
        width="140"
        rounded
        outlined
        dark
        @click="step2_check_bulk = true"
      >
        查看現存票券
      </v-btn>
    </v-app-bar>
    <div class="pa-4">
      <v-tabs-items v-model="CurrentPageSectionIndex">
        <v-tab-item class="background-color">
          <v-stepper v-model="e1" class="background-color">
            <v-stepper-header class="white">
              <v-stepper-step :complete="e1 > 1" step="1">
                填寫產品
              </v-stepper-step>

              <v-divider />

              <v-stepper-step :complete="e1 > 2" step="2">
                填寫產品說明
              </v-stepper-step>

              <v-divider />

              <v-stepper-step step="3">
                確認產品
              </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items class="mt-2">
              <v-stepper-content step="1" class="pa-0">
                <v-card
                  max-width="1150"
                  flat
                  color="transparent"
                  style="margin: 0 auto; margin-bottom: 64px"
                >
                  <v-card-title class="justify-center text-h4">
                    編輯產品資訊
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
                                <div class="row_title font-weight-medium">
                                  產品簡稱
                                </div>
                              </v-col>
                              <v-col cols="12" sm="6">
                                <v-text-field
                                  v-model="step1_form.p6"
                                  dense
                                  outlined
                                  color="#16261f"
                                  counter="100"
                                  :rules="[rules.length(10)]"
                                  label="請填寫產品簡稱"
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
                                sm="3"
                                md="2"
                                class="align-self-center"
                              >
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
                                  <v-radio
                                    color="greenS1"
                                    label="商品類型"
                                    value="1"
                                  />
                                  <v-radio
                                    color="greenS1"
                                    label="現金類型"
                                    value="2"
                                  />
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
                                  color="greenS1"
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

                            <v-row dense class="px-4 py-2">
                              <v-col cols="12" sm="3" md="2">
                                <div class="row_title font-weight-medium">
                                  使用期限
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
                                      如未填寫，系統將自動設定為無期限
                                    </span>
                                  </v-tooltip>
                                </div>
                              </v-col>
                              <v-col cols="12" sm="9">
                                <v-radio-group
                                  v-model="step1_form.p7"
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
                                  <v-card v-if="step1_form.p7 === '1'" flat>
                                    <v-text-field
                                      v-model="step1_form.p7_d"
                                      color="#16261f"
                                      label="請填寫天數"
                                      single-line
                                      type="number"
                                      hide-spin-buttons
                                    />
                                  </v-card>
                                </v-expand-transition>
                                <v-expand-transition>
                                  <v-card v-if="step1_form.p7 === '2'" flat>
                                    <v-card
                                      class="justify-start d-none d-sm-flex"
                                      flat
                                      tile
                                    >
                                      <v-card class="pa-2" flat tile>
                                        <date-picker
                                          v-model="step1_form.p7_t[0]"
                                          type="date"
                                          placeholder="請選擇開始時間"
                                          :editable="false"
                                          @change="changeDate(1)"
                                        />
                                      </v-card>
                                      <v-card class="pa-2" flat tile>
                                        <v-icon> mdi-tilde </v-icon>
                                      </v-card>
                                      <v-card class="pa-2" flat tile>
                                        <date-picker
                                          v-model="step1_form.p7_t[1]"
                                          type="date"
                                          placeholder="請選擇結束時間"
                                          :editable="false"
                                          @change="changeDate(1)"
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
                                          v-model="step1_form.p7_t[0]"
                                          type="date"
                                          placeholder="請選擇開始時間"
                                          :editable="false"
                                          :confirm="true"
                                          @change="changeDate(1)"
                                        />
                                      </v-card>
                                      <v-card class="mt-4" flat tile>
                                        <date-picker
                                          v-model="step1_form.p7_t[1]"
                                          type="date"
                                          placeholder="請選擇結束時間"
                                          :editable="false"
                                          :confirm="true"
                                          @change="changeDate(1)"
                                        />
                                      </v-card>
                                    </v-card>
                                  </v-card>
                                </v-expand-transition>
                              </v-col>
                            </v-row>

                            <v-row dense class="px-4 py-2">
                              <v-col cols="6" sm="3" md="2">
                                <div class="row_title font-weight-medium need">
                                  票券面額
                                </div>
                              </v-col>
                              <v-col cols="6" sm="6">
                                <v-select
                                  v-model="step1_form.p8"
                                  :items="bulk_arr"
                                  label="票券面額"
                                  item-text="bulk_type"
                                  item-value="bulk_num"
                                  prefix="NT$"
                                  return-object
                                  single-line
                                  hide-details
                                  menu-props="auto"
                                  :rules="[rules.required]"
                                  @change="$refs.step1form.validate()"
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
                                  v-model="step1_form.p9"
                                  type="number"
                                  hide-spin-buttons
                                  prefix="NT$"
                                  :rules="[
                                    rules.required,
                                    rules.positive,
                                    rules.integer,
                                    rules.price
                                  ]"
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
                                <v-text-field
                                  v-model="step1_form.p10"
                                  type="number"
                                  hide-spin-buttons
                                  class="pt-0"
                                  :rules="[rules.required, rules.number]"
                                >
                                  <v-icon
                                    slot="append-outer"
                                    color="red"
                                    @click="step1NumModify(1, 1)"
                                  >
                                    mdi-plus
                                  </v-icon>
                                  <v-icon
                                    slot="prepend"
                                    color="green"
                                    @click="step1NumModify(2, 1)"
                                  >
                                    mdi-minus
                                  </v-icon>
                                </v-text-field>
                              </v-col>
                            </v-row>
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

              <!-- step2 -->
              <v-stepper-content step="2">
                <v-card
                  max-width="1150"
                  flat
                  color="transparent"
                  style="margin: 0 auto; margin-bottom: 64px"
                >
                  <v-card-title class="justify-center text-h4">
                    編輯產品說明
                  </v-card-title>
                  <v-form ref="step2form" v-model="step2_form.valid">
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
                                @click="step2_new"
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
                            v-for="item in step2_form.infoArr"
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
                              v-for="(item, index) in step2_form.infoCus"
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
                              <v-col
                                cols="12"
                                sm="9"
                                style="position: relative"
                              >
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
                                      @click="step2_remove(index)"
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
                  </v-form>
                  <v-card-actions>
                    <v-btn color="primary" @click="e1 = 0">
                      上一步
                    </v-btn>
                    <v-spacer />
                    <v-btn
                      color="primary"
                      :disabled="!step2_form.valid"
                      @click="step2ToStep3"
                    >
                      下一步
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-stepper-content>

              <!-- step3 -->
              <v-stepper-content step="3">
                <v-card
                  max-width="1150"
                  flat
                  color="transparent"
                  style="margin: 0 auto; margin-bottom: 64px"
                >
                  <v-card-title class="justify-center text-h4">
                    產品確認
                  </v-card-title>
                  <v-card rounded="xl">
                    <v-container>
                      <v-row dense class="border_bottom px-4 py-1">
                        <v-col cols="12" md="2">
                          <span>
                            <v-icon style="top: -3px" color="brownS1">
                              mdi-pound
                            </v-icon>
                          </span>
                          <span
                            class="text-subtitle-1 font-weight-bold font_size1-1 custom-brown1-2--text"
                          >產品名稱</span>
                        </v-col>
                        <v-col cols="12" md="10" class="text-subtitle-1">
                          <div class="px-2">
                            {{ step1_form.p1 }}
                          </div>
                        </v-col>
                      </v-row>
                      <v-row dense class="border_bottom px-4 py-1">
                        <v-col cols="12" md="2">
                          <span>
                            <v-icon style="top: -3px" color="brownS1">
                              mdi-pound
                            </v-icon>
                          </span>
                          <span
                            class="text-subtitle-1 font-weight-bold font_size1-1 custom-brown1-2--text"
                          >產品簡介</span>
                        </v-col>
                        <v-col cols="12" md="10" class="text-subtitle-1">
                          <div class="px-2">
                            {{ step1_form.p2 }}
                          </div>
                        </v-col>
                      </v-row>
                      <v-row dense class="border_bottom px-4 py-1">
                        <v-col cols="12" md="2">
                          <span>
                            <v-icon style="top: -3px" color="brownS1">
                              mdi-pound
                            </v-icon>
                          </span>
                          <span
                            class="text-subtitle-1 font-weight-bold font_size1-1 custom-brown1-2--text"
                          >產品類型</span>
                        </v-col>
                        <v-col cols="12" md="10" class="text-subtitle-1">
                          <div class="px-2">
                            {{
                              step1_form.p4 === '1' ? '商品票券' : '現金票券'
                            }}
                          </div>
                        </v-col>
                      </v-row>
                      <v-row dense class="border_bottom px-4 py-1">
                        <v-col cols="12" md="2">
                          <span>
                            <v-icon style="top: -3px" color="brownS1">
                              mdi-pound
                            </v-icon>
                          </span>
                          <span
                            class="text-subtitle-1 font-weight-bold font_size1-1 custom-brown1-2--text"
                          >產品分類</span>
                        </v-col>
                        <v-col cols="12" md="10" class="text-subtitle-1">
                          <div class="px-2">
                            {{ final_class }}
                          </div>
                        </v-col>
                      </v-row>
                      <v-row dense class="border_bottom px-4 py-1">
                        <v-col cols="12" md="2">
                          <span>
                            <v-icon style="top: -3px" color="brownS1">
                              mdi-pound
                            </v-icon>
                          </span>
                          <span
                            class="text-subtitle-1 font-weight-bold font_size1-1 custom-brown1-2--text"
                          >使用期限</span>
                        </v-col>
                        <v-col cols="12" md="10" class="text-subtitle-1">
                          <div class="px-2">
                            {{ final_use_time }}
                          </div>
                        </v-col>
                      </v-row>
                      <v-row
                        v-for="(item, index) in step2_form.infoArr"
                        :key="item.id"
                        dense
                        class="px-4 py-1"
                        :class="{
                          border_bottom:
                            index !==
                            step2_form.infoArr.length +
                            step2_form.infoCus.length -
                            1
                        }"
                      >
                        <v-col cols="12" md="2">
                          <span>
                            <v-icon style="top: -3px" color="brownS1">
                              mdi-pound
                            </v-icon>
                          </span>
                          <span
                            class="text-subtitle-1 font-weight-bold font_size1-1 custom-brown1-2--text"
                          >{{ item.title }}</span>
                        </v-col>
                        <v-col
                          cols="12"
                          md="10"
                          class="text-subtitle-1"
                          v-html="item.content"
                        />
                      </v-row>
                      <v-row
                        v-for="(item, index) in step2_form.infoCus"
                        :key="item.id"
                        dense
                        class="px-4 py-1"
                        :class="{
                          border_bottom: index !== step2_form.infoCus.length - 1
                        }"
                      >
                        <v-col cols="12" md="2">
                          <span>
                            <v-icon style="top: -3px" color="brownS1">
                              mdi-pound
                            </v-icon>
                          </span>
                          <span
                            class="text-subtitle-1 font-weight-bold font_size1-1 custom-brown1-2--text"
                          >{{ item.title }}</span>
                        </v-col>
                        <v-col
                          cols="12"
                          md="10"
                          class="text-subtitle-1"
                          v-html="item.content"
                        />
                      </v-row>
                    </v-container>
                  </v-card>
                  <v-divider class="mt-4" />
                  <v-card-actions>
                    <v-btn outlined @click="e1 = 1">
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
        </v-tab-item>
      </v-tabs-items>
    </div>
    <v-dialog v-model="step2_check_bulk" max-width="580">
      <v-card>
        <v-card-title class="text-h5">
          各面額剩餘票券
        </v-card-title>
        <v-card-text>
          <v-simple-table>
            <template #default>
              <thead>
                <tr>
                  <th class="text-left">
                    面額
                  </th>
                  <th class="text-left">
                    剩餘數量
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in bulk_arr" :key="item.name">
                  <td>面額「{{ item.bulk_type }}」</td>
                  <td>{{ item.bulk_num | numberWithCommas }} 張</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="step2_check_bulk = false">
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
import { mapGetters } from 'vuex'
import DatePicker from 'vue2-datepicker'
import moment from 'moment'
import 'vue2-datepicker/index.css'
import util from '~/assets/js/util'
import ToTop from '~/components/ToTop.vue'

export default {
  name: 'IndexPage',
  title: '門市票券(整批發行) - 新增產品',
  components: { ToTop, DatePicker },
  layout: 'adminLayout',
  async asyncData({ store }) {
    await store.dispatch('S01/fetchBulkTicketsList')
  },
  data() {
    return {
      loadingStatus: false,
      CurrentPageSectionIndex: 0,
      title: '門市票券(整批發行) - 新增產品',
      time2: null,
      e1: 1,

      bulk_selection: null,
      step2_check_bulk: false,

      step1_form: {
        valid: false,
        p1: '',
        p2: '',
        p3: false,
        p4: '1',
        p5: [],
        p6: '',
        p7: '1',
        p7_d: null,
        p7_t: [null, null],
        p8: null,
        p9: null,
        p10: null
      },

      step2_form: {
        valid: false,
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
      rules: {
        required: v => !!v || '此欄位為必填',
        length: len => v => (v || '').length <= len || `長度不得超過 ${len}`,
        classesLen: len => (v) => {
          if (v.length === 0) {
            return '請選擇分類'
          }
          if (v.length > len) {
            return `分類不得超過 ${len}項`
          }
          return true
        },
        number: (v) => {
          if (this.step1_form.p8 === null) {
            return '請先選擇面額'
          }
          if (!(!!v && parseInt(v) <= this.step1_form.p8.bulk_num)) {
            return `販售數量不得超過 ${this.step1_form.p8.bulk_num}`
          }
          return true
        },
        price: (v) => {
          if (this.step1_form.p8 === null) {
            return '請先選擇面額'
          }
          if (
            !(
              !!v &&
              parseInt(v) >= 0 &&
              parseInt(v) <= parseInt(this.step1_form.p8.bulk_type)
            )
          ) {
            return `販售價格介於 0 ~ ${this.step1_form.p8.bulk_type}`
          }
          return true
        },
        positive: v => (!!v && parseInt(v) >= 0) || '價格不能為負值',
        integer: v => (!!v && !/[^0-9]/.test(v.toString())) || '價格為整數'
      }
    }
  },
  computed: {
    ...mapGetters({
      productClasses: 'basic/getClasses',
      bulk_arr: 'S01/getBulkTickets'
    }),
    final_class() {
      return this.step1_form.p5.map(x => x.name).join('/ ')
    },
    final_use_time() {
      if (this.step1_form.p7 === '1') {
        if (
          (this.step1_form.p7_d ?? '').toString().length > 0 &&
          (this.step1_form.p7_d ?? '').toString() !== '0'
        ) {
          const day = this.step1_form.p7_d
          return `依購買日起迄 ${day}天`
        } else {
          return '無使用期限'
        }
      } else {
        const sdate = this.step1_form.p7_t[0]
        const edate = this.step1_form.p7_t[1]
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
    }
  },
  methods: {
    changeDate(col) {
      if (col === 1) {
        const sdate = this.step1_form.p7_t[0]
        const edate = this.step1_form.p7_t[1]
        if (sdate !== null && edate !== null) {
          if (sdate.getTime() > edate.getTime()) {
            this.step1_form.p7_t = [edate, sdate]
          }
        }
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
      if (this.step1_form.valid) {
        this.e1 = 2
        this.$nextTick(() => {
          setTimeout(() => {
            this.$vuetify.goTo(0)
          }, 500)
        })
      } else {
        this.$swal.fire('小提示', '步驟一部分項目錯誤', 'warning')
      }
    },

    step2ToStep3() {
      let check = true
      let checkMsg = ''

      this.step2_form.infoArr.forEach((item) => {
        this.$set(item, 'valid', false)
        if (item.content.length === 0) {
          this.$set(item, 'valid', true)
          checkMsg = `請填寫「${item.title}」`
          check = false
        }
      })
      this.step2_form.infoCus.forEach((item) => {
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
        this.e1 = 3
        this.$nextTick(function () {
          setTimeout(() => {
            this.$vuetify.goTo(0)
          }, 500)
        })
      } else {
        this.$swal.fire('小提示', checkMsg, 'warning')
      }
    },

    step1_reset() {
      this.$refs.step1form.reset()
    },

    step1NumModify(type, col) {
      if (col === 1) {
        if (this.step1_form.p10 === null) {
          this.$set(this.step1_form, 'p10', 0)
        }

        const value = parseInt(this.step1_form.p10)
        if (type === 1) {
          this.$set(this.step1_form, 'p10', value + 1)
        } else if (value > 0) {
          this.$set(this.step1_form, 'p10', value - 1)
        }
      }
    },

    step2_new() {
      if (this.step2_form.infoCus.length >= 2) {
        this.$notify({
          title: '小提示',
          text: '產品說明新增上限為2個',
          type: 'warning',
          duration: 5000
        })
        return
      }
      this.step2_form.infoCus.push({
        id: util._uuid(),
        title: '新增標題',
        content: ''
      })
    },
    step2_remove(index) {
      this.step2_form.infoCus.splice(index, 1)
      this.$refs.step2form.validate()
    },

    final_submit() {
      if (!this.step1_form.valid) {
        this.$swal.fire('Oops!', '步驟一部分項目錯誤，請重新確認', 'error')
        return
      }

      if (!this.step2_form.valid) {
        this.$swal.fire('Oops!', '步驟二部分項目錯誤，請重新確認', 'error')
        return
      }

      let check1 = true
      this.step2_form.infoArr.forEach((item) => {
        if ((item.content ?? '').length === 0) {
          check1 = false
        }
      })
      this.step2_form.infoCus.forEach((item) => {
        if ((item.title ?? '').length === 0) {
          check1 = false
        }
        if ((item.content ?? '').length === 0) {
          check1 = false
        }
      })
      if (!check1) {
        this.$swal.fire('Oops!', '步驟二部分項目錯誤，請重新確認', 'error')
        return
      }

      let days = this.step1_form.p7_d
      if (this.step1_form.p7 === '1') {
        if (days === null || days.toString() === '0') {
          days = '-1'
        } else if (parseInt(days) <= 0) {
          this.$swal.fire('小提示', '使用期限不得小於0')
          return
        }
      }

      if (this.step1_form.p8 === null) {
        this.$swal.fire('小提示', '請選擇面額')
        return
      }

      if (
        this.step1_form.p9 === null ||
        parseInt(this.step1_form.p8.bulk_type) < parseInt(this.step1_form.p9)
      ) {
        this.$swal.fire(
          '小提示',
          `販售價格介於 0 ~ ${this.step1_form.p8.bulk_type}`
        )
        return
      }

      if (
        this.step1_form.p10 === null ||
        parseInt(this.step1_form.p8.bulk_num) < parseInt(this.step1_form.p10)
      ) {
        this.$swal.fire(
          '小提示',
          `販售數量不得超過 ${this.step1_form.p8.bulk_num}`
        )
        return
      }

      const s1 = {}
      s1.p1 = this.step1_form.p1
      s1.p2 = this.step1_form.p2
      s1.p4 = this.step1_form.p4
      s1.p5 = this.step1_form.p5.map(x => x.id).join(';')
      s1.p6 = this.step1_form.p6 // short name
      s1.p7 = this.step1_form.p7
      s1.p7_d = (days ?? '-1').toString()
      s1.p7_t = [
        util.dateTime2String(this.step1_form.p7_t[0]),
        util.dateTime2String(this.step1_form.p7_t[1])
      ]
      s1.p8 = this.step1_form.p8.bulk_type
      s1.p9 = this.step1_form.p9
      s1.p10 = this.step1_form.p10

      const s2 = {}
      s2.infoArr = this.step2_form.infoArr.map((x) => {
        return {
          title: x.title,
          content: x.content
        }
      })
      s2.infoCus = this.step2_form.infoCus.map((x) => {
        return {
          title: x.title,
          content: x.content
        }
      })

      const form = {}
      form.s1 = s1
      form.s2 = s2

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
            this.$axios
              .post('/S01/product', form)
              .then((response) => {
                const data = response.data
                if (data.res === 'CODE0000') {
                  this.$swal.fire('小提示', data.msg, 'success').then(() => {
                    this.$router.push({
                      name: 'S01'
                    })
                  })
                } else {
                  this.$swal.fire('小提示', data.msg, 'error')
                }
              })
              .catch((err) => {
                console.log(err)
              })
          }
        })
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
</style>
