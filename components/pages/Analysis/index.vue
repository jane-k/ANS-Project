<template>
  <div class="Container">
    <Chart :isCalculationComplete="isCalculationComplete" />
    <Calculation />
    <ul class="button__list">
      <button>데이터 입력 및 확인</button>
      <button @click="finishCalculation">데이터 분석</button>
      <button @click="handleRoute('/')">돌아가기</button>
    </ul>
  </div>
</template>

<script>
import calculateANS from "@/utils/helpers/calculateANS.js";
import ANSDataTemplate from "@/utils/constants/ANSDataTemplate.js";
export default {
  name: "AnalysisPage",
  components: {
    Calculation: () => import("./Calculation"),
    Chart: () => import("@/components/Chart"),
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
