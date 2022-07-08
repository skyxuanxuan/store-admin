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
              帳號
            </p>
            <v-text-field
              v-model="login.username"
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
              v-model="login.password"
              class="mt-3"
              outlined
              hide-details
              autocomplete="off"
              :type="showPwd ? 'text' : 'password'"
              :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPwd = !showPwd"
            />
          </v-col>
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
const md5 = require('md5')
export default {
  title: '登入系統',
  layout: 'loginLayout',
  data() {
    return {
      loggedIn: true,
      showPwd: false,
      login: {
        username: '',
        password: ''
      }
    }
  },
  head: {
    title: '登入'
  },
  computed: {},
  created() {},
  methods: {
    async userLogin() {
      try {
        console.log('%s', md5(this.login.password))
        const response = await this.$auth.loginWith('local', {
          data: this.login
        })
        if (response) {
          this.$auth.$storage.setUniversal(
            'user',
            { email: 'aaa', pasww: 'bdfgf' },
            true
          )
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
