<template>
  <CESummary />
</template>

<script>
export default {
  name: "CESummaryPage",
  components: {
    CESummary: () => import("@/components/pages/Review/CESummary"),
  },
  props: {
    msg: String,
  },
};
</script>
