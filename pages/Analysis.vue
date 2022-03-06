<template>
  <div>
    <Analysis />
  </div>
</template>

<script>
export default {
  name: "MainPage",
  components: {
    Analysis: () => import("@/components/pages/Analysis"),
  },
};
</script>
