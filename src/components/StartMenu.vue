<template>
  <transition name="modal-anim" :duration="500" >
    <div class="modal-root" v-show="isShown">
      <div class="modal">
        <header>
          <span v-for="(letter, i) in title.split('')" :key="i">{{letter}}</span>
        </header>
        <div>
          <div>
            <div class="modal-subheader">Pick a username:</div>
            <div>
              <input
                v-model="username"
                size="5"
                class="input-3d"
                type="text"
                placeholder="message">
              <button class="btn-3d">Submit</button>
            </div>
          </div>
          <div>
            <div class="modal-subheader">Create game:</div>
            <div>
              <input-number :title="'rows:'" v-model="countY" :val="4" :min="2" :max="15"/>
              <input-number :title="'columns:'" v-model="countX" :val="4" :min="2" :max="15"/>
            </div>
            
          </div>
          
        </div>
        <footer>
          <button class="btn-3d purple" @click="startGame">Start
            <span>play_circle_filled</span>
          </button>
        </footer>
        
      </div>
    </div>
  </transition>
  
</template>

<script>
"use strict";
const hue = require("../engine.js");
import inputNumber from "./InputNumber.vue";

const _audio_play = HTMLAudioElement.prototype.play;
HTMLAudioElement.prototype.play = function () {
  if (!window.isMobile()) {
    _audio_play.call(this, arguments);
  }
};

export default {
  data() {
    return {
      username: "",
      countX: 2,
      countY: 2,
      isShown: true,
      title: 'Відтінок'
    };
  },
  watch: {
  },
  components: {
    inputNumber
  },
  methods: {
    startGame() {
      this.isShown = false;
      this.$parent.$refs.game.invokeGame(this.countX, this.countY);
    },

  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
@import "../sass/style.scss";
</style>
