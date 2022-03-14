<template>
  <Modal :onClose="onClose">
    <div class="modal-body">
      <h1>{{ title }}</h1>
    </div>
  </Modal>
</template>

<script>
export default {
  props: {
    onClose: {
      type: Function,
    },
    title: {
      type: String,
    },
  },
  components: {
    Modal: () => import("@/components/common/modal"),
  },
};
</script>

<style scoped lang="scss">
.modal-body {
  padding: 1rem;
  width: 60%;
  height: 40%;
  background-color: white;
  border-radius: 1rem;
  z-index: 1;
}
</style>
