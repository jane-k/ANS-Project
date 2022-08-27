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
      const Year = Array(7).fill(0);
      const N_Flight = Array(7).fill(0);
      var CE_Total = 0;
      const CER_Total = Array(7).fill(0);
      const CE_Flight = Array(7).fill(0);
      const CER_Rate = Array(7).fill(0);
      var FE_Total = 0;
      const FER_Total = Array(7).fill(0);
      const FE_Flight = Array(7).fill(0);
      const FER_Rate = Array(7).fill(0);

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
            N_Flight[t / 5] =
              N_Flight[t / 5] +
              this.ANSDataTemplate.N_DD_Flght.value[l][t] +
              this.ANSDataTemplate.N_AD_Flght.value[l][t] +
              this.ANSDataTemplate.N_AI_Flght.value[l][t] +
              this.ANSDataTemplate.N_DI_Flght.value[l][t];
          }
          if (t == 29) {
            N_Flight[(t + 1) / 5] =
              N_Flight[(t + 1) / 5] +
              this.ANSDataTemplate.N_DD_Flght.value[l][t] +
              this.ANSDataTemplate.N_AD_Flght.value[l][t] +
              this.ANSDataTemplate.N_AI_Flght.value[l][t] +
              this.ANSDataTemplate.N_DI_Flght.value[l][t];
          }
        }
      }

      for (let l = 0; l < MAX; l++) {
        CE_Total =
          CE_Total +
          this.ANSDataTemplate.FCE_hour.value[l] +
          this.ANSDataTemplate.ACE_TO_hour.value[l] +
          this.ANSDataTemplate.ACE_LD_hour.value[l];
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          if (t % 5 == 0) {
            CER_Total[t / 5] =
              CER_Total[t / 5] +
              this.ANSDataTemplate.CER_DDamount.value[l][t] +
              this.ANSDataTemplate.CER_ADamount.value[l][t] +
              this.ANSDataTemplate.CER_DRamount.value[l][t] +
              this.ANSDataTemplate.CER_DIamount.value[l][t] +
              this.ANSDataTemplate.CER_DIRamount.value[l][t] +
              this.ANSDataTemplate.CER_AIamount.value[l][t] +
              this.ANSDataTemplate.CER_AIRamount.value[l][t] +
              this.ANSDataTemplate.CER_DDamount_byADLY.value[l][t] +
              this.ANSDataTemplate.CER_DIamount_byADLY.value[l][t] +
              this.ANSDataTemplate.CER_ADamount_byADLY.value[l][t] +
              this.ANSDataTemplate.CER_AI_LDamount_byADLY.value[l][t] +
              this.ANSDataTemplate.CER_AI_Ramount_byADLY.value[l][t] +
              this.ANSDataTemplate.CER_AIamount_byADLY.value[l][t] +
              this.ANSDataTemplate.CER_amount_byAFT.value[t];
          }
          if (t == 29) {
            CER_Total[(t + 1) / 5] =
              CER_Total[(t + 1) / 5] +
              this.ANSDataTemplate.CER_DDamount.value[l][t] +
              this.ANSDataTemplate.CER_ADamount.value[l][t] +
              this.ANSDataTemplate.CER_DRamount.value[l][t] +
              this.ANSDataTemplate.CER_DIamount.value[l][t] +
              this.ANSDataTemplate.CER_DIRamount.value[l][t] +
              this.ANSDataTemplate.CER_AIamount.value[l][t] +
              this.ANSDataTemplate.CER_AIRamount.value[l][t] +
              this.ANSDataTemplate.CER_DDamount_byADLY.value[l][t] +
              this.ANSDataTemplate.CER_DIamount_byADLY.value[l][t] +
              this.ANSDataTemplate.CER_ADamount_byADLY.value[l][t] +
              this.ANSDataTemplate.CER_AI_LDamount_byADLY.value[l][t] +
              this.ANSDataTemplate.CER_AI_Ramount_byADLY.value[l][t] +
              this.ANSDataTemplate.CER_AIamount_byADLY.value[l][t] +
              this.ANSDataTemplate.CER_amount_byAFT.value[t];
          }
        }
      }
      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          if (t % 5 == 0) {
            CE_Flight[t / 5] =
              (CE_Flight[t / 5] +
                this.ANSDataTemplate.CER_DDamount.value[l][t] +
                this.ANSDataTemplate.CER_ADamount.value[l][t] +
                this.ANSDataTemplate.CER_DRamount.value[l][t] +
                this.ANSDataTemplate.CER_DIamount.value[l][t] +
                this.ANSDataTemplate.CER_DIRamount.value[l][t] +
                this.ANSDataTemplate.CER_AIamount.value[l][t] +
                this.ANSDataTemplate.CER_AIRamount.value[l][t] +
                this.ANSDataTemplate.CER_DDamount_byADLY.value[l][t] +
                this.ANSDataTemplate.CER_DIamount_byADLY.value[l][t] +
                this.ANSDataTemplate.CER_ADamount_byADLY.value[l][t] +
                this.ANSDataTemplate.CER_AI_LDamount_byADLY.value[l][t] +
                this.ANSDataTemplate.CER_AI_Ramount_byADLY.value[l][t] +
                this.ANSDataTemplate.CER_AIamount_byADLY.value[l][t] +
                this.ANSDataTemplate.CER_amount_byAFT.value[t] -
                CE_Total) /
              (this.ANSDataTemplate.N_DD_Flght.value[l][t] +
                this.ANSDataTemplate.N_AD_Flght.value[l][t] +
                this.ANSDataTemplate.N_AI_Flght.value[l][t] +
                this.ANSDataTemplate.N_DI_Flght.value[l][t]);
          }
          if (t == 29) {
            CE_Flight[(t + 1) / 5] =
              (CE_Flight[(t + 1) / 5] +
                this.ANSDataTemplate.CER_DDamount.value[l][t] +
                this.ANSDataTemplate.CER_ADamount.value[l][t] +
                this.ANSDataTemplate.CER_DRamount.value[l][t] +
                this.ANSDataTemplate.CER_DIamount.value[l][t] +
                this.ANSDataTemplate.CER_DIRamount.value[l][t] +
                this.ANSDataTemplate.CER_AIamount.value[l][t] +
                this.ANSDataTemplate.CER_AIRamount.value[l][t] +
                this.ANSDataTemplate.CER_DDamount_byADLY.value[l][t] +
                this.ANSDataTemplate.CER_DIamount_byADLY.value[l][t] +
                this.ANSDataTemplate.CER_ADamount_byADLY.value[l][t] +
                this.ANSDataTemplate.CER_AI_LDamount_byADLY.value[l][t] +
                this.ANSDataTemplate.CER_AI_Ramount_byADLY.value[l][t] +
                this.ANSDataTemplate.CER_AIamount_byADLY.value[l][t] +
                this.ANSDataTemplate.CER_amount_byAFT.value[t] -
                CE_Total) /
              (this.ANSDataTemplate.N_DD_Flght.value[l][t] +
                this.ANSDataTemplate.N_AD_Flght.value[l][t] +
                this.ANSDataTemplate.N_AI_Flght.value[l][t] +
                this.ANSDataTemplate.N_DI_Flght.value[l][t]);
          }
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          if (t % 5 == 0) {
            CER_Rate[t / 5];
          }
          if (t == 29) {
            CER_Rate[(t + 1) / 5];
          }
        }
      }

      for (let l = 0; l < MAX; l++) {
        FE_Total =
          this.ANSDataTemplate.FFE_hour.value[l] +
          this.ANSDataTemplate.AFE_TO_hour.value[l] +
          this.ANSDataTemplate.AFE_LD_hour.value[l];
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          if (t % 5 == 0) {
            FER_Total[t / 5] =
              FER_Total[t / 5] +
              this.ANSDataTemplate.FR_DDamount.value[l][t] +
              this.ANSDataTemplate.FR_ADamount.value[l][t] +
              this.ANSDataTemplate.FR_DRamount.value[l][t] +
              this.ANSDataTemplate.FR_DIamount.value[l][t] +
              this.ANSDataTemplate.FR_DIRamount.value[l][t] +
              this.ANSDataTemplate.FR_AIamount.value[l][t] +
              this.ANSDataTemplate.FR_AIRamount.value[l][t] +
              this.ANSDataTemplate.FR_DDamount_byADLY.value[l][t] +
              this.ANSDataTemplate.FR_DIamount_byADLY.value[l][t] +
              this.ANSDataTemplate.FR_ADamount_byADLY.value[l][t] +
              this.ANSDataTemplate.FR_AI_LDamount_byADLY.value[l][t] +
              this.ANSDataTemplate.FR_AI_Ramount_byADLY.value[l][t] +
              this.ANSDataTemplate.FR_AIamount_byADLY.value[l][t] +
              this.ANSDataTemplate.FR_amount_byAFT.value[t];
          }
          if (t == 29) {
            FER_Total[(t + 1) / 5] =
              FER_Total[(t + 1) / 5] +
              this.ANSDataTemplate.FR_DDamount.value[l][t] +
              this.ANSDataTemplate.FR_ADamount.value[l][t] +
              this.ANSDataTemplate.FR_DRamount.value[l][t] +
              this.ANSDataTemplate.FR_DIamount.value[l][t] +
              this.ANSDataTemplate.FR_DIRamount.value[l][t] +
              this.ANSDataTemplate.FR_AIamount.value[l][t] +
              this.ANSDataTemplate.FR_AIRamount.value[l][t] +
              this.ANSDataTemplate.FR_DDamount_byADLY.value[l][t] +
              this.ANSDataTemplate.FR_DIamount_byADLY.value[l][t] +
              this.ANSDataTemplate.FR_ADamount_byADLY.value[l][t] +
              this.ANSDataTemplate.FR_AI_LDamount_byADLY.value[l][t] +
              this.ANSDataTemplate.FR_AI_Ramount_byADLY.value[l][t] +
              this.ANSDataTemplate.FR_AIamount_byADLY.value[l][t] +
              this.ANSDataTemplate.FR_amount_byAFT.value[t];
          }
        }
      }
      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          if (t % 5 == 0) {
            FE_Flight[t / 5] =
              (FE_Flight[t / 5] +
                this.ANSDataTemplate.FR_DDamount.value[l][t] +
                this.ANSDataTemplate.FR_ADamount.value[l][t] +
                this.ANSDataTemplate.FR_DRamount.value[l][t] +
                this.ANSDataTemplate.FR_DIamount.value[l][t] +
                this.ANSDataTemplate.FR_DIRamount.value[l][t] +
                this.ANSDataTemplate.FR_AIamount.value[l][t] +
                this.ANSDataTemplate.FR_AIRamount.value[l][t] +
                this.ANSDataTemplate.FR_DDamount_byADLY.value[l][t] +
                this.ANSDataTemplate.FR_DIamount_byADLY.value[l][t] +
                this.ANSDataTemplate.FR_ADamount_byADLY.value[l][t] +
                this.ANSDataTemplate.FR_AI_LDamount_byADLY.value[l][t] +
                this.ANSDataTemplate.FR_AI_Ramount_byADLY.value[l][t] +
                this.ANSDataTemplate.FR_AIamount_byADLY.value[l][t] +
                this.ANSDataTemplate.FR_amount_byAFT.value[t] -
                FE_Total) /
              (this.ANSDataTemplate.N_DD_Flght.value[l][t] +
                this.ANSDataTemplate.N_AD_Flght.value[l][t] +
                this.ANSDataTemplate.N_AI_Flght.value[l][t] +
                this.ANSDataTemplate.N_DI_Flght.value[l][t]);
          }
          if (t == 29) {
            FE_Flight[(t + 1) / 5] =
              (FE_Flight[(t + 1) / 5] +
                this.ANSDataTemplate.FR_DDamount.value[l][t] +
                this.ANSDataTemplate.FR_ADamount.value[l][t] +
                this.ANSDataTemplate.FR_DRamount.value[l][t] +
                this.ANSDataTemplate.FR_DIamount.value[l][t] +
                this.ANSDataTemplate.FR_DIRamount.value[l][t] +
                this.ANSDataTemplate.FR_AIamount.value[l][t] +
                this.ANSDataTemplate.FR_AIRamount.value[l][t] +
                this.ANSDataTemplate.FR_DDamount_byADLY.value[l][t] +
                this.ANSDataTemplate.FR_DIamount_byADLY.value[l][t] +
                this.ANSDataTemplate.FR_ADamount_byADLY.value[l][t] +
                this.ANSDataTemplate.FR_AI_LDamount_byADLY.value[l][t] +
                this.ANSDataTemplate.FR_AI_Ramount_byADLY.value[l][t] +
                this.ANSDataTemplate.FR_AIamount_byADLY.value[l][t] +
                this.ANSDataTemplate.FR_amount_byAFT.value[t] -
                FE_Total) /
              (this.ANSDataTemplate.N_DD_Flght.value[l][t] +
                this.ANSDataTemplate.N_AD_Flght.value[l][t] +
                this.ANSDataTemplate.N_AI_Flght.value[l][t] +
                this.ANSDataTemplate.N_DI_Flght.value[l][t]);
          }
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          if (t % 5 == 0) {
            FER_Rate[t / 5];
          }
          if (t == 29) {
            FER_Rate[(t + 1) / 5];
          }
        }
      }

      const res = Array(7)
        .fill(0)
        .reduce((acc, cur, index) => {
          return [
            ...acc,
            {
              YEAR: Number.parseFloat(Year[index]),
              N_Flight: Number.parseFloat(N_Flight[index]).toFixed(2),
              CE_Total: Number.parseFloat(CE_Total).toFixed(2),
              CER_Total: Number.parseFloat(CER_Total[index]).toFixed(2),
              CE_Flight: Number.parseFloat(CE_Flight[index]).toFixed(2),
              CER_Rate: Number.parseFloat(CER_Rate[index]).toFixed(2),
              FE_Total: Number.parseFloat(FE_Total).toFixed(2),
              FER_Total: Number.parseFloat(FER_Total[index]).toFixed(2),
              FE_Flight: Number.parseFloat(FE_Flight[index]).toFixed(2),
              FER_Rate: Number.parseFloat(FER_Rate[index]).toFixed(2),
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
