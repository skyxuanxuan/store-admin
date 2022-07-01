<template>
  <v-container fill-height fluid src="https://picsum.photos/1920/1080?random">
    <v-row justify="center" align="center">
      <v-card class="pa-5 shrink" width="400" color="#FAFAFA">
        <v-card-title class="justify-center">
          <span class="text-h4 font-weight-bold">管理系統</span>
        </v-card-title>
        <v-form @submit.prevent="userLogin">
          <v-col>
            <p class="font-weight-bold">
              帳號
            </p>
            <v-text-field v-model="login.username" class="mt-3" outlined hide-details type="text" autocomplete="off" />
          </v-col>
          <v-col>
            <p class="font-weight-bold">
              密碼
            </p>
            <v-text-field v-model="login.password" class="mt-3" outlined hide-details autocomplete="off"
              :type="showPwd ? 'text' : 'password'" :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPwd = !showPwd" />
          </v-col>
          <v-col>
            <v-btn type="submit" class="text-h6 font-weight-medium " block color="black" height="55" dark>
              登入
            </v-btn>
          </v-col>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  title: '登入系統',
  layout: 'loginLayout',
  data() {
    return {
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
  computed: {

  },
  methods: {
    async userLogin() {
      try {
        
        const response = await this.$auth.loginWith('local', {
          data: this.login
        }).then((data) => console.log(data));

        if (response) {
          await this.$auth.setUser({
            data: this.login
          })
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>
