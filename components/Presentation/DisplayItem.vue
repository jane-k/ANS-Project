<template>
  <div class="presentation-display__container">
    <div v-if="isSingleData">
      {{ value }}
    </div>
    <MultiItemList v-else-if="!isMultiDimensionalData" class="single-display">
      <li
        :key="index"
        v-for="(item, index) in value"
        class="display-multi__item"
      >
        <p class="multi-data__index">{{ `데이터 ${index + 1}` }}</p>
        <p class="multi-data__value">{{ item }}</p>
      </li>
    </MultiItemList>
    <MultiItemList v-else class="multiple-display">
      <SelectItem
        :selectItems="value"
        :selectedIndex="selectedIndexData"
        :onChange="onSelect"
      />
      <li
        :key="index"
        v-for="(item, index) in value[selectedIndexData]"
        class="display-multi__item"
      >
        <p class="multi-data__index">{{ `데이터 ${index + 1}` }}</p>
        <p class="multi-data__value">{{ item }}</p>
      </li>
    </MultiItemList>
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
    selectedIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      selectedIndexData: this.selectedIndex,
    };
  },
  computed: {
    isMultiDimensionalData() {
      if (typeof this.value === "number") return false;
      return this.value?.every((item) => Array.isArray(item));
    },
    isSingleData() {
      return !Array.isArray(this.value);
    },
  },
  methods: {
    onSelect(e) {
      this.selectedIndexData = e.target.selectedIndex;
    },
  },
};
</script>

<style scoped lang="scss">
.presentation-label {
  display: flex;
  align-items: center;
  line-height: 1.4;
  flex: 5;
}
.display-multi__item {
  display: flex;
  flex-direction: column;
  text-align: center;
  .multi-data__index {
    font-size: 0.75rem;
    margin-bottom: 0.25rem;
    color: #666;
    white-space: nowrap;
  }
}
.display-multi__item::after {
  content: "";
  position: relative;
  left: 0.5rem;
  border-right: 1px solid #cdcdcd;
}
.presentation-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: 0.2s ease-in-out all;
  padding: 1.25rem 1rem;
  border-radius: 0.5rem;
  border-bottom: 1px solid #efefef;
  &:hover {
    background-color: rgba(116, 158, 203, 0.24);
  }
}
.presentation-display__container {
  flex: 8;
  overflow-y: hidden;
  overflow-x: auto;
  &::-webkit-scrollbar {
    height: 10px !important;
    border-radius: 10px;
    background-color: white;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #9abad8;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f8f8f8;
    border-radius: 10px;
  }
}
.presentation-value {
  display: flex;
  width: 100%;
  overflow-x: hidden;
  gap: 1rem;
}
</style>
