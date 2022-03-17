<template>
  <ul class="button__list">
    <button @click="handleRoute('/data')">데이터 입력 및 확인</button>
    <button @click="handleRoute('/analysis')">데이터 분석</button>
    <button>데이터 검토 및 기록</button>
  </ul>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "Home",
  components: {},
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

<style></style>
