<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <v-app-bar app>
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-app-bar-nav-icon v-bind="attrs" @click="$router.back()" v-on="on">
            <v-icon>mdi-arrow-left</v-icon>
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
              v-if="CurrentPageSectionIndex === 0"
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
            <v-list-item v-if="CurrentPageSectionIndex === 1">
              <v-list-item-icon>
                <v-icon>mdi-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-title>新增方案</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>

      <v-btn
        v-if="CurrentPageSectionIndex === 0 && sec1ProductEdit"
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
        v-if="CurrentPageSectionIndex === 0 && sec1ProductEdit"
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
        v-if="CurrentPageSectionIndex === 0 && !sec1ProductEdit"
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
        v-if="CurrentPageSectionIndex === 1"
        class="d-none d-sm-flex"
        color="brownS1"
        width="140"
        dark
        rounded
      >
        新增方案
      </v-btn>

      <template #extension>
        <v-tabs
          v-model="CurrentPageSectionIndex"
          color="brownS1"
          align-with-title
        >
          <v-tabs-slider color="greenS1" />
          <v-tab>產品資訊</v-tab>

          <v-tab>方案列表</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <div class="pa-4">
      <v-tabs-items v-model="CurrentPageSectionIndex">
        <v-tab-item class="background-color">
          <v-card flat color="transparent" style="margin-bottom: 64px">
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
            <v-card class="mt-2" flat color="transparent">
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
                          <div class="row_title font-weight-medium">
                            產品名稱
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <div class="row_title font-weight-medium">
                            {{ product.productName }}
                          </div>
                        </v-col>
                      </v-row>
                      <v-row dense class="px-4 py-2">
                        <v-col cols="12" sm="3" md="2">
                          <div class="row_title font-weight-medium">
                            產品簡介
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <div class="row_content font-weight-medium">
                            <ul>
                              <li
                                v-for="(item, index) in productSimpleIntro"
                                :key="`simpleIntro${index}`"
                              >
                                {{ item }}
                              </li>
                            </ul>
                          </div>
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
                            :value="productCoupon"
                            :label="productCoupon ? '參與' : '不參與'"
                            color="greenS1"
                            hide-details
                            hide-spin-buttons
                            class="mt-2"
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
                            :value="productUseType"
                            row
                            hide-details
                            disabled
                            class="mt-2"
                          >
                            <v-radio
                              label="商品類型"
                              color="greenS1"
                              value="1"
                            />
                            <v-radio
                              label="現金類型"
                              color="greenS1"
                              value="2"
                            />
                          </v-radio-group>
                        </v-col>
                      </v-row>
                      <v-row dense class="px-4">
                        <v-col cols="12" sm="3" md="2">
                          <div class="row_title font-weight-medium">
                            產品分類
                          </div>
                        </v-col>
                        <v-col cols="12" sm="9">
                          <div>
                            <v-chip
                              v-for="item in productClass"
                              :key="item.id"
                              :color="colors(item.color)"
                              dark
                              class="ma-1"
                            >
                              {{ item.name }}
                            </v-chip>
                          </div>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row class="mt-8">
                  <v-col>
                    <v-form ref="sec1Form1" v-model="sec1_valid">
                      <v-card class="pa-4" rounded="xl">
                        <v-tooltip bottom>
                          <template #activator="{ on, attrs }">
                            <v-btn
                              v-show="sec1ProductEdit"
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

                        <v-subheader class="base-color--text border_title">
                          <v-chip color="brown lighten-3" dark>
                            產品說明
                          </v-chip>
                        </v-subheader>
                        <transition-group
                          name="fadeLeft"
                          tag="div"
                          class="mt-4"
                        >
                          <v-row
                            v-for="(item, index) in productIntroFilter"
                            :key="item.id"
                            class="px-4 py-4"
                            :class="{
                              border_error: item.valid,
                              border_bottom: introList.length - 1 !== index
                            }"
                          >
                            <v-col
                              cols="12"
                              sm="3"
                              md="2"
                              class="align-self-start pb-0"
                            >
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
                              </div>
                              <v-scroll-y-transition>
                                <div
                                  v-show="item.valid"
                                  class="v-text-field__details"
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
                            </v-col>
                            <v-col cols="12" sm="9" style="position: relative">
                              <v-tooltip bottom>
                                <template #activator="{ on, attrs }">
                                  <v-btn
                                    v-show="sec1ProductEdit && item.edit === 1"
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
                                  v-if="sec1ProductEdit"
                                  v-model="item.content"
                                  placeholder="請輸入內文"
                                />
                                <div v-else v-html="item.content" />
                              </client-only>
                            </v-col>
                          </v-row>
                        </transition-group>
                      </v-card>
                    </v-form>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </div>
    <to-top />
    <my-waiting :loading="loadingStatus" />
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue2-datepicker/index.css'
import util from '~/assets/js/util'

export default {
  name: 'IndexPage',
  title: '商城票券(逐筆發行) - 編輯產品',
  components: { VueSlickCarousel },
  layout: 'adminLayout',

  async asyncData({ params, store, redirect }) {
    const id = params.id
    if (id.length === 0) {
      redirect('/S02')
    }
    const product = await store.dispatch('S02/fetchProductById', id)
    if (!product) {
      redirect('/S02')
    }
    console.log(product)
    const imgUrl = `${process.env.imgUrl}/store/${store.state.userInfo.user.storeId}/products/${product.productId}/`
    return {
      product,
      imgUrl,
      introCount: product.productIntroDTOSet.length,
      introList: product.productIntroDTOSet
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
  },

  data() {
    return {
      loadingStatus: false,
      CurrentPageSectionIndex: 0,

      basicProductClasses: this.$store.getters['basic/getClasses'],
      sec1_edit: false,
      sec1_valid: false,
      time2: null,
      rules: {
        length: len => v => (v || '').length <= len || `長度不得超過 ${len}`,
        required: v => !!v || '此欄位為必填'
      }
    }
  },
  computed: {
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
      return this.sec1_edit && this.product.productEdit === 1
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
      console.log(this.product.productClass)
      console.log(this.basicProductClasses)
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
    }
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
                  this.$store
                    .dispatch('S02/fetchProductsList')
                    .then(() => {
                      return this.$store.dispatch(
                        'S02/fetchProductById',
                        submitProductId
                      )
                    })
                    .then((newData) => {
                      this.product = newData
                      this.introCount = newData.productIntroDTOSet.length
                      this.introList = newData.productIntroDTOSet
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
</style>
