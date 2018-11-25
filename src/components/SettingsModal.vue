<template>
  <transition name="modal-anim">
    <div class="modal-root">
      <div class="modal thin">
        <header>
          <span>Settings</span>
          <button class="btn-3d red"
            @click="$emit('close')">
            <span>close</span>
          </button>
        </header>
        <div>
          <input class="range-3d"
            type="range"
            @input="setData('distanceBetween', $event.target.value)"
            id="dst"
            min="0"
            max="10"
            value="0">
          <label for="dst">distance between</label>
          <input class="range-3d"
            type="range"
            @input="setData('borderRadius', $event.target.value)"
            id="brdr"
            min="0"
            max="15"
            value="0">
          <label for="brdr">border radius</label>
        </div>
        <footer>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      data: this.startData
    }
  },
  methods: {
    setData(key, val) {
      this.data[key] = +val;
      this.$emit('data', this.data);
    }
  },
  props: {
    startData: Object
  }
}
</script>

<style lang="scss" scoped>
// @import "../scss/style";
.modal-root {
  align-items: flex-start;
  justify-content: flex-end;
}
</style>
