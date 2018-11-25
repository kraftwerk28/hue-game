<template>
  <div>
    <input type="radio"
      :checked="val === value"
      :id="id"
      :name="name"
      @input="emit($event)">
    <label :for="id"
      class="radio">
      <slot />
    </label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: null,
    }
  },
  model: {
    prop: 'val',
  },
  props: {
    value: Number,
    name: String,
    id: String,
  },
  methods: {
    emit(e) {
      if (e.target.value) {
        this.$emit('input', this.value);
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
