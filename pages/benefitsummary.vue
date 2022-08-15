<template>
  <BenefitSummary />
</template>

<script>
export default {
  name: "BenefitSummaryPage",
  components: {
    BenefitSummary: () => import("@/components/pages/Review/BenefitSummary"),
  },
  props: {
    msg: String,
  },
};
</script>
