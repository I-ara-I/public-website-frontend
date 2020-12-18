<template>
  <div>
    <v-row>
      <v-col class="col-8">
        {{ part.length.value }} {{ part.length.unit }} x {{ part.width.value }}
        {{ part.width.unit }}
      </v-col>
      <v-col class="col-2">{{ part.quantity.value | toUppercase }}</v-col>
      <v-col>
        <v-icon color="red" @click="areaDeletePart(part.key)">mdi-close</v-icon>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0"> <v-divider></v-divider> </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Parts",
  props: ["part"],
  data() {
    return {};
  },
  methods: {
    ...mapActions(["areaDeletePart"])
  },
  filters: {
    toUppercase: function(value) {
      return value.toUpperCase();
    }
  }
};
</script>