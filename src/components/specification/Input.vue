<template>
  <v-row>
    <v-col class="col-8 col-md-6 col-lg-8 col-xl-8">
      <v-text-field
        :label="inputLabel"
        :rules="rules"
        hide-details="auto"
        v-model="input.value"
      >
      </v-text-field>
    </v-col>
    <v-col class="col-4 col-md-3 col-lg-4 col-xl-4">
      <v-select
        v-if="input.name !== 'specificWeight'"
        v-model="selected"
        :items="input.units"
        item-text="label"
        item-value="unit"
        label="Einheit"
        return-object
      ></v-select>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Input",
  props: ["input"],
  data() {
    return {
      selected: {},
      rules: [
        (value) =>
          this.checkValueIsNumber(value) || "Bitte gib eine gültig Zahl ein!",
        (value) =>
          this.checkInputIsRequired(value) || "Dies ist ein Pflichfeld!",
      ],
    };
  },
  computed: {
    inputLabel: function () {
      if (this.input.required === true) {
        return `${this.input.label} (Pflichtfeld)`;
      }
      return this.input.label;
    },
  },
  methods: {
    checkValueIsNumber: function (value) {
      if (value.includes(",")) {
        value = value.replace(",", ".");
      }
      if (!isNaN(value)) {
        return true;
      }
      return false;
    },
    checkInputIsRequired: function (value) {
      if (this.input.required === true && !value) {
        return false;
      }
      return true;
    },
  },
  updated() {
    this.input.selectedUnit = this.selected.unit;
  },
  mounted() {
    if (this.input.units) {
      this.selected = {
        unit: this.input.units[0].unit,
        label: this.input.units[0].label,
      };
      this.input.selectedUnit = this.input.units[0].unit;
    }
  },
};
</script>

<style></style>
