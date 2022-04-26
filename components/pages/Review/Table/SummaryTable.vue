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
        // TODO: 다른 항목들이 현재 미정 상태로, 정해지는 대로 구현하기
        // { text: "탄소배출 총배출량", value: "CARBON_TOTAL_DISPOSE" },
        // { text: "탄소배출 편당 배출량", value: "CARBON_PER_DISPOSE" },
        { text: "탄소배출 감축량", value: "CARBON_REDUCTION" },
        // { text: "탄소배출 절감률", value: "CARBON_REDUCTION_RATE" },
        // { text: "연료 총소비량", value: "FUEL_TOTAL_CONSUME" },
        // { text: "연료 편당 소모량", value: "FUEL_PER_CONSUME" },
        { text: "연료 절감량", value: "FUEL_REDUCTION" },
        // { text: "연료 절감률", value: "FUEL_PER_REDUCTION" },
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
        CER_DDamount,
        CER_DIamount,
        CER_ADamount,
        CER_AIamount,
        CER_DRamount,
        CER_DIRamount,
        CER_AIRamount,
        CER_DDamount_byADLY,
        CER_DIamount_byADLY,
        CER_ADamount_byADLY,
        CER_AIamount_byADLY,
        CER_AI_Ramount_byADLY,
        CER_AI_LDamount_byADLY,
        CER_amount_byAFT,

        FR_DDamount,
        FR_DIamount,
        FR_ADamount,
        FR_AIamount,
        FR_DRamount,
        FR_DIRamount,
        FR_AIRamount,
        FR_DDamount_byADLY,
        FR_DIamount_byADLY,
        FR_ADamount_byADLY,
        FR_AIamount_byADLY,
        FR_AI_LDamount_byADLY,
        FR_AI_Ramount_byADLY,
        FR_AIcost_byADLY,
        FR_AI_LDcost_byADLY,
        FR_AI_Rcost_byADLY,
        FR_amount_byAFT,
      } = this.ANSDataTemplate;
      console.log(this.ANSDataTemplate);
      const carbonReduction = Array(YEAR).fill(0);
      for (let i = 0; i < YEAR; i++) {
        carbonReduction[i] = CER_DDamount.value[i];
      }

      const fuelReduction = Array(YEAR).fill(0);
      for (let i = 0; i < YEAR; i++) {
        fuelReduction[i] = FR_DDamount.value[i];
      }

      const res = Array(YEAR)
        .fill(0)
        .map((item, index) => ({
          YEAR: new Date().getFullYear() + index,
          CARBON_REDUCTION: carbonReduction[index],
          FUEL_REDUCTION: fuelReduction[index],
        }));
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
