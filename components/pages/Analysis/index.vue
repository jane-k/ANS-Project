<template>
  <div class="Container">
    <Chart :isCalculationComplete="isCalculationComplete" />
    <Calculation />
    <ul class="button__list">
      <button @click="handleRoute('/data')">데이터 입력 및 확인</button>
      <button @click="finishCalculation">데이터 분석</button>
      <button @click="printResultReport">분석결과 출력</button>
      <button @click="handleRoute('/')">돌아가기</button>
    </ul>
  </div>
</template>

<script>
import { xlsx } from "xlsx";

export default {
  name: "AnalysisPage",
  components: {
    Calculation: () => import("./Calculation"),
    Chart: () => import("@/components/Chart"),
    xlsx,
  },
  data() {
    return { isCalculationComplete: false };
  },
  methods: {
    handleRoute(path) {
      this.$router.push(path);
    },
    finishCalculation() {
      this.isCalculationComplete = true;
    },
    async printResultReport() {
      const xlsx = require("xlsx");
      // 엑셀 파일 생성
      const book = xlsx.utils.book_new();
      // data get > 실 개발시 api 호출
      const AnalysisData = await this.getAnalysisData();
      // sheet 생성 - aoa_to_sheet 방식
      const worksheetByAoa = xlsx.utils.aoa_to_sheet(AnalysisData);
      // 엑셀 파일에 sheet set(엑셀파일, 시트데이터, 시트명)
      xlsx.utils.book_append_sheet(
        book,
        worksheetByAoa,
        "기대효과(운항시간단축)"
      );
      xlsx.utils.book_append_sheet(
        book,
        worksheetByAoa,
        "운항시간 단축 - 탄소 절감비용"
      );
      xlsx.utils.book_append_sheet(
        book,
        worksheetByAoa,
        "출·도착 - 탄소 절감량·비용"
      );
      xlsx.utils.book_append_sheet(
        book,
        worksheetByAoa,
        "운항시간 단축 - 연료 절감비용(공항)"
      );
      xlsx.utils.book_append_sheet(
        book,
        worksheetByAoa,
        "출·도착 - 연료 절감량·비용"
      );
      xlsx.utils.book_append_sheet(
        book,
        worksheetByAoa,
        "운항시간 단축 - 운항비 절감(공항)"
      );
      xlsx.utils.book_append_sheet(
        book,
        worksheetByAoa,
        "기대효과(운항지연감소)"
      );
      xlsx.utils.book_append_sheet(
        book,
        worksheetByAoa,
        "탄소배출 절감비용(고객)"
      );
      xlsx.utils.book_append_sheet(book, worksheetByAoa, "연료절감비용(고객)");
      xlsx.utils.book_append_sheet(book, worksheetByAoa, "기대효과(고객)");
      // 엑셀 다운로드
      xlsx.writeFile(book, "경제성 분석 결과.xlsx");
    },
    getAnalysisData() {
      let arr = [];
      arr.push(["2024"]);
      arr.push(["2024"]);
      arr.push(["2024"]);
      arr.push(["2024"]);
      arr.push(["2024"]);
      arr.push(["2024"]);
      arr.push(["2024"]);
      arr.push(["2024"]);
      arr.push(["2024"]);
      arr.push(["2024"]);
      arr.push(["2024"]);
      arr.push(["2024"]);
      arr.push(["2024"]);
      arr.push(["2024"]);
      arr.push(["2024"]);
      arr.push(["2024"]);
      arr.push(["2024"]);
      arr.push(["2024"]);
      arr.push(["2024"]);
      arr.push(["2024"]);
      arr.push(["2024"]);
      return arr;
    },
  },
};
</script>

<style lang="scss" scoped>
.Container {
  width: 90%;
  height: 60%;
  display: flex;
  gap: 2rem;
}
</style>
