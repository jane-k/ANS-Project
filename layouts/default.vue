<template>
  <div class="layout-container">
    <Header />
    <nuxt-link to="/">
      <h2 class="page-title">{{ pageTitle }}</h2>
    </nuxt-link>
    <div class="divider" />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {
    Header: () => import("@/components/common/header"),
    Footer: () => import("@/components/common/footer"),
    Presentation: () => import("@/components/Presentation"),
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

  a {
    text-decoration: none;
  }

  .page-title {
    text-align: center;
    font-size: 1.8rem;
    font-weight: bolder;
    margin-bottom: 1rem;
    color: #3c3c3c;
  }

  .divider {
    height: 1px;
    width: 90%;
    border-bottom: 1px solid #eee;
    margin-bottom: 2rem;
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
  justify-content: space-evenly;
  gap: 1rem;

  a {
    flex: 1;
  }

  button {
    width: 12rem;
    flex: 1;
    max-height: 3rem;
    padding: 0.5rem 0.25rem;
    background-color: white;
    border: 2px solid var(--secondary);
    color: var(--secondary);
    font-weight: bold;
    border-radius: 1rem;
    font-size: 1.125rem;
    cursor: pointer;
    transition: 0.2s ease-in-out all;

    &:hover {
      background-color: var(--secondary);
      opacity: 0.7;
      color: white;
    }
  }
}
</style>
