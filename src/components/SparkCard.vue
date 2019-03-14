<template>
  <v-card
    class="mt-3 mx-auto"
    :max-width="maxWidth"
  >
    <v-sheet
      class="v-sheet--offset mx-auto"
      :color="color"
      elevation="12"
      max-width="calc(100% - 32px)"
    >
      <v-sparkline
        :labels="labels"
        :value="values"
        :color="chartColor"
        line-width="2"
        padding="16"
      ></v-sparkline>
    </v-sheet>

    <v-card-text class="pt-0">
      <div class="title font-weight-light mb-2">{{title}}</div>
      <div class="subheading font-weight-light grey--text">
        {{desc}}
      </div>
      <v-divider class="my-2"></v-divider>
      <slot name="footer"></slot>
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>

<script>
  export default {
    name: 'spark-card',
    props: {
      labels: {type: Array, required: true},
      values: {type: Array, required: true},
      color: {type: String, default: 'cyan'},
      chartColor: {type: String, default: 'white'},
      maxWidth: {type: String, default: '600'},
      title: String,
      desc: String,
    },
    data() {
      return {};
    },
  };
</script>
