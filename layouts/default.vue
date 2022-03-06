<template>
  <div class="layout-container">
    <h2 class="page-title">{{ pageTitle }}</h2>
    <main class="content">
      <Presentation class="presentation" />
      <div class="button__list">
        <Nuxt />
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {
    Presentation: () => import("../components/presentation"),
  },
  computed: {
    ...mapState("pageMetaData", ["pageTitle"]),
  },
};
</script>

<style lang="scss" scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin-top: 4rem;

  & > h2 {
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 3rem;
  }
}

.content {
  width: 100%;
  display: flex;
}

.presentation {
  padding: 1rem;
  flex: 1;
  margin: 0 1rem;
  border: 1px solid #cdcdcd;
}
</style>

<style lang="scss">
.button__list {
  display: flex;
  flex-direction: column;

  button {
    width: 4rem;
  }
}
</style>
