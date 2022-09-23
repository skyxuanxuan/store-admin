<template>
  <v-overlay :value="loading" opacity="0.75" z-index="999">
    <v-progress-circular indeterminate size="64" />
  </v-overlay>
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  }
}
</script>
