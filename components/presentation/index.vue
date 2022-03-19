<template>
  <div class="presentation-container">
    <div class="presentation-title">
      <h2 class="data-title">전체 자료 목록 (102)</h2>
      <div class="data-save">데이터 저장</div>
    </div>
    <!-- TODO: initialData 업로드 로직 작성 -->
    <UploadData v-if="initialData" />
    <ul v-else class="presentation-list">
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

export default {
  name: "Presentation",
  components: {
    PresentationItem: () => import("@/components/Presentation/item"),
    UploadData: () => import("@/components/UploadData"),
  },
  computed: {
    ...mapState("ansData", ["ANSData", "initialData", "filteredANSData"]),
  },
  mounted: () => {
    // console.log(this.filteredANSData);
  },
};
</script>

<style lang="scss" scoped>
.presentation-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  border: 1px solid #cdcdcd;
  border-radius: 0.5rem;
  overflow-x: hidden;
  overflow-y: hidden;
}

.presentation-title {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  font-size: 1.125rem;
  font-weight: bold;
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

  &::-webkit-scrollbar {
    width: 10px !important;
    border-radius: 10px;
    background-color: white;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #9abad8;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: #fdfdfd;
    border-left: 1px solid #ebebeb;
    border-radius: 10px;
  }
}
</style>
