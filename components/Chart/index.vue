<template>
  <div class="chart-container">
    <div class="data-selector">
      <p>데이터 선택</p>
      <!-- <Select /> -->

      <div v-if="isCalculationComplete">분석을 완료했습니다.</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Select: () => import("@/components/common/Select"),
  },
  props: {
    isCalculationComplete: {
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
</style>
