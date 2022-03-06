<template>
  <ul class="button__list">
    <button @click="handleRoute('/assumption')">가정 자료</button>
    <button @click="handleRoute('/innerData')">내부 추정 자료</button>
    <button>외생 자료</button>
    <button>기초 자료</button>
    <button>전체보기</button>
  </ul>
</template>

<script>
export default {
  name: "Data",
  props: {
    msg: String,
  },
  methods: {
    handleRoute(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style></style>
