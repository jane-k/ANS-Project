<template>
  <div class="backdrop" @click.self="onClose">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    onClose: {
      type: Function,
    },
  },
};
</script>

<style lang="scss" scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
