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

      const res = Array(7)
        .fill(0)
        .reduce((acc, cur, index) => {
          if (index < 4) {
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
                YEAR: Number.parseInt(Year[14 + index]),
                N_Flight: Number.parseInt(N_Flight[14 + index]),
                FTR_EE: Number.parseFloat(FTR_EE[14 + index]).toFixed(2),
                USER_EE: Number.parseFloat(USER_EE[14 + index]).toFixed(2),
                SAFETY_EE: Number.parseFloat(SAFETY_EE[14 + index]).toFixed(2),
                Total_EE: Number.parseFloat(Total_EE[14 + index]).toFixed(2),
                ACCUM_EE: Number.parseFloat(ACCUM_EE[14 + index]).toFixed(2),
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
        ],
        datasets: [
          {
            label: "총 기대효과",
            borderColor: "#4E49A9",
            pointBorderColor: "#4E49A9",
            data: [
              this.data[0].Total_EE,
              this.data[1].Total_EE,
              this.data[2].Total_EE,
              this.data[3].Total_EE,
              this.data[4].Total_EE,
            ],
          },
          {
            label: "누적 기대효과",
            borderColor: "#32ACC0",
            pointBorderColor: "#32ACC0",
            data: [
              this.data[0].ACCUM_EE,
              this.data[1].ACCUM_EE,
              this.data[2].ACCUM_EE,
              this.data[3].ACCUM_EE,
              this.data[4].ACCUM_EE,
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
