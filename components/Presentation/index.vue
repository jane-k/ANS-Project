<template>
  <div class="presentation-container">
    <div class="presentation-title">dd</div>
    <ul class="presentation-list">
      <PresentationItem
        :key="data.variable"
        v-for="data in filteredANSData"
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
    ...mapState("ansData", ["ANSData", "filteredANSData"]),
  },
  mounted: () => {
    // console.log(this.filteredANSData);
  },
};
</script>

<style lang="scss" scoped>
.presentation-container {
  position: relative;
  flex: 1;
  border: 1px solid #cdcdcd;
  border-radius: 0.5rem;
  overflow: auto;
}

.presentation-title {
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  position: sticky;
  top: 0;
  background-color: white;
}

.presentation-list {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
}
</style>
