<template>
  <Home />
</template>

<script>
export default {
  name: "MainPage",
  components: {
    Home: () => import("@/components/pages/Home"),
  },
  layout: "home",
};
</script>
