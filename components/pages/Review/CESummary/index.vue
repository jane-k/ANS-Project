<template>
  <div class="Container">
    <div class="table-container">
      <div class="header">
        <h2 class="data-title">
          {{ dataTypeheaderText }}
        </h2>
      </div>
      <div class="result-table">
        <SummaryTable />
        <LineChart />
      </div>
    </div>
    <ul class="button__list">
      <button @click="printResultReport">데이터 저장</button>
      <button @click="handleRoute('/review')">돌아가기</button>
    </ul>
  </div>
</template>

<script>
import { xlsx } from "xlsx";
import { mapState } from "vuex";
import { YEAR, MAX } from "@/utils/constants/config.js";

export default {
  name: "CESummary",
  components: {
    SummaryTable: () => import("./CESummaryTable.vue"),
    LineChart: () => import("./CEChart.vue"),
  },
  props: {
    tableToDisplay: {
      type: String,
      value: "",
    },
  },
  methods: {
    handleRoute(path) {
      this.$router.push(path);
    },
    Save() {
      this.tableToDisplay = "EESummaryTable";
    },
    async printResultReport() {
      const xlsx = require("xlsx");
      // 엑셀 파일 생성
      const book = xlsx.utils.book_new();
      // data get > 실 개발시 api 호출
      const CESummaryData = await this.getCESummaryData();
      // sheet 생성 - aoa_to_sheet 방식
      const worksheet = xlsx.utils.aoa_to_sheet(CESummaryData);
      // 엑셀 파일에 sheet set(엑셀파일, 시트데이터, 시트명)
      xlsx.utils.book_append_sheet(book, worksheet, "탄소배출 저감효과");
      // 엑셀 다운로드
      xlsx.writeFile(
        book,
        "운항효율성과 이용편리성에 의한 탄소배출 저감효과.xlsx"
      );
    },
    getCESummaryData() {
      let arr = [];
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

      arr.push([
        "연도",
        "운항편 수",
        "총 탄소배출량",
        "총 탄소배출 감축량",
        "편당 탄소배출량",
        "탄소배출 절감율",
        "총 연료소비량",
        "총 연료소비 감축량",
        "편당 연료소비량",
        "연료소비 절감율",
      ]);

      for (let i = 0; i < 7; i++) {
        arr.push([
          Year[i],
          N_Flight[i],
          CE_Total,
          CER_Total[i],
          CE_Flight[i],
          CER_Rate[i],
          FE_Total,
          FER_Total[i],
          FE_Flight[i],
          FER_Rate[i],
        ]);
      }

      return arr;
    },
  },
  computed: {
    ...mapState("ansData", ["ANSDataTemplate"]),
    dataTypeheaderText() {
      const filteredDataName =
        "운항효율성과 이용편리성에 의한 탄소배출 저감효과";
      return this.filteredDataName || filteredDataName;
    },
  },
};
</script>

<style lang="scss">
.table-container {
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  border: 1px solid #cdcdcd;
  border-radius: 0.5rem;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
  overflow-x: scroll;
}

.table-container::after {
  content: "";
  background: url("~/assets/images/intro-logo.png") no-repeat;
  background-position: center;
  opacity: 0.12;
  position: absolute;
  top: 8px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: -1;
}

.header {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.5rem;
  font-size: 1.125rem;
  font-weight: bold;
  top: 0;
  background-color: white;
  border-bottom: 1px solid #cdcdcd;
}

.data-title {
  width: 100%;
  text-align: center;
}

.data-save {
  color: #ababab;
  position: absolute;
  right: 1rem;
  font-size: 0.875rem;
  white-space: nowrap;
  cursor: pointer;
  transition: 0.2s ease-in-out all;
  padding: 0.375rem 0.5rem;
}

.data-save:hover {
  color: #333;
  background-color: #efefef;
  border-radius: 0.5rem;
}

.result-table {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  height: 100%;
  overflow-x: hidden;
}

.Container {
  width: 95%;
  height: 60%;
  display: flex;
  gap: 2rem;
  padding: 1rem;
  font-size: 80%;
}
</style>
