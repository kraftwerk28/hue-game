<template>
  <transition name='modal-anim'
    :duration="500">
    <div class="modal-root"
      v-show="showing">
      <div class="modal">
        <header>
          <span>{{text.title}}</span>
        </header>
        <div>
          <RGB v-model="cl1" />
          <RGB v-model="cl2" />
          <canvas id="canv" />
          <RGB v-model="cl3" />
          <RGB v-model="cl4" />
        </div>
        <footer>
          <button class="btn-3d green"
            @click="close">
            Close
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import RGB from './RGBPicker.vue';
import hue, { HSVtoRGB, RGBtoHSV } from '../engine.js';

export default {
  data() {
    return {
      cl1: [255, 255, 0],
      cl2: [0, 255, 255],
      cl3: [255, 0, 128],
      cl4: [0, 0, 255],

      canvWidth: 0,
      canvHeight: 0,
      pixArray: null,

      canvEl: null,
      ctx: null
    }
  },
  props: {
    showing: Boolean,
    text: Object
  },
  watch: {
    cl1() { this.fillArr(); },
    cl2() { this.fillArr(); },
    cl3() { this.fillArr(); },
    cl4() { this.fillArr(); },
  },
  computed: {
  },
  methods: {
    fillArr() {
      const topSide =
        hue.getMap1d(this.cl1, this.cl2, this.canvWidth);
      const bottomSide =
        hue.getMap1d(this.cl3, this.cl4, this.canvWidth);

      for (let i = 0; i < this.canvWidth; i++) {
        this.pixArray[i] = hue.getMap1d(topSide[i], bottomSide[i], this.canvHeight);
      }
      for (let x = 0; x < this.canvWidth; x++) {
        for (let y = 0; y < this.canvHeight; y++) {
          this.ctx.fillStyle = hue.toHEX(this.pixArray[x][y]);
          this.ctx.fillRect(x, y, 1, 1);
        }
      }
    },
    close() {
      this.$emit('toggle');
      this.$emit('submit-colors', [this.cl1, this.cl2, this.cl3, this.cl4]);
    }
  },
  components: { RGB },
  mounted() {
    this.canvEl = document.getElementById('canv');
    this.ctx = this.canvEl.getContext('2d');
    this.canvWidth = this.canvEl.width;
    this.canvHeight = this.canvEl.height;
    this.pixArray =
      new Array(this.canvWidth).fill(new Array(this.canvHeight).fill());

    this.fillArr();
    this.$emit('submit-colors', [this.cl1, this.cl2, this.cl3, this.cl4]);
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/style";
.modal-root > .modal > div {
  @include grid;
  grid-template: 1fr auto 1fr / 1fr auto 1fr;

  > * {
    &:nth-child(1) {
      align-items: flex-end;
      justify-content: flex-end;
    }
    &:nth-child(2) {
      grid-column: 3 / 4;
      align-items: flex-start;
      justify-content: flex-end;
    }
    &:nth-child(3) {
      grid-column: 2 / 3;
      grid-row: 2 / 3;
    }
    &:nth-child(4) {
      grid-row: 3 / 4;
      grid-column: 1 / 2;
      align-items: flex-end;
      justify-content: flex-start;
    }
    &:nth-child(5) {
      grid-row: 3 / 4;
      grid-column: 3 / 4;
      align-items: flex-start;
      justify-content: flex-start;
    }
  }
}
</style>

