<template>
  <div class="table-container">
    <summary-table />
  </div>
</template>

<script>
export default {
  name: "ReviewTable",
  components: {
    SummaryTable: () => import("./SummaryTable.vue"),
  },
  props: {
    tableToDisplay: {
      type: String,
      value: "",
    },
  },
  computed: {},
};
</script>

<style lang="scss">
.table-container {
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  border: 1px solid #cdcdcd;
  border-radius: 0.5rem;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
  overflow-x: scroll;
  padding: 1rem;
}

.table-container::after {
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
