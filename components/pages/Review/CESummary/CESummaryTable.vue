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
  name: "CESummaryTable",
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
        { text: "운항편 수", value: "N_Flight" },
        { text: "총 탄소배출량", value: "CE_Total" },
        { text: "총 탄소배출 감축량", value: "CER_Total" },
        { text: "편당 탄소배출량", value: "CE_Flight" },
        { text: "탄소배출 절감율", value: "CER_Rate" },
        { text: "총 연료소비량", value: "FE_Total" },
        { text: "총 연료소비 감축량", value: "FER_Total" },
        { text: "편당 연료소비량", value: "FE_Flight" },
        { text: "연료소비 절감율", value: "FER_Rate" },
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
        FCE_hour,
        ACE_TO_hour,
        ACE_LD_hour,
        CER_DDamount,
        CER_ADamount,
        CER_DRamount,
        CER_DIamount,
        CER_DIRamount,
        CER_AIamount,
        CER_AIRamount,
        CER_DDamount_byADLY,
        CER_DIamount_byADLY,
        CER_ADamount_byADLY,
        CER_AI_LDamount_byADLY,
        CER_AI_Ramount_byADLY,
        CER_AIamount_byADLY,
        CER_amount_byAFT,
        FFE_hour,
        AFE_TO_hour,
        AFE_LD_hour,
        FR_DDamount,
        FR_ADamount,
        FR_DRamount,
        FR_DIamount,
        FR_DIRamount,
        FR_AIamount,
        FR_AIRamount,
        FR_DDamount_byADLY,
        FR_DIamount_byADLY,
        FR_ADamount_byADLY,
        FR_AI_LDamount_byADLY,
        FR_AI_Ramount_byADLY,
        FR_AIamount_byADLY,
        FR_amount_byAFT,
      } = this.ANSDataTemplate;
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
                N_Flight: Number.parseFloat(
                  N_DD_Flght.value[0][index] +
                    N_AD_Flght.value[0][index] +
                    N_AI_Flght.value[0][index] +
                    N_DI_Flght.value[0][index]
                ).toFixed(3),
                CE_Total: Number.parseFloat(
                  FCE_hour.value[index] +
                    ACE_TO_hour.value[index] +
                    ACE_LD_hour.value[index]
                ).toFixed(3),
                CER_Total: Number.parseFloat(
                  CER_DDamount.value[0][index] +
                    CER_ADamount.value[0][index] +
                    CER_DRamount.value[0][index] +
                    CER_DIamount.value[0][index] +
                    CER_DIRamount.value[0][index] +
                    CER_AIamount.value[0][index] +
                    CER_AIRamount.value[0][index] +
                    CER_DDamount_byADLY.value[0][index] +
                    CER_DIamount_byADLY.value[0][index] +
                    CER_ADamount_byADLY.value[0][index] +
                    CER_AI_LDamount_byADLY.value[0][index] +
                    CER_AI_Ramount_byADLY.value[0][index] +
                    CER_AIamount_byADLY.value[0][index] +
                    CER_amount_byAFT.value[index]
                ).toFixed(3),
                CE_Flight: Number.parseFloat(
                  (CER_DDamount.value[0][index] +
                    CER_ADamount.value[0][index] +
                    CER_DRamount.value[0][index] +
                    CER_DIamount.value[0][index] +
                    CER_DIRamount.value[0][index] +
                    CER_AIamount.value[0][index] +
                    CER_AIRamount.value[0][index] +
                    CER_DDamount_byADLY.value[0][index] +
                    CER_DIamount_byADLY.value[0][index] +
                    CER_ADamount_byADLY.value[0][index] +
                    CER_AI_LDamount_byADLY.value[0][index] +
                    CER_AI_Ramount_byADLY.value[0][index] +
                    CER_AIamount_byADLY.value[0][index] +
                    CER_amount_byAFT.value[index]) /
                    (N_DD_Flght.value[0][index] +
                      N_AD_Flght.value[0][index] +
                      N_AI_Flght.value[0][index] +
                      N_DI_Flght.value[0][index])
                ).toFixed(3),
                CER_Rate: Number.parseFloat(N_DD_Flght.value[0][index]).toFixed(
                  3
                ),
                FE_Total: Number.parseFloat(
                  FFE_hour.value[index] +
                    AFE_TO_hour.value[index] +
                    AFE_LD_hour.value[index]
                ).toFixed(3),
                FER_Total: Number.parseFloat(
                  FR_DDamount.value[0][index] +
                    FR_ADamount.value[0][index] +
                    FR_DRamount.value[0][index] +
                    FR_DIamount.value[0][index] +
                    FR_DIRamount.value[0][index] +
                    FR_AIamount.value[0][index] +
                    FR_AIRamount.value[0][index] +
                    FR_DDamount_byADLY.value[0][index] +
                    FR_DIamount_byADLY.value[0][index] +
                    FR_ADamount_byADLY.value[0][index] +
                    FR_AI_LDamount_byADLY.value[0][index] +
                    FR_AI_Ramount_byADLY.value[0][index] +
                    FR_AIamount_byADLY.value[0][index] +
                    FR_amount_byAFT.value[index]
                ).toFixed(3),
                FE_Flight: Number.parseFloat(
                  (FR_DDamount.value[0][index] +
                    FR_ADamount.value[0][index] +
                    FR_DRamount.value[0][index] +
                    FR_DIamount.value[0][index] +
                    FR_DIRamount.value[0][index] +
                    FR_AIamount.value[0][index] +
                    FR_AIRamount.value[0][index] +
                    FR_DDamount_byADLY.value[0][index] +
                    FR_DIamount_byADLY.value[0][index] +
                    FR_ADamount_byADLY.value[0][index] +
                    FR_AI_LDamount_byADLY.value[0][index] +
                    FR_AI_Ramount_byADLY.value[0][index] +
                    FR_AIamount_byADLY.value[0][index] +
                    FR_amount_byAFT.value[index]) /
                    (N_DD_Flght.value[0][index] +
                      N_AD_Flght.value[0][index] +
                      N_AI_Flght.value[0][index] +
                      N_DI_Flght.value[0][index])
                ).toFixed(3),
                FER_Rate: Number.parseFloat(
                  N_DD_Flght.value[0][index] + N_AD_Flght.value[0][index]
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
