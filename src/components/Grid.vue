<template>
  <div class="game-container">
    <div>
      <button class="btn-3d small" @click="$parent.$refs.mainMenu.isShown=true">
        <span>menu</span>
      </button>
      <button class="btn-3d small red" @click="shuffle">
        Shuffle
      </button>
    </div>
    
    <div
      ref="gridContainer"
      class="grid-container"
      :style="gridContainerStyle"
      draggable="false"
    >
      <Tile
        class="swap"
        v-for="(tile, index) in tiles"
        :key="index"
        :color="tile.color"
        :index="index"
        :size="tileSize"
      />
    </div>
    <SwapAnimator
      ref='animator'
      :swapDuration="swapDuration"
      :tileSize="tileSize"
    />
  </div>
</template>

<script>
"use strict";
import Tile from "./Tile.vue";
import SwapAnimator from "./SwapAnimator.vue";
import Vue from "vue";
const hue = require("../engine.js");
const { min, max, round, random } = Math;

export default {
  data() {
    return {
      countX: 4,
      countY: 4,
      distanceBetween: 10,
      selected: null,
      draggingTile: false,
      swapDuration: 500,
      tiles: null
    };
  },
  props: {
    // countX: Number,
    // countY: Number
    // colors: Array
  },
  computed: {
    gridContainerStyle() {
      return {
        gridTemplateColumns: `repeat(${this.countX}, 1fr)`,
        gridTemplateRows: `repeat(${this.countY}, 1fr)`,
        gridGap: this.distanceBetween + 'px',
        padding: this.distanceBetween + 'px',
        cursor: this.draggingTile ? '-webkit-drag' : 'auto'
      };
    },
    tileSize() {
      const maxCnt = max(this.countX, this.countY);
      const minDim =
        min(window.innerHeight / maxCnt,
          window.innerWidth / maxCnt);
      return round(minDim * .6);
    }
  },
  methods: {
    tileClick(b) {
      const a = this.selected;
      if (a === null) {
        this.selected = b;
      } else {
        if (a === b) {
          this.selected = null;
          return;
        }
        this.animateSwap(a, b);

        this.swapTiles(a, b);
        this.selected = null;
      }
    },
    tileDragStart(a, event) {
      this.draggingTile = true;
      const el = this.$refs.gridContainer.children[a];
      this.selected = a;
      el.style.visibility = "hidden";
      this.$refs.animator.bindToCursor(hue.toHEX(this.tiles[a].color));
    },
    tileDragStop(b, event) {
      this.draggingTile = false;
      if (this.selected !== null) {
        const a = this.selected;
        const el1 = this.$refs.gridContainer.children[a];
        if (b === undefined) {
          el1.style.visibility = "visible";
          this.selected = null;
          return;
        }

        this.$refs.animator.unbindFromCursor();
        this.$refs.animator.animateSwap(
          this.$refs.gridContainer.children[b],
          el1,
          hue.toHEX(this.tiles[b].color),
          () => {
            el1.style.visibility = "visible";
          }
        );
        this.swapTiles(a, b);
        this.selectedToDrag = null;
        this.selected = null;
      }
    },
    animateSwap(a, b) {
      const el1 = this.$refs.gridContainer.children[a];
      const el2 = this.$refs.gridContainer.children[b];

      el1.style.visibility = el2.style.visibility = "hidden";

      setTimeout(() => {
        el1.style.visibility = el2.style.visibility = "visible";
      }, this.swapDuration);

      this.$refs.animator.animateSwap(el1, el2, hue.toHEX(this.tiles[a].color));
      this.$refs.animator.animateSwap(el2, el1, hue.toHEX(this.tiles[b].color));
    },
    swapTiles(a, b) {
      const t = this.tiles[a];
      this.tiles[a] = this.tiles[b];
      this.$set(this.tiles, b, t);
      this.check();
    },
    invokeGame(cntX, cntY, colors) {
      this.countX = cntX;
      this.countY = cntY;
      hue.setDimentions(this.countX, this.countY);

      const arr = new Array(this.countX * this.countY);
      arr.fill({ color: "#000000" }, 0, arr.length);
      const c1 = hue.toRGB("#00ff00");
      const c2 = hue.toRGB("#ff0000");
      const palette = new hue.Palette(c1, c2);
      for (let i = 0; i < arr.length; i++) {
        arr[i] = { color: palette.getCl(i / arr.length), index: i };
      }

      this.tiles = arr.slice();
    },
    shuffle() {
      for (let i = 0; i < this.tiles.length; i++) {
        const j = hue.randomRange(0, this.tiles.length);
        this.swapTiles(i, j);
      }
      // this.$set(this.tiles, 0, this.tiles[0]);
    },
    check() {
      for (let i = 1; i < this.tiles.length; i++) {
        if (this.tiles[i - 1].index > this.tiles[i].index) return;
      }
      console.log("Bingo!");
    }
  },
  components: {
    Tile,
    SwapAnimator
  },
  created() {
    // hue.setDimentions(this.countX, this.countY);
    // const arr = new Array(this.countX * this.countY);
    // arr.fill({ color: "#000000" }, 0, arr.length);
    // const c1 = hue.toRGB("#ff0000");
    // const c2 = hue.toRGB("#ff00ff");
    // const palette = new hue.Palette(c1, c2);
    // for (let i = 0; i < arr.length; i++) {
    //   arr[i] = { color: palette.getCl(i / arr.length) };
    // }
    // this.tiles = arr.slice();
  },
  mounted() {
    // console.log(this.$refs.);
  }
};
</script>

<style lang="scss">
.swap-move {
  transition: transform 1s;
}
</style>

<style lang="scss">
@import "../sass/style";
</style>

