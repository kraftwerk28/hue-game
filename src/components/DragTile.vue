<template>
  <div
    :style="style"
  />
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["swapDuration"],
  computed: {
    style() {
      return {
        transition: "transform " + this.swapDuration + "ms"
      };
    }
  },
  methods: {
    animate(el1, el2, color) {
      const { offsetLeft: l1, offsetTop: t1 } = el1;
      const { offsetLeft: l2, offsetTop: t2 } = el2;

      this.$el.style.backgroundColor = color;
      this.$el.style.left = l1 + "px";
      this.$el.style.top = t1 + "px";
      this.$el.style.transform = `translateX(${l2 - l1}px) translateY(${t2 -
        t1}px)`;
      setTimeout(() => {
        this.$el.style.backgroundColor = "transparent";

        this.$el.style.left = "-999px";
        this.$el.style.top = "-999px";
        this.$el.style.transform = "";
      }, this.swapDuration);
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  left: -999px;
  top: -999px;
  position: absolute;
  background-color: purple;
  height: 30px;
  width: 30px;
}
</style>
