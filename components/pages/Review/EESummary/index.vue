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
        <DoughnutChart />
      </div>
    </div>
    <ul class="button__list">
      <button @click="excelDown">데이터 저장</button>
      <button @click="handleRoute('/review')">돌아가기</button>
    </ul>
  </div>
</template>

<script>
import { xlsx } from "xlsx";
import { mapState } from "vuex";
import { YEAR } from "@/utils/constants/config.js";

export default {
  name: "ReviewTable",
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
  components: {
    SummaryTable: () => import("./EESummaryTable.vue"),
    LineChart: () => import("./EELineChart.vue"),
    DoughnutChart: () => import("./EEDoughnutChart.vue"),
  },
  props: {
    tableToDisplay: {
      type: String,
      value: "",
    },
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
                Total_EE: Number.parseFloat().toFixed(3),
                ACCUM_EE: Number.parseFloat().toFixed(3),
              },
            ];
          } else return [...acc];
        }, []);

      this.data = res;
      return res;
    },
    async excelDown() {
      const xlsx = require("xlsx");
      // 엑셀 파일 생성
      const book = xlsx.utils.book_new();
      // data get > 실 개발시 api 호출
      const EESummaryData = await this.getEESummaryData();
      // sheet 생성 - aoa_to_sheet 방식
      const worksheet = xlsx.utils.aoa_to_sheet(EESummaryData);
      // 엑셀 파일에 sheet set(엑셀파일, 시트데이터, 시트명)
      xlsx.utils.book_append_sheet(book, worksheet, "총 기대효과");
      // 엑셀 다운로드
      xlsx.writeFile(book, "국가 항행계획 총 기대효과.xlsx");
    },
    // aoa는 행열 데이터를 엑셀과 동일하게 get
    getEESummaryData() {
      let arr = [];
      arr.push([
        "연도",
        "총 운항편수",
        "운항 효율성 기대효과",
        "이용자 편의성 기대효과",
        "총 기대효과",
        "누적 기대효과",
      ]);
      arr.push(["2024"]);
      arr.push(["2029"]);
      arr.push(["2034"]);
      arr.push(["2039"]);
      arr.push(["2044"]);
      arr.push(["2049"]);
      return arr;
    },
    handleRoute(path) {
      this.$router.push(path);
    },
    Save() {
      this.tableToDisplay = "EESummaryTable";
    },
  },
  computed: {
    ...mapState("ansData", ["ANSDataTemplate"]),
    dataTypeheaderText() {
      const filteredDataName = "국가 항행계획 기대효과";
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
