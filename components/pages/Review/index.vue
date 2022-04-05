<template>
  <div class="Container">
    <DisplayReview />
    <ul class="button__list">
      <button @click="handleRoute('/data')">데이터 리스트</button>
      <button>데이터 조회 기록</button>
      <button @click="handleRoute('/')">Return</button>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Review",
  components: {
    DisplayReview: () => import("@/components/DisplayReview"),
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
  width: 90%;
  height: 60%;
  display: flex;
  gap: 2rem;
}
</style>
