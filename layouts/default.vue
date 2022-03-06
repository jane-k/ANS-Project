<template>
  <div class="layout-container">
    <Header />
    <h2 class="page-title">{{ pageTitle }}</h2>
    <main class="content">
      <Presentation />
      <Nuxt />
    </main>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {
    Header: () => import("@/components/common/header"),
    Presentation: () => import("@/components/presentation"),
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

  & > h2 {
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 3rem;
  }
}

.content {
  width: 90%;
  height: 60%;
  display: flex;
  gap: 2rem;
}
</style>

<style lang="scss">
.button__list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;

  a {
    flex: 1;
  }

  button {
    width: 12rem;
    flex: 1;
    padding: 0.5rem 0.25rem;
    background-color: #c6e5f5;
    border: none;
    border-radius: 0.5rem;
    font-size: 1.125rem;
    cursor: pointer;
    transition: 0.2s ease-in-out background-color;

    &:hover {
      background-color: #73bade;
    }
  }
}
</style>
