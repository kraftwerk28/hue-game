<template>
  <transition appear
    appear-active-class="appear">
    <div draggable="false"
      :style="style"
      :class="{ 'is-selected': this.$parent.selected === this.index }"
      @mousedown="mDown($event)"
      @mouseup.stop="mUp"
      @click="mClick">
      <div v-if="fixed"
        class="material-icons">brightness_1</div>
    </div>
  </transition>
</template>

<script>
'use strict';
const hue = require('../engine.js');

export default {
  data() {
    return {
      clicked: false,
      firstClick: null,
      dragSensitivity: 20,
    };
  },
  props: {
    color: Array,
    index: Number,
    size: { type: Number, default: 30 },
    fixed: { type: Boolean, default: false },
    borderRadius: Number,
  },
  computed: {
    colorify() {
      const cl =
        typeof this.color === 'string' ? this.color : hue.toHEX(this.color);
      return cl;
    },
    style() {
      return {
        backgroundColor: this.colorify,
        width: this.size + 'px',
        height: this.size + 'px',
        borderRadius: this.borderRadius + 'px',
      };
    },
  },
  methods: {
    mDown(evt) {
      if (!this.fixed) {
        this.clicked = true;
        document.addEventListener('mousemove', this.mMove);
        this.firstClick = { x: evt.clientX, y: evt.clientY };
      }
    },
    mMove(evt) {
      console.log('m');
      if (this.clicked) {
        if (Math.abs(evt.clientX - this.firstClick.x) > this.dragSensitivity ||
          Math.abs(evt.clientY - this.firstClick.y) > this.dragSensitivity) {
          document.removeEventListener('mousemove', this.mMove);

          this.$parent.tileDragStart(this.index, evt);
          this.clicked = false;
        }
      }
    },
    mUp() {
      this.clicked = false;
      if (this.$parent.draggingTile) {
        this.$parent.tileDragStop(this.fixed ? undefined : this.index);
      }

    },
    mClick() {
      if (!this.fixed)
        this.$parent.tileClick(this.index)
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/vars";

div {
  width: 30px;
  height: 30px;
  cursor: pointer;
  user-select: none;
  transition: transform 0.2s, filter 0.3s;
  -webkit-tap-highlight-color: transparent;

  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    font-size: 50%;
  }
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
