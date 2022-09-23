<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <v-app-bar color="white" app>
      <v-app-bar-nav-icon color="brownS1" @click="$parent.$emit('eventname')" />

      <v-toolbar-title class="custom-brown1-2--text">
        {{ title }}
      </v-toolbar-title>

      <v-spacer />

      <v-btn
        v-if="storeEdit"
        class="right-10"
        color="other1"
        :width="mobile ? 40 : 140"
        outlined
        rounded
        @click="sec1ModifyCancel"
      >
        取消
      </v-btn>
      <v-btn
        v-if="storeEdit"
        color="other2"
        :width="mobile ? 40 : 140"
        rounded
        :dark="storeValid"
        :disabled="!storeValid"
        @click="sec1ModifySubmit"
      >
        儲存
      </v-btn>
    </v-app-bar>
    <div class="ma-4">
      <v-card
        max-width="1150"
        flat
        color="transparent"
        style="margin: 0 auto; margin-bottom: 64px"
      >
        <v-card :class="{ 'mt-2': !mobile }" flat color="transparent">
          <v-container :class="{ 'pa-0': mobile }">
            <v-form ref="modifyForm" v-model="storeValid">
              <v-row class="">
                <v-col>
                  <v-card
                    class="cus_ui_card py-4"
                    :class="{'mt-4': !mobile}"
                    :flat="mobile"
                    :rounded="!mobile ? 'xl' : ''"
                  >
                    <v-subheader
                      v-if="!mobile"
                      class="base-color--text border_title"
                    >
                      <v-chip color="brown lighten-3" dark>
                        產品基本資料
                      </v-chip>
                    </v-subheader>

                    <v-card-title
                      v-if="mobile"
                      class="custom-brown1-3--text pt-0"
                    >
                      <span class="master_title">產品基本資料</span>
                    </v-card-title>
                    <v-card v-if="mobile" flat class="cus_mobile_card" :class="{'mobile': mobile}">
                      <v-card flat class="mx-auto">
                        <v-img
                          max-height="60"
                          max-width="60"
                          contain
                          class="mx-auto"
                          :src="logo"
                        >
                          <template #placeholder>
                            <v-row
                              class="fill-height ma-0"
                              align="center"
                              justify="center"
                            >
                              <v-progress-circular
                                indeterminate
                                color="grey lighten-5"
                              />
                            </v-row>
                          </template>
                        </v-img>
                        <v-card-title
                          class="justify-center text-h6 custom-brown2-3--text py-2"
                        >
                          Logo
                        </v-card-title>
                      </v-card>

                      <div class="cus_mobile_card_row">
                        <div class="cus_mobile_card_header">
                          編號
                        </div>
                        <div class="cus_mobile_card_cell">
                          {{ storeInfo.storeNo }}
                        </div>
                      </div>
                      <div class="cus_mobile_card_row">
                        <div class="cus_mobile_card_header">
                          名稱
                        </div>
                        <div class="cus_mobile_card_cell">
                          {{ storeInfo.storeBusinessName }}
                        </div>
                      </div>
                      <div class="cus_mobile_card_row">
                        <div class="cus_mobile_card_header">
                          電話
                        </div>
                        <div v-if="!storeEdit" class="cus_mobile_card_cell">
                          {{ businessTel }}
                        </div>
                        <div v-else class="cus_mobile_card_cell">
                          <v-text-field
                            v-model="modifyObj.d1"
                            dense
                            outlined
                            color="#16261f"
                            counter="50"
                            label="請填寫電話"
                            single-line
                          />
                        </div>
                      </div>
                      <div class="cus_mobile_card_row">
                        <div class="cus_mobile_card_header">
                          營業時間
                        </div>
                        <div v-if="!storeEdit" class="cus_mobile_card_cell">
                          {{ storeInfo.storeBusinessTime }}
                        </div>
                        <div v-else class="cus_mobile_card_cell">
                          <v-text-field
                            v-model="modifyObj.d2"
                            dense
                            outlined
                            color="#16261f"
                            counter="50"
                            label="請填寫營業時間"
                            single-line
                          />
                        </div>
                      </div>
                      <div class="cus_mobile_card_row">
                        <div class="cus_mobile_card_header">
                          簡介
                        </div>
                        <div
                          v-if="!storeEdit"
                          class="cus_mobile_card_cell"
                          v-html="businessIntro"
                        />
                        <div v-else class="cus_mobile_card_cell">
                          <v-textarea
                            v-model="modifyObj.d3"
                            outlined
                            color="#16261f"
                            counter="200"
                            label="請填寫簡介"
                            auto-grow
                            single-line
                            rows="3"
                          />
                        </div>
                      </div>
                      <div class="cus_mobile_card_row">
                        <div class="cus_mobile_card_header">
                          消費品項
                        </div>
                        <div
                          v-if="!storeEdit"
                          class="cus_mobile_card_cell"
                          v-html="businessConsumption"
                        />
                        <div v-else class="cus_mobile_card_cell">
                          <v-textarea
                            v-model="modifyObj.d4"
                            outlined
                            color="#16261f"
                            counter="500"
                            label="請填寫消費品項"
                            auto-grow
                            single-line
                            rows="3"
                          />
                        </div>
                      </div>
                      <div class="cus_mobile_card_row">
                        <div class="cus_mobile_card_header">
                          整批發行額度
                        </div>
                        <div class="cus_mobile_card_cell">
                          {{ storeInfo.storeAmount | toDollars }}
                        </div>
                      </div>
                    </v-card>

                    <v-card v-else flat>
                      <v-card
                        flat
                        :max-width="logoSize + 40"
                        style="position: absolute; right: 5%; top: 2rem"
                      >
                        <v-img
                          :max-height="logoSize"
                          :max-width="logoSize"
                          contain
                          :src="logo"
                        >
                          <template #placeholder>
                            <v-row
                              class="fill-height ma-0"
                              align="center"
                              justify="center"
                            >
                              <v-progress-circular
                                indeterminate
                                color="grey lighten-5"
                              />
                            </v-row>
                          </template>
                        </v-img>
                        <v-card-title
                          class="justify-center text-h6 custom-brown2-3--text"
                        >
                          Logo
                        </v-card-title>
                      </v-card>
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
                              編號
                            </span>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <div class="row_content font-weight-light">
                            {{ storeInfo.storeNo }}
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
                              名稱
                            </span>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <div class="row_content font-weight-light">
                            {{ storeInfo.storeBusinessName }}
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
                              電話
                            </span>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <div
                            v-if="!storeEdit"
                            class="row_content font-weight-light"
                          >
                            {{ businessTel }}
                          </div>
                          <div v-else class="row_content">
                            <v-text-field
                              v-model="modifyObj.d1"
                              dense
                              outlined
                              color="#16261f"
                              counter="50"
                              label="請填寫電話"
                              single-line
                            />
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
                              營業時間
                            </span>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <div
                            v-if="!storeEdit"
                            class="row_content font-weight-light"
                          >
                            {{ storeInfo.storeBusinessTime }}
                          </div>
                          <div v-else class="row_content">
                            <v-text-field
                              v-model="modifyObj.d2"
                              dense
                              outlined
                              color="#16261f"
                              counter="50"
                              label="請填寫營業時間"
                              single-line
                            />
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
                              簡介
                            </span>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <div
                            v-if="!storeEdit"
                            class="row_content"
                            v-html="businessIntro"
                          />
                          <div v-else class="row_content">
                            <v-textarea
                              v-model="modifyObj.d3"
                              outlined
                              color="#16261f"
                              counter="200"
                              label="請填寫簡介"
                              auto-grow
                              single-line
                              rows="3"
                            />
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
                              消費品項
                            </span>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <div
                            v-if="!storeEdit"
                            class="row_content"
                            v-html="businessConsumption"
                          />
                          <div v-else class="row_content">
                            <v-textarea
                              v-model="modifyObj.d4"
                              outlined
                              color="#16261f"
                              counter="500"
                              label="請填寫消費品項"
                              auto-grow
                              single-line
                              rows="3"
                            />
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
                              整批發行額度
                            </span>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <div class="row_content">
                            {{ storeInfo.storeAmount | toDollars }}
                          </div>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-card>
                </v-col>
              </v-row>
              <v-row class="mt-8">
                <v-col>
                  <v-card
                    class="cus_ui_card py-4"
                    :flat="mobile"
                    :rounded="!mobile ? 'xl' : ''"
                  >
                    <v-subheader
                      v-if="!mobile"
                      class="base-color--text border_title"
                    >
                      <v-chip color="brown lighten-3" dark>
                        店家位置
                      </v-chip>
                    </v-subheader>

                    <v-card-title
                      v-if="mobile"
                      class="custom-brown1-3--text pt-0"
                    >
                      <span class="master_title">店家位置</span>
                    </v-card-title>
                    <!-- Mobile -->
                    <v-card v-if="mobile" flat class="cus_mobile_card" :class="{'mobile': mobile}">
                      <div class="cus_mobile_card_row">
                        <div class="cus_mobile_card_header">
                          縣市
                        </div>
                        <div v-if="!storeEdit" class="cus_mobile_card_cell">
                          {{ businessCity }}
                        </div>
                        <div v-else class="cus_mobile_card_cell">
                          <v-select
                            v-model="modifyObj.d5"
                            :items="cities"
                            label="縣市"
                            item-text="name"
                            item-value="id"
                            return-object
                            single-line
                            hide-details
                            dense
                            outlined
                            menu-props="auto"
                          />
                        </div>
                      </div>
                      <div class="cus_mobile_card_row">
                        <div class="cus_mobile_card_header">
                          鄉鎮市區
                        </div>
                        <div v-if="!storeEdit" class="cus_mobile_card_cell">
                          {{ businessTown }}
                        </div>
                        <div v-else class="cus_mobile_card_cell">
                          <v-select
                            v-model="modifyObj.d6"
                            :items="towns"
                            label="鄉鎮市區"
                            item-text="name"
                            item-value="id"
                            return-object
                            single-line
                            hide-details
                            dense
                            outlined
                            menu-props="auto"
                          />
                        </div>
                      </div>
                      <div class="cus_mobile_card_row">
                        <div class="cus_mobile_card_header">
                          地址
                        </div>
                        <div v-if="!storeEdit" class="cus_mobile_card_cell">
                          {{ storeInfo.storeBusinessAddr }}
                        </div>
                        <div v-else class="cus_mobile_card_cell">
                          <v-text-field
                            v-model="modifyObj.d7"
                            dense
                            outlined
                            color="#16261f"
                            counter="50"
                            label="請填寫地址"
                            single-line
                          />
                        </div>
                      </div>
                      <div class="cus_mobile_card_row">
                        <div class="cus_mobile_card_header">
                          交通方法
                        </div>
                        <div v-if="!storeEdit" class="cus_mobile_card_cell">
                          {{ storeInfo.storeBusinessTrafficMethod }}
                        </div>
                        <div v-else class="cus_mobile_card_cell">
                          <v-textarea
                            v-model="modifyObj.d8"
                            outlined
                            color="#16261f"
                            counter="500"
                            label="請填寫交通方法"
                            auto-grow
                            single-line
                            rows="3"
                          />
                        </div>
                      </div>
                      <div class="cus_mobile_card_row">
                        <div class="cus_mobile_card_header long_title">
                          GPS
                        </div>
                        <div v-if="!storeEdit" class="cus_mobile_card_cell">
                          {{ businessGPSStr }}
                        </div>
                        <div v-else class="cus_mobile_card_cell">
                          <div>
                            <v-text-field
                              v-model="modifyObj.d9[0]"
                              dense
                              outlined
                              color="#16261f"
                              counter="15"
                              label="請填寫緯度"
                              prefix="緯度: "
                              single-line
                            />
                          </div>
                          <div>
                            <v-text-field
                              v-model="modifyObj.d9[1]"
                              dense
                              outlined
                              color="#16261f"
                              counter="15"
                              label="請填寫緯度"
                              prefix="緯度: "
                              single-line
                            />
                          </div>
                        </div>
                      </div>
                      <div class="cus_mobile_card_row flex_col">
                        <div class="cus_mobile_card_header">
                          Google Map Link
                        </div>
                        <div v-if="!storeEdit" class="cus_mobile_card_cell">
                          {{ storeInfo.storeBusinessMapUrl }}
                        </div>
                        <div v-else class="cus_mobile_card_cell">
                          <v-text-field
                            v-model="modifyObj.d10"
                            dense
                            outlined
                            color="#16261f"
                            counter="500"
                            label="請填寫連結"
                            single-line
                          />
                        </div>
                      </div>
                    </v-card>

                    <!-- browser -->
                    <v-card v-else flat>
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
                              縣市
                            </span>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <div
                            v-if="!storeEdit"
                            class="row_content font-weight-light"
                          >
                            {{ businessCity }}
                          </div>
                          <div v-else class="row_content">
                            <v-select
                              v-model="modifyObj.d5"
                              :items="cities"
                              label="縣市"
                              item-text="name"
                              item-value="id"
                              return-object
                              single-line
                              hide-details
                              dense
                              outlined
                              menu-props="auto"
                            />
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
                              鄉鎮市區
                            </span>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <div
                            v-if="!storeEdit"
                            class="row_content font-weight-light"
                          >
                            {{ businessTown }}
                          </div>
                          <div v-else class="row_content">
                            <v-select
                              v-model="modifyObj.d6"
                              :items="cities"
                              label="縣市"
                              item-text="name"
                              item-value="id"
                              return-object
                              single-line
                              hide-details
                              dense
                              outlined
                              menu-props="auto"
                            />
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
                              地址
                            </span>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <div
                            v-if="!storeEdit"
                            class="row_content font-weight-light"
                          >
                            {{ storeInfo.storeBusinessAddr }}
                          </div>
                          <div v-else class="row_content">
                            <v-text-field
                              v-model="modifyObj.d7"
                              dense
                              outlined
                              color="#16261f"
                              counter="50"
                              label="請填寫地址"
                              single-line
                            />
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
                              交通方法
                            </span>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <div
                            v-if="!storeEdit"
                            class="row_content font-weight-light"
                          >
                            {{ storeInfo.storeBusinessTrafficMethod }}
                          </div>
                          <div v-else class="row_content">
                            <v-textarea
                              v-model="modifyObj.d8"
                              outlined
                              color="#16261f"
                              counter="500"
                              label="請填寫交通方法"
                              auto-grow
                              single-line
                              rows="3"
                            />
                          </div>
                        </v-col>
                      </v-row>
                      <v-row class="mt-4 px-4">
                        <v-col cols="12" sm="3" class="col_min_long_width">
                          <div class="row_title">
                            <span>
                              <v-icon color="brownS1">
                                mdi-circle-small
                              </v-icon>
                            </span>
                            <span
                              class="font-weight-bold font_size1-1 custom-brown1-2--text"
                            >
                              GPS
                            </span>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <div
                            v-if="!storeEdit"
                            class="row_content font-weight-light"
                          >
                            {{ businessGPSStr }}
                          </div>
                          <div v-else class="row_content">
                            <div>
                              <v-text-field
                                v-model="modifyObj.d9[0]"
                                dense
                                outlined
                                color="#16261f"
                                counter="15"
                                label="請填寫緯度"
                                prefix="緯度: "
                                single-line
                              />
                            </div>
                            <div>
                              <v-text-field
                                v-model="modifyObj.d9[1]"
                                dense
                                outlined
                                color="#16261f"
                                counter="15"
                                label="請填寫經度"
                                prefix="經度: "
                                single-line
                              />
                            </div>
                          </div>
                        </v-col>
                      </v-row>
                      <v-row class="px-4">
                        <v-col cols="12" sm="3" class="col_min_long_width">
                          <div class="row_title">
                            <span>
                              <v-icon color="brownS1">
                                mdi-circle-small
                              </v-icon>
                            </span>
                            <span
                              class="font-weight-bold font_size1-1 custom-brown1-2--text"
                            >
                              Google Map Link
                            </span>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <div
                            v-if="!storeEdit"
                            class="row_content font-weight-light"
                          >
                            {{ storeInfo.storeBusinessMapUrl }}
                          </div>
                          <div v-else class="row_content">
                            <v-text-field
                              v-model="modifyObj.d10"
                              dense
                              outlined
                              color="#16261f"
                              counter="500"
                              label="請填寫連結"
                              single-line
                            />
                          </div>
                        </v-col>
                      </v-row>
                    </v-card>

                    <v-card
                      v-if="businessGPS !== null && !storeEdit"
                      class="ma-2 mt-8"
                      :class="{ 'px-12': !mobile }"
                      flat
                    >
                      <client-only>
                        <!-- 初始化地圖設定 -->
                        <LMap
                          ref="myMap"
                          :zoom="zoom"
                          :center="businessGPS.center"
                          :options="options"
                          class="cus_map_mobile"
                        >
                          <!-- 載入圖資 -->
                          <LTileLayer :url="url" :attribution="attribution" />

                          <!-- 自己所在位置 -->
                          <LMarker ref="location" :lat-lng="businessGPS.center">
                            <LPopup>
                              <span v-if="businessGPS.link.length === 0">{{
                                businessGPS.name
                              }}</span>
                              <span v-else><a :href="businessGPS.link" target="_blank">{{
                                businessGPS.name
                              }}</a></span>
                            </LPopup>
                          </LMarker>
                        </LMap>
                      </client-only>
                    </v-card>
                  </v-card>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card>
      </v-card>
    </div>
    <v-fab-transition>
      <v-btn
        v-show="!storeEdit"
        v-scroll="onScroll"
        fab
        dark
        fixed
        right
        color="rgb(117, 73, 51, 0.8)"
        style="transition: bottom 0.5s"
        :style="{ bottom: (scoller_fab ? 88 : 16) + 'px' }"
        @click="sec1Modify"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-fab-transition>
    <to-top />
    <my-waiting :loading="loadingStatus" />
  </div>
