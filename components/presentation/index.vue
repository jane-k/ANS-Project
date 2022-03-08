<template>
  <div class="presentation-container">
    <ul>
      <li :key="data.variable" v-for="data in ANSData">
        {{ data.label }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Presentation",
  computed: {
    ...mapState("ansData", ["ANSData"]),
  },
};
</script>

<style lang="scss" scoped>
.presentation-container {
  flex: 1;
  padding: 1rem;
  border: 1px solid #cdcdcd;
  border-radius: 0.5rem;
  overflow: auto;
}
</style>
