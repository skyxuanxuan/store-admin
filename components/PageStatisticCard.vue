<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(item, index) in items"
        :key="index"
        cols="12"
        :md="colNum"
        sm="6"
      >
        <v-card flat rounded="md" color="white">
          <v-card-text class="px-6 py-5">
            <div class="d-flex align-center position-relative">
              <span class="lslisk" :class="item.color ? item.color : 'default'" />
              <v-avatar tile>
                <v-icon x-large :color="item.color ? item.color : 'rgb(24, 109, 222)'">
                  {{ item.icon ? item.icon : 'mdi-star' }}
                </v-icon>
              </v-avatar>
              <div class="ml-auto">
                <h5 class="subtitle-1 grey--text">
                  {{ item.title }}
                </h5>
                <h2
                  v-if="item.type === 1"
                  :class="item.color ? item.color + '--text' : ''"
                  class="title font_size1-5"
                  style="text-align: right;"
                >
                  {{ item.value | numberWithCommas }}
                </h2>
                <h2
                  v-else-if="item.type === 2"
                  :class="item.color ? item.color + '--text' : ''"
                  class="title font_size1-5"
                  style="text-align: right;"
                >
                  {{ item.value | toDollars }}
                </h2>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      detailItems: this.items
    }
  },
  computed: {
    colNum() {
      if (this.items.length === 0) {
        return 3
      }
      return 12 / this.items.length
    }
  }
}
</script>
<style lang="scss" scoped>
.lslisk {
  width: 2px;
  background: rgb(24, 109, 222);
  height: 30px;
  position: absolute;
  left: 0px;
  margin-right: 18px;
}

.lslisk.default {
  background: rgb(24, 109, 222);
}
</style>
