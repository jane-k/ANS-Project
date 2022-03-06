<template>
  <ul class="button__list">
    <button @click="handleRoute('/data')">데이터 입력 및 확인</button>
    <button>데이터 분석</button>
    <button @click="handleRoute('/')">Return</button>
  </ul>
</template>

<script>
export default {
  name: "MainPage",
  components: {},
  methods: {
    handleRoute(path) {
      this.$router.push(path);
    },
  },
};
</script>
