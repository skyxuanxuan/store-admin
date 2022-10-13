<template>
  <div class="bg">
    <v-container fill-height fluid>
      <v-row justify="center" align="center">
        <v-card class="pa-2 glass-effect" flat width="450" rounded="xl">
          <v-form ref="modifyForm" v-model="modifyValid">
            <v-hover v-slot="{ hover }">
              <v-card
                class="pa-2"
                :elevation="hover ? 10 : 2"
                :color="hover ? 'white' : '#fafafa'"
                rounded="xl"
                width="450"
                style="box-shadow: 0px 0px 6px #00000029 !imporant"
              >
                <v-card-title class="justify-center">
                  <span class="text-h5 font-weight-bold"> 修改密碼 </span>
                </v-card-title>
                <div class="account_box" :class="{ mobile: mobile }">
                  <div class="account_box_row">
                    <div class="account_box_row_header">
                      店家碼
                    </div>
                    <div class="account_box_row_cell">
                      {{ no }}
                    </div>
                  </div>
                  <div class="account_box_row">
                    <div class="account_box_row_header">
                      帳號
                    </div>
                    <div class="account_box_row_cell">
                      {{ ac }}
                    </div>
                  </div>
                  <div class="account_box_row">
                    <div class="account_box_row_header">
                      密碼
                    </div>
                    <div class="account_box_row_cell">
                      <v-text-field
                        v-model="modifyObj.pw1"
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
                        :type="showPwd1 ? 'text' : 'password'"
                        :append-icon="showPwd1 ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPwd1 = !showPwd1"
                      />
                    </div>
                  </div>
                  <div class="account_box_row">
                    <div class="account_box_row_header">
                      確認密碼
                    </div>
                    <div class="account_box_row_cell">
                      <v-text-field
                        v-model="modifyObj.pw2"
                        outlined
                        dense
                        :rules="[rules.required, rules.confirm]"
                        :type="showPwd2 ? 'text' : 'password'"
                        :append-icon="showPwd2 ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPwd2 = !showPwd2"
                      />
                    </div>
                  </div>
                </div>
                <v-card-actions>
                  <v-btn
                    :dark="modifyValid"
                    :disabled="!modifyValid"
                    rounded
                    color="brownS1"
                    width="100%"
                    @click="submit"
                  >
                    修改
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-form>
        </v-card>
      </v-row>
    </v-container>
    <my-waiting :loading="loadingStatus" />
  </div>
</template>

<script>
export default {
  name: 'ChangePw',
  title: '初次進入',
  auth: 'guest',
  async asyncData({ params, $axios, redirect }) {
    const id = params.id
    if ((id ?? '').length === 0) {
      redirect('/login')
    }
    try {
      const data = await $axios.$get(`auth/first-ins?id=${id}`)
      if (data.res === 'CODE0000') {
        return {
          insId: id,
          ac: data.ins.ac,
          no: data.ins.no
        }
      } else {
        redirect('/login')
      }
    } catch (err) {
      console.log('Permission deny')
      redirect('/login')
    }
  },
  data() {
    return {
      loadingStatus: false,
      currentIndex: 0,
      showPwd1: false,
      showPwd2: false,

      modifyObj: {
        pw1: '',
        pw2: ''
      },
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
            form.id = this.insId
            form.ac = this.ac
            form.no = this.no
            form.pw1 = this.modifyObj.pw1
            form.pw2 = this.modifyObj.pw2
            this.$axios
              .put('/auth/first-ins/init', form)
              .then((response) => {
                const data = response.data
                if (data.res === 'CODE0000') {
                  this.$swal
                    .fire('小提示', '修改成功，請重新登入', 'success')
                    .then(() => {
                      this.$router.replace({
                        path: '/login'
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
.bg {
  background: url('~/static/background.jpg');
  background-size: cover;
  height: 100vh;
}

.glass-effect {
  background: rgb(170, 153, 143, 0.1) 0% 0% no-repeat padding-box;
  border-radius: 26px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(13.2px);
  -webkit-backdrop-filter: blur(13.2px);
}

.account_box {
  padding: 0px 32px;
  .account_box_row {
    min-height: 40px;
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
