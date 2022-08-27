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
  name: "BenefitSummaryTable",
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
        { text: "탄소배출 절감비용", value: "CER_Cost" },
        { text: "운항시간 단축 절감편익", value: "FTR_Cost" },
        { text: "지연시간 단축 절감편익", value: "DTR_Cost" },
        { text: "안전도 향상", value: "INC_Safety" },
        { text: "누적효과", value: "ACCUM_Effect" },
        { text: "지연단축 효과", value: "PSG_Effect" },
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
      const CER_Cost = Array(7).fill(0);
      const FTR_Cost = Array(7).fill(0);
      const DTR_Cost = Array(7).fill(0);
      const INC_Safety = Array(7).fill(0);
      const ACCUM_Effect = Array(7).fill(0);
      const PSG_Effect = Array(7).fill(0);
      const FTR_EE = Array(7).fill(0);
      const Total_EE = Array(7).fill(0);

      for (let t = 0; t < YEAR; t++) {
        if (t % 5 == 0) {
          Year[t / 5] = new Date().getFullYear() + t;
        }
        if (t == 29) {
          Year[(t + 1) / 5] = new Date().getFullYear() + t;
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          if (t % 5 == 0) {
            CER_Cost[t / 5] =
              CER_Cost[t / 5] +
              this.ANSDataTemplate.CER_DDcost.value[l][t] +
              this.ANSDataTemplate.CER_DIcost.value[l][t] +
              this.ANSDataTemplate.CER_ADcost.value[l][t] +
              this.ANSDataTemplate.CER_AIcost.value[l][t] +
              this.ANSDataTemplate.CER_DRcost.value[l][t] +
              this.ANSDataTemplate.CER_DIRcost.value[l][t] +
              this.ANSDataTemplate.CER_AIRcost.value[l][t] +
              this.ANSDataTemplate.CER_DDcost_byADLY.value[l][t] +
              this.ANSDataTemplate.CER_DIcost_byADLY.value[l][t] +
              this.ANSDataTemplate.CER_ADcost_byADLY.value[l][t] +
              this.ANSDataTemplate.CER_AI_LDcost_byADLY.value[l][t] +
              this.ANSDataTemplate.CER_AI_Rcost_byADLY.value[l][t] +
              this.ANSDataTemplate.CER_AIcost_byADLY.value[l][t] +
              this.ANSDataTemplate.CER_cost_byAFT.value[t];
          }
          if (t == 29) {
            CER_Cost[(t + 1) / 5] =
              CER_Cost[(t + 1) / 5] +
              this.ANSDataTemplate.CER_DDcost.value[l][t] +
              this.ANSDataTemplate.CER_DIcost.value[l][t] +
              this.ANSDataTemplate.CER_ADcost.value[l][t] +
              this.ANSDataTemplate.CER_AIcost.value[l][t] +
              this.ANSDataTemplate.CER_DRcost.value[l][t] +
              this.ANSDataTemplate.CER_DIRcost.value[l][t] +
              this.ANSDataTemplate.CER_AIRcost.value[l][t] +
              this.ANSDataTemplate.CER_DDcost_byADLY.value[l][t] +
              this.ANSDataTemplate.CER_DIcost_byADLY.value[l][t] +
              this.ANSDataTemplate.CER_ADcost_byADLY.value[l][t] +
              this.ANSDataTemplate.CER_AI_LDcost_byADLY.value[l][t] +
              this.ANSDataTemplate.CER_AI_Rcost_byADLY.value[l][t] +
              this.ANSDataTemplate.CER_AIcost_byADLY.value[l][t] +
              this.ANSDataTemplate.CER_cost_byAFT.value[t];
          }
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          if (t % 5 == 0) {
            FTR_Cost[t / 5] =
              FTR_Cost[t / 5] +
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
              this.ANSDataTemplate.CER_cost_byAFT.value[t] +
              this.ANSDataTemplate.FR_cost_byAFT.value[t];
          }
          if (t == 29) {
            FTR_Cost[(t + 1) / 5] =
              FTR_Cost[(t + 1) / 5] +
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
              this.ANSDataTemplate.CER_cost_byAFT.value[t] +
              this.ANSDataTemplate.FR_cost_byAFT.value[t];
          }
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          if (t % 5 == 0) {
            DTR_Cost[t / 5] =
              DTR_Cost[t / 5] +
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
              this.ANSDataTemplate.OPR_AIcost_DLY.value[l][t];
          }
          if (t == 29) {
            DTR_Cost[(t + 1) / 5] =
              DTR_Cost[(t + 1) / 5] +
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
              this.ANSDataTemplate.OPR_AIcost_DLY.value[l][t];
          }
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          if (t % 5 == 0) {
            INC_Safety[t / 5] =
              INC_Safety[t / 5] + this.ANSDataTemplate.Safty_cost.value[t];
          }
          if (t == 29) {
            INC_Safety[(t + 1) / 5] =
              INC_Safety[(t + 1) / 5] +
              this.ANSDataTemplate.Safty_cost.value[t];
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
          }
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          if (t % 5 == 0) {
            PSG_Effect[t / 5] =
              PSG_Effect[t / 5] +
              this.ANSDataTemplate.BNF_AD_PSG.value[l][t] +
              this.ANSDataTemplate.BNF_AI_PSG.value[l][t];
          }
          if (t == 29) {
            PSG_Effect[(t + 1) / 5] =
              PSG_Effect[(t + 1) / 5] +
              this.ANSDataTemplate.BNF_AD_PSG.value[l][t] +
              this.ANSDataTemplate.BNF_AI_PSG.value[l][t];
          }
        }
      }

      for (let t = 0; t < YEAR; t++) {
        if (t % 5 == 0) {
          Total_EE[t / 5] = FTR_EE[t / 5] + PSG_Effect[t / 5];
        }
        if (t == 29) {
          Total_EE[(t + 1) / 5] = FTR_EE[(t + 1) / 5] + PSG_Effect[(t + 1) / 5];
        }
      }

      for (let t = 0; t < YEAR; t++) {
        if (t % 5 == 0) {
          if (t == 0) {
            ACCUM_Effect[t / 5] = Total_EE[t / 5];
          } else {
            ACCUM_Effect[t / 5] = Total_EE[t / 5] + ACCUM_Effect[t / 5 - 1];
          }
        }
        if (t == 29) {
          ACCUM_Effect[(t + 1) / 5] =
            Total_EE[(t + 1) / 5] + ACCUM_Effect[(t + 1) / 5 - 1];
        }
      }

      const res = Array(7)
        .fill(0)
        .reduce((acc, cur, index) => {
          return [
            ...acc,
            {
              YEAR: Number.parseFloat(Year[index]),
              CER_Cost: Number.parseFloat(CER_Cost[index]).toFixed(2),
              FTR_Cost: Number.parseFloat(FTR_Cost[index]).toFixed(2),
              DTR_Cost: Number.parseFloat(DTR_Cost[index]).toFixed(2),
              INC_Safety: Number.parseFloat(INC_Safety[index]).toFixed(2),
              ACCUM_Effect: Number.parseFloat(ACCUM_Effect[index]).toFixed(2),
              PSG_Effect: Number.parseFloat(PSG_Effect[index]).toFixed(2),
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
}
</style>