</template>
<script>
export default {
  name: 'S03Page',
  title: '店家資訊',
  beforeRouteLeave(to, from, next) {
    if (this.storeEdit) {
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
  async asyncData({ store, redirect }) {
    if (store.state.S03.storeInfo === null) {
      await store.dispatch('S03/fetchStore')
      if (store.state.S03.storeInfo === null) {
        redirect('/')
      }
    }

    const imgUrl = `${process.env.imgUrl}/store/${store.state.userInfo.user.storeId}`
    return {
      imgUrl,
      cities: store.getters['basic/getCitiesArr'],
      towns: store.getters['basic/getTownsArr'],
      storeInfo: store.state.S03.storeInfo
    }
  },
  data() {
    return {
      loadingStatus: false,
      title: '店家資訊',
      scoller_fab: false,
      storeEdit: false,
      storeValid: false,

      zoom: 16,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      options: {
        zoomControl: false
      },

      /* Modify */
      modifyObj: {
        d1: '',
        d2: '',
        d3: '',
        d4: '',

        d5: null,
        d6: null,
        d7: '',
        d8: '',

        d9: [null, null],
        d10: ''
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
    logoSize() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 60
        case 'sm':
          return 100
      }

      return 200
    },
    logo() {
      return `${this.imgUrl}/${this.storeInfo.storeBusinessLogo}`
    },
    businessTel() {
      if ((this.storeInfo.storeBusinessTel ?? '').length === 10) {
        return `${this.storeInfo.storeBusinessTel.substring(
          0,
          2
        )} ${this.storeInfo.storeBusinessTel.substring(
          2,
          6
        )} - ${this.storeInfo.storeBusinessTel.substring(6, 10)} `
      } else if ((this.storeInfo.storeBusinessTel ?? '').length === 9) {
        return `${this.storeInfo.storeBusinessTel.substring(
          0,
          2
        )} ${this.storeInfo.storeBusinessTel.substring(
          2,
          6
        )} - ${this.storeInfo.storeBusinessTel.substring(6, 9)} `
      }

      return '無'
    },
    businessIntro() {
      return this.storeInfo.storeBusinessIntro.replace(/\n/g, '<br>')
    },
    businessConsumption() {
      return this.storeInfo.storeConsumption.replace(/\n/g, '<br>')
    },
    businessCity() {
      const cityObj = this.cities.find(
        x => x.id === this.storeInfo.storeBusinessCity
      )
      if (cityObj) {
        return cityObj.name
      }

      return ''
    },
    businessTown() {
      const townObj = this.towns.find(
        x => x.id === this.storeInfo.storeBusinessTown
      )
      if (townObj) {
        return townObj.name
      }

      return ''
    },
    businessGPSStr() {
      const gps = this.storeInfo.storeBusinessGps ?? ''
      if (gps.length > 0) {
        return gps.split(';').join(', ')
      }

      return ''
    },
    businessGPS() {
      const gps = this.storeInfo.storeBusinessGps ?? ''
      if (gps.length > 0) {
        const coods = gps.split(';')
        return {
          name: this.storeInfo.storeBusinessName ?? '',
          center: [parseFloat(coods[0]), parseFloat(coods[1])],
          link: this.storeInfo.storeBusinessMapUrl ?? '',
          gps: `${coods[0]}, ${coods[1]}`
        }
      }

      return null
    }
  },
  mounted() {
    // 等地圖創建後執行
    this.$nextTick(() => {})
  },
  methods: {
    loading(flag) {
      if (flag) {
        this.loadingStatus = true
      } else {
        setTimeout(() => {
          this.loadingStatus = false
        }, 500)
      }
    },
    onScroll(e) {
      if (typeof window === 'undefined') {
        return
      }
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.scoller_fab = top > 20
    },
    sec1Modify() {
      this.loading(true)
      const cityObj = this.cities.find(
        x => x.id === this.storeInfo.storeBusinessCity
      )
      const townObj = this.towns.find(
        x => x.id === this.storeInfo.storeBusinessTown
      )
      let gpsArr = [null, null]
      const gps = this.storeInfo.storeBusinessGps ?? ''
      if (gps.length > 0) {
        gpsArr = gps.split(';')
      }

      const initObj = {
        d1: this.storeInfo.storeBusinessTel,
        d2: this.storeInfo.storeBusinessTime,
        d3: this.storeInfo.storeBusinessIntro,
        d4: this.storeInfo.storeConsumption,

        d5: cityObj || null,
        d6: townObj || null,
        d7: this.storeInfo.storeBusinessAddr,
        d8: this.storeInfo.storeBusinessTrafficMethod,
        d9: gpsArr,
        d10: this.storeInfo.storeBusinessMapUrl
      }

      this.modifyObj = Object.assign({}, initObj)
      this.storeEdit = true
      this.$nextTick(() => {
        this.loading(false)
      })
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
            this.storeEdit = false
          }
        })
    },
    sec1ModifySubmit() {
      const title = '確定要修改嗎'
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

            let d9 = ''
            if (
              (this.modifyObj.d9[0] ?? '').length > 0 ||
              (this.modifyObj.d9[1] ?? '').length > 0
            ) {
              d9 = this.modifyObj.d9.join(';')
            }

            const form = {}
            form.d1 = this.modifyObj.d1
            form.d2 = this.modifyObj.d2
            form.d3 = this.modifyObj.d3
            form.d4 = this.modifyObj.d4
            form.d5 = this.modifyObj.d5.id
            form.d6 = this.modifyObj.d6.id
            form.d7 = this.modifyObj.d7
            form.d8 = this.modifyObj.d8
            form.d9 = d9
            form.d10 = this.modifyObj.d10

            this.$axios
              .put('/S03/store', form)
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
  font-size: 1rem;
  padding-left: 2rem;
}

.row_content {
  font-size: 1rem;
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
.cus_flex_justify_center {
  justify-content: center;
}

.col_min_width {
  min-width: 190px;
}

.col_min_long_width {
  min-width: 250px;
}

.cus_map_mobile {
  border-radius: 20px !important;
  height: 25vh !important;
  z-index: 0;
}
</style>
