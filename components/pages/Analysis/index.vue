<template>
  <ul class="button__list">
    <NuxtLink to="/data">
      <button>데이터 입력 및 확인</button>
    </NuxtLink>
    <button>데이터 분석</button>
    <NuxtLink to="/">
      <button>Return</button>
    </NuxtLink>
  </ul>
</template>

<script>
export default {
  name: "MainPage",
  components: {},
};
</script>
