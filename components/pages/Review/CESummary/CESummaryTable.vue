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
import { mapState, mapMutations } from "vuex";
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
        { text: "총 예상 탄소배출량", value: "CE_Total" },
        { text: "총 탄소배출 감축량", value: "CER_Total" },
        { text: "편당 탄소배출량", value: "CE_Flight" },
        { text: "탄소배출 절감율(%)", value: "CER_Rate" },
        { text: "총 예상 연료소비량", value: "FE_Total" },
        { text: "총 연료소비 감축량", value: "FER_Total" },
        { text: "편당 연료소비량", value: "FE_Flight" },
        { text: "연료소비 절감율(%)", value: "FER_Rate" },
      ],
      data: [],
    };
  },
  computed: {
    ...mapState("ansData", ["ANSDatabase", "ANSDataTemplate"]),
  },
  methods: {
    ...mapMutations("ansData", [
      "mutateFilteredANSData",
      "mutateANSDataTemplate",
    ]),
    computeDataSet() {
      const Year = Array(YEAR).fill(0);
      const N_Flight = Array(YEAR).fill(0);
      const D_Carbon = Array(YEAR).fill(0);
      const I_Carbon = Array(YEAR).fill(0);
      const CE_Total = Array(YEAR).fill(0);
      const CER_Total = Array(YEAR).fill(0);
      const CE_Flight = Array(YEAR).fill(0);
      const CER_Rate = Array(YEAR).fill(0);
      const FE_Total = Array(YEAR).fill(0);
      const D_Fuel = Array(YEAR).fill(0);
      const I_Fuel = Array(YEAR).fill(0);
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
            (this.ANSDataTemplate.N_DD_Flght.value[l][t] +
              this.ANSDataTemplate.N_AD_Flght.value[l][t]) /
              2 +
            this.ANSDataTemplate.N_AI_Flght.value[l][t] +
            this.ANSDataTemplate.N_DI_Flght.value[l][t];
        }
      }

      console.log(
        this.ANSDataTemplate.N_DD_Flght,
        this.ANSDatabase.Time_DTO,
        this.ANSDataTemplate.ACE_TO_hour,
        this.ANSDataTemplate.N_AD_Flght,
        this.ANSDatabase.Time_DLD,
        this.ANSDataTemplate.ACE_LD_hour,
        this.ANSDataTemplate.N_DD_Flght,
        this.ANSDataTemplate.N_AD_Flght,
        this.ANSDatabase.Time_DRoute,
        this.ANSDataTemplate.FCE_hour
      );

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          D_Carbon[t] =
            (D_Carbon[t] +
              (this.ANSDataTemplate.N_DD_Flght.value[l][t] *
                this.ANSDatabase.Time_DTO.value[l] *
                this.ANSDataTemplate.ACE_TO_hour.value[l] +
                this.ANSDataTemplate.N_AD_Flght.value[l][t] *
                  this.ANSDatabase.Time_DLD.value[l] *
                  this.ANSDataTemplate.ACE_LD_hour.value[l] +
                ((this.ANSDataTemplate.N_DD_Flght.value[l][t] +
                  this.ANSDataTemplate.N_AD_Flght.value[l][t]) /
                  2.0) *
                  this.ANSDatabase.Time_DRoute.value[l] *
                  this.ANSDataTemplate.FCE_hour.value[l])) /
            (60.0 * 1000.0);
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          I_Carbon[t] =
            I_Carbon[t] +
            (this.ANSDataTemplate.N_DI_Flght.value[l][t] *
              (this.ANSDatabase.Time_ITO.value[l] *
                this.ANSDataTemplate.ACE_TO_hour.value[l] +
                this.ANSDatabase.Time_DIRoute.value[l] *
                  this.ANSDataTemplate.FCE_hour.value[l]) +
              this.ANSDataTemplate.N_AI_Flght.value[l][t] *
                (this.ANSDatabase.Time_ILD.value[l] *
                  this.ANSDataTemplate.ACE_LD_hour.value[l] +
                  this.ANSDatabase.Time_AIRoute.value[l] *
                    this.ANSDataTemplate.FCE_hour.value[l])) /
              (60.0 * 1000.0);
        }
      }

      for (let t = 0; t < YEAR; t++) {
        CE_Total[t] = D_Carbon[t] + I_Carbon[t];
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
            this.ANSDataTemplate.CER_AIamount_byADLY.value[l][t];
        }
      }

      for (let t = 0; t < YEAR; t++) {
        CE_Flight[t] = (CE_Total[t] - CER_Total[t]) / N_Flight[t];
      }

      for (let t = 0; t < YEAR; t++) {
        CER_Rate[t] = 1 - CE_Flight[t] / (CE_Total[t] / N_Flight[t]);
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          D_Fuel[t] =
            D_Fuel[t] +
            (this.ANSDataTemplate.N_DD_Flght.value[l][t] *
              this.ANSDatabase.Time_DTO.value[l] *
              this.ANSDataTemplate.AFE_TO_hour.value[l] +
              this.ANSDataTemplate.N_AD_Flght.value[l][t] *
                this.ANSDatabase.Time_DLD.value[l] *
                this.ANSDataTemplate.AFE_LD_hour.value[l] +
              ((this.ANSDataTemplate.N_DD_Flght.value[l][t] +
                this.ANSDataTemplate.N_AD_Flght.value[l][t]) /
                2) *
                this.ANSDatabase.Time_DRoute.value[l] *
                this.ANSDataTemplate.FFE_hour.value[l]) /
              (60.0 * 1000.0);
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          I_Fuel[t] =
            I_Fuel[t] +
            (this.ANSDataTemplate.N_DI_Flght.value[l][t] *
              (this.ANSDatabase.Time_ITO.value[l] *
                this.ANSDataTemplate.AFE_TO_hour.value[l] +
                this.ANSDatabase.Time_DIRoute.value[l] *
                  this.ANSDataTemplate.FFE_hour.value[l]) +
              this.ANSDataTemplate.N_AI_Flght.value[l][t] *
                (this.ANSDatabase.Time_ILD.value[l] *
                  this.ANSDataTemplate.AFE_LD_hour.value[l] +
                  this.ANSDatabase.Time_AIRoute.value[l] *
                    this.ANSDataTemplate.FFE_hour.value[l])) /
              (60.0 * 1000.0);
        }
      }

      for (let t = 0; t < YEAR; t++) {
        FE_Total[t] = D_Fuel[t] + I_Fuel[t];
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
            this.ANSDataTemplate.FR_AIamount_byADLY.value[l][t];
        }
      }
      for (let t = 0; t < YEAR; t++) {
        FE_Flight[t] = (FE_Total[t] - FER_Total[t]) / N_Flight[t];
      }

      for (let t = 0; t < YEAR; t++) {
        FER_Rate[t] = 1 - FE_Flight[t] / (FE_Total[t] / N_Flight[t]);
      }

      const res = Array(Number.parseInt(YEAR / 5) + 1)
        .fill(0)
        .reduce((acc, cur, index) => {
          return [
            ...acc,
            {
              YEAR: Number.parseInt(Year[index * 5]),
              N_Flight: Number.parseFloat(N_Flight[index * 5]).toFixed(2),
              CE_Total: Number.parseFloat(CE_Total[index * 5]).toFixed(2),
              CER_Total: Number.parseFloat(CER_Total[index * 5]).toFixed(2),
              CE_Flight: Number.parseFloat(CE_Flight[index * 5]).toFixed(4),
              CER_Rate: Number.parseFloat(CER_Rate[index * 5] * 100).toFixed(3),
              FE_Total: Number.parseFloat(FE_Total[index * 5]).toFixed(2),
              FER_Total: Number.parseFloat(FER_Total[index * 5]).toFixed(2),
              FE_Flight: Number.parseFloat(FE_Flight[index * 5]).toFixed(4),
              FER_Rate: Number.parseFloat(FER_Rate[index * 5] * 100).toFixed(3),
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
