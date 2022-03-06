<template>
  <InnerData />
</template>

<script>
export default {
  name: "InnerDataPage",
  components: {
    InnerData: () => import("@/components/pages/innerData"),
  },
  props: {
    msg: String,
  },
};
</script>
