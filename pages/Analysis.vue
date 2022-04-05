<template>
  <Analysis />
</template>

<script>
export default {
  name: "AnalysisPage",
  components: {
    Analysis: () => import("@/components/pages/Analysis"),
  },
  layout: "default",
};
</script>
