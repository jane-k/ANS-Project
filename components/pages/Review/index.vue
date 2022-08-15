<template>
  <div class="Container">
    <ReviewTable />
    <ul class="button__list">
      <button @click="handleRoute('/EESummary')">총 기대효과</button>
      <button @click="handleRoute('/CESummary')">탄소배출 절감효과</button>
      <button @click="handleRoute('/BenefitSummary')">
        사업자 별 경제편익
      </button>
      <button @click="handleRoute('/')">돌아가기</button>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Review",
  components: {
    ReviewTable: () => import("@/components/Intro"),
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
  },
};
</script>

<style lang="scss" scoped>
.Container {
  width: 95%;
  height: 60%;
  display: flex;
  gap: 2rem;
  padding: 1rem;
  font-size: 80%;
}
</style>
