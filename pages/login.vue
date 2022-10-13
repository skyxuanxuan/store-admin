<template>
  <v-container fill-height fluid>
    <v-row
      v-show="!$auth.loggedIn"
      justify="center"
      align="center"
      style="display: none"
    >
      <v-card class="pa-5 shrink" width="400" color="#FAFAFA">
        <v-card-title class="justify-center">
          <span class="text-h4 font-weight-bold">管理系統</span>
        </v-card-title>
        <v-form @submit.prevent="userLogin">
          <v-col>
            <p class="font-weight-bold">
              店家號碼
            </p>
            <v-text-field
              v-model="login.id"
              class="mt-3"
              outlined
              hide-details
              type="text"
              autocomplete="off"
            />
          </v-col>
          <v-col>
            <p class="font-weight-bold">
              帳號
            </p>
            <v-text-field
              v-model="login.ac"
              class="mt-3"
              outlined
              hide-details
              type="text"
              autocomplete="off"
            />
          </v-col>
          <v-col>
            <p class="font-weight-bold">
              密碼
            </p>
            <v-text-field
              v-model="login.pw"
              class="mt-3"
              outlined
              hide-details
              autocomplete="off"
              :type="showPwd ? 'text' : 'password'"
              :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPwd = !showPwd"
            />
          </v-col>
          <!-- <v-col class="py-0 text-right">
            <v-spacer />
            <nuxt-link to="/change-pw" class="modify-pass">
              修改密碼
            </nuxt-link>
          </v-col> -->
          <v-col>
            <v-btn
              type="submit"
              class="text-h6 font-weight-medium"
              block
              color="black"
              height="55"
              dark
            >
              登入
            </v-btn>
          </v-col>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
// const md5 = require('md5')
export default {
  title: '登入系統',
  layout: 'loginLayout',
  data() {
    return {
      loggedIn: true,
      showPwd: false,
      login: {
        id: '',
        ac: '',
        pw: ''
      }
    }
  },
  head: {
    title: '登入'
  },
  computed: {},
  created() {},
  methods: {
    userLogin() {
      try {
        this.$auth
          .loginWith('localRefresh', {
            data: this.login
          })
          .then(async (data) => {
            if (data.data.res === 'CODE0000') {
              await this.$store.dispatch('userInfo/fetchUserInfo')
            } else {
              this.$swal.fire('小提示', data.data.msg, 'error')
            }
          })
          .catch(() => {
            this.$swal.fire('小提示', '網路連線異常', 'error')
          })
      } catch (err) {
        this.$swal.fire('小提示', '網路連線異常', 'error')
      }
    }
  }
}
</script>
<style lang="scss" scoped>

.modify-pass {
  transition: color 0.5s;
  text-decoration: none;
  color: #bdbdbd;
  font-size: 0.75rem;
}

.modify-pass:hover {
  color: #212121 !important;
}
</style>
