<template>
  <div class="rgbpicker-root">
    <input type="range"
      v-model="r"
      @change="setOut"
      class="range-3d"
      min="0"
      max="255">
    <input type="range"
      v-model="g"
      @change="setOut"
      class="range-3d"
      min="0"
      max="255">
    <input type="range"
      v-model="b"
      @change="setOut"
      class="range-3d"
      min="0"
      max="255">
  </div>
</template>

<script>
const hue = require('../engine.js');

export default {
  data() {
    return {
      r: 0, g: 0, b: 0
    }
  },
  props: {
    value: { type: Array }
  },
  methods: {
    setOut() {
      this.$emit('input', [+this.r, +this.g, +this.b]);
    }
  },
  created() {
    [this.r, this.g, this.b] = this.value;
  }
}
</script>

<style lang="scss" scoped>
div.rgbpicker-root {
  display: flex;
  flex-flow: column nowrap;
  // align-items: center;
  // justify-content: center;
}
</style>
