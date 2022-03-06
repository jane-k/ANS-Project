<template>
  <ul class="button__list">
    <NuxtLink to="/assumptionData">
      <button>가정 자료</button>
    </NuxtLink>
    <NuxtLink to="/innerData">
      <button>내부 추정 자료</button>
    </NuxtLink>
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
};
</script>

<style></style>
