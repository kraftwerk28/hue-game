<template>
  <div id="root">
    <div v-for="(i, ind) in tiles" :key="ind" :style="tileStyle"/>
    <div
      draggable="false"
      class="dragger"
      ref="dragTile"
      v-show="bindCursor" 
      :style="draggerStyle"
    />
  </div>
</template>

<script>
"use strict";

let dt = null;
function mMoveHandler(e) {
  dt.style.left = e.clientX - dt.offsetWidth / 2 + "px";
  dt.style.top = e.clientY - dt.offsetHeight / 2 + "px";
}

export default {
  data() {
    return {
      tiles: [],
      bindCursor: false,
      bindToCursorColor: "#fff"
    };
  },
  computed: {
    tileStyle() {
      return {
        transition: "transform " + this.swapDuration + "ms",
        width: this.tileSize + 'px',
        height: this.tileSize + 'px',
      };
    },
    draggerStyle() {
      return {
        'background-color': this.bindToCursorColor,
        width: this.tileSize + 'px',
        height: this.tileSize + 'px',
      }
    }
  },
  props: { swapDuration: Number, tileSize: { type: Number, default: 30 } },
  methods: {
    animateSwap(el1, el2, color, callback) {
      const index = this.tiles.length;
      this.tiles.push(index);

      this.$nextTick(function () {
        const el = this.$el.children[index];

        const { offsetLeft: l1, offsetTop: t1 } = el1;
        const { offsetLeft: l2, offsetTop: t2 } = el2;
        el.style.backgroundColor = color;
        el.style.left = l1 + "px";
        el.style.top = t1 + "px";
        el.style.transform = `translateX(${l2 - l1}px) translateY(${t2 -
          t1}px)`;
        setTimeout(() => {
          this.tiles.splice(this.tiles.indexOf(index), 1);
          if (callback) callback();
        }, this.swapDuration);
      });
    },
    bindToCursor(color) {
      dt = this.$refs.dragTile;
      this.bindCursor = true;
      this.bindToCursorColor = color;
      this.$parent.$el.addEventListener("mousemove", mMoveHandler);
    },
    unbindFromCursor() {
      this.bindCursor = false;
      this.$parent.$el.removeEventListener("mousemove", mMoveHandler);
    }
  },
  mounted() {
    const handler = () => {
      if (this.$parent.draggingTile) {
        this.unbindFromCursor();
        this.$parent.tileDragStop();
      }
    };
    this.$parent.$el.addEventListener("mouseup", handler);
    this.$parent.$el.addEventListener("mouseleave", handler);
  }
};
</script>

<style lang="scss" scoped>
@import "../sass/vars.scss";

#root {
  position: absolute;
  top: 0px;
  left: 0px;
  > div {
    left: 0px;
    top: 0px;
    border-radius: $border-radius;
    position: absolute;
    height: 30px;
    width: 30px;
    box-shadow: 0px 0px 10px #000;
  }
}

.dragger {
  user-select: none;
  pointer-events: none;
  // transform: scale($breath-scale);
}
</style>
