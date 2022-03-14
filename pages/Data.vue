<template>
  <Data />
</template>

<script>
export default {
  name: "MainPage",
  props: {
    msg: String,
  },
  components: {
    Data: () => import("@/components/pages/Data"),
  },
};
</script>
