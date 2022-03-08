<template>
  <Home />
</template>

<script>
import getLocalANSData from "@/apis/ANSData/getLocalANSData";
import { mapMutations } from "vuex";

export default {
  name: "MainPage",
  components: {
    Home: () => import("@/components/pages/home"),
  },
  async mounted() {
    const { data } = await getLocalANSData();
    this.initData(data);
  },
  methods: {
    ...mapMutations("ansData", ["mutateANSData"]),
    initData(data) {
      this.mutateANSData(data);
    },
  },
};
</script>
