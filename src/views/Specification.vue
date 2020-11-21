<template>
  <v-row no-gutters class="d-flex justify-space-around">
    <v-col class="col-11 col-md-8 col-lg-4 col-3"><Form></Form></v-col>
    <v-col class="col-11 col-lg-7 mt-5 mt-lg-0"
      ><ResultTable></ResultTable
    ></v-col>
  </v-row>
</template>

<script>
import Form from "../components/specification/Form";
import ResultTable from "../components/specification/ResultTable";

export default {
  name: "Specification",
  components: { Form, ResultTable },
};
</script>

<style></style>
