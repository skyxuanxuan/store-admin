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
      <v-tabs-items
        v-model="CurrentPageSectionIndex"
        :class="{ none: loadingStatus }"
      >
        <v-tab-item class="background-color">
          <v-stepper v-model="e1" class="background-color">
            <v-stepper-header class="white">
              <v-stepper-step :complete="e1 > 1" step="1">
                填寫產品
              </v-stepper-step>
              <v-divider />
              <v-stepper-step :complete="e1 > 2" step="2">
                填寫方案
              </v-stepper-step>

              <v-divider />

              <v-stepper-step :complete="e1 > 3" step="3">
                填寫規格
              </v-stepper-step>

              <v-divider />

              <v-stepper-step step="4">
                確認產品
              </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items class="mt-6">
              <v-stepper-content step="1">
                <v-card class="mb-12" flat color="transparent">
                  <v-card-title class="justify-center text-h4 ">
                    新增產品
                  </v-card-title>
                  <v-form ref="step1form" v-model="step2_form.valid">
                    <v-container>
                      <v-row dense>
                        <v-col>
                          <v-card outlined class="pa-4">
                            <v-subheader class="base-color--text border_title inverted-border-radius">
                              ✱產品基本資料
                            </v-subheader>
                            <v-row class="px-4 py-2">
                              <v-col
                                cols="12"
                                sm="3"
                                md="2"
                                class="align-self-center"
                              >
                                產品名稱
                              </v-col>
                              <v-col cols="12" sm="6">
                                <v-text-field
                                  v-model="step1_form.p1"
                                  color="#16261f"
                                  counter="200"
                                  :rules="[rules.required, rules.length(100)]"
                                  label="請填寫產品名稱"
                                  single-line
                                />
                              </v-col>
                            </v-row>
                            <v-row class="px-4">
                              <v-col
                                cols="12"
                                sm="5"
                                md="3"
                                class="align-self-center"
                              >
                                是否參與官方優惠活動
                              </v-col>
                              <v-col cols="12" sm="6">
                                <v-switch
                                  v-model="step1_form.p2"
                                  :label="step1_form.p2 ? '參與' : '目前不用'"
                                  color="success"
                                />
                              </v-col>
                            </v-row>
                            <v-row class="px-4">
                              <v-col cols="12" sm="3" class="align-self-center">
                                產品類型
                              </v-col>
                              <v-col cols="12" sm="9">
                                <v-radio-group row>
                                  <v-radio label="商品類型" value="1" />
                                  <v-radio label="現金類型" value="2" />
                                </v-radio-group>
                              </v-col>
                            </v-row>
                          </v-card>
                        </v-col>
                      </v-row>
                      <v-row dense>
                        <v-col>
                          <v-card outlined class="pa-4" />
                        </v-col>
                      </v-row>

                      <v-row dense>
                        <v-col>
                          <v-card outlined class="pa-4">
                            <v-subheader class="base-color--text">
                              ✱使用期限
                            </v-subheader>
                            <v-radio-group
                              v-model="step2_form.plan_use_radio"
                              row
                            >
                              <v-radio label="依購買日起計" value="1" />
                              <v-radio label="固定到期日" value="2" />
                            </v-radio-group>
                            <v-expand-transition>
                              <v-card
                                v-if="step2_form.plan_use_radio === '1'"
                                flat
                              >
                                <v-text-field
                                  v-model="step2_form.plan_use_day"
                                  color="#16261f"
                                  label="請填寫天數，如未填寫則以90天計算"
                                  single-line
                                  type="number"
                                  hide-spin-buttons
                                />
                              </v-card>
                            </v-expand-transition>
                            <v-expand-transition>
                              <v-card
                                v-if="step2_form.plan_use_radio === '2'"
                                flat
                              >
                                <v-card
                                  class="justify-start d-none d-sm-flex"
                                  flat
                                  tile
                                >
                                  <v-card class="pa-2" flat tile>
                                    <date-picker
                                      v-model="step2_form.plan_use_time[0]"
                                      type="datetime"
                                      placeholder="請選擇開始時間"
                                      :editable="false"
                                    />
                                  </v-card>
                                  <v-card class="pa-2" flat tile>
                                    <v-icon> mdi-tilde </v-icon>
                                  </v-card>
                                  <v-card class="pa-2" flat tile>
                                    <date-picker
                                      v-model="step2_form.plan_use_time[1]"
                                      type="datetime"
                                      placeholder="請選擇結束時間"
                                      :editable="false"
                                      :confirm="true"
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
                                      v-model="step2_form.plan_use_time[0]"
                                      type="datetime"
                                      placeholder="請選擇開始時間"
                                      :editable="false"
                                      :confirm="true"
                                    />
                                  </v-card>
                                  <v-card class="mt-4" flat tile>
                                    <date-picker
                                      v-model="step2_form.plan_use_time[1]"
                                      type="datetime"
                                      placeholder="請選擇結束時間"
                                      :editable="false"
                                      :confirm="true"
                                    />
                                  </v-card>
                                </v-card>
                              </v-card>
                            </v-expand-transition>
                          </v-card>
                        </v-col>
                      </v-row>

                      <v-row dense>
                        <v-col>
                          <v-card outlined class="pa-4">
                            <v-subheader class="base-color--text">
                              ✱販售時間
                            </v-subheader>

                            <v-card flat>
                              <v-card
                                class="justify-start d-none d-sm-flex"
                                flat
                                tile
                              >
                                <v-card class="pa-2" flat tile>
                                  <v-card flat>
                                    <date-picker
                                      v-model="step2_form.plan_sale_time[0]"
                                      type="datetime"
                                      placeholder="請選擇開始時間"
                                      :editable="false"
                                    />
                                  </v-card>
                                </v-card>
                                <v-card class="pa-2" flat tile>
                                  <v-icon> mdi-tilde </v-icon>
                                </v-card>
                                <v-card class="pa-2" flat tile>
                                  <date-picker
                                    v-model="step2_form.plan_sale_time[1]"
                                    type="datetime"
                                    placeholder="請選擇開始時間"
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
                                    v-model="step2_form.plan_sale_time[0]"
                                    type="datetime"
                                    placeholder="請選擇開始時間"
                                    :editable="false"
                                    :confirm="true"
                                  />
                                </v-card>
                                <v-card flat class="mt-4">
                                  <date-picker
                                    v-model="step2_form.plan_sale_time[1]"
                                    type="datetime"
                                    placeholder="請選擇開始時間"
                                    :editable="false"
                                    :confirm="true"
                                  />
                                </v-card>
                              </v-card>
                            </v-card>
                          </v-card>
                        </v-col>
                      </v-row>
                      <v-row dense>
                        <v-col>
                          <v-card outlined class="pa-4">
                            <v-subheader class="base-color--text">
                              ✱方案簡介
                            </v-subheader>
                            <v-textarea
                              v-model="step2_form.plan_intro"
                              auto-grow
                              outlined
                              color="#16261f"
                              label="請輸入方案簡介"
                              rows="4"
                              counter="500"
                              :rules="[rules.required, rules.length(500)]"
                              single-line
                            />
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                  <v-divider />
                  <v-card-actions>
                    <v-btn text outlined @click="$refs.step1form.reset()">
                      清除資料
                    </v-btn>
                    <v-spacer />
                    <v-btn
                      color="primary"
                      :disabled="!step2_form.valid"
                      @click="e1 = 2"
                    >
                      下一步
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-stepper-content>
              <v-stepper-content step="2">
                <v-card class="mb-12" flat>
                  <v-card-title>填寫方案</v-card-title>
                  <v-form ref="step1form" v-model="step2_form.valid">
                    <v-container>
                      <v-row dense>
                        <v-col>
                          <v-card outlined class="pa-4">
                            <v-subheader class="base-color--text">
                              ✱方案名稱
                            </v-subheader>
                            <v-text-field
                              v-model="step2_form.plan_name"
                              color="#16261f"
                              counter="200"
                              :rules="[rules.required, rules.length(200)]"
                              label="請填寫方案名稱"
                              single-line
                            />
                          </v-card>
                        </v-col>
                      </v-row>
                      <v-row dense>
                        <v-col>
                          <v-card outlined class="pa-4">
                            <v-subheader class="base-color--text">
                              ✱使用期限
                            </v-subheader>
                            <v-radio-group
                              v-model="step2_form.plan_use_radio"
                              row
                            >
                              <v-radio label="依購買日起計" value="1" />
                              <v-radio label="固定到期日" value="2" />
                            </v-radio-group>
                            <v-expand-transition>
                              <v-card
                                v-if="step2_form.plan_use_radio === '1'"
                                flat
                              >
                                <v-text-field
                                  v-model="step2_form.plan_use_day"
                                  color="#16261f"
                                  label="請填寫天數，如未填寫則以90天計算"
                                  single-line
                                  type="number"
                                  hide-spin-buttons
                                />
                              </v-card>
                            </v-expand-transition>
                            <v-expand-transition>
                              <v-card
                                v-if="step2_form.plan_use_radio === '2'"
                                flat
                              >
                                <v-card
                                  class="justify-start d-none d-sm-flex"
                                  flat
                                  tile
                                >
                                  <v-card class="pa-2" flat tile>
                                    <date-picker
                                      v-model="step2_form.plan_use_time[0]"
                                      type="datetime"
                                      placeholder="請選擇開始時間"
                                      :editable="false"
                                    />
                                  </v-card>
                                  <v-card class="pa-2" flat tile>
                                    <v-icon> mdi-tilde </v-icon>
                                  </v-card>
                                  <v-card class="pa-2" flat tile>
                                    <date-picker
                                      v-model="step2_form.plan_use_time[1]"
                                      type="datetime"
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
                                      v-model="step2_form.plan_use_time[0]"
                                      type="datetime"
                                      placeholder="請選擇開始時間"
                                      :editable="false"
                                    />
                                  </v-card>
                                  <v-card class="pa-2" flat tile>
                                    <date-picker
                                      v-model="step2_form.plan_use_time[1]"
                                      type="datetime"
                                      placeholder="請選擇結束時間"
                                      :editable="false"
                                    />
                                  </v-card>
                                </v-card>
                              </v-card>
                            </v-expand-transition>
                          </v-card>
                        </v-col>
                      </v-row>

                      <v-row dense>
                        <v-col>
                          <v-card outlined class="pa-4">
                            <v-subheader class="base-color--text">
                              ✱販售時間
                            </v-subheader>

                            <v-card flat>
                              <v-card
                                class="justify-start d-none d-sm-flex"
                                flat
                                tile
                              >
                                <v-card class="pa-2" flat tile>
                                  <v-card flat>
                                    <date-picker
                                      v-model="step2_form.plan_sale_time[0]"
                                      type="datetime"
                                      placeholder="請選擇開始時間"
                                      :editable="false"
                                    />
                                  </v-card>
                                </v-card>
                                <v-card class="pa-2" flat tile>
                                  <v-icon> mdi-tilde </v-icon>
                                </v-card>
                                <v-card class="pa-2" flat tile>
                                  <date-picker
                                    v-model="step2_form.plan_sale_time[1]"
                                    type="datetime"
                                    placeholder="請選擇開始時間"
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
                                    v-model="step2_form.plan_sale_time[0]"
                                    type="datetime"
                                    placeholder="請選擇開始時間"
                                    :editable="false"
                                  />
                                </v-card>
                                <v-card flat>
                                  <date-picker
                                    v-model="step2_form.plan_sale_time[1]"
                                    type="datetime"
                                    placeholder="請選擇開始時間"
                                    :editable="false"
                                  />
                                </v-card>
                              </v-card>
                            </v-card>
                          </v-card>
                        </v-col>
                      </v-row>
                      <v-row dense>
                        <v-col>
                          <v-card outlined class="pa-4">
                            <v-subheader class="base-color--text">
                              ✱方案簡介
                            </v-subheader>
                            <v-textarea
                              v-model="step2_form.plan_intro"
                              auto-grow
                              outlined
                              color="#16261f"
                              label="請輸入方案簡介"
                              rows="4"
                              counter="500"
                              :rules="[rules.required, rules.length(500)]"
                              single-line
                            />
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                  <v-divider />
                  <v-card-actions>
                    <v-btn text outlined @click="$refs.step1form.reset()">
                      清除資料
                    </v-btn>
                    <v-spacer />
                    <v-btn
                      color="primary"
                      :disabled="!step2_form.valid"
                      @click="e1 = 2"
                    >
                      下一步
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-stepper-content>

              <!-- step2 -->
              <v-stepper-content step="3">
                <v-card class="mb-12" flat>
                  <v-form ref="step2form" v-model="step3_form.valid">
                    <transition-group name="fadeLeft">
                      <v-row
                        v-for="(item, index) in step3_form.spec_arr"
                        :key="item.d0"
                        dense
                      >
                        <v-col cols="12">
                          <v-card class="ma-2" flat rounded="false">
                            <v-card-title>填寫規格</v-card-title>
                            <v-toolbar dense flat class="mb-2">
                              <v-toolbar-title>
                                規格 {{ index + 1 }}
                              </v-toolbar-title>
                              <v-spacer />
                              <v-btn
                                v-if="index !== 0"
                                class="right-10"
                                text
                                outlined
                                width="80"
                                @click="step2_remove(index)"
                              >
                                刪除
                              </v-btn>

                              <v-btn
                                v-if="index === 0"
                                color="#16261f"
                                width="160"
                                dark
                                @click="step2_new"
                              >
                                新增規格
                              </v-btn>
                            </v-toolbar>

                            <v-card outlined class="pa-4">
                              <v-subheader class="base-color--text">
                                ✱規格名稱
                              </v-subheader>
                              <v-text-field
                                v-model="item.d1"
                                color="#16261f"
                                counter="200"
                                label="請填寫規格名稱"
                                single-line
                                :rules="[rules.required, rules.length(200)]"
                              />
                              <v-subheader class="base-color--text">
                                ✱規格說明
                              </v-subheader>
                              <v-text-field
                                v-model="item.d2"
                                color="#16261f"
                                counter="20"
                                label="請填寫規格說明名稱"
                                single-line
                                :rules="[rules.required, rules.length(20)]"
                              />
                              <v-subheader class="base-color--text">
                                ✱票券面額選擇
                              </v-subheader>

                              <v-select
                                v-model="item.d3"
                                :items="bulk_arr"
                                label="請選擇票券面額"
                                item-text="bulk_type"
                                item-value="bulk_num"
                                return-object
                                single-line
                                hide-details
                                menu-props="auto"
                                :rules="[rules.required]"
                              />
                              <v-subheader class="base-color--text">
                                ✱販售價格
                              </v-subheader>
                              <v-text-field
                                v-model="item.d4"
                                type="number"
                                hide-spin-buttons
                                prefix="NT$"
                                :rules="[rules.required, rules.price(item.d3)]"
                              />
                              <v-subheader class="base-color--text">
                                ✱販售數量
                              </v-subheader>
                              <v-text-field
                                v-model="item.d5"
                                type="number"
                                hide-spin-buttons
                                :rules="[rules.required, rules.number(item.d3)]"
                              >
                                <v-icon
                                  slot="append-outer"
                                  color="red"
                                  @click="step2_num_modify(1, index)"
                                >
                                  mdi-plus
                                </v-icon>
                                <v-icon
                                  slot="prepend"
                                  color="green"
                                  @click="step2_num_modify(2, index)"
                                >
                                  mdi-minus
                                </v-icon>
                              </v-text-field>
                            </v-card>
                            <v-divider class="mt-8" />
                          </v-card>
                        </v-col>
                      </v-row>
                    </transition-group>
                  </v-form>
                  <v-card-actions>
                    <v-btn color="primary" @click="e1 = 1">
                      上一步
                    </v-btn>
                    <v-spacer />
                    <v-btn
                      color="primary"
                      :disabled="!step3_form.valid"
                      @click="e1 = 3"
                    >
                      下一步
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-stepper-content>

              <!-- step3 -->
              <v-stepper-content step="4">
                <v-card class="mb-12" flat>
                  <v-card-title>確認產品</v-card-title>
                  <v-simple-table>
                    <template #default>
                      <tbody>
                        <tr>
                          <td>方案名稱</td>
                          <td>
                            {{ step2_form.plan_name }}
                          </td>
                        </tr>
                        <tr>
                          <td>使用期限</td>
                          <td>{{ step3_use_time }}</td>
                        </tr>
                        <tr>
                          <td>販售時間</td>
                          <td>{{ step3_sale_time }}</td>
                        </tr>
                        <tr>
                          <td>方案簡介</td>
                          <td>
                            <v-textarea
                              v-model="step2_form.plan_intro"
                              outlined
                              color="#16261f"
                              disabled
                              class="top-15"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                  <v-divider />
                  <v-expansion-panels flat>
                    <v-expansion-panel
                      v-for="(item, index) in step3_form.spec_arr"
                      :key="item.d0"
                    >
                      <v-expansion-panel-header>
                        規格{{ index + 1 }} - {{ item.d1 }}
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-simple-table>
                          <template #default>
                            <tbody>
                              <tr>
                                <td>規格名稱</td>
                                <td>{{ item.d1 }}</td>
                              </tr>
                              <tr>
                                <td>規格說明</td>
                                <td>{{ item.d2 }}</td>
                              </tr>
                              <tr>
                                <td>面額</td>
                                <td>{{ item.d3.bulk_type }}</td>
                              </tr>
                              <tr>
                                <td>售價</td>
                                <td>{{ item.d4 | toDollars }}</td>
                              </tr>
                              <tr>
                                <td>數量</td>
                                <td>
                                  {{ item.d5 | numberWithCommas }}
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
                    <v-btn color="primary" @click="e1 = 2">
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
          <v-btn color="green darken-1" text @click="step2_check_bulk = false">
            確定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <to-top />
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import moment from 'moment'
import 'vue2-datepicker/index.css'
import { set } from 'vue'
import util from '~/assets/js/util'
import ToTop from '~/components/ToTop.vue'

