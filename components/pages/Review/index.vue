<template>
  <div class="Container">
    <ReviewTable :tableToDisplay="tableToDisplay" />
    <ul class="button__list">
      <button @click="displaySummaryTable">요약 출력</button>
      <button @click="displayNormalTable">표준 출력</button>
      <button @click="displaySelectableTable">선택 출력</button>
      <button @click="handleRoute('/')">돌아가기</button>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Review",
  components: {
    ReviewTable: () => import("./Table"),
  },
  data() {
    return {
      tableToDisplay: null,
    };
  },
  methods: {
    handleRoute(path) {
      this.$router.push(path);
    },
    displaySummaryTable() {
      this.tableToDisplay = "SUMMARY_TABLE";
    },
    displayNormalTable() {
      this.tableToDisplay = "NORMAL_TABLE";
    },
    displaySelectableTable() {
      this.tableToDisplay = "SELECTABLE_TABLE";
    },
  },
};
</script>

<style lang="scss" scoped>
.Container {
  width: 95%;
  height: 60%;
  display: flex;
  gap: 2rem;
}
</style>
