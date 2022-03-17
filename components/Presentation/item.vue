<template>
  <li class="presentation-item">
    <div class="presentation-value">
      <p class="presentation-label">{{ label }}</p>
      <div v-if="!isEditable">
        <p v-if="!isMultipleData">{{ value }}</p>
        <MultiItemList v-else>
          <li
            :key="index"
            v-for="(item, index) in value"
            class="display-multi__item"
          >
            <p class="multi-data__index">{{ `데이터 ${index + 1}` }}</p>
            <p class="multi-data__value">{{ item }}</p>
          </li>
        </MultiItemList>
      </div>
      <div v-else>
        <div v-if="!isMultipleData" class="presentation-input__container">
          <input :value="value" />
        </div>
        <div v-else class="presentation-input__container">
          <Select :selectItems="value" :onChange="onSelect" />
          <input :value="value[selectedIndex]" />
        </div>
      </div>
    </div>
    <button v-if="!isEditable" class="edit__button" @click="toggleIOMode">
      수정
    </button>
    <button v-else @click="onChangeComplete" class="confirm__button">
      확인
    </button>
  </li>
</template>

<script>
export default {
  name: "PresentationItem",
  components: {
    // MultiEditModal: () => import("./multiEditModal.vue"),
    MultiItemList: () => import("./multiItemList.vue"),
    Select: () => import("@/components/common/Select"),
  },
  data: () => ({
    isEditable: false,
    selectedIndex: 0,
  }),
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
      type: [Number, Array],
    },
  },
  methods: {
    toggleIOMode() {
      this.isEditable = !this.isEditable;
    },
    onValueChange() {},
    onSelect(e) {
      this.selectedIndex = e.target.selectedIndex;
    },
    onChangeComplete() {
      this.isEditable = false;
    },
  },
  computed: {
    isMultipleData() {
      return Array.isArray(this.value);
    },
  },
};
</script>

<style scoped lang="scss">
.presentation-label {
  display: flex;
  align-items: center;
  width: 20rem;
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
    background-color: #e6eef7;
  }
}
.presentation-input__container {
  display: flex;
  gap: 1rem;

  & > input {
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

.presentation-value {
  display: flex;
  gap: 1rem;
}

button {
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  height: 1.5rem;
  transition: 0.2s ease-in-out all;
}

.edit__button {
  background-color: #bed6ed;
}

.confirm__button {
  background-color: #6c7ca6;
  color: #efefef;
}
</style>
