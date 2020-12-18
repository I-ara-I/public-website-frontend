<template>
  <v-col class="col-8 col-sm-5 col-md-5 col-lg-4 col-xl-3">
    <v-card>
      <v-img :src="image" :alt="alt">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="grey"
            ></v-progress-circular>
          </v-row> </template
      ></v-img>
      <v-divider></v-divider>
      <v-card-title class="d-flex justify-center">
        {{ title }}
      </v-card-title>

      <v-card-text class="text-center"> {{ description }}</v-card-text>

      <v-card-actions class="d-flex justify-center">
        <v-btn
          elevation="5"
          depressed
          color="primary"
          to="/packaging/specification"
          class="mb-5"
        >
          {{ button }}
        </v-btn></v-card-actions
      ></v-card
    >
  </v-col>
</template>

<script>
export default {
  props: ["title", "img", "alt", "description", "button"],
  data() {
    return {};
  },
  computed: {
    image() {
      return require(`../../${this.img}`);
    }
  }
};
</script>

<style>
</style>