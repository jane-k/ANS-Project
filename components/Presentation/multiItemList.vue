<template>
  <ul class="display-item__list">
    <slot />
  </ul>
</template>

<script>
export default {
  name: "MultiItemList",
  props: {
    itemList: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
.display-item__list {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  height: 3rem;
  overflow-x: scroll;
  width: 600px;
}
</style>
