<template>
  <div>
    <Grid ref="game"
      :data="{ colorMap, cntX, cntY, difficulty }"
      :game-started="gameStarted"
      @end-game="endGame"
      :text="text.grid" />
    <StartMenu @toggle-color="toggleColorModal"
      @toggle-about="toggleAboutModal"
      :shown="!gameStarted"
      :text="text.mainMenu"
      @cntX="cntX = $event"
      @cntY="cntY = $event"
      @invoke-game="startGame"
      @difficulty="difficulty = $event" />
    <AboutModal :text="text.aboutModal"
      :showing="aboutShowing"
      @toggle="toggleAboutModal" />
    <ColorModal :text="text.colorModal"
      :showing="colorShowing"
      @toggle="toggleColorModal"
      @submit-colors="colorMap = $event" />
  </div>
</template>

<script>
'use strict';
import Grid from './Grid.vue';
import StartMenu from './StartMenu.vue';
import AboutModal from './AboutModal.vue';
import ColorModal from './ColorModal.vue';
import hue from '../engine.js';

export default {
  data() {
    return {
      aboutShowing: false,
      colorShowing: false,
      gameStarted: false,

      colorMap: null,
      cntX: 0, cntY: 0,
      difficulty: 1,

      text: null,
    };
  },
  props: { translation: Object },
  components: {
    StartMenu,
    Grid,
    AboutModal,
    ColorModal
  },
  methods: {
    mount() {
      const _audio_play = HTMLAudioElement.prototype.play;
      HTMLAudioElement.prototype.play = function () {
        if (!window.isMobile()) {
          _audio_play.call(this, arguments);
        }
      };

      const _audio = src => {
        const a = document.createElement('audio');
        a.src = src;
        return a;
      };
      const snds = [
        _audio('../../res/calc1-press.mp3'),
        _audio('../../res/calc2-press.mp3'),
        _audio('../../res/calc1-unpress.mp3'),
        _audio('../../res/calc2-unpress.mp3')
      ];


      // 'click' sounds
      Array.prototype.forEach.call(
        [...document.getElementsByClassName('btn-3d'),
        ...document.getElementsByClassName('range-3d')],
        el => {
          el.addEventListener('mousedown', () => {
            snds[hue.randomRange(0, 2)].play();
          });
          el.addEventListener('mouseup', () => {
            snds[hue.randomRange(2, 4)].play();
          });
        });
      Array.prototype.forEach.call(
        document.getElementsByClassName('input-3d'),
        el => {
          el.addEventListener('focus', () => {
            snds[hue.randomRange(0, 2)].play();
          });
          el.addEventListener('blur', () => {
            snds[hue.randomRange(2, 4)].play();
          });
        });
      Array.prototype.forEach.call(
        document.getElementsByClassName('radio-3d'),
        el => {
          el.addEventListener('mousedown', () => {
            snds[hue.randomRange(0, 2)].play();
          });
        }
      );
    },
    toggleAboutModal() {
      this.aboutShowing = !this.aboutShowing;
    },
    toggleColorModal() {
      this.colorShowing = !this.colorShowing;
    },
    startGame() {
      this.gameStarted = true;
    },
    endGame() {
      this.gameStarted = false;
    },
  },
  created() {
    this.text = this.translation;
  },
  mounted() {
    this.mount();
    // fetch('/src/translations/translation-en.json')
    //   .then((res) => res.json())
    //   .then((obj) => { this.text = obj });
  }
};
</script>

<style>
</style>
