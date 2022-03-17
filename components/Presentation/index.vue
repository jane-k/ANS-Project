<template>
  <div class="presentation-container">
    <div class="presentation-title">
      <h2 class="data-title">전체 자료 목록 (102)</h2>
      <div class="data-save">데이터 저장</div>
    </div>
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
  padding-bottom: 1rem;
  overflow: hidden;
}

.presentation-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  font-size: 1.125rem;
  font-weight: bold;
  position: sticky;
  top: 0;
  background-color: white;
  border-bottom: 1px solid #cdcdcd;
}

.data-title {
  width: 100%;
  text-align: center;
}

.data-save {
  color: #666;
  position: absolute;
  right: 1rem;
  font-size: 0.875rem;
  white-space: nowrap;
  cursor: pointer;
}

.presentation-list {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
