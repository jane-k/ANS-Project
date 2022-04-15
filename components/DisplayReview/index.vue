<template>
  <div class="review-container">
    <img v-if="isDisplayNeed" :src="ImageLocation" width="1000" />
    <div>데이터 리뷰 데모 이미지</div>
  </div>
</template>

<script>
export default {
  components: {
    Select: () => import("@/components/common/Select"),
  },
  data() {
    return {
      ImageLocation: require("@/assets/images/demo-review-image.png"),
    };
  },
  props: {
    isDisplayNeed: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
.review-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  border: 1px solid #cdcdcd;
  border-radius: 0.5rem;
  position: relative;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
}

.review-container::after {
  content: "";
  background: url("~/assets/images/intro-logo.png") no-repeat;
  background-position: center;
  opacity: 0.12;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: -1;
}
</style>
