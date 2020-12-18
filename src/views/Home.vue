<template>
  <v-row justify="space-around">
    <OverviewCard
      v-for="card in cards"
      :key="card.title"
      :img="card.img"
      :alt="card.alt"
      :title="card.title"
      :description="card.description"
      :button="card.button"
    />
  </v-row>
</template>

<script>
import OverviewCard from "../components/home/OverviewCard.vue";
export default {
  name: "Home",
  components: { OverviewCard },
  data() {
    return {
      cards: [
        {
          img: "assets/img/calculator.jpg",
          alt: "calculator",
          title: "Spezifikationsrechner",
          description:
            "Hiermit kannst du das Gewicht, die Fläche, das Volumen und den Preis von verschiedenen Verpackungsmaterialien berechnen.",
          button: "Spezifikationsrechner"
        },
        {
          img: "assets/img/calculator.jpg",
          alt: "calculator",
          title: "Stellplatzrechner",
          description:
            "Hiermit kannst du berechnen lassen wie oft ein Packstück auf eine Stellfläche passt",
          button: "Stellflächenrechner"
        }
      ]
    };
  }
};
</script>

<style></style>
