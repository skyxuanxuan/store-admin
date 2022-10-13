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
      <v-btn
        v-show="!mobile"
        width="160"
        color="brownS1"
        rounded
        :dark="send_order_valid"
        :disabled="!send_order_valid"
        @click="orderSubmit"
      >
        訂單成立
      </v-btn>
    </v-app-bar>

    <div style="padding-bottom: 64px">
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
                名稱
              </div>
              <div class="cus_mobile_card_cell">
                {{ productDetail.name }}
              </div>
            </div>
            <div class="cus_mobile_card_row">
              <div class="cus_mobile_card_header">
                價格
              </div>
              <div class="cus_mobile_card_cell">
                {{ productDetail.price | toDollars }}
              </div>
            </div>
            <div class="cus_mobile_card_row">
              <div class="cus_mobile_card_header">
                剩餘數量
              </div>
              <div class="cus_mobile_card_cell">
                {{ productDetail.remaining | numberWithCommas }}
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
        <v-form ref="modifyform" v-model="send_order_valid">
          <div class="cus_ui_card">
            <v-card-title
              class="master_title custom-brown1-3--text pt-0"
              :class="{ 'px-8': !mobile }"
            >
              <span class="">購買資訊</span>
            </v-card-title>
            <div class="cus_mobile_card" :class="{ mobile: mobile }">
              <div class="cus_mobile_card_row">
                <div class="cus_mobile_card_header">
                  手機號碼
                </div>
                <div class="cus_mobile_card_cell">
                  <v-text-field
                    v-model="send_order_tel"
                    type="tel"
                    dense
                    outlined
                    hide-spin-buttons
                    color="brownS1"
                    counter="10"
                    label="請填寫手機號碼"
                    :rules="[rules.required, rules.length(10)]"
                    single-line
                  />
                </div>
              </div>
              <div class="cus_mobile_card_row">
                <div class="cus_mobile_card_header">
                  購買數量
                </div>
                <div class="cus_mobile_card_cell">
                  <v-text-field
                    v-model="send_order_num"
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
                      <v-btn color="#aa998f" dark fab x-small @click="increse">
                        <v-icon> mdi-plus-thick </v-icon>
                      </v-btn>
                    </template>

                    <template #prepend>
                      <v-btn color="#aa998f" dark fab x-small @click="decrease">
                        <v-icon> mdi-minus-thick </v-icon>
                      </v-btn>
                    </template>
                  </v-text-field>
                </div>
              </div>
              <div class="cus_mobile_card_row">
                <div class="cus_mobile_card_header">
                  付款方式
                </div>
                <div class="cus_mobile_card_cell">
                  <v-select
                    v-model="send_order_paykind"
                    :items="payKindOfflineList"
                    label="請選擇付款方式"
                    item-text="name"
                    item-value="id"
                    dense
                    single-line
                    :rules="[rules.required]"
                    outlined
                  />
                </div>
              </div>
              <div class="cus_mobile_card_row">
                <div class="cus_mobile_card_header">
                  交易金額
                </div>
                <div class="cus_mobile_card_cell">
                  <v-text-field
                    v-model="send_order_amt"
                    type="number"
                    dense
                    outlined
                    hide-spin-buttons
                    color="brownS1"
                    label="請填寫交易金額"
                    :rules="[rules.required]"
                    single-line
                  />
                </div>
              </div>
              <div class="cus_mobile_card_row">
                <div class="cus_mobile_card_header">
                  店家備註
                </div>
                <div class="cus_mobile_card_cell">
                  <v-textarea
                    v-model="send_order_note"
                    outlined
                    single-line
                    color="brownS1"
                    label="請輸入備註"
                    rows="3"
                    counter="200"
                    :rules="[rules.length(200)]"
                  />
                </div>
              </div>
              <div class="cus_mobile_card_row">
                <div class="cus_mobile_card_header">
                  訂單合計金額
                </div>
                <div
                  class="cus_mobile_card_cell custom-other-1--text"
                  style="font-weight: bold !important"
                >
                  {{ totalAmt | toDollars }}
                </div>
              </div>
              <div v-show="mobile" class="cus_mobile_card_row">
                <div style="width: 100%">
                  <v-btn
                    width="100%"
                    color="brownS1"
                    rounded
                    :dark="send_order_valid"
                    :disabled="!send_order_valid"
                    @click="orderSubmit"
                  >
                    訂單成立
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </v-form>
      </v-card>
    </div>

    <to-top />
    <my-waiting :loading="loadingStatus" />
  </div>
</template>

