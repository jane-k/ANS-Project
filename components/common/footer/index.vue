<template>
  <footer>
    <img src="~/assets/images/emblem.jpg" class="kau-logo" />
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
}

.kau-logo {
  width: 12rem;
  margin-left: 2rem;
  margin-right: auto;
}
</style>
