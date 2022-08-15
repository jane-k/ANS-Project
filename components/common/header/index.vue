<template>
  <header>
    <!-- <div class="language-select">
      <p class="lang-ko">KO</p>
      <p class="lang-en">EN</p>
    </div> -->
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 3rem;
  background-color: #312a7c;
  width: 100%;
  margin-bottom: 4rem;
  box-shadow: 0 3px 3px 3px rgba(0, 0, 0, 0.1);

  .language-select {
    display: flex;
    color: white;
    padding: 0 3rem;

    p {
      cursor: pointer;
    }

    .lang-ko::after {
      content: "";
      border-right: 1px solid white;
      margin: 0 1rem;
    }
  }
}
</style>
