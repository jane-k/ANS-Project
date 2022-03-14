<template>
  <li class="presentation-item">
    <div class="presentation-value">
      <p class="presentation-label">{{ label }}</p>
      <p v-if="!isEditable">{{ value }}</p>
      <div v-else class="presentation-input__container">
        <div v-if="!isMultipleData">
          <input :value="value" />
          <button @click="onChangeComplete">확인</button>
        </div>
        <div v-else>
          <MultiEditModal :onClose="toggleIOMode" />
        </div>
      </div>
    </div>
    <button class="edit__button" @click="toggleIOMode">수정</button>
  </li>
</template>

<script>
export default {
  name: "PresentationItem",
  components: {
    MultiEditModal: () => import("./multiEditModal.vue"),
  },
  data: () => ({
    isEditable: false,
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
      type: Number,
    },
  },
  methods: {
    toggleIOMode() {
      this.isEditable = !this.isEditable;
    },
    onValueChange() {},
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
  background-color: #cdcdcd;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}
</style>
