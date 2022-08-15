<template>
  <Review />
</template>

<script>
export default {
  name: "ReviewPage",
  components: {
    Review: () => import("@/components/pages/Review"),
  },
  props: {
    msg: String,
  },
};
</script>
