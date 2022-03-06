<template>
  <ul class="button__list">
    <button>운항시간</button>
    <button>운항편수</button>
    <button>운항비용</button>
    <button>여객 매출</button>
    <button>화물 매출</button>
    <button>기타 추정 자료</button>
  </ul>
</template>

<script>
export default {
  name: "InnerDataPage",
  props: {
    msg: String,
  },
};
</script>
