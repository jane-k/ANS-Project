<template>
  <footer>
    <img src="~/assets/images/emblem.jpg" class="kau-logo" />
    <section>
      <p>KAU Navigation Economic Factor Analyzer</p>
      <p class="service-version">현재 버전 : 1.0.1</p>
    </section>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped lang="scss">
footer {
  display: flex;
  align-items: center;
  height: 5rem;
  width: 100%;
  margin-top: auto;
  border-top: 1px solid #cdcdcd;

  section {
    display: flex;
    flex-direction: column;
    margin-right: 2rem;
    align-items: flex-end;
    gap: 0.5rem;

    & > p {
      font-size: 0.875rem;
    }
  }
}

.kau-logo {
  width: 12rem;
  margin-left: 2rem;
  margin-right: auto;
}

.service-version {
  font-size: 0.75rem;
  color: #666;
}
</style>
