<template>
  <v-data-table
    :headers="headers"
    :items="data"
    item-key="name"
    dense
    hide-default-footer
    :items-per-page="Number(500)"
    class="elevation-1"
  />
</template>

<script>
import { mapState } from "vuex";
import { YEAR } from "@/utils/constants/config.js";

export default {
  name: "SummaryTable",
  data() {
    return {
      headers: [
        {
          text: "연도",
          sortable: false,
          value: "YEAR",
          align: "center",
        },
        ,
        { text: "국제 출발", value: "INTER_START" },
        { text: "국제 도착", value: "INTER_END" },
        { text: "합계", value: "INTER_SUM" },
        { text: "국내 출발", value: "DOMESTIC_START" },
        { text: "국내 도착", value: "DOMESTIC_END" },
        { text: "합계", value: "DOMESTIC_SUM" },
      ],
      data: [],
    };
  },
  computed: {
    ...mapState("ansData", ["ANSDataTemplate"]),
  },
  methods: {
    computeDataSet() {
      const { N_DI_Flght, N_AI_Flght, N_DD_Flght, N_AD_Flght } =
        this.ANSDataTemplate;
      console.log(N_DI_Flght, N_AI_Flght, N_DD_Flght, N_AD_Flght);
      const stepYear = 5;

      const res = Array(YEAR)
        .fill(0)
        .reduce((acc, cur, index) => {
          if (index % stepYear == 0) {
            return [
              ...acc,
              {
                YEAR: new Date().getFullYear() + index,
                INTER_START: N_DI_Flght.value[0][index],
                INTER_END: N_AI_Flght.value[0][index],
                INTER_SUM:
                  N_DI_Flght.value[0][index] + N_AI_Flght.value[0][index],
                DOMESTIC_START: N_DD_Flght.value[0][index],
                DOMESTIC_END: N_AD_Flght.value[0][index],
                DOMESTIC_SUM:
                  N_DD_Flght.value[0][index] + N_AD_Flght.value[0][index],
              },
            ];
          } else return [...acc];
        }, []);

      this.data = res;
      return res;
    },
  },
  mounted() {
    console.log(this.computeDataSet());
  },
};
</script>

<style lang="scss" scoped>
.table {
  thead {
    th {
      white-space: nowrap !important;
    }
  }
}

.text-start {
  white-space: nowrap !important;
}
</style>
