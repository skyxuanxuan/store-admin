<template>
  <v-container>
    <v-row class="white">
      <v-col
        v-for="(item, index) in items"
        :key="index"
        cols="12"
        :md="colNum"
        sm="6"
      >
        <v-card outlined rounded="md" color="#EEEEEE">
          <v-card-title class="">
            {{ item.title }}
          </v-card-title>

          <v-card-actions v-if="item.type === 1">
            <v-spacer />
            {{ item.value | numberWithCommas }}
          </v-card-actions>
          <v-card-actions v-else-if="item.type === 2">
            <v-spacer />
            {{ item.value | toDollars }}
          </v-card-actions>
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
