<template>
  <InnerData />
</template>

<script>
export default {
  name: "InnerDataPage",
  components: {
    InnerData: () => import("@/components/pages/InnerData"),
  },
  props: {
    msg: String,
  },
};
</script>
