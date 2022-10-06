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
        class="right-10"
        color="other1"
        :width="mobile ? 40 : 140"
        outlined
        rounded
        @click="groupCancel"
      >
        取消
      </v-btn>
      <v-btn
        color="other2"
        :width="mobile ? 40 : 140"
        rounded
        dark
        @click="groupSubmit"
      >
        儲存
      </v-btn>
    </v-app-bar>
    <div class="ma-4">
      <v-card flat class="mt-8 pa-3" style="padding-bottom: 64px !important">
        <v-container class="pa-4">
          <v-row>
            <v-col cols="12">
              <div class="cus_common_row" :class="{ mobile: mobile }">
                <div class="cus_common_row_header">
                  群組名稱
                </div>
                <div class="cus_common_row_cell">
                  <v-text-field
                    v-model="groupName"
                    dense
                    outlined
                    color="brownS1"
                    counter="20"
                    label="請填寫群組名稱"
                    single-line
                  />
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-card outlined>
                <v-card-title> 功能列表 </v-card-title>
                <v-card-text>
                  <small>*請點選需要的功能列表並編輯其權限</small>
                  <v-list nav dense class="custom-index-list">
                    <v-list-item-group
                      v-model="funcSelec"
                      multiple
                      color="success"
                      @change="funcSelectChange"
                    >
                      <v-list-item v-for="item in funcs" :key="item.id">
                        <template #default="{ active }">
                          <v-list-item-icon>
                            <v-icon v-text="item.icon" />
                          </v-list-item-icon>

                          <v-list-item-content>
                            <v-list-item-title>
                              {{ item.name }}
                            </v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-action class="ma-0">
                            <v-icon>
                              {{ active ? 'mdi-check' : 'mdi-plus' }}
                            </v-icon>
                          </v-list-item-action>
                        </template>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6">
              <v-card outlined>
                <v-card-title> 新增群組 </v-card-title>
                <v-card-text>
                  <small>*請選擇檢視/編輯權限</small><br>
                  <small>*點選圖示即可跳出提示視窗</small>
                  <v-list nav dense>
                    <transition-group name="fadeLeft" tag="div" class="mt-4">
                      <template v-for="(item, index) in groupFuncs">
                        <v-list-item v-if="item.id" :key="item.id">
                          <v-list-item-icon>
                            <v-icon
                              @click.stop="funcInfo(index)"
                              v-text="item.icon"
                            />
                          </v-list-item-icon>

                          <v-list-item-content>
                            <v-list-item-title>
                              {{ item.name }}
                            </v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-action class="ma-0">
                            <v-switch v-model="item.permission" inset>
                              <template #label>
                                <span style="padding-left: 5px">{{
                                  item.permission ? '編輯' : '檢視'
                                }}</span>
                              </template>
                            </v-switch>
                          </v-list-item-action>
                        </v-list-item>
                        <v-divider v-else-if="item.divider" :key="index" />
                      </template>
                    </transition-group>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </div>
    <v-dialog v-model="funcDetailDialog" max-width="290">
      <v-card>
        <v-card-text class="pb-0">
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="4"
                class="font-weight-bold"
                style="min-width: 80px"
              >
                功能項目
              </v-col>
              <v-col cols="12" sm="8">
                {{ funcDetailDialogObj.d1 }}
              </v-col>
              <v-col
                cols="12"
                sm="4"
                class="font-weight-bold"
                style="min-width: 80px"
              >
                權限
              </v-col>
              <v-col cols="12" sm="8">
                {{ funcDetailDialogObj.d2 }}
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="other2"
            width="80"
            text
            @click="funcDetailDialog = false"
          >
            確定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <to-top />
    <my-waiting :loading="loadingStatus" />
  </div>
