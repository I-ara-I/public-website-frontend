<template>
  <v-card class="mt-5 mt-lg-0">
    <v-card-title class="d-flex justify-center"
      >Packstück-Übersicht</v-card-title
    >
    <v-card-text class="black--text text-body-2">
      <v-row
        ><v-col class="col-8">Maße</v-col>
        <v-col class="col-2">Menge</v-col>
        <v-col class="col-2">Entfernen</v-col></v-row
      >
      <v-divider></v-divider>
      <div v-if="!emptyParts">
        <transition-group tag="div" name="fade">
          <Parts v-for="part in areaGetParts" :key="part.key" :part="part" />
        </transition-group>
      </div>
      <div v-else>
        <div class="text-center py-2">
          Es wurde noch keine Packstück hinzugefügt.
        </div>
      </div>
    </v-card-text>

    <v-card-actions class="d-flex justify-center">
      <v-btn
        v-if="!emptyParts"
        small
        @click="areaDeleteAllParts()"
        color="error"
        >Alle Löschen</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Parts from "./Parts";

export default {
  name: "PartsOverview",
  components: { Parts },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["areaGetParts"]),
    emptyParts() {
      let parts = this.areaGetParts;

      if (Object.keys(parts).length > 0) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    ...mapActions(["areaDeleteAllParts"])
  }
};
</script>

<style>
</style>