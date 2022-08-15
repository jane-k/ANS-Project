<template>
  <div class="Container">
    <div class="table-container">
      <div class="header">
        <h2 class="data-title">
          {{ dataTypeheaderText }}
        </h2>
      </div>
      <div class="result-table">
        <SummaryTable />
        <LineChart />
      </div>
    </div>
    <ul class="button__list">
      <button @click="printResultReport">데이터 저장</button>
      <button @click="handleRoute('/review')">돌아가기</button>
    </ul>
  </div>
</template>

<script>
import { xlsx } from "xlsx";
export default {
  name: "BenefitSummary",
  components: {
    SummaryTable: () => import("./BenefitSummaryTable.vue"),
    LineChart: () => import("./BenefitChart.vue"),
  },
  props: {
    tableToDisplay: {
      type: String,
      value: "",
    },
  },
  methods: {
    handleRoute(path) {
      this.$router.push(path);
    },
    Save() {
      this.tableToDisplay = "BenefitSummaryTable";
    },
    async printResultReport() {
      const xlsx = require("xlsx");
      // 엑셀 파일 생성
      const book = xlsx.utils.book_new();
      // data get > 실 개발시 api 호출
      const BenefitSummaryData = await this.getBenefitSummary();
      // sheet 생성 - aoa_to_sheet 방식
      const worksheet = xlsx.utils.aoa_to_sheet(BenefitSummaryData);
      // 엑셀 파일에 sheet set(엑셀파일, 시트데이터, 시트명)
      xlsx.utils.book_append_sheet(book, worksheet, "aoa");
      // 엑셀 다운로드
      xlsx.writeFile(book, "Result.xlsx");
    },
    getBenefitSummary() {
      let arr = [];
      arr.push([
        "연도",
        "운항편 수",
        "총 탄소배출량",
        "총 탄소배출 감축량",
        "편당 탄소배출량",
        "탄소배출 절감율",
        "총 연료소비량",
        "총 연료소비 감축량",
        "편당 연료소비량",
        "연료소비 절감율",
      ]);
      arr.push(["2024"]);
      arr.push(["2029"]);
      arr.push(["2034"]);
      arr.push(["2039"]);
      arr.push(["2044"]);
      arr.push(["2049"]);
      return arr;
    },
  },
  computed: {
    dataTypeheaderText() {
      const filteredDataName =
        "운항효율성 및 이용편리성에 대한 사업자별 직접적 경제적 편익";
      return this.filteredDataName || filteredDataName;
    },
  },
};
</script>

<style lang="scss">
.table-container {
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  border: 1px solid #cdcdcd;
  border-radius: 0.5rem;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
  overflow-x: scroll;
}

.table-container::after {
  content: "";
  background: url("~/assets/images/intro-logo.png") no-repeat;
  background-position: center;
  opacity: 0.12;
  position: absolute;
  top: 8px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: -1;
}

.header {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.5rem;
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

.result-table {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  height: 100%;
  overflow-x: hidden;
}

.Container {
  width: 95%;
  height: 60%;
  display: flex;
  gap: 2rem;
  padding: 1rem;
  font-size: 100%;
}
</style>
