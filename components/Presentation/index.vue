<template>
  <div class="presentation-container">
    <div class="presentation-title" v-if="ANSDatabase">
      <h2 class="data-title">
        {{ dataTypeheaderText }} ({{ dataCountHeaderText }})
      </h2>
      <div class="data-reset">데이터 초기화</div>
      <div class="data-save">데이터 저장</div>
    </div>
    <!-- TODO: ANSDatabase 업로드 로직 작성 -->
    <UploadData v-if="!ANSDatabase" />
    <ul v-else class="presentation-list">
      <PresentationItem
        :key="data.variable"
        v-for="data in ANSDatabase"
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
    // UploadData: () => import("@/components/UploadData"),
  },
  computed: {
    ...mapState("ansData", [
      "ANSDataTemplate",
      "ANSDatabase",
      "filteredANSData",
      "filteredDataName",
      "filteredDataCount",
    ]),
    dataTypeheaderText() {
      const filteredDataName = "전체 자료 목록";
      return this.filteredDataName || filteredDataName;
    },
    dataCountHeaderText() {
      return (
        this.filteredANSData?.length || Object.values(this.ANSDatabase)?.length
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.presentation-container {
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  border: 1px solid #cdcdcd;
  border-radius: 0.5rem;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
  overflow-x: hidden;
  overflow-y: hidden;
}

.presentation-container::after {
  content: "";
  background: url("~/assets/images/intro-logo.png") no-repeat;
  background-position: center;
  opacity: 0.12;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: -1;
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

.data-reset {
  color: #ababab;
  position: absolute;
  right: 6.5rem;
  font-size: 0.875rem;
  white-space: nowrap;
  cursor: pointer;
  transition: 0.2s ease-in-out all;
  padding: 0.375rem 0.5rem;
}

.data-reset:hover {
  color: #333;
  background-color: #efefef;
  border-radius: 0.5rem;
}

.data-save {
  color: #ababab;
  position: absolute;
  right: 1rem;
  font-size: 0.875rem;
  white-space: nowrap;
  cursor: pointer;
  transition: 0.2s ease-in-out all;
  padding: 0.375rem 0.5rem;
}

.data-save:hover {
  color: #333;
  background-color: #efefef;
  border-radius: 0.5rem;
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
