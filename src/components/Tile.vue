<template>
  <transition
    appear
    appear-active-class="appear"
  >
    <div
      draggable="false"
      :style="style"
      :class="{ 'is-selected': this.$parent.selected === this.index }"
      @mousedown="clicked = true"
      @mousemove="mMove($event)"
      @mouseup.stop="mUp"
      @click="$parent.tileClick(index)"
    />
  </transition>
</template>

<script>
"use strict";
const hue = require("../engine.js");

export default {
  data() {
    return {
      clicked: false
    };
  },
  props: { color: Array, index: Number, size: { type: Number, default: 30 } },
  computed: {
    colorify() {
      const cl =
        typeof this.color === "string" ? this.color : hue.toHEX(this.color);
      return cl;
    },
    style() {
      return {
        backgroundColor: this.colorify,
        width: this.size + "px",
        height: this.size + "px"
      };
    }
  },
  methods: {
    mMove(evt) {
      if (this.clicked) {
        this.clicked = false;
        this.$parent.tileDragStart(this.index, evt);
      }
    },
    mUp() {
      this.clicked = false;
      if (this.$parent.draggingTile) {
        this.$parent.tileDragStop(this.index);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../sass/vars.scss";

div {
  width: 30px;
  height: 30px;
  border-radius: $border-radius;
  cursor: pointer;
  user-select: none;
  transition: transform 0.2s;

  &:hover {
    // transform: scale($breath-scale);
  }
  &:active {
    transform: scale(0.8);
  }

  // transition: transform 1s;
}

.is-selected {
  animation: breath 1s ease-in-out 0s infinite;
}

// <transition>
.appear {
  animation: appear 1s forwards;
}

.hidden {
  transform: scale(0);
}

@keyframes appear {
  0% {
    transform: scale(0);
  }
  75% {
    transform: scale($breath-scale);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes breath {
  0% {
    transform: scale($breath-scale + 0.2);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale($breath-scale + 0.2);
  }
}
</style>
