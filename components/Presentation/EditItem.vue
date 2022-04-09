<template>
  <div class="presentation-input__container">
    <div v-if="!isMultiDimensionalData" class="single-input">
      <input :value="value" @change="onValueChange" />
    </div>
    <div v-else class="multiple-input">
      <Select
        :selectItems="value"
        :selectedIndex="selectedIndex"
        :onChange="onSelect"
      />
      <input :value="value[selectedIndex]" @change="onValueChange" />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    // MultiEditModal: () => import("./multiEditModal.vue"),
    DisplayItem: () => import("./DisplayItem.vue"),
    EditItem: () => import("./EditItem.vue"),
    MultiItemList: () => import("./MultiItemList.vue"),
    SelectItem: () => import("./SelectItem.vue"),
    Select: () => import("@/components/common/Select"),
  },
  props: {
    label: {
      type: String,
      default: "",
    },
    variable: {
      type: String,
      default: "",
    },
    value: {
      type: [Number, String, Array],
    },
  },
};
</script>

<style scoped lang="scss">
.presentation-input__container {
  display: flex;
  gap: 1rem;
  flex: 8;
}
.single-input {
  input {
    padding: 0.25rem 0.5rem;
    width: 300px;
    font-size: 0.875rem;
    border: 1px solid #cdcdcd;
    border-radius: 0.25rem;
    transition: 0.2s ease-in-out all;
    &:focus {
      border: 1px solid #666;
      outline: none;
    }
  }
}
.multiple-input {
  input {
    margin-left: 1rem;
    padding: 0.25rem 0.5rem;
    width: 8rem;
    border: 1px solid #cdcdcd;
    border-radius: 0.25rem;
    transition: 0.2s ease-in-out all;
    &:focus {
      border: 1px solid #666;
      outline: none;
    }
  }
}
</style>
