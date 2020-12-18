<template>
  <v-container>
    <v-row no-gutters class="d-flex justify-space-around">
      <v-col class="col-11 col-md-8 col-lg-4"><Form></Form></v-col>
      <v-col class="col-11 col-md-8 col-lg-4"
        ><PartsOverview></PartsOverview>
      </v-col>
    </v-row>
    <v-row no-gutters class="d-flex justify-space-around mt-5">
      <DistrubationParts></DistrubationParts>
    </v-row>
  </v-container>
</template>

<script>
import Form from "../components/area/Form";
import PartsOverview from "../components/area/PartsOverview";
import DistrubationParts from "../components/area/DistributionParts";

export default {
  name: "Area",
  components: { Form, PartsOverview, DistrubationParts }
};
</script>

<style >
</style>