<template>
  <EESummary />
</template>

<script>
export default {
  name: "EESummaryPage",
  components: {
    EESummary: () => import("@/components/pages/Review/EESummary"),
  },
  props: {
    msg: String,
  },
};
</script>
