<template>
  <v-card class="pa-5">
    <v-row>
      <v-col>
        <v-skeleton-loader
          v-if="skeleton"
          class="mx-auto"
          width="100%"
          type="table-heading, list-item-two-line"
        ></v-skeleton-loader>
        <v-simple-table v-if="!skeleton">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center"></th>
                <th class="text-center">Stück</th>
                <th class="text-center">Fläche (m²)</th>
                <th class="text-center">Gewicht (kg)</th>
                <th class="text-center">Volumen (m³)</th>
                <th class="text-center">Preis</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in results" :key="index">
                <td class="text-left">{{ units[index] }}</td>
                <td class="text-right">{{ item.unit }}</td>
                <td class="text-right">{{ item.surface }}</td>
                <td class="text-right">{{ item.weight }}</td>
                <td class="text-right">{{ item.volume }}</td>
                <td class="text-right">{{ item.price }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-row
      ><v-col
        >Alle Ergebnisse werden auf max. 5 Nachkommastellen gerundet. Hierbei
        handelt sich um theoretische Werte. <br />
        Diese können Aufgrund von Toleranzen, Überlappung usw. von den
        tatsächlichen Werten abweichen. <br />
        Die Angabe Fläche(m²) bezieht sich auf die gesamte flachliegende Fläche.
      </v-col></v-row
    >
  </v-card>
</template>

<script>
export default {
  name: "ResultTable",
  data() {
    return {
      units: {
        unit: "1 Stück",
        surface: "1 m²",
        weight: "1 kg",
        volume: "1 m³",
      },
    };
  },
  computed: {
    results: function () {
      let results = this.$store.getters.specificationResults;
      for (let result in results) {
        for (let unit in results[result]) {
          if (results[result][unit] === false) {
            results[result][unit] = "-";
          }
        }
      }

      return results;
    },
    skeleton: function () {
      let results = this.$store.getters.specificationResults;
      if (results.length != 0) {
        return false;
      } else {
        return true;
      }
    },
  },
  created() {
    this.$store.dispatch("loadEmptySpecificationResults").then(() => {
      this.$store.dispatch("setSpecificationEmptyResults");
    });
  },
  destroyed() {
    this.$store.dispatch("setSpecificationEmptyResults");
  },
};
</script>

<style>
th {
  font-size: 1rem !important;
}
td {
  font-size: 1rem !important;
}
</style>
