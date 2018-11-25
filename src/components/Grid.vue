<template>
  <div class="game-container">
    <div>
      <button class="btn-3d"
        @click="pauseShown = true">
        <span>arrow_back</span>
      </button>
      <button class="btn-3d red"
        @click="shuffle">
        Shuffle
      </button>
      <button class="btn-3d orange"
        @click="settingsShown = true">
        <span>settings</span>
      </button>
    </div>

    <div ref="gridContainer"
      class="grid-container"
      :style="gridContainerStyle"
      :class="{ 'blurred': blurred, 'game-completed': gameCompleted }"
      draggable="false">
      <Tile class="swap"
        v-for="(tile, index) in tiles"
        :key="index"
        :color="tile.color"
        :index="tile.index"
        :borderRadius="borderRadius"
        :size="tileSize"
        :fixed="tile.fixed" />
      <div class="lock-overlay"
        v-show="locked" />
    </div>

    <transition name="modal-anim">
      <div class="modal-root"
        v-show="pauseShown">
        <div class="modal exit-dialog thin">
          <header>
            {{text.exitDialogTitle}}
          </header>
          <footer>
            <button class="btn-3d red"
              @click="pauseShown = false">
              {{text.exitDialogNo}}
            </button>
            <button class="btn-3d green"
              @click="$emit('end-game')">
              {{text.exitDialogYes}}
            </button>
          </footer>
        </div>
      </div>
    </transition>

    <Settings v-show="settingsShown"
      @close="settingsShown = false"
      :startData="{ borderRadius, distanceBetween }"
      @data="applySettings($event)" />

    <SwapAnimator ref='animator'
      :swapDuration="swapDuration"
      :tileSize="tileSize"
      :borderRadius="borderRadius" />
  </div>
</template>

<script>
'use strict';
import Tile from './Tile.vue';
import SwapAnimator from './SwapAnimator.vue';
import Settings from './SettingsModal.vue';
import hue from '../engine.js';
const { min, max, round, random } = Math;

