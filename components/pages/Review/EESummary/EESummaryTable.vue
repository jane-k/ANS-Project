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
        { text: "운항 효율성 기대효과", value: "FTR_EE" },
        { text: "이용자 편의성 기대효과", value: "USER_EE" },
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
      const Year = Array(7).fill(0);
      const N_Flight = Array(7).fill(0);
      const FTR_EE = Array(7).fill(0);
      const USER_EE = Array(7).fill(0);
      const Total_EE = Array(7).fill(0);
      const ACCUM_EE = Array(7).fill(0);

      for (let t = 0; t < YEAR; t++) {
        if (t % 5 == 0) {
          Year[t / 5] = new Date().getFullYear() + t;
          YEAR: Year[t / 5];
        }
        if (t == 29) {
          Year[(t + 1) / 5] = new Date().getFullYear() + t;
          YEAR: Year[(t + 1) / 5];
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          if (t % 5 == 0) {
            N_Flight[t / 5] =
              N_Flight[t / 5] +
              this.ANSDataTemplate.N_DD_Flght.value[l][t] +
              this.ANSDataTemplate.N_AD_Flght.value[l][t] +
              this.ANSDataTemplate.N_AI_Flght.value[l][t] +
              this.ANSDataTemplate.N_DI_Flght.value[l][t];
            N_Flight: N_Flight[t / 5];
          }
          if (t == 29) {
            N_Flight[(t + 1) / 5] =
              N_Flight[(t + 1) / 5] +
              this.ANSDataTemplate.N_DD_Flght.value[l][t] +
              this.ANSDataTemplate.N_AD_Flght.value[l][t] +
              this.ANSDataTemplate.N_AI_Flght.value[l][t] +
              this.ANSDataTemplate.N_DI_Flght.value[l][t];
            N_Flight: N_Flight[(t + 1) / 5];
          }
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          if (t % 5 == 0) {
            FTR_EE[t / 5] =
              FTR_EE[t / 5] +
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
              this.ANSDataTemplate.OPR_AIcost.value[l][t] +
              this.ANSDataTemplate.CER_DDcost_byADLY.value[l][t] +
              this.ANSDataTemplate.CER_DIcost_byADLY.value[l][t] +
              this.ANSDataTemplate.CER_ADcost_byADLY.value[l][t] +
              this.ANSDataTemplate.CER_AI_LDcost_byADLY.value[l][t] +
              this.ANSDataTemplate.CER_AI_Rcost_byADLY.value[l][t] +
              this.ANSDataTemplate.CER_AIcost_byADLY.value[l][t] +
              this.ANSDataTemplate.FR_DDcost_byADLY.value[l][t] +
              this.ANSDataTemplate.FR_DIcost_byADLY.value[l][t] +
              this.ANSDataTemplate.FR_ADcost_byADLY.value[l][t] +
              this.ANSDataTemplate.FR_AI_LDcost_byADLY.value[l][t] +
              this.ANSDataTemplate.FR_AI_Rcost_byADLY.value[l][t] +
              this.ANSDataTemplate.FR_AIcost_byADLY.value[l][t] +
              this.ANSDataTemplate.OPR_ADcost_DLY.value[l][t] +
              this.ANSDataTemplate.OPR_DIcost_DLY.value[l][t] +
              this.ANSDataTemplate.OPR_AIcost_DLY.value[l][t] +
              this.ANSDataTemplate.CER_cost_byAFT.value[t] +
              this.ANSDataTemplate.FR_cost_byAFT.value[t] +
              this.ANSDataTemplate.Safty_cost.value[t];
            FTR_EE: FTR_EE[t / 5];
          }
          if (t == 29) {
            FTR_EE[(t + 1) / 5] =
              FTR_EE[(t + 1) / 5] +
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
              this.ANSDataTemplate.OPR_AIcost.value[l][t] +
              this.ANSDataTemplate.CER_DDcost_byADLY.value[l][t] +
              this.ANSDataTemplate.CER_DIcost_byADLY.value[l][t] +
              this.ANSDataTemplate.CER_ADcost_byADLY.value[l][t] +
              this.ANSDataTemplate.CER_AI_LDcost_byADLY.value[l][t] +
              this.ANSDataTemplate.CER_AI_Rcost_byADLY.value[l][t] +
              this.ANSDataTemplate.CER_AIcost_byADLY.value[l][t] +
              this.ANSDataTemplate.FR_DDcost_byADLY.value[l][t] +
              this.ANSDataTemplate.FR_DIcost_byADLY.value[l][t] +
              this.ANSDataTemplate.FR_ADcost_byADLY.value[l][t] +
              this.ANSDataTemplate.FR_AI_LDcost_byADLY.value[l][t] +
              this.ANSDataTemplate.FR_AI_Rcost_byADLY.value[l][t] +
              this.ANSDataTemplate.FR_AIcost_byADLY.value[l][t] +
              this.ANSDataTemplate.OPR_ADcost_DLY.value[l][t] +
              this.ANSDataTemplate.OPR_DIcost_DLY.value[l][t] +
              this.ANSDataTemplate.OPR_AIcost_DLY.value[l][t] +
              this.ANSDataTemplate.CER_cost_byAFT.value[t] +
              this.ANSDataTemplate.FR_cost_byAFT.value[t] +
              this.ANSDataTemplate.Safty_cost.value[t];
            FTR_EE: FTR_EE[(t + 1) / 5];
          }
        }
      }
      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          if (t % 5 == 0) {
            USER_EE[t / 5] =
              USER_EE[t / 5] +
              this.ANSDataTemplate.BNF_AD_PSG.value[l][t] +
              this.ANSDataTemplate.BNF_AI_PSG.value[l][t];
            USER_EE: USER_EE[t / 5];
          }
          if (t == 29) {
            USER_EE[(t + 1) / 5] =
              USER_EE[(t + 1) / 5] +
              this.ANSDataTemplate.BNF_AD_PSG.value[l][t] +
              this.ANSDataTemplate.BNF_AI_PSG.value[l][t];
            USER_EE: USER_EE[(t + 1) / 5];
          }
        }
      }

      for (let t = 0; t < YEAR; t++) {
        if (t % 5 == 0) {
          Total_EE[t / 5] = FTR_EE[t / 5] + USER_EE[t / 5];
          Total_EE: Total_EE[t / 5];
        }
        if (t == 29) {
          Total_EE[(t + 1) / 5] = FTR_EE[(t + 1) / 5] + USER_EE[(t + 1) / 5];
          Total_EE: Total_EE[(t + 1) / 5];
        }
      }

      for (let t = 0; t < YEAR; t++) {
        if (t % 5 == 0) {
          if (t == 0) {
            ACCUM_EE[t / 5] = Total_EE[t / 5];
            ACCUM_EE: ACCUM_EE[t / 5];
          } else {
            ACCUM_EE[t / 5] = Total_EE[t / 5] + ACCUM_EE[t / 5 - 1];
            ACCUM_EE: ACCUM_EE[t / 5];
          }
        }
        if (t == 29) {
          ACCUM_EE[(t + 1) / 5] =
            Total_EE[(t + 1) / 5] + ACCUM_EE[(t + 1) / 5 - 1];
          ACCUM_EE: ACCUM_EE[(t + 1) / 5];
        }
      }

      const res = Array(7)
        .fill(0)
        .reduce((acc, cur, index) => {
          return [
            ...acc,
            {
              YEAR: Number.parseInt(Year[index]),
              N_Flight: Number.parseFloat(N_Flight[index]).toFixed(2),
              FTR_EE: Number.parseFloat(FTR_EE[index]).toFixed(2),
              USER_EE: Number.parseFloat(USER_EE[index]).toFixed(2),
              Total_EE: Number.parseFloat(Total_EE[index]).toFixed(2),
              ACCUM_EE: Number.parseFloat(ACCUM_EE[index]).toFixed(2),
            },
          ];
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
