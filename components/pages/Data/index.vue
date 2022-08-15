<template>
  <div class="Container">
    <Presentation />
    <ul class="button__list">
      <button @click="filterANSDataList('ASSUMPTION')">가정 자료</button>
      <button @click="filterANSDataList('INNER')">내부 추정 자료</button>
      <button @click="filterANSDataList('OUTER')">외생 자료</button>
      <button @click="filterANSDataList('BASE')">기초 자료</button>
      <button @click="filterANSDataList('ALL')">전체보기</button>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import ANSDataType from "@/utils/constants/ANSDataType";

export default {
  name: "Data",
  props: {
    msg: String,
  },
  components: {
    Presentation: () => import("@/components/Presentation"),
  },
  methods: {
    handleRoute(path) {
      this.$router.push(path);
    },
    filterANSDataList(type) {
      if (type !== "ALL") {
        const filteredANSData = Object.values(this.ANSDataTemplate).filter(
          (data) => data.type === type
        );
        const filteredDataName = this.setFilteredDataName(type);
        this.mutateFilteredANSData(filteredANSData);
        this.mutateFilteredDataCount(filteredANSData?.length);
        this.mutateFilteredDataName(filteredDataName);
      } else {
        const filteredDataName = "전체 자료 목록";
        this.mutateFilteredANSData(Object.values(this.ANSDataTemplate));
        this.mutateFilteredDataCount(
          Object.values(this.ANSDataTemplate)?.length
        );
        this.mutateFilteredDataName(filteredDataName);
      }
    },
    setFilteredDataName(_ANSDataType) {
      switch (_ANSDataType) {
        case ANSDataType.ASSUMPTION:
          return "가정 자료 목록";
        case ANSDataType.BASE:
          return "기초 자료 목록";
        case ANSDataType.INNER:
          return "내부 자료 목록";
        case ANSDataType.OUTER:
          return "외부 자료 목록";
        default:
          return "전체 자료 목록";
      }
    },
    setFilteredDataCount(dataCount) {
      this.mutateFilteredDataCount(dataCount);
    },
    ...mapMutations("ansData", [
      "mutateFilteredANSData",
      "mutateFilteredDataName",
      "mutateFilteredDataCount",
    ]),
  },
  computed: {
    ...mapState("ansData", ["ANSDataTemplate"]),
  },
};
</script>

<style scoped lang="scss">
.Container {
  width: 90%;
  height: 60%;
  display: flex;
  gap: 2rem;
}
</style>
