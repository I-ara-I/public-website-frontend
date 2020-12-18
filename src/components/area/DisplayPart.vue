<template>
  <div
    :style="style"
    class="d-flex justify-center black--text text-center pa-auto"
  >
    <div v-if="screenSize == 'xl'">Packstück <br />{{ numberOfPart + 1 }}</div>
    <div v-if="screenSize == 'lg'">Packstück <br />{{ numberOfPart + 1 }}</div>
    <div v-if="screenSize == 'md'">
      Packst. <br />
      {{ numberOfPart + 1 }}
    </div>
    <div v-if="screenSize == 'sm'">P {{ numberOfPart + 1 }}</div>
    <div v-if="screenSize == 'xs'">{{ numberOfPart + 1 }}</div>
  </div>
</template>

<script>
export default {
  name: "DisplayPart",
  props: ["part", "numberOfPart", "pixelSize"],
  data() {
    return {
      class: {}
    };
  },
  computed: {
    style() {
      let width = this.pixelSize * this.part.size.width;
      let length = this.pixelSize * this.part.size.length;
      let cordinates = this.getCordinates("1");

      let style = {
        width: `${length}px`,
        height: `${width}px`,
        border: "solid 1px black",
        position: "absolute",
        left: `${cordinates.x}px`,
        top: `${cordinates.y}px`,
        "box-sizing": "border-box"
      };
      return style;
    },
    screenSize() {
      return this.$vuetify.breakpoint.name;
    }
  },
  methods: {
    getCordinates(position) {
      let posOfY = this.part.position[position].indexOf("Y");
      let x =
        (this.part.position[position].slice(1, posOfY) - 1) * this.pixelSize;
      let y =
        (this.part.position[position].slice(posOfY + 1) - 1) * this.pixelSize;
      return { x: x, y: y };
    }
  }
};
</script>