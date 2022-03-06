<template>
  <div class="presentation-container">
    <div>프레젠테이션</div>
    <ul>
      <li :key="data.variable" v-for="data in dataList">
        {{ data.label }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Presentation",
  props: {
    dataList: {
      type: String,
      default: [],
    },
  },
};
</script>
