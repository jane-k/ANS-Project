<template>
  <div class="chart-container">
    <div class="data-selector">
      <div v-if="isSaveComplete">
        "경제성 분석 결과.xlsx"로 종합 기대효과 분석결과가 저장되었습니다
      </div>
    </div>
    <img src="~/assets/images/Review.jpg" class="ReviewImg" />
  </div>
</template>

<script>
export default {
  props: {
    isSaveComplete: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
.chart-container {
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  width: 100%;
  flex: 1;
  border: 1px solid #cdcdcd;
  border-radius: 0.5rem;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
}

.data-selector {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;

  & > p {
    color: #666;
    font-size: 0.875rem;
  }
}

.ReviewImg {
  width: 100%;
  height: 100%;
  margin-right: auto;
}
</style>
