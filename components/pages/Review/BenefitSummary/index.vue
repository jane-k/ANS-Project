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
  name: "BenefitSummary",
  components: {
    SummaryTable: () => import("./BenefitSummaryTable.vue"),
    LineChart: () => import("./BenefitChart.vue"),
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
      this.tableToDisplay = "BenefitSummaryTable";
    },
    async printResultReport() {
      const xlsx = require("xlsx");
      // 엑셀 파일 생성
      const book = xlsx.utils.book_new();
      // data get > 실 개발시 api 호출
      const BenefitSummaryData = await this.getBenefitSummary();
      // sheet 생성 - aoa_to_sheet 방식
      const worksheet = xlsx.utils.aoa_to_sheet(BenefitSummaryData);
      // 엑셀 파일에 sheet set(엑셀파일, 시트데이터, 시트명)
      xlsx.utils.book_append_sheet(book, worksheet, "사업자별 경제적 편익");
      // 엑셀 다운로드
      xlsx.writeFile(
        book,
        "운항효율성 및 이용편리성에 대한 사업자별 경제적 편익.xlsx"
      );
    },
    getBenefitSummary() {
      let arr = [];
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
          CER_Cost[i],
          FTR_Cost[i],
          DTR_Cost[i],
          INC_Safety[i],
          ACCUM_Effect[i],
          PSG_Effect[i],
        ]);
      }

      return arr;
    },
  },
  computed: {
    ...mapState("ansData", ["ANSDataTemplate"]),
    dataTypeheaderText() {
      const filteredDataName =
        "운항효율성 및 이용편리성에 대한 사업자별 직접적 경제적 편익";
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
  font-size: 100%;
}
</style>
