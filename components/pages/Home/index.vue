<template>
  <div class="Container">
    <Intro />
    <ul class="button__list">
      <button @click="handleRoute('/data')">데이터 입력 및 확인</button>
      <button @click="handleRoute('/analysis')">기대효과 분석</button>
      <button @click="handleRoute('/review')">기대효과 검토 및 출력</button>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "Home",
  components: {
    Intro: () => import("@/components/Intro"),
  },
  methods: {
    handleRoute(path) {
      this.$router.push(path);
      // TODO: replace with real page title
      // this.updatePageTitle("대체 텍스트");
    },
    ...mapMutations("pageMetaData", ["updatePageTitle"]),
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
