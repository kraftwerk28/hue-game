<template>
  <transition name="modal-anim"
    :duration="500">
    <div class="modal-root"
      v-show="shown">
      <div class="modal main-menu">
        <header>
          <span v-for="(letter, i) in text.title && text.title.split('')"
            :key="i">{{letter}}</span>
        </header>
        <div>
          <div>
            <div class="modal-subheader">{{text.usernameTitle}}</div>
            <div>
              <input v-model="username"
                size="5"
                class="input-3d"
                type="text"
                :placeholder="text.usernamePlaceholder">
              <button class="btn-3d">{{text.usernameSubmit}}</button>
            </div>
          </div>
          <div>
            <div class="modal-subheader">{{text.createGameTitle}}</div>
            <div>
              <InputNumber :title="text.rowsLabel"
                v-model="countY"
                :val="6"
                :min="4"
                :max="15" />
              <InputNumber :title="text.columnsLabel"
                v-model="countX"
                :val="6"
                :min="4"
                :max="15" />
              <button class="btn-3d orange"
                @click="$emit('toggle-color')">
                {{text.setColorsButton}}
                <span>color_lens</span>
              </button>

            </div>
            <div>
              {{text.levelChoose}}
            </div>
            <div>
              <div class="radio-3d">
                <input v-model="difficulty"
                  :value="0"
                  type="radio"
                  id="ch1"
                  name="diff">
                <label for="ch1">
                  {{text.easyLevel}}
                </label>
              </div>
              <div class="radio-3d">
                <input v-model="difficulty"
                  :value="1"
                  type="radio"
                  id="ch2"
                  name="diff">
                <label for="ch2">
                  {{text.mediumLevel}}
                </label>
              </div>
              <div class="radio-3d">
                <input v-model="difficulty"
                  :value="2"
                  type="radio"
                  id="ch3"
                  name="diff">
                <label for="ch3">
                  {{text.hardLevel}}
                </label>
              </div>
            </div>

          </div>

        </div>
        <footer>
          <button class="btn-3d"
            @click="$emit('toggle-about')">
            {{text.creditsButton}}
            <span>people</span>
          </button>
          <button class="btn-3d purple"
            @click="startGame">
            {{text.startButton}}
            <span>play_circle_filled</span>
          </button>
        </footer>

      </div>
    </div>
  </transition>

</template>

<script>
'use strict';
const hue = require('../engine.js');
import InputNumber from './InputNumber.vue';

export default {
  data() {
    return {
      username: '',
      countX: 2,
      countY: 2,
      isShown: true,
      difficulty: 1
    };
  },
  props: {
    shown: Boolean,
    text: null,
  },
  watch: {
    countX(val) {
      this.$emit('cntX', val);
    },
    countY(val) {
      this.$emit('cntY', val);
    },
    difficulty(val) {
      this.$emit('difficulty', val);
    }
  },
  components: {
    InputNumber,
  },
  methods: {
    startGame() {
      this.isShown = false;
      this.$emit('invoke-game');
    },

  },
  mounted() {
    // console.log(this.text);
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/style";

.modal-root {
  > .modal.main-menu {
    > header > span {
      $blur: 3px;

      &:nth-child(1) {
        animation: r 10s ease-in-out infinite;
        animation: r 10s ease-in-out 5s infinite;

        @keyframes r {
          0% {
            transform: rotate(0deg);
          }

          10% {
            transform: rotate(360deg);
          }

          100% {
            transform: rotate(360deg);
          }
        }
      }

      &:nth-child(3n) {
        color: red;
        text-shadow: 0px 0px $blur red;
      }

      &:nth-child(3n + 1) {
        color: green;
        text-shadow: 0px 0px $blur green;
      }

      &:nth-child(3n + 2) {
        color: mediumblue;
        text-shadow: 0px 0px $blur mediumblue;
      }

      letter-spacing: 3px;
    }

    > div {
      > div {
        flex-flow: column wrap;
        align-items: flex-end;
      }

      > div:nth-child(1) {
        @include flex;

        border-bottom: 1px solid black;
        padding-bottom: 20px;
        align-items: stretch;

        > div:nth-child(2) {
          @include flex;

          flex-flow: row wrap;

          > input {
            flex: 3;
          }

          > button {
            flex: 1;
          }
        }
      }

      > div:nth-child(2) {
        justify-items: center;

        // game settings
        > div:nth-child(n + 1) {
          @include flex;

          flex-flow: row nowrap;
          align-items: flex-end;
          justify-content: space-around;
        }
      }
    }
  }
}
</style>
