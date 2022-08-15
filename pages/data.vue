<template>
  <Data />
</template>

<script>
// import getLocalANSData from "@/apis/ANSData/getLocalANSData";
import getDataBase from "@/apis/Database/getDataBase";
import csv from "csvtojson";
import { mapMutations } from "vuex";

export default {
  name: "MainPage",
  props: {
    msg: String,
  },
  components: {
    Data: () => import("@/components/pages/Data"),
  },
  async mounted() {
    // const { data } = await getLocalANSData();
    const { data: csvFile } = await getDataBase();
    csv({
      noheader: true,
      output: "csv",
    })
      .fromString(csvFile)
      .then((csvRow) => {
        // console.log(csvRow);
      });
    // this.initData(data);
  },
  methods: {
    ...mapMutations("ansData", ["mutateANSData", "mutateFilteredANSData"]),
    initData(data) {
      // this.mutateANSData(data);
      // this.mutateFilteredANSData(data);
    },
  },
};
</script>
