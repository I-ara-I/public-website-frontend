<template>
  <v-row>
    <v-col class="col-8 col-md-6 col-lg-8 col-xl-8">
      <v-text-field
        :label="inputLabel"
        :rules="rules"
        hide-details="auto"
        v-model="input.value"
        @keyup="changeResults"
      >
      </v-text-field>
    </v-col>
    <v-col v-if="this.units" class="col-4 col-md-3 col-lg-4 col-xl-4">
      <v-select
        :items="units"
        :label="unitLabel"
        item-text="name"
        item-value="unit"
        v-model="input.unit"
        @change="changeResults"
      ></v-select>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Input",
  props: ["name", "valueLabel", "unitLabel", "units", "required"],
  data() {
    return {
      input: { value: "", unit: "" },
      rules: [
        value =>
          this.checkValueIsNumber(value) || "Bitte gib eine gültig Zahl ein!",
        value => this.checkInputIsRequired(value) || "Dies ist ein Pflichfeld!"
      ]
    };
  },
  computed: {
    inputLabel: function() {
      if (this.required === true) {
        return `${this.valueLabel} (Pflichtfeld)`;
      }
      return this.valueLabel;
    }
  },
  methods: {
    checkValueIsNumber: function(value) {
      if (value.includes(",")) {
        value = value.replace(",", ".");
      }
      if (!isNaN(value)) {
        return true;
      }
      return false;
    },
    checkInputIsRequired: function(value) {
      if (this.required === true && !value) {
        return false;
      }
      return true;
    },
    changeResults: function() {
      this.$emit("getInputs", {
        name: this.name,
        value: this.input.value,
        unit: this.input.unit
      });
    }
  },
  mounted() {
    if (this.units) {
      this.input.unit = this.units[0].unit;
    }
  }
};
</script>

<style></style>
