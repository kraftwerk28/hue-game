<template>
  <transition name='modal-anim'
    :duration="500">
    <div class="modal-root"
      v-show="showing">
      <div class="about modal thin">
        <header>
          <span>{{text.title}}</span>
        </header>
        <div v-html="text.html" />
        <footer>
          <button class="btn-3d red"
            @click="$emit('toggle')">Close</button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    showing: Boolean,
    text: Object
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/style";
.modal-root > .modal {

  > header > span {
    @include firamono;

    color: black;
    animation: none;
  }

  > div {
    @include firamono;

    @include flex;

    padding-top: 100px;
    text-align: center;
    white-space: pre-line;
    font-size: large;
  }
}
</style>
