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
      const {
        N_DI_Flght,
        N_AI_Flght,
        N_DD_Flght,
        N_AD_Flght,
        CER_DDcost,
        CER_DIcost,
        CER_ADcost,
        CER_AIcost,
        CER_DRcost,
        CER_DIRcost,
        CER_AIRcost,
        FR_DDcost,
        FR_DIcost,
        FR_ADcost,
        FR_AIcost,
        FR_DRcost,
        FR_DIRcost,
        FR_AIRcost,
        BNF_AD_PSG,
        BNF_AI_PSG,
        OPR_DDcost,
        OPR_DIcost,
        OPR_AIcost,
        CER_DDcost_byADLY,
        CER_DIcost_byADLY,
        CER_ADcost_byADLY,
        CER_AI_LDcost_byADLY,
        CER_AI_Rcost_byADLY,
        CER_AIcost_byADLY,
        FR_DDcost_byADLY,
        FR_DIcost_byADLY,
        FR_ADcost_byADLY,
        FR_AI_LDcost_byADLY,
        FR_AI_Rcost_byADLY,
        FR_AIcost_byADLY,
        OPR_ADcost_DLY,
        OPR_DIcost_DLY,
        OPR_AIcost_DLY,
        CER_cost_byAFT,
        FR_cost_byAFT,
        Safty_cost,
      } = this.ANSDataTemplate;
      const stepYear = 5;

      const res = Array(YEAR)
        .fill(0)
        .reduce((acc, cur, index) => {
          if (index % stepYear == 0) {
            return [
              ...acc,
              {
                YEAR: new Date().getFullYear() + index + 2,
                N_Flight: Number.parseFloat(
                  N_DD_Flght.value[0][index] +
                    N_AD_Flght.value[0][index] +
                    N_AI_Flght.value[0][index] +
                    N_DI_Flght.value[0][index]
                ).toFixed(3),
                FTR_EE: Number.parseFloat(
                  CER_DDcost.value[0][index] +
                    CER_DIcost.value[0][index] +
                    CER_ADcost.value[0][index] +
                    CER_AIcost.value[0][index] +
                    CER_DRcost.value[0][index] +
                    CER_DIRcost.value[0][index] +
                    CER_AIRcost.value[0][index] +
                    FR_DDcost.value[0][index] +
                    FR_DIcost.value[0][index] +
                    FR_ADcost.value[0][index] +
                    FR_AIcost.value[0][index] +
                    FR_DRcost.value[0][index] +
                    FR_DIRcost.value[0][index] +
                    FR_AIRcost.value[0][index] +
                    OPR_DDcost.value[0][index] +
                    OPR_DIcost.value[0][index] +
                    OPR_AIcost.value[0][index] +
                    CER_DDcost_byADLY.value[0][index] +
                    CER_DIcost_byADLY.value[0][index] +
                    CER_ADcost_byADLY.value[0][index] +
                    CER_AI_LDcost_byADLY.value[0][index] +
                    CER_AI_Rcost_byADLY.value[0][index] +
                    CER_AIcost_byADLY.value[0][index] +
                    FR_DDcost_byADLY.value[0][index] +
                    FR_DIcost_byADLY.value[0][index] +
                    FR_ADcost_byADLY.value[0][index] +
                    FR_AI_LDcost_byADLY.value[0][index] +
                    FR_AI_Rcost_byADLY.value[0][index] +
                    FR_AIcost_byADLY.value[0][index] +
                    OPR_ADcost_DLY.value[0][index] +
                    OPR_DIcost_DLY.value[0][index] +
                    OPR_AIcost_DLY.value[0][index] +
                    CER_cost_byAFT.value[index] +
                    FR_cost_byAFT.value[index] +
                    Safty_cost.value[index]
                ).toFixed(3),
                USER_EE: Number.parseFloat(
                  BNF_AD_PSG.value[0][index] + BNF_AI_PSG.value[0][index]
                ).toFixed(3),
                Total_EE: Number.parseFloat(
                  CER_DDcost.value[0][index] +
                    CER_DIcost.value[0][index] +
                    CER_ADcost.value[0][index] +
                    CER_AIcost.value[0][index] +
                    CER_DRcost.value[0][index] +
                    CER_DIRcost.value[0][index] +
                    CER_AIRcost.value[0][index] +
                    FR_DDcost.value[0][index] +
                    FR_DIcost.value[0][index] +
                    FR_ADcost.value[0][index] +
                    FR_AIcost.value[0][index] +
                    FR_DRcost.value[0][index] +
                    FR_DIRcost.value[0][index] +
                    FR_AIRcost.value[0][index] +
                    OPR_DDcost.value[0][index] +
                    OPR_DIcost.value[0][index] +
                    OPR_AIcost.value[0][index] +
                    CER_DDcost_byADLY.value[0][index] +
                    CER_DIcost_byADLY.value[0][index] +
                    CER_ADcost_byADLY.value[0][index] +
                    CER_AI_LDcost_byADLY.value[0][index] +
                    CER_AI_Rcost_byADLY.value[0][index] +
                    CER_AIcost_byADLY.value[0][index] +
                    FR_DDcost_byADLY.value[0][index] +
                    FR_DIcost_byADLY.value[0][index] +
                    FR_ADcost_byADLY.value[0][index] +
                    FR_AI_LDcost_byADLY.value[0][index] +
                    FR_AI_Rcost_byADLY.value[0][index] +
                    FR_AIcost_byADLY.value[0][index] +
                    OPR_ADcost_DLY.value[0][index] +
                    OPR_DIcost_DLY.value[0][index] +
                    OPR_AIcost_DLY.value[0][index] +
                    CER_cost_byAFT.value[index] +
                    FR_cost_byAFT.value[index] +
                    Safty_cost.value[index] +
                    BNF_AD_PSG.value[0][index] +
                    BNF_AI_PSG.value[0][index]
                ).toFixed(3),
                ACCUM_EE: Number.parseFloat(
                  CER_DDcost.value[0][index] +
                    CER_DIcost.value[0][index] +
                    CER_ADcost.value[0][index] +
                    CER_AIcost.value[0][index] +
                    CER_DRcost.value[0][index] +
                    CER_DIRcost.value[0][index] +
                    CER_AIRcost.value[0][index] +
                    FR_DDcost.value[0][index] +
                    FR_DIcost.value[0][index] +
                    FR_ADcost.value[0][index] +
                    FR_AIcost.value[0][index] +
                    FR_DRcost.value[0][index] +
                    FR_DIRcost.value[0][index] +
                    FR_AIRcost.value[0][index] +
                    OPR_DDcost.value[0][index] +
                    OPR_DIcost.value[0][index] +
                    OPR_AIcost.value[0][index] +
                    CER_DDcost_byADLY.value[0][index] +
                    CER_DIcost_byADLY.value[0][index] +
                    CER_ADcost_byADLY.value[0][index] +
                    CER_AI_LDcost_byADLY.value[0][index] +
                    CER_AI_Rcost_byADLY.value[0][index] +
                    CER_AIcost_byADLY.value[0][index] +
                    FR_DDcost_byADLY.value[0][index] +
                    FR_DIcost_byADLY.value[0][index] +
                    FR_ADcost_byADLY.value[0][index] +
                    FR_AI_LDcost_byADLY.value[0][index] +
                    FR_AI_Rcost_byADLY.value[0][index] +
                    FR_AIcost_byADLY.value[0][index] +
                    OPR_ADcost_DLY.value[0][index] +
                    OPR_DIcost_DLY.value[0][index] +
                    OPR_AIcost_DLY.value[0][index] +
                    CER_cost_byAFT.value[index] +
                    FR_cost_byAFT.value[index] +
                    Safty_cost.value[index] +
                    BNF_AD_PSG.value[0][index] +
                    BNF_AI_PSG.value[0][index]
                ).toFixed(3),
              },
              console.log(this.data.ACCUM_EE),
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
  font-size: 150%;
}
</style>
