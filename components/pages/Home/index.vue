<template>
  <ul class="button__list">
    <NuxtLink to="/data">
      <button>데이터 입력 및 확인</button>
    </NuxtLink>
    <NuxtLink to="/analysis">
      <button>데이터 분석</button>
    </NuxtLink>
    <button>데이터 검토 및 기록</button>
  </ul>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>

<style></style>