<script>
export default {
  name: 'S00Send',
  title: '門市票券(發送票券)',
  layout: 'adminLayout',

  async asyncData({ params, store, redirect, $axios }) {
    const id = params.id
    if (id.length === 0) {
      redirect('/S00')
    }

    const permission = await store.dispatch('userInfo/fetchPermission', 'S00')
    if (permission >= 2) {
      try {
        const data = await $axios.$get(`S00/load/${id}`)
        if (data.res === 'CODE0000') {
          if (data.data.product.productType === 1) {
            const remaining = data.data.remainingTickets.length
            const product = data.data.product

            const salePrice =
              product.productPlanDTOSet[0].productSpecificationDTOSet[0]
                .sellingPrice

            const productDetail = {}
            productDetail.id = product.productId
            productDetail.name = product.productName
            productDetail.price = salePrice
            productDetail.remaining = remaining
            return {
              productDetail
            }
          } else {
            redirect('/S00')
          }
        } else {
          redirect('/S00')
        }
      } catch (err) {
        console.log(err)
        redirect('/')
      }
    } else {
      console.log('Permission deny')
      redirect('/')
    }
  },
  data() {
    return {
      loadingStatus: false,
      CurrentPageSectionIndex: 0,
      scoller_fab: false,

      send_order_valid: false,
      send_order_tel: '',
      send_order_num: 0,
      send_order_paykind: null,
      send_order_amt: null,
      send_order_note: '',
      payKindOffline: this.$store.state.basic.payKind.offline,

      rules: {
        length: len => v => (v || '').length <= len || `長度不得超過 ${len}`,
        required: v => !!v || '此欄位為必填'
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
      return `門市票券(發送票券) - ${this.productDetail.name}`
    },
    totalAmt() {
      if (this.send_order_num && this.productDetail.price) {
        return (
          parseInt(this.send_order_num) * parseInt(this.productDetail.price)
        )
      }
      return '-'
    },
    payKindOfflineList() {
      const initArr = []

      for (const key in this.payKindOffline) {
        initArr.push({
          id: key,
          name: this.payKindOffline[key]
        })
      }

      return initArr
    }
  },
  watch: {
    send_order_num() {
      if (this.send_order_num) {
        if (parseInt(this.send_order_num) < 0) {
          this.$notify({
            title: '小提示',
            text: '數量不得小於1',
            type: 'warning',
            duration: 2000
          })
          this.send_order_num = 0
        } else if (
          parseInt(this.send_order_num) > parseInt(this.productDetail.remaining)
        ) {
          this.$notify({
            title: '小提示',
            text: `數量不得超過${this.productDetail.remaining}`,
            type: 'warning',
            duration: 2000
          })
          this.send_order_num = parseInt(this.productDetail.remaining)
        }
      }
    }
  },
  created() {},
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

    increse() {
      if ((this.send_order_num ?? '').toString().length > 0) {
        if (
          parseInt(this.send_order_num) < parseInt(this.productDetail.remaining)
        ) {
          this.send_order_num = parseInt(this.send_order_num) + 1
        }
      } else {
        this.send_order_num = 0
      }
    },
    decrease() {
      if ((this.send_order_num ?? '').toString().length > 0) {
        if (parseInt(this.send_order_num) > 0) {
          this.send_order_num = parseInt(this.send_order_num) - 1
        }
      } else {
        this.send_order_num = 0
      }
    },
    orderSubmit() {
      if (this.send_order_tel.length === 0) {
        this.$swal.fire('小提示', '請輸入手機號碼')
        return
      }

      if (this.send_order_tel.length !== 10) {
        this.$swal.fire('小提示', '手機號碼格式錯誤')
        return
      }

      if (parseInt(this.send_order_num ?? 0) <= 0) {
        this.$swal.fire('小提示', '請填入數量')
        return
      }

      if (
        parseInt(this.send_order_num) > parseInt(this.productDetail.remaining)
      ) {
        this.$swal.fire('小提示', '數量超過產品剩餘數量')
        return
      }

      if (this.send_order_paykind === null) {
        this.$swal.fire('小提示', '請選擇付款方式')
        return
      }

      if ((this.send_order_amt ?? '').toString().length === 0) {
        this.$swal.fire('小提示', '請填寫交易金額')
        return
      }

      const title = '確定要發送票券嗎'
      const content = `
      <div style="margin: 0 10%;">
        <div style="align-items: flex-start;
                    display: flex;
                    justify-content: space-between;
                    word-break: break-all;">
          <div style="padding-right: 20px; min-width: 110px; text-align: left;">產品名稱</div>
          <div style="padding-top: 2px; text-align: left;">${this.productDetail.name}</div>
        </div>
        <div style="align-items: flex-start;
                    display: flex;
                    justify-content: space-between;
                    word-break: break-all;">
          <div style="padding-right: 20px; min-width: 110px; text-align: left;">手機號碼</div>
          <div style="padding-top: 2px; text-align: left;">${this.send_order_tel}</div>
        </div>
        <div style="align-items: flex-start;
                    display: flex;
                    justify-content: space-between;
                    word-break: break-all;">
          <div style="padding-right: 20px; min-width: 110px; text-align: left;">數量</div>
          <div style="padding-top: 2px; text-align: left;">${this.send_order_num}</div>
        </div>
        <br>
        <div>確定要發送嗎？</div>
      </div>
      `
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
            const form = {}
            form.id = this.productDetail.id
            form.tel = this.send_order_tel
            form.num = this.send_order_num
            form.amt = this.send_order_amt.toString()
            form.note = this.send_order_note
            form.payKind = this.send_order_paykind

            this.$axios
              .post('/S00/order-create', form)
              .then((response) => {
                const data = response.data
                if (data.res === 'CODE0000') {
                  this.$swal
                    .fire(
                      data.code,
                      '訂單已成立，請消費者輸入兌換碼以完成票券歸戶',
                      'success'
                    )
                    .then(() => {
                      this.$router.push({
                        name: 'S04'
                      })
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

:deep(.text-with-plus-minus .v-input__append-outer) {
  margin-top: 4px !important;
}
:deep(.text-with-plus-minus .v-input__prepend-outer) {
  margin-top: 4px !important;
}
</style>
