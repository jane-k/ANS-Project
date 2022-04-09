<template>
  <div class="Container">
    <Chart />
    <ul class="button__list">
      <button>데이터 입력 및 확인</button>
      <button @click="launchCalculation">데이터 분석</button>
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
    Chart: () => import("@/components/Chart"),
  },
  methods: {
    handleRoute(path) {
      this.$router.push(path);
    },
    launchCalculation() {
      for (let Cetha = 1; Cetha <= 3; Cetha++) {
        calculateANS(Cetha);
        console.log(ANSDataTemplate);
      }
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
