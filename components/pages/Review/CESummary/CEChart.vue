<template>
  <v-card class="v-card-Chart" max-width="600">
    <v-sheet class="v-sheet-Chart">
      <chart-test :chart-data="data"></chart-test>
    </v-sheet>
  </v-card>
</template>

<script>
import ChartTest from "@/utils/chart/lineChart";
import { mapState } from "vuex";
import { MAX, YEAR } from "@/utils/constants/config.js";

export default {
  components: {
    ChartTest,
  },
  data() {
    return {
      data: [],
    };
  },
  created() {
    this.computeDataSet();
    this.fillData();
  },
  computed: {
    ...mapState("ansData", ["ANSDataTemplate"]),
  },
  methods: {
    computeDataSet() {
      const Year = Array(YEAR).fill(0);
      const N_Flight = Array(YEAR).fill(0);
      var CE_Total = 0;
      const CER_Total = Array(YEAR).fill(0);
      const CE_Flight = Array(YEAR).fill(0);
      const CER_Rate = Array(YEAR).fill(0);
      var FE_Total = 0;
      const FER_Total = Array(YEAR).fill(0);
      const FE_Flight = Array(YEAR).fill(0);
      const FER_Rate = Array(YEAR).fill(0);

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
        CE_Total =
          CE_Total +
          this.ANSDataTemplate.FCE_hour.value[l] +
          this.ANSDataTemplate.ACE_TO_hour.value[l] +
          this.ANSDataTemplate.ACE_LD_hour.value[l];
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          CER_Total[t] =
            CER_Total[t] +
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
      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          CE_Flight[t] =
            (CE_Total -
              (this.ANSDataTemplate.CER_DDamount.value[l][t] +
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
                this.ANSDataTemplate.CER_amount_byAFT.value[t])) /
            (this.ANSDataTemplate.N_DD_Flght.value[l][t] +
              this.ANSDataTemplate.N_AD_Flght.value[l][t] +
              this.ANSDataTemplate.N_AI_Flght.value[l][t] +
              this.ANSDataTemplate.N_DI_Flght.value[l][t]);
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          CER_Rate[t] = (CER_Total[t] / CE_Total) * 100;
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
          FER_Total[t] =
            FER_Total[t] +
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
      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          FE_Flight[t] =
            (FE_Total -
              (this.ANSDataTemplate.FR_DDamount.value[l][t] +
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
                this.ANSDataTemplate.FR_amount_byAFT.value[t])) /
            (this.ANSDataTemplate.N_DD_Flght.value[l][t] +
              this.ANSDataTemplate.N_AD_Flght.value[l][t] +
              this.ANSDataTemplate.N_AI_Flght.value[l][t] +
              this.ANSDataTemplate.N_DI_Flght.value[l][t]);
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          FER_Rate[t] = (FER_Total[t] / FE_Total) * 100;
        }
      }

      const res = Array(Number.parseInt(YEAR / 5) + 3)
        .fill(0)
        .reduce((acc, cur, index) => {
          if (index < 4) {
            return [
              ...acc,
              {
                YEAR: Number.parseInt(Year[index * 5]),
                N_Flight: Number.parseFloat(N_Flight[index * 5]).toFixed(2),
                CE_Total: Number.parseFloat(CE_Total).toFixed(2),
                CER_Total: Number.parseFloat(CER_Total[index * 5]).toFixed(2),
                CE_Flight: Number.parseFloat(CE_Flight[index * 5]).toFixed(4),
                CER_Rate: Number.parseFloat(CER_Rate[index * 5]).toFixed(2),
                FE_Total: Number.parseFloat(FE_Total).toFixed(2),
                FER_Total: Number.parseFloat(FER_Total[index * 5]).toFixed(2),
                FE_Flight: Number.parseFloat(FE_Flight[index * 5]).toFixed(4),
                FER_Rate: Number.parseFloat(FER_Rate[index * 5]).toFixed(2),
              },
            ];
          } else {
            return [
              ...acc,
              {
                YEAR: Number.parseFloat(Year[14 + index]),
                N_Flight: Number.parseFloat(N_Flight[14 + index]).toFixed(2),
                CE_Total: Number.parseFloat(CE_Total).toFixed(2),
                CER_Total: Number.parseFloat(CER_Total[14 + index]).toFixed(2),
                CE_Flight: Number.parseFloat(CE_Flight[14 + index]).toFixed(4),
                CER_Rate: Number.parseFloat(CER_Rate[14 + index]).toFixed(2),
                FE_Total: Number.parseFloat(FE_Total).toFixed(2),
                FER_Total: Number.parseFloat(FER_Total[14 + index]).toFixed(2),
                FE_Flight: Number.parseFloat(FE_Flight[14 + index]).toFixed(4),
                FER_Rate: Number.parseFloat(FER_Rate[14 + index]).toFixed(2),
              },
            ];
          }
        }, []);

      this.data = res;
      return res;
    },

    fillData() {
      this.data = {
        labels: [
          this.data[0].YEAR,
          this.data[1].YEAR,
          this.data[2].YEAR,
          this.data[3].YEAR,
          this.data[4].YEAR,
          this.data[5].YEAR,
          this.data[6].YEAR,
        ],
        datasets: [
          {
            label: "편당 탄소배출량",
            borderColor: "#4E49A9",
            pointBorderColor: "#4E49A9",
            data: [
              this.data[0].CE_Flight,
              this.data[1].CE_Flight,
              this.data[2].CE_Flight,
              this.data[3].CE_Flight,
              this.data[4].CE_Flight,
              this.data[5].CE_Flight,
              this.data[6].CE_Flight,
            ],
          },
          {
            label: "편당 연료소모량",
            borderColor: "#32ACC0",
            pointBorderColor: "#32ACC0",
            data: [
              this.data[0].FE_Flight,
              this.data[1].FE_Flight,
              this.data[2].FE_Flight,
              this.data[3].FE_Flight,
              this.data[4].FE_Flight,
              this.data[5].FE_Flight,
              this.data[6].FE_Flight,
            ],
          },
        ],
      };
    },
  },
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
