<template>
  <div class="intro-container">
    <div>우측 메뉴를 클릭해 데이터를 업로드 / 분석할 수 있습니다.</div>
    <!-- <img src="~/assets/images/intro-logo.png" /> -->
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.intro-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #cdcdcd;
  border-radius: 0.5rem;
  position: relative;
}

.intro-container::after {
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
