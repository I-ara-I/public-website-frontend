<template>
  <v-card class="pa-5">
    <v-row v-if="skeleton">
      <v-skeleton-loader
        class="mx-auto"
        width="100%"
        type="article, actions"
      ></v-skeleton-loader>
    </v-row>
    <div v-if="!skeleton">
      <v-row>
        <v-col class="col-12 text-center"><h1>Spezifikationen</h1> </v-col>
        <v-col class="col-8 col-md-6 col-lg-8"
          ><v-select
            v-model="material"
            :items="materialSelection"
            item-text="label"
            item-value="material"
            :label="labelForMaterial"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-if="material" class="col-8 col-md-6 col-lg-8"
          ><v-select
            v-model="shape"
            :items="shapeSelection"
            item-text="label"
            item-value="shape"
            :label="labelForShape"
            :disabled="isMaterialSet"
          ></v-select
        ></v-col>
      </v-row>
      <v-form v-model="isFormValid">
        <Input v-for="input in getInputs" :key="input.name" :input="input" />
      </v-form>
      <v-row>
        <v-col class="d-flex justify-center">
          <v-card-actions>
            <v-btn
              v-if="shape"
              class="ma-2"
              color="primary"
              :loading="loading"
              :disabled="!isFormValid || loading"
              @click="getResults"
            >
              Berechnen</v-btn
            >
          </v-card-actions></v-col
        >
      </v-row>
    </div>
  </v-card>
</template>

<script>
import Input from "./Input";

export default {
  name: "Form",
  components: { Input },
  data() {
    return {
      colsLabel: 3,
      colsForm: 9,
      material: "",
      shape: "",
      isFormValid: false,
      loading: false,
    };
  },
  computed: {
    materialSelection: function () {
      return this.$store.getters.specificationMaterials;
    },
    shapeSelection: function () {
      return this.$store.getters.specificationShapes;
    },
    isMaterialSet: function () {
      return this.material ? false : true;
    },
    getInputs: function () {
      if (this.shape !== "" && this.material !== "") {
        let inputs = [];
        const shape = this.$store.getters.specificationShapeInputs[this.shape];
        const material = this.$store.getters.specificationMaterialInputs[
          this.material
        ];
        const price = this.$store.getters.specificationPriceInput;
        inputs = [...shape, ...material, ...price];
        return inputs;
      } else {
        return [];
      }
    },
    labelForMaterial: function () {
      if (this.material == "") {
        return "Bitte wähle ein Material aus";
      } else {
        return "Materialauswahl";
      }
    },

    labelForShape: function () {
      if (!this.shape) {
        return "Bitte wähle eine Form aus";
      }
      return "Formauswahl";
    },
    skeleton: function () {
      let materials = this.materialSelection.length;
      let shapes = this.shapeSelection.length;

      if (materials != 0 && shapes != 0) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    getResults: function () {
      this.loading = true;

      const values = {
        material: this.material,
        shape: this.shape,
        inputs: this.getInputs,
      };

      const calculateSpecs = async () => {
        let value = await this.$store.dispatch(
          "calculateSpecificationResults",
          values
        );
        return value;
      };

      calculateSpecs().then((response) => {
        this.loading = !response;
      });
    },
  },
  watch: {
    material: function () {
      this.$store.dispatch("setSpecificationEmptyResults");
    },
    shape: function () {
      this.$store.dispatch("setSpecificationEmptyResults");
    },
  },
  created() {
    let materials = this.$store.getters.specificationMaterials;
    if (materials.length == 0) {
      this.$store.dispatch("loadSpecificationMaterials");
    }

    let shapes = this.$store.getters.specificationShapes;
    if (shapes.length == 0) {
      this.$store.dispatch("loadSpecificationShapes");
    }

    let inputs = this.$store.getters.specificationInputs;
    if (inputs.length == 0) {
      this.$store.dispatch("loadSpecificationInputs");
    }
  },
};
</script>

<style></style>
