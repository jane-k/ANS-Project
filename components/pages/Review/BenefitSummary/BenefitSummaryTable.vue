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
      const {
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
                YEAR: new Date().getFullYear() + index,
                CER_Cost: Number.parseFloat(
                  CER_DDcost.value[0][index] +
                    CER_DIcost.value[0][index] +
                    CER_ADcost.value[0][index] +
                    CER_AIcost.value[0][index] +
                    CER_DRcost.value[0][index] +
                    CER_DIRcost.value[0][index] +
                    CER_AIRcost.value[0][index] +
                    CER_DDcost_byADLY.value[0][index] +
                    CER_DIcost_byADLY.value[0][index] +
                    CER_ADcost_byADLY.value[0][index] +
                    CER_AI_LDcost_byADLY.value[0][index] +
                    CER_AI_Rcost_byADLY.value[0][index] +
                    CER_AIcost_byADLY.value[0][index] +
                    CER_cost_byAFT.value[index]
                ).toFixed(3),
                FTR_Cost: Number.parseFloat(
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
                    CER_cost_byAFT.value[index] +
                    FR_cost_byAFT.value[index]
                ).toFixed(3),
                DTR_Cost: Number.parseFloat(
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
                    OPR_AIcost_DLY.value[0][index]
                ).toFixed(3),
                INC_Safety: Number.parseFloat(Safty_cost.value[index]).toFixed(
                  3
                ),
                ACCUM_Effect: Number.parseFloat().toFixed(3),
                PSG_Effect: Number.parseFloat(
                  BNF_AD_PSG.value[0][index] + BNF_AI_PSG.value[0][index]
                ).toFixed(3),
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
