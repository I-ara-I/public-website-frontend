<template>
  <v-row justify="space-around">
    <v-col class="col-11 col-md-6 col-lg-4 col-xl-3">
      <v-card>
        <v-img src="../assets/img/calculator.jpg" alt="calculator"></v-img>
        <v-divider></v-divider>
        <v-card-title class="d-flex justify-center">
          Spezifikationsrechner
        </v-card-title>

        <v-card-text class="text-center">
          Hiermit kannst du das Gewicht, die Fläche, das Volumen und den Preis
          von verschiedenen Verpackungsmaterialien berechnen.</v-card-text
        >

        <v-card-actions class="d-flex justify-center">
          <v-btn
            elevation="5"
            depressed
            color="primary"
            to="/packaging/specification"
            class="mb-5"
          >
            zum Rechner
          </v-btn></v-card-actions
        ></v-card
      >
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
};
</script>

<style></style>
