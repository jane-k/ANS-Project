<template>
  <div>
    <main>
      <h1>기본 가정 자료</h1>
    </main>
    <div>
      <br /><br /><br />
      <button class="button-assumption">사업 기간</button>
      <button class="button2-assumption">성과 목표</button>
      <button class="button3-assumption">기타 가정</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AssumptionPage",
  components: {
    Assumption: () => import("@/components/pages/assumption"),
  },
  props: {
    msg: String,
  },
};
</script>
