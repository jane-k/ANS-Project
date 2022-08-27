<template>
  <div class="Container">
    <ReviewTable />
    <ul class="button__list">
      <button @click="handleRoute('/EESummary')">총 기대효과</button>
      <button @click="handleRoute('/CESummary')">탄소배출 절감효과</button>
      <button @click="printResultReport">분석결과 저장</button>
      <button @click="handleRoute('/')">돌아가기</button>
    </ul>
  </div>
</template>

<script>
import { xlsx } from "xlsx";
import { mapState } from "vuex";
import { YEAR, MAX } from "@/utils/constants/config.js";

export default {
  name: "Review",
  components: {
    ReviewTable: () => import("@/components/Intro"),
    xlsx,
  },
  data() {
    return {
      tableToDisplay: null,
    };
  },
  computed: {
    ...mapState("ansData", ["ANSDataTemplate"]),
  },
  methods: {
    handleRoute(path) {
      this.$router.push(path);
    },

    async printResultReport() {
      const xlsx = require("xlsx");
      // 엑셀 파일 생성
      const book = xlsx.utils.book_new();
      // data get > 실 개발시 api 호출
      const EEData = await this.getEEData();
      const CER_FTData = await this.getCER_FTData();
      const CER_DlyData = await this.getCER_DlyData();
      const FR_FTData = await this.getFR_FTData();
      const FR_DlyData = await this.getFR_DlyData();
      const FC_FTData = await this.getFC_FTData();
      const EE_DlyData = await this.getEE_DlyData();
      const BNF_CERData = await this.getBNF_CERData();
      const BNF_FRData = await this.getBNF_FRData();
      const BNF_PSGData = await this.getBNF_PSGData();

      // sheet 생성 - aoa_to_sheet 방식
      const worksheetEEData = xlsx.utils.aoa_to_sheet(EEData);
      const worksheetCER_FTData = xlsx.utils.aoa_to_sheet(CER_FTData);
      const worksheetCER_DlyData = xlsx.utils.aoa_to_sheet(CER_DlyData);
      const worksheetFR_FTData = xlsx.utils.aoa_to_sheet(FR_FTData);
      const worksheetFR_DlyData = xlsx.utils.aoa_to_sheet(FR_DlyData);
      const worksheetFC_FTData = xlsx.utils.aoa_to_sheet(FC_FTData);
      const worksheetEE_DlyData = xlsx.utils.aoa_to_sheet(EE_DlyData);
      const worksheetBNF_CERData = xlsx.utils.aoa_to_sheet(BNF_CERData);
      const worksheetBNF_FRData = xlsx.utils.aoa_to_sheet(BNF_FRData);
      const worksheetBNF_PSGData = xlsx.utils.aoa_to_sheet(BNF_PSGData);
      // 엑셀 파일에 sheet set(엑셀파일, 시트데이터, 시트명)
      xlsx.utils.book_append_sheet(
        book,
        worksheetEEData,
        "기대효과(운항시간단축)"
      );
      xlsx.utils.book_append_sheet(
        book,
        worksheetCER_FTData,
        "운항시간 단축 - 탄소 절감비용"
      );
      xlsx.utils.book_append_sheet(
        book,
        worksheetCER_DlyData,
        "출·도착 - 탄소 절감량·비용"
      );
      xlsx.utils.book_append_sheet(
        book,
        worksheetFR_FTData,
        "운항시간 단축 - 연료 절감비용(공항)"
      );
      xlsx.utils.book_append_sheet(
        book,
        worksheetFR_DlyData,
        "출·도착 - 연료 절감량·비용"
      );
      xlsx.utils.book_append_sheet(
        book,
        worksheetFC_FTData,
        "운항시간 단축 - 운항비 절감(공항)"
      );
      xlsx.utils.book_append_sheet(
        book,
        worksheetEE_DlyData,
        "기대효과(운항지연감소)"
      );
      xlsx.utils.book_append_sheet(
        book,
        worksheetBNF_CERData,
        "탄소배출 절감비용(고객)"
      );
      xlsx.utils.book_append_sheet(
        book,
        worksheetBNF_FRData,
        "연료절감비용(고객)"
      );
      xlsx.utils.book_append_sheet(
        book,
        worksheetBNF_PSGData,
        "기대효과(고객)"
      );
      // 엑셀 다운로드
      xlsx.writeFile(book, "경제성 분석 결과.xlsx");
    },
    getEEData() {
      let arr = [];
      const Year = Array(YEAR).fill(0);
      const N_Flight = Array(YEAR).fill(0);
      const CER_cost = Array(YEAR).fill(0);
      const FR_cost = Array(YEAR).fill(0);
      const OPR_cost = Array(YEAR).fill(0);
      const Total_cost = Array(YEAR).fill(0);
      const Accum_cost = Array(YEAR).fill(0);

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
          CER_cost[t] =
            CER_cost[t] +
            this.ANSDataTemplate.CER_DDcost.value[l][t] +
            this.ANSDataTemplate.CER_DIcost.value[l][t] +
            this.ANSDataTemplate.CER_DRcost.value[l][t] +
            this.ANSDataTemplate.CER_ADcost.value[l][t] +
            this.ANSDataTemplate.CER_AIcost.value[l][t] +
            this.ANSDataTemplate.CER_DIRcost.value[l][t] +
            this.ANSDataTemplate.CER_AIRcost.value[l][t];
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          FR_cost[t] =
            FR_cost[t] +
            this.ANSDataTemplate.FR_DDcost.value[l][t] +
            this.ANSDataTemplate.FR_DIcost.value[l][t] +
            this.ANSDataTemplate.FR_DRcost.value[l][t] +
            this.ANSDataTemplate.FR_ADcost.value[l][t] +
            this.ANSDataTemplate.FR_AIcost.value[l][t] +
            this.ANSDataTemplate.FR_DIRcost.value[l][t] +
            this.ANSDataTemplate.FR_AIRcost.value[l][t];
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          OPR_cost[t] =
            OPR_cost[t] +
            this.ANSDataTemplate.OPR_DDcost.value[l][t] +
            this.ANSDataTemplate.OPR_DIcost.value[l][t] +
            this.ANSDataTemplate.OPR_AIcost.value[l][t];
        }
      }

      for (let t = 0; t < YEAR; t++) {
        Total_cost[t] = Total_cost[t] + CER_cost[t] + FR_cost[t] + OPR_cost[t];
      }

      for (let t = 0; t < YEAR; t++) {
        if (t == 0) {
          Accum_cost[t] = Total_cost[t];
        } else {
          Accum_cost[t] = Total_cost[t] + Accum_cost[t - 1];
        }
      }

      arr.push([
        "연도",
        "총 운항편수",
        "탄소배출 절감비용",
        "연료소모 절감비용",
        "운항비 절감편익",
        "총 절감비용",
        "누적 절감비용",
      ]);

      for (let i = 0; i < 30; i++) {
        arr.push([
          Year[i],
          N_Flight[i],
          CER_cost[i],
          FR_cost[i],
          OPR_cost[i],
          Total_cost[i],
          Accum_cost[i],
        ]);
      }

      return arr;
    },

    getCER_FTData() {
      let arr = [];
      const Year = Array(YEAR).fill(0);
      const N_Flight = Array(YEAR).fill(0);
      const CER_amount = Array(YEAR).fill(0);
      const CER_cost = Array(YEAR).fill(0);

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
          CER_amount[t] =
            CER_amount[t] +
            this.ANSDataTemplate.CER_DDamount.value[l][t] +
            this.ANSDataTemplate.CER_DIamount.value[l][t] +
            this.ANSDataTemplate.CER_DRamount.value[l][t] +
            this.ANSDataTemplate.CER_ADamount.value[l][t] +
            this.ANSDataTemplate.CER_AIamount.value[l][t] +
            this.ANSDataTemplate.CER_DIRamount.value[l][t] +
            this.ANSDataTemplate.CER_AIRamount.value[l][t];
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          CER_cost[t] =
            CER_cost[t] +
            this.ANSDataTemplate.CER_DDcost.value[l][t] +
            this.ANSDataTemplate.CER_DIcost.value[l][t] +
            this.ANSDataTemplate.CER_DRcost.value[l][t] +
            this.ANSDataTemplate.CER_ADcost.value[l][t] +
            this.ANSDataTemplate.CER_AIcost.value[l][t] +
            this.ANSDataTemplate.CER_DIRcost.value[l][t] +
            this.ANSDataTemplate.CER_AIRcost.value[l][t];
        }
      }

      arr.push(["연도", "총 운항편수", "탄소배출 절감량", "탄소배출 절감비용"]);

      for (let i = 0; i < 30; i++) {
        arr.push([Year[i], N_Flight[i], CER_amount[i], CER_cost[i]]);
      }

      return arr;
    },

    getCER_DlyData() {
      let arr = [];
      const Year = Array(YEAR).fill(0);
      const Total_CER_DIamount = Array(YEAR).fill(0);
      const Total_CER_AIamount = Array(YEAR).fill(0);
      const Total_CER_Damount = Array(YEAR).fill(0);
      const Total_CER_DIcost = Array(YEAR).fill(0);
      const Total_CER_AIcost = Array(YEAR).fill(0);
      const Total_CER_Dcost = Array(YEAR).fill(0);

      for (let t = 0; t < YEAR; t++) {
        Year[t] = new Date().getFullYear() + t;
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          Total_CER_DIamount[t] =
            Total_CER_DIamount[t] +
            this.ANSDataTemplate.CER_DIcost.value[l][t] +
            this.ANSDataTemplate.CER_DIRcost.value[l][t];
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          Total_CER_AIamount[t] =
            Total_CER_AIamount[t] +
            this.ANSDataTemplate.CER_AIamount.value[l][t] +
            this.ANSDataTemplate.CER_AIRamount.value[l][t];
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          Total_CER_Damount[t] =
            Total_CER_Damount[t] +
            this.ANSDataTemplate.CER_DDamount.value[l][t] +
            this.ANSDataTemplate.CER_DRamount.value[l][t] +
            this.ANSDataTemplate.CER_ADamount.value[l][t];
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          Total_CER_DIcost[t] =
            Total_CER_DIcost[t] +
            this.ANSDataTemplate.CER_DIcost.value[l][t] +
            this.ANSDataTemplate.CER_DIRcost.value[l][t];
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          Total_CER_AIcost[t] =
            Total_CER_AIcost[t] +
            this.ANSDataTemplate.CER_AIcost.value[l][t] +
            this.ANSDataTemplate.CER_AIRcost.value[l][t];
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          Total_CER_Dcost[t] =
            Total_CER_Dcost[t] +
            this.ANSDataTemplate.CER_DDcost.value[l][t] +
            this.ANSDataTemplate.CER_DRcost.value[l][t] +
            this.ANSDataTemplate.CER_ADcost.value[l][t];
        }
      }

      arr.push([
        "연도",
        "탄소배출 절감량(국제선 출발)",
        "탄소배출 절감량(국제선 도착)",
        "탄소배출 절감량(국내선)",
        "탄소배출 절감비용(국제선 출발)",
        "탄소배출 절감비용(국제선 도착)",
        "탄소배출 절감비용(국내선)",
      ]);

      for (let i = 0; i < 30; i++) {
        arr.push([
          Year[i],
          Total_CER_DIamount[i],
          Total_CER_AIamount[i],
          Total_CER_Damount[i],
          Total_CER_DIcost[i],
          Total_CER_AIcost[i],
          Total_CER_Dcost[i],
        ]);
      }

      return arr;
    },

    getFR_FTData() {
      let arr = [];
      const Year = Array(YEAR).fill(0);
      const N_Flight = Array(YEAR).fill(0);
      const FR_amount = Array(YEAR).fill(0);
      const FR_cost = Array(YEAR).fill(0);

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
          FR_amount[t] =
            FR_amount[t] +
            this.ANSDataTemplate.FR_DDamount.value[l][t] +
            this.ANSDataTemplate.FR_DIamount.value[l][t] +
            this.ANSDataTemplate.FR_DRamount.value[l][t] +
            this.ANSDataTemplate.FR_ADamount.value[l][t] +
            this.ANSDataTemplate.FR_AIamount.value[l][t] +
            this.ANSDataTemplate.FR_DIRamount.value[l][t] +
            this.ANSDataTemplate.FR_AIRamount.value[l][t];
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          FR_cost[t] =
            FR_cost[t] +
            this.ANSDataTemplate.FR_DDcost.value[l][t] +
            this.ANSDataTemplate.FR_DIcost.value[l][t] +
            this.ANSDataTemplate.FR_DRcost.value[l][t] +
            this.ANSDataTemplate.FR_ADcost.value[l][t] +
            this.ANSDataTemplate.FR_AIcost.value[l][t] +
            this.ANSDataTemplate.FR_DIRcost.value[l][t] +
            this.ANSDataTemplate.FR_AIRcost.value[l][t];
        }
      }

      arr.push(["연도", "총 운항편수", "연료소모 절감량", "연료소모 절감비용"]);

      for (let i = 0; i < 30; i++) {
        arr.push([Year[i], N_Flight[i], FR_amount[i], FR_cost[i]]);
      }

      return arr;
    },

    getFR_DlyData() {
      let arr = [];
      const Year = Array(YEAR).fill(0);
      const Total_FR_DIamount = Array(YEAR).fill(0);
      const Total_FR_AIamount = Array(YEAR).fill(0);
      const Total_FR_Damount = Array(YEAR).fill(0);
      const Total_FR_DIcost = Array(YEAR).fill(0);
      const Total_FR_AIcost = Array(YEAR).fill(0);
      const Total_FR_Dcost = Array(YEAR).fill(0);

      for (let t = 0; t < YEAR; t++) {
        Year[t] = new Date().getFullYear() + t;
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          Total_FR_DIamount[t] =
            Total_FR_DIamount[t] +
            this.ANSDataTemplate.FR_DIamount.value[l][t] +
            this.ANSDataTemplate.FR_DIRamount.value[l][t];
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          Total_FR_AIamount[t] =
            Total_FR_AIamount[t] +
            this.ANSDataTemplate.FR_AIamount.value[l][t] +
            this.ANSDataTemplate.FR_AIRamount.value[l][t];
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          Total_FR_Damount[t] =
            Total_FR_Damount[t] +
            this.ANSDataTemplate.FR_DDamount.value[l][t] +
            this.ANSDataTemplate.FR_DRamount.value[l][t] +
            this.ANSDataTemplate.FR_ADamount.value[l][t];
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          Total_FR_DIcost[t] =
            Total_FR_DIcost[t] +
            this.ANSDataTemplate.FR_DIcost.value[l][t] +
            this.ANSDataTemplate.FR_DIRcost.value[l][t];
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          Total_FR_AIcost[t] =
            Total_FR_AIcost[t] +
            this.ANSDataTemplate.FR_AIcost.value[l][t] +
            this.ANSDataTemplate.FR_AIRcost.value[l][t];
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          Total_FR_Dcost[t] =
            Total_FR_Dcost[t] +
            this.ANSDataTemplate.FR_DDcost.value[l][t] +
            this.ANSDataTemplate.FR_ADcost.value[l][t] +
            this.ANSDataTemplate.FR_DRcost.value[l][t];
        }
      }

      arr.push([
        "연도",
        "연료소모 절감량(국제선 출발)",
        "연료소모 절감량(국제선 도착)",
        "연료소모 절감량(국내선)",
        "연료소모 절감비용(국제선 출발)",
        "연료소모 절감비용(국제선 도착)",
        "연료소모 절감비용(국내선)",
      ]);

      for (let i = 0; i < 30; i++) {
        arr.push([
          Year[i],
          Total_FR_DIamount[i],
          Total_FR_AIamount[i],
          Total_FR_Damount[i],
          Total_FR_DIcost[i],
          Total_FR_AIcost[i],
          Total_FR_Dcost[i],
        ]);
      }

      return arr;
    },

    getFC_FTData() {
      let arr = [];
      const Year = Array(YEAR).fill(0);
      const OPR_Icost = Array(YEAR).fill(0);
      const OPR_Dcost = Array(YEAR).fill(0);
      const Total_OPR = Array(YEAR).fill(0);

      for (let t = 0; t < YEAR; t++) {
        Year[t] = new Date().getFullYear() + t;
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          OPR_Icost[t] =
            OPR_Icost[t] +
            this.ANSDataTemplate.OPR_DIcost.value[l][t] +
            this.ANSDataTemplate.OPR_AIcost.value[l][t];
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          OPR_Dcost[t] =
            OPR_Dcost[t] +
            this.ANSDataTemplate.OPR_DDcost.value[l][t] +
            this.ANSDataTemplate.OPR_DIcost.value[l][t];
        }
      }

      for (let t = 0; t < YEAR; t++) {
        Total_OPR[t] = Total_OPR[t] + OPR_Icost[t] + OPR_Dcost[t];
      }

      arr.push([
        "연도",
        "운항비 절감편익(국제)",
        "운항비 절감편익(국내)",
        "총 운항비 절감편익",
      ]);

      for (let i = 0; i < 30; i++) {
        arr.push([Year[i], OPR_Icost[i], OPR_Dcost[i], Total_OPR[i]]);
      }

      return arr;
    },

    getEE_DlyData() {
      let arr = [];
      const Year = Array(YEAR).fill(0);
      const N_Flight = Array(YEAR).fill(0);
      const TL_Dly = Array(YEAR).fill(0);
      const CER_cost = Array(YEAR).fill(0);
      const FR_cost = Array(YEAR).fill(0);
      const OPR_cost = Array(YEAR).fill(0);
      const Total_cost = Array(YEAR).fill(0);

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
          TL_Dly[t] =
            TL_Dly[t] +
            this.ANSDataTemplate.TL_DD_Dly.value[l][t] +
            this.ANSDataTemplate.TL_DI_Dly.value[l][t] +
            this.ANSDataTemplate.TL_AD_Dly.value[l][t] +
            this.ANSDataTemplate.TL_AI_Dly_LD.value[l][t] +
            this.ANSDataTemplate.TL_AI_Dly_R.value[l][t] +
            this.ANSDataTemplate.TL_AI_Dly.value[l][t] +
            this.ANSDataTemplate.FTR_Pass.value[t];
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          CER_cost[t] =
            CER_cost[t] +
            this.ANSDataTemplate.CER_DDcost_byADLY.value[l][t] +
            this.ANSDataTemplate.CER_DIcost_byADLY.value[l][t] +
            this.ANSDataTemplate.CER_ADcost_byADLY.value[l][t] +
            this.ANSDataTemplate.CER_AIcost_byADLY.value[l][t] +
            this.ANSDataTemplate.CER_AI_LDcost_byADLY.value[l][t] +
            this.ANSDataTemplate.CER_AI_Rcost_byADLY.value[l][t] +
            this.ANSDataTemplate.CER_amount_byAFT.value[t];
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          FR_cost[t] =
            FR_cost[t] +
            this.ANSDataTemplate.FR_DDcost_byADLY.value[l][t] +
            this.ANSDataTemplate.FR_DIcost_byADLY.value[l][t] +
            this.ANSDataTemplate.FR_ADcost_byADLY.value[l][t] +
            this.ANSDataTemplate.FR_AIcost_byADLY.value[l][t] +
            this.ANSDataTemplate.FR_AI_LDcost_byADLY.value[l][t] +
            this.ANSDataTemplate.FR_AI_Rcost_byADLY.value[l][t] +
            this.ANSDataTemplate.FR_amount_byAFT.value[t];
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          OPR_cost[t] =
            OPR_cost[t] +
            this.ANSDataTemplate.OPR_ADcost_DLY.value[l][t] +
            this.ANSDataTemplate.OPR_DIcost_DLY.value[l][t] +
            this.ANSDataTemplate.OPR_AIcost_DLY.value[l][t];
        }
      }

      for (let t = 0; t < YEAR; t++) {
        Total_cost[t] = Total_cost[t] + CER_cost[t] + FR_cost[t] + OPR_cost[t];
      }

      arr.push([
        "연도",
        "총 운항편수",
        "지연 감소 시간",
        "탄소배출 절감비용",
        "연료소모 절감비용",
        "운항비 절감편익",
        "총 절감비용",
      ]);

      for (let i = 0; i < 30; i++) {
        arr.push([
          Year[i],
          N_Flight[i],
          TL_Dly[i],
          CER_cost[i],
          FR_cost[i],
          OPR_cost[i],
          Total_cost[i],
        ]);
      }

      return arr;
    },

    getBNF_CERData() {
      let arr = [];
      const Year = Array(YEAR).fill(0);
      const Total_CER_DIamount = Array(YEAR).fill(0);
      const Total_CER_DIcost = Array(YEAR).fill(0);
      const Total_CER_AIamount = Array(YEAR).fill(0);
      const Total_CER_AIcost = Array(YEAR).fill(0);
      const Total_CER_DDamount = Array(YEAR).fill(0);
      const Total_CER_DDcost = Array(YEAR).fill(0);
      const Total_CER_amount = Array(YEAR).fill(0);
      const Total_CER_cost = Array(YEAR).fill(0);

      for (let t = 0; t < YEAR; t++) {
        Year[t] = new Date().getFullYear() + t;
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          Total_CER_DIamount[t] =
            Total_CER_DIamount[t] +
            this.ANSDataTemplate.CER_DIcost_byADLY.value[l][t];
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          Total_CER_DIcost[t] =
            Total_CER_DIcost[t] +
            this.ANSDataTemplate.CER_DIcost_byADLY.value[l][t];
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          Total_CER_AIamount[t] =
            Total_CER_AIamount[t] +
            this.ANSDataTemplate.CER_AIamount_byADLY.value[l][t] +
            this.ANSDataTemplate.CER_AI_LDamount_byADLY.value[l][t] +
            this.ANSDataTemplate.CER_AI_Ramount_byADLY.value[l][t];
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          Total_CER_AIcost[t] =
            Total_CER_AIcost[t] +
            this.ANSDataTemplate.CER_AIcost_byADLY.value[l][t] +
            this.ANSDataTemplate.CER_AI_LDcost_byADLY.value[l][t] +
            this.ANSDataTemplate.CER_AI_Rcost_byADLY.value[l][t];
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          Total_CER_DDamount[t] =
            Total_CER_DDamount[t] +
            this.ANSDataTemplate.CER_DDamount_byADLY.value[l][t];
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          Total_CER_DDcost[t] =
            Total_CER_DDcost[t] +
            this.ANSDataTemplate.CER_DDcost_byADLY.value[l][t];
        }
      }

      for (let t = 0; t < YEAR; t++) {
        Total_CER_amount[t] =
          Total_CER_amount[t] +
          Total_CER_DDamount[t] +
          Total_CER_DIamount[t] +
          Total_CER_AIamount[t];
      }

      for (let t = 0; t < YEAR; t++) {
        Total_CER_cost[t] =
          Total_CER_cost[t] +
          Total_CER_DDcost[t] +
          Total_CER_DIcost[t] +
          Total_CER_AIcost[t];
      }

      arr.push([
        "연도",
        "탄소배출 절감량(국제선 출발)",
        "탄소배출 절감비용(국제선 출발)",
        "탄소배출 절감량(국제선 도착)",
        "탄소배출 절감비용(국제선 도착)",
        "탄소배출 절감량(국내선 출발)",
        "탄소배출 절감비용(국내선 출발)",
        "총 탄소배출 절감량",
        "총 탄소배출 절감비용",
      ]);

      for (let i = 0; i < 30; i++) {
        arr.push([
          Year[i],
          Total_CER_DIamount[i],
          Total_CER_DIcost[i],
          Total_CER_AIamount[i],
          Total_CER_AIcost[i],
          Total_CER_DDamount[i],
          Total_CER_DDcost[i],
          Total_CER_amount[i],
          Total_CER_cost[i],
        ]);
      }

      arr.push(["누적"]);

      return arr;
    },

    getBNF_FRData() {
      let arr = [];
      const Year = Array(YEAR).fill(0);
      const Total_FR_DIamount = Array(YEAR).fill(0);
      const Total_FR_DIcost = Array(YEAR).fill(0);
      const Total_FR_AIamount = Array(YEAR).fill(0);
      const Total_FR_AIcost = Array(YEAR).fill(0);
      const Total_FR_DDamount = Array(YEAR).fill(0);
      const Total_FR_DDcost = Array(YEAR).fill(0);
      const Total_FR_amount = Array(YEAR).fill(0);
      const Total_FR_cost = Array(YEAR).fill(0);

      for (let t = 0; t < YEAR; t++) {
        Year[t] = new Date().getFullYear() + t;
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          Total_FR_DIamount[t] =
            Total_FR_DIamount[t] +
            this.ANSDataTemplate.FR_DIcost_byADLY.value[l][t];
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          Total_FR_DIcost[t] =
            Total_FR_DIcost[t] +
            this.ANSDataTemplate.FR_DIcost_byADLY.value[l][t];
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          Total_FR_AIamount[t] =
            Total_FR_AIamount[t] +
            this.ANSDataTemplate.FR_AIamount_byADLY.value[l][t] +
            this.ANSDataTemplate.FR_AI_LDamount_byADLY.value[l][t] +
            this.ANSDataTemplate.FR_AI_Ramount_byADLY.value[l][t];
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          Total_FR_AIcost[t] =
            Total_FR_AIcost[t] +
            this.ANSDataTemplate.FR_AIcost_byADLY.value[l][t] +
            this.ANSDataTemplate.FR_AI_LDcost_byADLY.value[l][t] +
            this.ANSDataTemplate.FR_AI_Rcost_byADLY.value[l][t];
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          Total_FR_DDamount[t] =
            Total_FR_DDamount[t] +
            this.ANSDataTemplate.FR_DDamount_byADLY.value[l][t];
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          Total_FR_DDcost[t] =
            Total_FR_DDcost[t] +
            this.ANSDataTemplate.FR_DDcost_byADLY.value[l][t];
        }
      }

      for (let t = 0; t < YEAR; t++) {
        Total_FR_amount[t] =
          Total_FR_amount[t] +
          Total_FR_DDamount[t] +
          Total_FR_DIamount[t] +
          Total_FR_AIamount[t];
      }

      for (let t = 0; t < YEAR; t++) {
        Total_FR_cost[t] =
          Total_FR_cost[t] +
          Total_FR_DDcost[t] +
          Total_FR_DIcost[t] +
          Total_FR_AIcost[t];
      }

      arr.push([
        "연도",
        "연료소모 절감량(국제선 출발)",
        "연료소모 절감비용(국제선 출발)",
        "연료소모 절감량(국제선 도착)",
        "연료소모 절감비용(국제선 도착)",
        "연료소모 절감량(국내선 출발)",
        "연료소모 절감비용(국내선 출발)",
        "총 연료소모 절감량",
        "총 연료소모 절감비용",
      ]);

      for (let i = 0; i < 30; i++) {
        arr.push([
          Year[i],
          Total_FR_DIamount[i],
          Total_FR_DIcost[i],
          Total_FR_AIamount[i],
          Total_FR_AIcost[i],
          Total_FR_DDamount[i],
          Total_FR_DDcost[i],
          Total_FR_amount[i],
          Total_FR_cost[i],
        ]);
      }

      return arr;
    },

    getBNF_PSGData() {
      let arr = [];
      const Year = Array(YEAR).fill(0);
      const N_Flight = Array(YEAR).fill(0);
      const TL_Dly = Array(YEAR).fill(0);
      const BNF_PSG = Array(YEAR).fill(0);

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
          TL_Dly[t] =
            TL_Dly[t] +
            this.ANSDataTemplate.TL_DD_Dly.value[l][t] +
            this.ANSDataTemplate.TL_DI_Dly.value[l][t] +
            this.ANSDataTemplate.TL_AD_Dly.value[l][t] +
            this.ANSDataTemplate.TL_AI_Dly_LD.value[l][t] +
            this.ANSDataTemplate.TL_AI_Dly_R.value[l][t] +
            this.ANSDataTemplate.TL_AI_Dly.value[l][t] +
            this.ANSDataTemplate.FTR_Pass.value[t];
        }
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          BNF_PSG[t] =
            BNF_PSG[t] +
            this.ANSDataTemplate.BNF_AD_PSG.value[l][t] +
            this.ANSDataTemplate.BNF_AI_PSG.value[l][t];
        }
      }

      arr.push([
        "연도",
        "총 운항편수",
        "지연 감소 시간",
        "지연 감소 여객 편익",
      ]);

      for (let i = 0; i < 30; i++) {
        arr.push([Year[i], N_Flight[i], TL_Dly[i], BNF_PSG[i]]);
      }

      return arr;
    },
  },
};
</script>

<style lang="scss" scoped>
.Container {
  width: 95%;
  height: 60%;
  display: flex;
  gap: 2rem;
  padding: 1rem;
  font-size: 80%;
}
</style>
