<template>
  <div class="Container">
    <ReviewTable :isSaveComplete="isSaveComplete" />
    <ul class="button__list">
      <button @click="handleRoute('/EESummary')">기대효과 요약</button>
      <button @click="handleRoute('/CESummary')">탄소배출 절감효과</button>
      <button @click="finishSave">종합 분석결과</button>
      <button @click="handleRoute('/')">돌아가기</button>
    </ul>
  </div>
</template>

<script>
import { xlsx } from "xlsx";
import { mapState } from "vuex";
import { YEAR, MAX } from "@/utils/constants/config.js";

export default {
  name: "Review",
  components: {
    ReviewTable: () => import("@/components/Intro"),
    xlsx,
  },
  data() {
    return { isSaveComplete: false };
  },
  computed: {
    ...mapState("ansData", ["ANSDataTemplate"]),
  },
  methods: {
    handleRoute(path) {
      this.$router.push(path);
    },

    finishSave() {
      this.isSaveComplete = true;
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