export default {
  data() {
    return {
      countX: 4,
      countY: 4,
      distanceBetween: 0,
      borderRadius: 0,
      selected: null,
      draggingTile: false,
      swapDuration: 500,
      tiles: null,
      blurred: false,

      gameCompleted: false,
      locked: false,
      pauseShown: false,
      settingsShown: false,
      waitToshuffle: 1000,

    };
  },
  props: {
    data: Object,
    gameStarted: Boolean,
    text: null,
  },
  watch: {
    gameStarted(val) {
      if (val) {
        this.invokeGame();
        this.gameCompleted = false;
        this.pauseShown = false;
      }
    }
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
      return round(minDim * .8);
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
      const _a = this.tiles.findIndex(_t => _t.index === a);
      const el = this.$refs.gridContainer.children[_a];
      this.selected = a;
      el.style.visibility = 'hidden';
      this.$refs.animator.bindToCursor(hue.toHEX(this.tiles[_a].color)); // ???
    },
    tileDragStop(b, event) {
      this.draggingTile = false;
      if (this.selected !== null) {
        const a = this.selected;
        const _a = this.tiles.findIndex(_t => _t.index === a);
        const _b = this.tiles.findIndex(_t => _t.index === b);

        const el1 = this.$refs.gridContainer.children[_a];
        this.$refs.animator.unbindFromCursor();
        if (b === undefined) {
          el1.style.visibility = 'visible';
          this.selected = null;
          return;
        }

        this.$refs.animator.animateSwap(
          this.$refs.gridContainer.children[_b],
          el1,
          hue.toHEX(this.tiles[_b].color),
          () => {
            el1.style.visibility = 'visible';
          }
        );
        this.swapTiles(a, b);
        this.selectedToDrag = null;
        this.selected = null;
      }
    },
    animateSwap(a, b) {
      const _a = this.tiles.findIndex(_t => _t.index === a);
      const _b = this.tiles.findIndex(_t => _t.index === b);
      const el1 = this.$refs.gridContainer.children[_a];
      const el2 = this.$refs.gridContainer.children[_b];

      el1.style.visibility = el2.style.visibility = 'hidden';

      setTimeout(() => {
        el1.style.visibility = el2.style.visibility = 'visible';
      }, this.swapDuration);

      this.$refs.animator.animateSwap(el1, el2, hue.toHEX(this.tiles[_a].color));
      this.$refs.animator.animateSwap(el2, el1, hue.toHEX(this.tiles[_b].color));
    },
    swapTiles(a, b) {
      // this.tiles.splice()
      const t = this.tiles.find(_t => _t.index === a);
      const _a = this.tiles.findIndex(_t => _t.index === a);
      const _b = this.tiles.findIndex(_t => _t.index === b);
      this.tiles[_a] = this.tiles[_b];
      // this.$set(this.tiles, a, this.tiles[b]);
      this.$set(this.tiles, _b, t);
      this.check();
    },
    invokeGame() {
      const { cntX, cntY, colorMap: colors, difficulty } = this.data;
      this.countX = cntX;
      this.countY = cntY;
      hue.setDimentions(cntX, cntY);

      const leftSide = hue.getMap1d(colors[0], colors[2], cntY);
      const rightSide = hue.getMap1d(colors[1], colors[3], cntY);

      const arr = [];

      for (let i = 0; i < cntY; i++) {
        arr.push(...hue.getMap1d(leftSide[i], rightSide[i], cntX)
          .map((val, j) => {
            return {
              color: val, index: i * cntX + j, fixed: false
            }
          }));
      }

      switch (difficulty) {
        case 0:
          for (let i = 0; i < arr.length; i += 2) {
            if (i > 0 && cntX % 2 === 0) {
              if (i % cntX === 0)
                i++;
              else if ((i - 1) % cntX === 0)
                i--;
            }
            arr[i].fixed = true;
          }
          break;
        case 1:
          for (let i = 0; i < cntX; i++) {
            arr[hue.fromXY(i, 0)].fixed = true;
            arr[hue.fromXY(i, cntY - 1)].fixed = true;
          }
          for (let i = 0; i < cntY; i++) {
            arr[hue.fromXY(0, i)].fixed = true;
            arr[hue.fromXY(cntX - 1, i)].fixed = true;
          }
          break;
        case 2:
          arr[hue.fromXY(0, 0)].fixed =
            arr[hue.fromXY(0, cntY - 1)].fixed =
            arr[hue.fromXY(cntX - 1, 0)].fixed =
            arr[hue.fromXY(cntX - 1, cntY - 1)].fixed = true;
          break;
        default:
          break;
      }

      // arr[hue.fromXY(1, 1)].fixed = true;

      this.$nextTick(function () {
        this.tiles = arr.slice();
        setTimeout(this.shuffle, this.waitToshuffle);
      });
    },
    shuffle() {
      this.blurred = true;
      setTimeout(() => {
        for (let i = 0; i < this.tiles.length; i++) {
          if (this.tiles[i].fixed) continue;
          let j = hue.randomRange(0, this.tiles.length);;
          while (this.tiles[j].fixed) {
            j = hue.randomRange(0, this.tiles.length);
          }
          this.swapTiles(i, j);
        }
      }, 300);
      setTimeout(() => {
        this.blurred = false;
      }, 500);
      // this.$set(this.tiles, 0, this.tiles[0]);
    },
    check() {
      for (let i = 1; i < this.tiles.length; i++) {
        if (this.tiles[i - 1].index > this.tiles[i].index) return;
      }
      setTimeout(() => {
        this.gameCompleted = true;
      }, 1000);
      setTimeout(() => {
        this.$emit('end-game');
      }, 3000 + 1000);
    },
    applySettings(obj) {
      for (let key in obj) {
        this[key] = obj[key];
      }
    }
  },
  components: {
    Tile,
    SwapAnimator,
    Settings,
  },
  created() {
  },
  mounted() {

  }
};
</script>

<style lang="scss">
@import "../scss/style";

.game-container {
  position: fixed;

  // height: 100%;
  @include fill;

  display: flex;
  align-items: center;
  justify-content: center;

  > div:nth-child(1) {
    z-index: $z-index-secondary;
    @include flex;
    left: 0px;
    right: 0px;
    position: absolute;
    align-self: flex-start;
    justify-content: space-between;
  }
}

.grid-container {
  position: relative;
  display: grid;
  background-color: rgb(50, 50, 50);
  border-radius: 5px;
  transition: filter 0.5s;
}

.game-completed {
  transform: scale(2);
  filter: blur(50px);
  transition: transform 2s, filter 2s;
}

.swap-move {
  transition: transform 1s;
}

.blurred {
  filter: blur(100px) opacity(0);
}

.lock-overlay {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}

.modal.exit-dialog {
  height: auto;
}
</style>
