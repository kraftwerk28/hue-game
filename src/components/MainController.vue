<template>
  <div>
    <Grid
      ref="game"
    />
    <gameMenu
      ref="mainMenu"
    />
  </div>
</template>

<script>
"use strict";
import Grid from "./Grid.vue";
import gameMenu from "./StartMenu.vue";
const hue = require('../engine.js');

export default {
  data() {
    return {};
  },
  components: {
    gameMenu,
    Grid
  },
  methods: {
    mount() {
      const _audio = src => {
        const a = document.createElement("audio");
        a.src = src;
        return a;
      };
      const snds = [
        _audio("../../res/calc1-press.mp3"),
        _audio("../../res/calc2-press.mp3"),
        _audio("../../res/calc1-unpress.mp3"),
        _audio("../../res/calc2-unpress.mp3")
      ];

      Array.prototype.forEach.call(
        document.getElementsByClassName("btn-3d"),
        el => {
          el.addEventListener("mousedown", () => {
            snds[hue.randomRange(0, 2)].play();
          });
          el.addEventListener("mouseup", () => {
            snds[hue.randomRange(2, 4)].play();
          });
        }
      );
      Array.prototype.forEach.call(
        document.getElementsByClassName("input-3d"),
        el => {
          el.addEventListener("focus", () => {
            snds[hue.randomRange(0, 2)].play();
          });
          el.addEventListener("blur", () => {
            snds[hue.randomRange(2, 4)].play();
          });
        }
      );
    }
  },
  mounted() {
    this.mount();
  }
};
</script>

<style>
</style>
