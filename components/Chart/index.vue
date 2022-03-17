<template>
  <div class="chart-container">
    <div class="data-selector">
      <p>데이터 선택</p>
      <Select />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Select: () => import("@/components/common/Select"),
  },
};
</script>

<style lang="scss" scoped>
.chart-container {
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  width: 100%;
  height: 100%;
  flex: 1;
  border: 1px solid #cdcdcd;
  border-radius: 0.5rem;
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
