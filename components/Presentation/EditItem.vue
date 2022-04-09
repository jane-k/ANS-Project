<template>
  <div class="presentation-input__container">
    <div v-if="!isMultiDimensionalData" class="single-dimension-input">
      <input :value="value" @change="onValueChange" />
    </div>
    <MultiItemList v-else class="multiple-dimension-input">
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
        <input class="multi-data__value" :value="item" />
      </li>
    </MultiItemList>
  </div>
</template>

<script>
export default {
  components: {
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
    onValueChange(e) {
      if (Array.isArray(this.value)) {
        let modifiedList = Object.values(this.ANSData).map((el) => {
          const modifiedValue = [...this.value];
          modifiedValue[this.selectedIndex] = e.target.value;
          return el.label === this.label
            ? {
                ...el,
                value: modifiedValue,
              }
            : el;
        });
        this.mutateANSData(modifiedList);
        this.filterANSDataList();
      } else {
        let modifiedList = Object.values(this.ANSData).map((el) => {
          return el.label === this.label
            ? { ...el, value: +e.target.value }
            : el;
        });
        this.mutateANSData(modifiedList);
        this.filterANSDataList();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.presentation-input__container {
  display: flex;
  gap: 1rem;
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
.single-dimension-input {
  input {
    padding: 0.25rem 0.5rem;
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
.multiple-dimension-input {
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
</style>
