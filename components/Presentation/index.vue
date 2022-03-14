<template>
  <div class="presentation-container">
    <ul class="presentation-list">
      <PresentationItem
        :key="data.variable"
        v-for="data in ANSData"
        :label="data.label"
        :variable="data.variable"
        :value="data.value"
      />
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PresentationItem from "./item.vue";

export default {
  name: "Presentation",
  components: {
    PresentationItem,
  },
  computed: {
    ...mapState("ansData", ["ANSData"]),
  },
};
</script>

<style lang="scss" scoped>
.presentation-container {
  flex: 1;
  padding: 1rem;
  border: 1px solid #cdcdcd;
  border-radius: 0.5rem;
  overflow: auto;
}

.presentation-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