</template>
<script>
export default {
  name: 'S08GroupCreate',
  title: '編輯群組',
  beforeRouteLeave(to, from, next) {
    if (!this.success) {
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
      redirect('/S08/group-list')
    }
    const permission = await store.dispatch('userInfo/fetchPermission', 'S08')
    if (permission >= 2) {
      try {
        const data = await $axios.$get('S08/funcs')
        const groupData = await $axios.$get(`S08/group/${id}`)

        if (data.res === 'CODE0000' && groupData.res === 'CODE0000') {
          const functionList = data.data.funcs
          const funcs = []
          functionList.forEach((item) => {
            funcs.push({
              id: item.id,
              name: item.name,
              icon: item.icon,
              sort: item.sort
            })
          })

          const permissionList = groupData.data.group.authPermissionDTOSet
          const groupFuncs = []
          const funcSelec = []

          functionList.forEach((item, index) => {
            const authpermission = permissionList.find(
              x => item.id === x.functionId
            )
            if (authpermission) {
              funcSelec.push(index)
              groupFuncs.push({
                id: item.id,
                name: item.name,
                icon: item.icon,
                permission: authpermission.permission === 2
              })
            }
          })

          return {
            groupId: id,
            funcs,
            groupName: groupData.data.group.name,
            groupFuncs,
            funcSelec
          }
        } else {
          redirect('/')
        }
      } catch (err) {
        console.log(err)
        console.log('Permission deny')
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
      title: '編輯群組',
      xxs: false,
      scoller_fab: false,
      success: false,

      permissionList: [
        {
          id: '1',
          name: '檢視'
        },
        {
          id: '2',
          name: '編輯'
        }
      ],

      funcDetailDialog: false,
      funcDetailDialogObj: {
        d1: '',
        d2: ''
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
    }
  },
  mounted() {},
  methods: {
    onResize() {
      if (window.innerWidth < 350) {
        this.xxs = true
      } else {
        this.xxs = false
      }
    },
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
    funcSelectChange() {
      const initArr = []
      this.funcSelec
        .sort((a, b) => a - b)
        .forEach((item, index) => {
          const func = this.funcs[item]
          initArr.push({
            id: func.id,
            name: func.name,
            icon: func.icon,
            permission: true
          })

          if (index !== this.funcSelec.length - 1) {
            initArr.push({
              divider: true
            })
          }
        })
      this.groupFuncs = initArr
    },
    funcInfo(index) {
      const initObj = {
        d1: this.groupFuncs[index].name,
        d2: this.groupFuncs[index].permission ? '編輯' : '檢視'
      }
      this.funcDetailDialogObj = Object.assign({}, initObj)
      this.funcDetailDialog = true
    },
    groupCancel() {
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
            this.$router.back()
          }
        })
    },
    groupSubmit() {
      if ((this.groupName ?? '').length === 0) {
        this.$swal.fire('小提示', '請輸入群組名稱')
        return
      }

      if (this.groupFuncs.length === 0) {
        this.$swal.fire('小提示', '請至少選擇一項功能')
        return
      }

      this.$swal
        .fire({
          title: '確定要編輯群組嗎？',
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
        .then(async (result) => {
          if (result.isConfirmed) {
            const initArr = []
            this.groupFuncs.forEach((item) => {
              if (item.id) {
                initArr.push({
                  id: item.id,
                  permission: item.permission
                })
              }
            })

            const form = {}
            form.name = this.groupName
            form.funcs = initArr
            try {
              const response = await this.$axios.put(`/S08/group/${this.groupId}`, form)
              const data = response.data
              if (data.res === 'CODE0000') {
                this.success = true
                this.$swal.fire('小提示', '修改成功', 'success').then(() => {
                  this.$router.replace({
                    path: '/S08/group-list'
                  })
                })
              } else {
                this.$swal.fire('小提示', data.msg, 'error')
              }
              this.$nextTick(() => {
                this.loading(false)
              })
            } catch (err) {
              this.loading(false)
              this.$notify({
                title: '小提示',
                text: '網路連線異常',
                type: 'error',
                duration: 2000
              })
              console.log(err)
            }
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

.cus_common_row {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  word-break: break-all;
  .cus_common_row_header {
    font-size: 1rem;
    font-weight: bold !important;
    padding-right: 16px;
    min-width: 120px;
  }
  .cus_common_row_cell {
    text-align: left;
    font-weight: 300;
    width: 100%;
  }
}

.cus_common_row.mobile {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  word-break: break-all;
  .cus_common_row_header {
    font-size: 1rem;
    font-weight: bold !important;
    padding-right: 16px;
    min-width: 90px;
  }
  .cus_common_row_cell {
    text-align: right;
    font-weight: 300;
    width: 100%;
  }
}
</style>