export default {
  name: 'IndexPage',
  title: '門市票券(整批發行) - 新增產品',
  components: { ToTop, DatePicker },
  layout: 'adminLayout',
  data() {
    return {
      loadingStatus: true,
      CurrentPageSectionIndex: 0,
      title: '門市票券(整批發行) - 新增產品',
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
        p1: '',
        p2: false
      },
      step2_form: {
        valid: false,
        plan_name: '',
        plan_intro: '',
        plan_use_radio: '1',
        plan_use_day: null,
        plan_use_time: [null, null],
        plan_sale_time: [null, null]
      },
      step3_form: {
        valid: false,
        spec_arr: [
          {
            d0: util._uuid(),
            d1: '',
            d2: '',
            d3: null,
            d4: null,
            d5: null
          }
        ]
      },
      rules: {
        length: len => v => (v || '').length <= len || `長度不得超過 ${len}`,
        required: v => !!v || '此欄位為必填',
        number: num => (v) => {
          if (num === null) {
            return '請先選擇面額'
          }
          let total = 0
          this.step3_form.spec_arr
            .filter(x => x.d3 !== null && x.d3.bulk_type === num.bulk_type)
            .forEach((item) => {
              total += parseInt(item.d5.toString().length > 0 ? item.d5 : '0')
            })
          if (!(!!v && total <= num.bulk_num)) {
            return `販售數量不得超過 ${num.bulk_num}`
          }
          return true
        },
        price: num => v =>
          (!!v &&
            num !== null &&
            parseInt(v) >= 0 &&
            parseInt(v) <= num.bulk_type) ||
          (num !== null ? `販售價格介於 0 ~ ${num.bulk_type}` : '請先選擇面額')
      }
    }
  },
  computed: {
    step3_use_time() {
      if (this.step2_form.plan_use_radio === '1') {
        const day = this.step2_form.plan_use_day ?? 90
        return ' ~ ' + moment().add(day, 'day').format('YYYY-MM-DD hh:mm')
      } else {
        const sdate = this.step2_form.plan_use_time[0]
        const edate = this.step2_form.plan_use_time[1]
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
    step3_sale_time() {
      const sdate = this.step2_form.plan_sale_time[0]
      const edate = this.step2_form.plan_sale_time[1]
      if (sdate === null && edate === null) {
        return '無販售期限'
      } else {
        return (
          (sdate === null ? '' : moment(sdate).format('YYYY-MM-DD hh:mm')) +
          ' ~ ' +
          (edate === null ? '' : moment(edate).format('YYYY-MM-DD hh:mm'))
        )
      }
    }
  },
  methods: {
    step2_new() {
      this.step3_form.spec_arr.push({
        d0: util._uuid(),
        d1: '',
        d2: '',
        d3: null,
        d4: null,
        d5: null
      })
      const text = `
        This is notification text!<br>
        Date: ${new Date()}
      `

      setTimeout(() => {
        this.$notify({
          title: "Test '' notification #",
          text,
          type: 'success',
          duration: 2000
        })
      }, 1000)
    },
    step2_remove(index) {
      this.step3_form.spec_arr.splice(index, 1)
      this.$refs.step2form.validate()
    },
    step2_num_modify(type, val) {
      if (this.step3_form.spec_arr[val].d5 === null) {
        set(this.step3_form.spec_arr[val], 'd5', 0)
      }

      const value = parseInt(this.step3_form.spec_arr[val].d5)
      if (type === 1) {
        set(this.step3_form.spec_arr[val], 'd5', value + 1)
      } else if (value > 0) {
        set(this.step3_form.spec_arr[val], 'd5', value - 1)
      }
    },

    final_submit() {
      console.log(this.step2_form)
      console.log(this.step3_form)
      if (!this.step2_form.valid) {
        this.$swal.fire('Oops!', '步驟一部分項目錯誤，請重新確認', 'error')
        return
      }

      if (!this.step3_form.valid) {
        this.$swal.fire('Oops!', '步驟二部分項目錯誤，請重新確認', 'error')
        return
      }

      const form = {}
      form.type = 'I'
      form.step1 = this.step2_form
      form.step2 = this.step3_form

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
            this.$router.push({
              name: 'S01'
            })
            /*
            this.$axios
              .post('/S01/product', form)
              .then((response) => {
                this.$swal.fire('小提示', '產品新增成功', 'success')
              })
              .catch((err) => {
                console.log(err)
              })
              */
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
  position: absolute;
  top: -25px;
  background-color: white;
}

.inverted-border-radius::before {
  content: "";
  position: absolute;
  background-color: #0074D9;
  bottom: -50px;
  height: 50px;
  width: 25px;
  border-top-left-radius: 25px;
  box-shadow: 0 -25px 0 0 #F66969;
}

</style>
