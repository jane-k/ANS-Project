<template>
  <li class="presentation-item">
    <!-- <div class="presentation-value"> -->
    <p class="presentation-label">{{ label }}</p>
    <DisplayItem
      v-if="!isEditable"
      :label="label"
      :variable="variable"
      :value="value"
      :isEditable="isEditable"
      :selectedIndex="selectedIndex"
    />
    <EditItem
      v-else
      :label="label"
      :variable="variable"
      :value="value"
      :selectedIndex="selectedIndex"
      :isEditable="isEditable"
    />
    <!-- </div> -->
    <div class="button__wrapper">
      <button v-if="!isEditable" class="edit__button" @click="toggleIOMode">
        수정
      </button>
      <button v-else @click="onChangeComplete" class="confirm__button">
        확인
      </button>
    </div>
  </li>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "PresentationItem",
  components: {
    // MultiEditModal: () => import("./multiEditModal.vue"),
    DisplayItem: () => import("./DisplayItem.vue"),
    EditItem: () => import("./EditItem.vue"),
    MultiItemList: () => import("./MultiItemList.vue"),
    SelectItem: () => import("./SelectItem.vue"),
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
      type: [Number, String, Array],
    },
  },
  methods: {
    toggleIOMode() {
      this.isEditable = !this.isEditable;
    },

    onChangeComplete() {
      this.isEditable = false;
    },
    filterANSDataList() {
      this.mutateFilteredANSData(Object.values(this.ANSData));
    },
    ...mapMutations("ansData", ["mutateANSData", "mutateFilteredANSData"]),
  },
  computed: {
    isMultiDimensionalData() {
      if (typeof this.value === "number") return false;
      return this.value?.every((item) => Array.isArray(item));
    },
    isSingleData() {
      return !Array.isArray(this.value);
    },
    ...mapState("ansData", ["ANSData"]),
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

.button__wrapper {
  text-align: center;
  flex: 1;
  button {
    border: none;
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    height: 1.5rem;
    transition: 0.2s ease-in-out all;
  }
}
.edit__button {
  background-color: #bed6ed;
}
.confirm__button {
  background-color: #6c7ca6;
  color: #efefef;
}
</style>
