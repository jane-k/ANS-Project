<template>
  <Home />
</template>

<script>
import getLocalANSData from "@/apis/ANSData/getLocalANSData";
import getDependencyVariable from "@/apis/dependencyVariable/getDependencyVariable";
import csv from "csvtojson";
import { mapMutations } from "vuex";

export default {
  name: "MainPage",
  components: {
    Home: () => import("@/components/pages/Home"),
  },
  async mounted() {
    const { data } = await getLocalANSData();
    const { data: csvFile } = await getDependencyVariable();
    csv({
      noheader: true,
      output: "csv",
    })
      .fromString(csvFile)
      .then((csvRow) => {
        console.log(csvRow);
      });
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
