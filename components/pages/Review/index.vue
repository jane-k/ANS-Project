<template>
  <div class="Container">
    <DisplayReview />
    <ul class="button__list">
      <button @click="DisplayReview">표준 출력</button>
      <button @click="handleRoute('/data')">선택 출력</button>
      <button @click="handleRoute('/')">돌아가기</button>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Review",
  components: {
    // DisplayReview: () => import("@/components/DisplayReview"),
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
