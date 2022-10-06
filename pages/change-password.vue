<template>
  <div>
    <v-app-bar color="white" app>
      <v-app-bar-nav-icon color="brownS1" @click="$parent.$emit('eventname')" />

      <v-toolbar-title class="custom-brown1-2--text">
        {{ title }}
      </v-toolbar-title>

      <v-spacer />
    </v-app-bar>
    <v-container fill-height fluid>
      <v-row justify="center" align="center" class="mt-8">
        <v-col cols="12" sm="6">
          <v-tabs-items v-model="currentIndex">
            <v-tab-item>
              <v-card class="shrink">
                <v-card-title class="justify-center">
                  <span class="text-h5 font-weight-bold"> 帳號資料 </span>
                </v-card-title>
                <div class="account_box no_mobile" :class="{ mobile: mobile }">
                  <div class="account_box_row">
                    <div class="account_box_row_header">
                      名稱
                    </div>
                    <div class="account_box_row_cell">
                      {{ userInfo.name }}
                    </div>
                  </div>
                  <div class="account_box_row">
                    <div class="account_box_row_header">
                      舊密碼
                    </div>
                    <div class="account_box_row_cell">
                      <v-text-field
                        v-model="modifyObj.pw1"
                        outlined
                        dense
                        :rules="[rules.required, rules.length(100)]"
                        :type="showPwd1 ? 'text' : 'password'"
                        :append-icon="showPwd1 ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPwd1 = !showPwd1"
                        @keyup.enter="getcode"
                      />
                    </div>
                  </div>
                </div>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    :dark="btn1"
                    :disabled="!btn1"
                    color="other2"
                    width="80"
                    @click="getcode"
                  >
                    下一步
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card class="shrink">
                <v-card-title class="justify-center">
                  <span class="text-h5 font-weight-bold">
                    修改密碼
                    <v-tooltip bottom>
                      <template #activator="{ on, attrs }">
                        <v-icon small v-bind="attrs" v-on="on">
                          mdi-information-outline
                        </v-icon>
                      </template>
                      <div>密碼長度至少八碼且需包含數字及英文或符號</div>
                      <div>數字字元包含 0 ~ 9</div>
                      <div>英文或符號包含大小寫 a ~ z 和「!@#$%^&*」</div>
                    </v-tooltip>
                  </span>
                </v-card-title>
                <div class="account_box no_mobile" :class="{ mobile: mobile }">
                  <v-form ref="modifyForm" v-model="modifyValid">
                    <div class="account_box_row">
                      <div class="account_box_row_header">
                        新密碼
                      </div>
                      <div class="account_box_row_cell">
                        <v-text-field
                          v-model="modifyObj.pw2"
                          outlined
                          dense
                          :rules="[
                            rules.required,
                            rules.atleast,
                            rules.length(100),
                            rules.number,
                            rules.alpha,
                            rules.badchar
                          ]"
                          :type="showPwd2 ? 'text' : 'password'"
                          :append-icon="showPwd2 ? 'mdi-eye' : 'mdi-eye-off'"
                          @click:append="showPwd2 = !showPwd2"
                        />
                      </div>
                    </div>
                  </v-form>
                  <div class="account_box_row">
                    <div class="account_box_row_header">
                      確認新密碼
                    </div>
                    <div class="account_box_row_cell">
                      <v-text-field
                        v-model="modifyObj.pw3"
                        outlined
                        dense
                        :rules="[rules.required, rules.confirm]"
                        :type="showPwd3 ? 'text' : 'password'"
                        :append-icon="showPwd3 ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPwd3 = !showPwd3"
                      />
                    </div>
                  </div>
                </div>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    :dark="modifyValid"
                    :disabled="!modifyValid"
                    color="other2"
                    width="80"
                    @click="submit"
                  >
                    修改
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-container>
    <my-waiting :loading="loadingStatus" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PasswordChangePage',
  title: '修改密碼',
  layout: 'adminLayout',
  data() {
    return {
      loadingStatus: false,
      currentIndex: 0,
      showPwd1: false,
      showPwd2: false,
      showPwd3: false,

      modifyObj: {
        pw1: '',
        pw2: '',
        pw3: ''
      },
      modifyCode: '',
      btn1: true,
      modifyValid: false,

      rules: {
        required: v => !!v || '此欄位為必填',
        length: len => v => (v || '').length <= len || `長度不得超過 ${len}`,
        atleast: v => (v || '').length >= 8 || '長度至少要8碼',
        number: v => /\d/.test(v || '') || '密碼須包含數字',
        alpha: v => /[a-zA-Z]/.test(v || '') || '密碼須包含字母',
        badchar: v => !/[^a-zA-Z0-9!@#$%^&*]/.test(v || '') || '包含非法字元',
        confirm: v =>
          (!!v && v === this.modifyObj.pw2) || '確認密碼需與密碼相同'
      }
    }
  },
  computed: {
    title() {
      return '修改密碼'
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
      items: 'userInfo/getFuncs'
    })
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
    getcode() {
      if (this.modifyObj.pw1.length < 8) {
        this.$swal.fire('小提示', '密碼長度錯誤')
        return
      }

      this.btn1 = false
      const form = {}
      form.pw1 = this.modifyObj.pw1
      this.$axios
        .post('/auth/password/code', form)
        .then((response) => {
          const data = response.data
          if (data.res === 'CODE0000') {
            this.modifyCode = data.data.code
            this.currentIndex = 1
          } else {
            this.btn1 = true
            this.$swal.fire('小提示', data.msg, 'error')
          }
        })
        .catch((err) => {
          this.btn1 = true
          this.$notify({
            title: '小提示',
            text: '網路連線異常',
            type: 'error',
            duration: 2000
          })
          console.log(err)
        })
    },
    submit() {
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
            const form = {}
            form.code = this.modifyCode
            form.pw2 = this.modifyObj.pw2
            form.pw3 = this.modifyObj.pw3
            this.$axios
              .post('/auth/password/change', form)
              .then((response) => {
                const data = response.data
                if (data.res === 'CODE0000') {
                  this.$swal
                    .fire('小提示', '修改成功，請重新登入', 'success')
                    .then(() => {
                      this.$auth.logout()
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
.account_box {
  padding: 0px 32px;
  padding-bottom: 16px;
  .account_box_row {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    word-break: break-all;
    .account_box_row_header {
      font-size: 1rem;
      font-weight: bold !important;
      padding-right: 16px;
      min-width: 120px;
    }
    .account_box_row_cell {
      text-align: left;
      font-weight: 300;
      max-width: 750px;
      width: 100%;
    }
  }
}
.account_box.mobile {
  padding: 0px 32px;
  padding-bottom: 16px;
  .account_box_row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    word-break: break-all;
    .account_box_row_header {
      font-size: 1rem;
      font-weight: bold !important;
      padding-right: 16px;
      min-width: 120px;
    }
    .account_box_row_cell {
      text-align: right;
      font-weight: 300;
      width: 100%;
    }
  }
}

.account_box_row + .account_box_row {
  margin-top: 15px;
}
</style>
