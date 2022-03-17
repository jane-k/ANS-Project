<template>
  <li class="presentation-item">
    <div class="presentation-value">
      <p class="presentation-label">{{ label }}</p>
      <div v-if="!isEditable">
        <p v-if="!isMultipleData">{{ value }}</p>
        <p v-else :key="item" v-for="item in value">
          {{ item }}
        </p>
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
    MultiEditModal: () => import("./multiEditModal.vue"),
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
      console.log(e);
      this.selectedIndex = e.target.selectedIndex;
      console.log(this.selectedIndex);
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

.presentation-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: 0.2s ease-in-out all;
  padding: 0.75rem;
  border-radius: 0.5rem;

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
