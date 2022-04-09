<template>
  <select class="select" @change="onChange">
    <option
      :selected="selectedIndex"
      :key="`${item}-${index}`"
      v-for="(item, index) in selectItems"
    >
      {{ `공항 ${index + 1}` }}
    </option>
  </select>
</template>

<script>
export default {
  name: "Select",
  props: {
    selectItems: {
      type: Array,
    },
    selectedIndex: {
      type: Number,
    },
    onChange: {
      type: Function,
    },
  },
};
</script>

<style lang="scss" scoped>
.select {
  width: 6rem;
  padding: 0.25rem;
  border: 1px solid #cdcdcd;

  &:focus {
    border: 1px solid #cdcdcd;
    outline: none;
  }
}
</style>
