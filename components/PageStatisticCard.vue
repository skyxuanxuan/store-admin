<template>
  <v-container>
    <v-row class="white">
      <v-col v-for="(item, index) in items" :key="index" cols="12" md="3" sm="6">
        <v-card outlined rounded="md" color="#EEEEEE">
          <v-card-title class="">
            {{ item.title }}
          </v-card-title>

          <v-card-actions>
            <v-spacer />
            {{ item.value }}
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
  }
}
</script>
