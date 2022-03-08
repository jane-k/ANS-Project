<template>
  <Assumption />
</template>

<script>
export default {
  name: "AssumptionPage",
  components: {
    Assumption: () => import("@/components/pages/assumption"),
  },
  props: {},
};
</script>
