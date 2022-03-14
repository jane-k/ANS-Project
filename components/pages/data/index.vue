<template>
  <ul class="button__list">
    <button @click="filterANSDataList('ASSUMPTION')">가정 자료</button>
    <button @click="filterANSDataList('INNER')">내부 추정 자료</button>
    <button @click="filterANSDataList('OUTER')">외생 자료</button>
    <button @click="filterANSDataList('BASE')">기초 자료</button>
    <button @click="filterANSDataList()">전체보기</button>
  </ul>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Data",
  props: {
    msg: String,
  },
  methods: {
    handleRoute(path) {
      this.$router.push(path);
    },
    filterANSDataList(type) {
      if (type) {
        const filteredANSData = this.ANSData.filter(
          (data) => data.type === type
        );
        this.mutateFilteredANSData(filteredANSData);
      } else {
        this.mutateFilteredANSData(this.ANSData);
      }
    },
    ...mapMutations("ansData", ["mutateFilteredANSData"]),
  },
  computed: {
    ...mapState("ansData", ["ANSData"]),
  },
};
</script>

<style></style>
