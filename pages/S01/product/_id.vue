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

      <v-btn
        v-if="
          CurrentPageSectionIndex === 0 &&
            sec1ProductEdit &&
            product.productEdit === 1
        "
        class="right-10"
        color="other1"
        :width="mobile ? 80 : 140"
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
        color="other2"
        :width="mobile ? 80 : 140"
        rounded
        :dark="sec1_valid"
        :disabled="!sec1_valid"
        @click="sec1Modify"
      >
        儲存
      </v-btn>
    </v-app-bar>
    <div>
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
                產品類型
              </div>
              <div class="cus_mobile_card_cell">
                {{ productUseType === '1' ? '商品類型' : '現金類型' }}
              </div>
            </div>
            <div class="cus_mobile_card_row">
              <div class="cus_mobile_card_header vcenter">
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
            <div class="cus_mobile_card_row">
              <div class="cus_mobile_card_header">
                使用期限
              </div>
              <div v-if="mobile" class="cus_mobile_card_cell">
                <div>{{ productUseTimeMobile[0] }}</div>
                <div>~ {{ productUseTimeMobile[1] }}</div>
              </div>
              <div v-else>
                {{ productUseTime }}
              </div>
            </div>
            <div class="cus_mobile_card_row">
              <div class="cus_mobile_card_header">
                面額
              </div>
              <div class="cus_mobile_card_cell">
                {{ productPrice | toDollars }}
              </div>
            </div>
            <div class="cus_mobile_card_row">
              <div class="cus_mobile_card_header">
                販售數量
              </div>
              <div class="cus_mobile_card_cell">
                {{ productNum | numberWithCommas }}
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
                <div class="cus_mobile_card_cell" style="position: relative">
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

    <v-tooltip top>
      <template #activator="{ on, attrs }">
        <v-btn
          v-show="
            CurrentPageSectionIndex === 0 &&
              !sec1ProductEdit &&
              product.productEdit === 1
          "
          v-scroll="onScroll"
          fab
          dark
          fixed
          right
          color="rgb(117, 73, 51, 0.8)"
          style="transition: bottom 0.5s"
          :style="{ bottom: (scoller_fab ? 88 : 16) + 'px' }"
          v-bind="attrs"
          v-on="on"
          @click="sec1Modify"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <span>編輯</span>
    </v-tooltip>
    <to-top />
    <my-waiting :loading="loadingStatus" />
  </div>
</template>

<script>
import util from '~/assets/js/util'

const integerRegex = /[^0-9]/
export default {
  name: 'S01ProductID',
  title: '商城票券(逐筆發行) - 編輯產品',
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
      redirect('/S01')
    }
    try {
      await store.dispatch('S01/fetchOrdersList')
      const data = await $axios.$get(`S01/product/${id}`)
      if (data.res === 'CODE0000') {
        if (data.data.product.productType === 1) {
          return {
            product: data.data.product,
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
          redirect('/S01')
        }
      } else {
        redirect('/S01')
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
      scoller_fab: false,

      basicProductClasses: this.$store.getters['basic/getClasses'],
      sec1_edit: false,
      sec1_valid: false,
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

      orders: this.$store.state.S02.orders
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
      return `門市票券(整批發行) - ${this.product.productName}`
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

    productUseTime() {
      let time = ''
      const plan = this.product.productPlanDTOSet[0]
      if (plan) {
        if (plan.useDays !== -1) {
          time = `依購買後起訖 ${plan.useDays}天`
        } else {
          const stime =
            plan.useStime.length > 0 ? util.formatTimeMinus(plan.useStime) : ''
          const etime =
            plan.useEtime.length > 0 ? util.formatTimeMinus(plan.useEtime) : ''
          time = `${stime} ~ ${etime}`
        }
      }
      return time
    },
    productUseTimeMobile() {
      let time = ['', '']
      const plan = this.product.productPlanDTOSet[0]
      if (plan) {
        if (plan.useDays !== -1) {
          time = `依購買後起訖 ${plan.useDays}天`
        } else {
          const stime =
            plan.useStime.length > 0 ? util.formatTimeMinus(plan.useStime) : ''
          const etime =
            plan.useEtime.length > 0 ? util.formatTimeMinus(plan.useEtime) : ''
          time = [stime, etime]
        }
      }
      return time
    },

    productReimburse() {
      let reimburse = 0
      const plan = this.product.productPlanDTOSet[0]
      if (plan) {
        const spec =
          this.product.productPlanDTOSet[0].productSpecificationDTOSet[0]
        if (spec) {
          reimburse = spec.unitPrice
        }
      }
      return reimburse
    },

    productPrice() {
      let price = 0
      const plan = this.product.productPlanDTOSet[0]
      if (plan) {
        const spec =
          this.product.productPlanDTOSet[0].productSpecificationDTOSet[0]
        if (spec) {
          price = spec.sellingPrice
        }
      }
      return price
    },

    productNum() {
      let num = 0
      const plan = this.product.productPlanDTOSet[0]
      if (plan) {
        const spec =
          this.product.productPlanDTOSet[0].productSpecificationDTOSet[0]
        if (spec) {
          num = spec.sellingNum
        }
      }
      return num
    }
  },
  created() {},
  methods: {
    onScroll(e) {
      if (typeof window === 'undefined') {
        return
      }
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.scoller_fab = top > 20
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
              .put(`/S01/product/${submitProductId}`, form)
              .then((response) => {
                const data = response.data
                if (data.res === 'CODE0000') {
                  this.$axios
                    .$get(`S01/product/${submitProductId}`)
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
  align-items: center;
  display: flex;
  height: 48px;
  font-size: 1rem;
  padding: 0 16px 0 16px;
}

.row_content {
  padding-top: 0.5rem !important;
  align-items: center;
  display: flex;
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
</style>
