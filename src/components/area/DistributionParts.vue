<template>
  <div>
    <v-card v-if="showBox">
      <v-card-title class="justify-center">Packstückverteilung</v-card-title>
      <v-card-text>
        <div :style="styleCard" ref="area">
          <DisplayPart
            v-for="(part, index) in areaGetResults.partsDistrubution"
            :part="part"
            :key="index"
            :numberOfPart="index"
            :pixelSize="unitSize"
          />
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DisplayPart from "./DisplayPart";

export default {
  name: "DistributionParts",
  components: { DisplayPart },
  data() {
    return {
      windowWidth: window.innerWidth
    };
  },
  computed: {
    ...mapGetters(["areaGetResults"]),
    styleCard() {
      if (
        Object.keys(this.areaGetResults).length != 0 &&
        this.areaGetResults.constructor === Object
      ) {
        let boxWidth = this.unitSize * this.areaGetResults.area.length + 2;
        let boxHeight = this.unitSize * this.areaGetResults.area.width + 2;
        return `border: solid 1px black; min-width: ${boxWidth}px; min-height: ${boxHeight}px; position: relative`;
      }
      return `border: solid 1px black; width: 10px; height: 10px;`;
    },
    boxWidth() {
      return this.windowWidth * 0.9;
    },
    unitSize() {
      if (
        Object.keys(this.areaGetResults).length != 0 &&
        this.areaGetResults.constructor === Object
      ) {
        let arealength = this.areaGetResults.area.length;
        let sizeInPercent = 90;

        let pixel = (this.windowWidth * (sizeInPercent / 100)) / arealength;
        pixel = pixel.toFixed(2);
        if (pixel > 4) {
          return 4;
        }
        return pixel;
      }
      return false;
    },
    showBox() {
      if (
        Object.keys(this.areaGetResults).length != 0 &&
        this.areaGetResults.constructor === Object
      ) {
        return true;
      }
      return false;
    }
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  }
};
</script>

<style scoped>
</style>>
