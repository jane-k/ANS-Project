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
import { MAX, YEAR } from "@/utils/constants/config.js";

export default {
  name: "EESummaryTable",
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
        { text: "총 운항편수", value: "N_Flight" },
        { text: "운항시간 감소 기대효과", value: "FTR_EE" },
        { text: "지연시간 감소 기대효과", value: "USER_EE" },
        { text: "안전도 향상 기대효과", value: "SAFETY_EE" },
        { text: "총 기대효과", value: "Total_EE" },
        { text: "누적 기대효과", value: "ACCUM_EE" },
      ],
      data: [],
    };
  },
  computed: {
    ...mapState("ansData", ["ANSDataTemplate"]),
  },
  methods: {
    computeDataSet() {
      const Year = Array(YEAR).fill(0);
      const N_Flight = Array(YEAR).fill(0);
      const FTR_EE = Array(YEAR).fill(0);
      const USER_EE = Array(YEAR).fill(0);
      const SAFETY_EE = Array(YEAR).fill(0);
      const Total_EE = Array(YEAR).fill(0);
      const ACCUM_EE = Array(YEAR).fill(0);

      for (let t = 0; t < YEAR; t++) {
        Year[t] = new Date().getFullYear() + t;
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          N_Flight[t] =
            N_Flight[t] +
            this.ANSDataTemplate.N_DD_Flght.value[l][t] +
            this.ANSDataTemplate.N_AD_Flght.value[l][t] +
            this.ANSDataTemplate.N_AI_Flght.value[l][t] +
            this.ANSDataTemplate.N_DI_Flght.value[l][t];
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          FTR_EE[t] =
            FTR_EE[t] +
            this.ANSDataTemplate.CER_DDcost.value[l][t] +
            this.ANSDataTemplate.CER_DIcost.value[l][t] +
            this.ANSDataTemplate.CER_ADcost.value[l][t] +
            this.ANSDataTemplate.CER_AIcost.value[l][t] +
            this.ANSDataTemplate.CER_DRcost.value[l][t] +
            this.ANSDataTemplate.CER_DIRcost.value[l][t] +
            this.ANSDataTemplate.CER_AIRcost.value[l][t] +
            this.ANSDataTemplate.FR_DDcost.value[l][t] +
            this.ANSDataTemplate.FR_DIcost.value[l][t] +
            this.ANSDataTemplate.FR_ADcost.value[l][t] +
            this.ANSDataTemplate.FR_AIcost.value[l][t] +
            this.ANSDataTemplate.FR_DRcost.value[l][t] +
            this.ANSDataTemplate.FR_DIRcost.value[l][t] +
            this.ANSDataTemplate.FR_AIRcost.value[l][t] +
            this.ANSDataTemplate.OPR_DDcost.value[l][t] +
            this.ANSDataTemplate.OPR_DIcost.value[l][t] +
            this.ANSDataTemplate.OPR_AIcost.value[l][t];
        }
      }
      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          USER_EE[t] =
            USER_EE[t] +
            this.ANSDataTemplate.CER_DDcost_byADLY.value[l][t] +
            this.ANSDataTemplate.CER_DIcost_byADLY.value[l][t] +
            this.ANSDataTemplate.CER_ADcost_byADLY.value[l][t] +
            this.ANSDataTemplate.CER_AIcost_byADLY.value[l][t] +
            this.ANSDataTemplate.FR_DDcost_byADLY.value[l][t] +
            this.ANSDataTemplate.FR_DIcost_byADLY.value[l][t] +
            this.ANSDataTemplate.FR_ADcost_byADLY.value[l][t] +
            this.ANSDataTemplate.FR_AIcost_byADLY.value[l][t] +
            this.ANSDataTemplate.OPR_ADcost_DLY.value[l][t] +
            this.ANSDataTemplate.OPR_AIcost_DLY.value[l][t] +
            this.ANSDataTemplate.BNF_AD_PSG.value[l][t] +
            this.ANSDataTemplate.BNF_AI_PSG.value[l][t];
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          SAFETY_EE[t] =
            SAFETY_EE[t] + this.ANSDataTemplate.Safty_cost.value[t];
        }
      }

      for (let t = 0; t < YEAR; t++) {
        Total_EE[t] = FTR_EE[t] + USER_EE[t] + SAFETY_EE[t];
      }

      for (let t = 0; t < YEAR; t++) {
        if (t == 0) {
          ACCUM_EE[t] = Total_EE[t];
        } else {
          ACCUM_EE[t] = Total_EE[t] + ACCUM_EE[t - 1];
        }
      }
      var x = 0;
      for (let t = 0; t < 18; t++) {
        x = x + SAFETY_EE[t];
      }
      console.log(x);

      const res = Array(7)
        .fill(0)
        .reduce((acc, cur, index) => {
          if (index < 6) {
            return [
              ...acc,
              {
                YEAR: Number.parseInt(Year[index * 5]),
                N_Flight: Number.parseInt(N_Flight[index * 5]),
                FTR_EE: Number.parseFloat(FTR_EE[index * 5]).toFixed(2),
                USER_EE: Number.parseFloat(USER_EE[index * 5]).toFixed(2),
                SAFETY_EE: Number.parseFloat(SAFETY_EE[index * 5]).toFixed(2),
                Total_EE: Number.parseFloat(Total_EE[index * 5]).toFixed(2),
                ACCUM_EE: Number.parseFloat(ACCUM_EE[index * 5]).toFixed(2),
              },
            ];
          } else {
            return [
              ...acc,
              {
                YEAR: Number.parseInt(Year[index * 5 - 1]),
                N_Flight: Number.parseInt(N_Flight[index * 5 - 1]),
                FTR_EE: Number.parseFloat(FTR_EE[index * 5 - 1]).toFixed(2),
                USER_EE: Number.parseFloat(USER_EE[index * 5 - 1]).toFixed(2),
                SAFETY_EE: Number.parseFloat(SAFETY_EE[index * 5 - 1]).toFixed(
                  2
                ),
                Total_EE: Number.parseFloat(Total_EE[index * 5 - 1]).toFixed(2),
                ACCUM_EE: Number.parseFloat(ACCUM_EE[index * 5 - 1]).toFixed(2),
              },
            ];
          }
        }, []);

      this.data = res;
      return res;
    },
  },
  mounted() {
    this.computeDataSet();
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
  font-size: 150%;
}
</style>
