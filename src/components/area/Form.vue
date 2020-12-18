<template>
  <div>
    <v-card v-if="skeleton">
      <v-skeleton-loader
        class="mx-auto"
        width="100%"
        type="article, actions"
      ></v-skeleton-loader>
    </v-card>
    <v-card v-if="!skeleton">
      <v-card-title class="d-flex justify-center">
        Stellflächen-Rechner</v-card-title
      >
      <v-card-subtitle class="mt-2"
        >Bitte wähle eine Stellfläche aus:</v-card-subtitle
      >
      <v-card-text>
        <v-form>
          <v-select
            v-model="selectedArea"
            :items="areaGetSelectableAreas"
            item-text="name"
            label="Flächenauswahl"
            return-object
            @change="setArea()"
          ></v-select> </v-form
        ><v-form v-if="showAreaInputs" v-model="isAreaValid">
          <transition-group name="fade"
            ><Input
              v-for="area in areaGetAreaInputFields"
              :key="area.name"
              :name="area.name"
              :valueLabel="area.valueLabel"
              :unitLabel="area.unitLabel"
              :units="area.units"
              :required="area.required"
              @getInputs="getAreaInputs($event)"
          /></transition-group>
        </v-form>
      </v-card-text>
      <v-card-subtitle
        >Bitte füge mindestens ein Packstück hinzu:</v-card-subtitle
      ><v-card-text
        ><v-form v-model="isPartValid">
          <Input
            v-for="part in areaGetPartInputFields"
            :key="part.name"
            :name="part.name"
            :valueLabel="part.valueLabel"
            :unitLabel="part.unitLabel"
            :units="part.units"
            :required="part.required"
            @getInputs="getPartInputs($event)"
          /> </v-form
      ></v-card-text>

      <v-card-actions class="d-flex justify-center">
        <v-btn
          @click="areaAddPart(partInputs)"
          :disabled="!isPartValid"
          color="primary"
          >Packstück hinzufügen</v-btn
        >
      </v-card-actions>
      <v-card-actions class="d-flex justify-center pb-3">
        <v-btn
          @click="sendRequest()"
          :disabled="disableCalculationButton"
          :loading="loading"
          color="primary"
          >Packstückverteilung berechnen</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Input from "./Input";

export default {
  name: "Form",
  components: { Input },
  data() {
    return {
      selectedArea: {},
      showAreaInputs: false,
      partInputs: {},
      isAreaValid: false,
      isPartValid: false,
      loading: false
    };
  },
  computed: {
    ...mapGetters([
      "areaGetSelectableAreas",
      "areaGetAreaInputFields",
      "areaGetPartInputFields",
      "areaGetAreaValues",
      "areaGetParts",
      "testAreaValues"
    ]),
    disableCalculationButton: function() {
      if (Object.keys(this.areaGetAreaValues).length === 0) {
        return true;
      }

      if (
        this.areaGetAreaValues.length.value == "" ||
        this.areaGetAreaValues.width.value == ""
      ) {
        return true;
      }

      if (this.showAreaInputs) {
        if (this.isAreaValid == false) {
          return true;
        }
      }

      if (Object.keys(this.areaGetParts).length === 0) {
        return true;
      }
      return false;
    },
    skeleton() {
      let area = this.areaGetSelectableAreas;
      if (Object.keys(area).length == 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    ...mapActions([
      "areaLoadAreas",
      "areaLoadAreaInputFields",
      "areaLoadPartInputFields",
      "areaSetAreaValue",
      "areaAddPart",
      "areaSendRequest",
      "areaDeleteAreaValues"
    ]),
    setArea: function() {
      if (this.selectedArea.key === "free") {
        this.showAreaInputs = true;
        this.areaSetAreaValue({
          key: "length",
          value: this.selectedArea.length
        });
        this.areaSetAreaValue({ key: "width", value: this.selectedArea.width });
        return;
      } else {
        this.showAreaInputs = false;
        this.areaSetAreaValue({
          key: "length",
          value: this.selectedArea.length
        });
        this.areaSetAreaValue({ key: "width", value: this.selectedArea.width });
      }
    },
    getAreaInputs: function(values) {
      let key = values.name;
      this.areaSetAreaValue({
        key,
        value: { value: values.value, unit: values.unit }
      });
    },
    getPartInputs: function(values) {
      let key = values.name;
      this.partInputs[key] = { value: values.value, unit: values.unit };
    },
    sendRequest: function() {
      this.loading = true;
      this.areaSendRequest().then(() => {
        this.loading = false;
      });
    }
  },
  created() {
    this.areaLoadAreas();
    this.areaLoadAreaInputFields();
    this.areaLoadPartInputFields();
  },
  beforeDestroy() {
    this.areaDeleteAreaValues();
  }
};
</script>
