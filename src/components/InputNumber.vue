<template>
  <div id="root">
    <div v-if="title.length" class="modal-subheader">{{ title }}</div>
    <div>
      <input
        size="2"
        class="input-3d"
        type="text"
        :value="value"
        :max="max"
        :min="min"
        @change="change($event)"
        @focus="focus($event)"
      >
      <div>
        <button class="btn-3d tiny" @click="incr">
          <span class="material-icons">exposure_plus_1</span>
        </button>
        <button class="btn-3d tiny" @click="decr">
          <span class="material-icons">exposure_neg_1</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
"use strict";

export default {
  data() {
    return {
      value: this.val
    };
  },
  props: {
    min: { default: 0, type: Number },
    max: { default: 1, type: Number },
    val: { default: 0, type: Number },
    step: { default: 1, type: Number },
    title: { default: "", type: String }
  },
  methods: {
    norm() {
      if (this.value < this.min) this.value = this.min;
      if (this.value > this.max) this.value = this.max;
      this.$emit("input", this.value);
    },
    incr() {
      this.value += this.step;
      this.norm();
    },
    decr() {
      this.value -= this.step;
      this.norm();
    },
    change(evt) {
      this.value = +evt.target.value;
      if (isNaN(this.value)) this.value = 0;
      this.norm();
    },
    focus(e) {
      e.target.select();
    }
  },
  created() {
    this.norm();
  }
};
</script>

<style lang="scss" scoped>
#root {
  @import "../sass/style.scss";

  @include flex;
  margin: $btn-margin;
  flex-flow: column nowrap;
  > div:last-child {
    @include flex;
    flex-flow: row nowrap;
    > div {
      @include flex;
      flex-flow: column nowrap;
    }
  }

  .btn-3d,
  .input-3d {
    margin: 0px;
  }
}
</style>
