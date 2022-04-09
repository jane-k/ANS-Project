import { MAX, YEAR } from "./config";

const ANSDataTemplate = {
  Flt_Sav: {
    type: "-",
    variable: "Flt_Sav",
    label: "연도별 운항시간 목표 절감율",
    value: Array(MAX).fill(0),
  },
  FTR_DDtotal: {
    type: "-",
    variable: "FTR_DDtotal",
    label: "총 국내선 이륙과정 절감시간",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  FTR_DItotal: {
    type: "-",
    variable: "FTR_DItotal",
    label: "총 국제선 이륙과정 절감시간",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  FTR_ADtotal: {
    type: "-",
    variable: "FTR_ADtotal",
    label: "총 국내선 착륙과정 절감시간",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  FTR_AItotal: {
    type: "-",
    variable: "FTR_AItotal",
    label: "총 국제선 착륙과정 절감시간",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  FTR_DRtotal: {
    type: "-",
    variable: "FTR_DRtotal",
    label: "총 국내선 항로과정 절감시간",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  FTR_DIRtotal: {
    type: "-",
    variable: "FTR_DIRtotal",
    label: "총 국제선 이륙-항로과정 절감시간",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  FTR_AIRtotal: {
    type: "-",
    variable: "FTR_AIRtotal",
    label: "총 국제선 착륙-항로과정 절감시간",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  CER_DDamount: {
    type: "-",
    variable: "CER_DDamount",
    label: "총 국내선 이륙과정 탄소배출 절감량",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  CER_DIamount: {
    type: "-",
    variable: "CER_DIamount",
    label: "총 국제선 이륙과정 탄소배출 절감량",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  CER_ADamount: {
    type: "-",
    variable: "CER_ADamount",
    label: "총 국내선 착륙과정 탄소배출 절감량",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  CER_AIamount: {
    type: "-",
    variable: "CER_AIamount",
    label: "총 국제선 착륙과정 탄소배출 절감량",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  CER_DRamount: {
    type: "-",
    variable: "CER_DRamount",
    label: "총 국내선 항로과정 탄소배출 절감량",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  CER_DIRamount: {
    type: "-",
    variable: "CER_DIRamount",
    label: "총 국제선 이륙-항로과정 탄소배출 절감량",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  CER_AIRamount: {
    type: "-",
    variable: "CER_AIRamount",
    label: "총 국제선 착륙-항로과정 탄소배출 절감량",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  CER_DDcost: {
    type: "-",
    variable: "CER_DDcost",
    label: "총 국내선 이륙과정 탄소배출 절감비용",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  CER_DIcost: {
    type: "-",
    variable: "CER_DIcost",
    label: "총 국제선 이륙과정 탄소배출 절감비용",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  CER_ADcost: {
    type: "-",
    variable: "CER_ADcost",
    label: "총 국내선 착륙과정 탄소배출 절감비용",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  CER_AIcost: {
    type: "-",
    variable: "CER_AIcost",
    label: "총 국제선 착륙과정 탄소배출 절감비용",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  CER_DRcost: {
    type: "-",
    variable: "CER_DRcost",
    label: "총 국내선 항로과정 탄소배출 절감비용",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  CER_DIRcost: {
    type: "-",
    variable: "CER_DIRcost",
    label: "총 국제선 이륙-항로과정 탄소배출 절감비용",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  CER_AIRcost: {
    type: "-",
    variable: "CER_AIRcost",
    label: "총 국제선 착륙-항로과정 탄소배출 절감비용",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  FR_DDamount: {
    type: "-",
    variable: "FR_DDamount",
    label: "총 국내선 이륙과정 연료 절감량",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  FR_DIamount: {
    type: "-",
    variable: "FR_DIamount",
    label: "총 국제선 이륙과정 연료 절감량",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  FR_ADamount: {
    type: "-",
    variable: "FR_ADamount",
    label: "총 국내선 착륙과정 연료 절감량",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  FR_AIamount: {
    type: "-",
    variable: "FR_AIamount",
    label: "총 국제선 착륙과정 연료 절감량",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  FR_DRamount: {
    type: "-",
    variable: "FR_DRamount",
    label: "총 국내선 항로과정 연료 절감량",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  FR_DIRamount: {
    type: "-",
    variable: "FR_DIRamount",
    label: "총 국제선 이륙-항로과정 연료 절감량",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  FR_AIRamount: {
    type: "-",
    variable: "FR_AIRamount",
    label: "총 국제선 착륙-항로과정 연료 절감량",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  FR_DDcost: {
    type: "-",
    variable: "FR_DDcost",
    label: "총 국내선 이륙과정 연료 절감비용",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  FR_DIcost: {
    type: "-",
    variable: "FR_DIcost",
    label: "총 국제선 이륙과정 연료 절감비용",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  FR_ADcost: {
    type: "-",
    variable: "FR_ADcost",
    label: "총 국내선 착륙과정 연료 절감비용",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  FR_AIcost: {
    type: "-",
    variable: "FR_AIcost",
    label: "총 국제선 착륙과정 연료 절감비용",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  FR_DRcost: {
    type: "-",
    variable: "FR_DRcost",
    label: "총 국내선 항로과정 연료 절감비용",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  FR_DIRcost: {
    type: "-",
    variable: "FR_DIRcost",
    label: "총 국제선 이륙-항로과정 연료 절감비용",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  FR_AIRcost: {
    type: "-",
    variable: "FR_AIRcost",
    label: "총 국제선 착륙-항로과정 연료 절감비용",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  OPR_DDcost: {
    type: "-",
    variable: "OPR_DDcost",
    label: "총 국내선 이륙과정 운항 절감비용",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  OPR_DIcost: {
    type: "-",
    variable: "OPR_DIcost",
    label: "총 국제선 이륙과정 운항 절감비용",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  OPR_ADcost: {
    type: "-",
    variable: "OPR_ADcost",
    label: "총 국내선 착륙과정 운항 절감비용",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  OPR_AIcost_DLY: {
    type: "-",
    variable: "OPR_AIcost_DLY",
    label: "총 국내선 이륙과정 운항 절감비용",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },

  OPR_DIcost_DLY: {
    type: "-",
    variable: "OPR_DIcost_DLY",
    label: "총 국제선 이륙과정 운항 절감비용",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  OPR_ADcost_DLY: {
    type: "-",
    variable: "OPR_ADcost_DLY",
    label: "총 국내선 착륙과정 운항 절감비용",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  TL_DD_Dly: {
    type: "ASSUMPTION",
    variable: "TL_DD_Dly",
    label: "총 국내선 이륙과정 지연 절감시간",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  TL_DI_Dly: {
    type: "ASSUMPTION",
    variable: "TL_DI_Dly",
    label: "총 국제선 이륙과정 지연 절감시간",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  CER_DDamount_byADLY: {
    type: "-",
    variable: "CER_DDamount_byADLY",
    label: "총 국내선 출발과정 탄소배출 절감량(지연시간 감소)",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  CER_DIamount_byADLY: {
    type: "-",
    variable: "CER_DIamount_byADLY",
    label: "총 국제선 출발과정 탄소배출 절감량(지연시간 감소)",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  FR_DDamount_byADLY: {
    type: "-",
    variable: "FR_DDamount_byADLY",
    label: "총 국내선 출발과정 연료 절감량(지연시간 감소)",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  FR_DIamount_byADLY: {
    type: "-",
    variable: "FR_DIamount_byADLY",
    label: "총 국제선 출발과정 연료 절감량(지연시간 감소)",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  CER_DDcost_byADLY: {
    type: "-",
    variable: "CER_DDcost_byADLY",
    label: "총 국내선 출발과정 탄소배출 절감비용(지연시간 감소)",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  CER_DIcost_byADLY: {
    type: "-",
    variable: "CER_DIcost_byADLY",
    label: "총 국제선 출발과정 탄소배출 절감비용(지연시간 감소)",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  FR_DDcost_byADLY: {
    type: "-",
    variable: "FR_DDcost_byADLY",
    label: "총 국내선 출발과정 연료 절감비용(지연시간 감소)",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  FR_DIcost_byADLY: {
    type: "-",
    variable: "FR_DIcost_byADLY",
    label: "총 국제선 출발과정 연료 절감비용(지연시간 감소)",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  TL_AD_Dly: {
    type: "ASSUMPTION",
    variable: "TL_AD_Dly",
    label: "총 국내선 도착과정 지연 절감시간",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  TL_AI_Dly: {
    type: "ASSUMPTION",
    variable: "TL_AI_Dly",
    label: "총 국제선 도착과정 지연 절감시간",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  TL_AI_Dly_LD: {
    type: "ASSUMPTION",
    variable: "TL_AI_Dly_LD",
    label: "총 국제선 도착 착륙과정 지연 절감시간",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  TL_AI_Dly_R: {
    type: "ASSUMPTION",
    variable: "TL_AI_Dly_R",
    label: "총 국제선 도착 항로과정 지연 절감시간",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  CER_ADamount_byADLY: {
    type: "-",
    variable: "CER_ADamount_byADLY",
    label: "총 국내선 도착과정 탄소배출 절감량(지연시간 감소)",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  CER_AIamount_byADLY: {
    type: "-",
    variable: "CER_AIamount_byADLY",
    label: "총 국제선 도착과정 탄소배출 절감량(지연시간 감소)",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  CER_AI_Ramount_byADLY: {
    type: "-",
    variable: "CER_AI_Ramount_byADLY",
    label: "총 국내선 도착 항로과정 탄소배출 절감량(지연시간 감소)",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  CER_AI_LDamount_byADLY: {
    type: "-",
    variable: "CER_AI_LDamount_byADLY",
    label: "총 국제선 도착 착륙과정 탄소배출 절감량(지연시간 감소)",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  FR_ADamount_byADLY: {
    type: "-",
    variable: "FR_ADamount_byADLY",
    label: "총 국내선 착륙과정 연료 절감량(지연시간 감소)",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  FR_AIamount_byADLY: {
    type: "-",
    variable: "FR_AIamount_byADLY",
    label: "총 국제선 착륙과정 연료 절감량(지연시간 감소)",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  FR_AI_LDamount_byADLY: {
    type: "-",
    variable: "FR_AI_LDamount_byADLY",
    label: "총 국내선 도착 착륙과정 연료 절감량(지연시간 감소)",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  FR_AI_Ramount_byADLY: {
    type: "-",
    variable: "FR_AI_Ramount_byADLY",
    label: "총 국제선 도착 항로과정 연료 절감량(지연시간 감소)",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  CER_ADcost_byADLY: {
    type: "-",
    variable: "CER_ADcost_byADLY",
    label: "총 국내선 도착과정 탄소배출 절감량(지연시간 감소)",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  CER_AIcost_byADLY: {
    type: "-",
    variable: "CER_AIcost_byADLY",
    label: "총 국제선 도착과정 탄소배출 절감량(지연시간 감소)",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  CER_AI_Rcost_byADLY: {
    type: "-",
    variable: "CER_AI_Rcost_byADLY",
    label: "총 국내선 도착 항로과정 탄소배출 절감량(지연시간 감소)",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  CER_AI_LDcost_byADLY: {
    type: "-",
    variable: "CER_AI_LDcost_byADLY",
    label: "총 국제선 도착 착륙과정 탄소배출 절감량(지연시간 감소)",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  FR_ADcost_byADLY: {
    type: "-",
    variable: "FR_ADcost_byADLY",
    label: "총 국내선 착륙과정 연료 절감량(지연시간 감소)",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  FR_AIcost_byADLY: {
    type: "-",
    variable: "FR_AIcost_byADLY",
    label: "총 국제선 착륙과정 연료 절감량(지연시간 감소)",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  FR_AI_LDcost_byADLY: {
    type: "-",
    variable: "FR_AI_LDcost_byADLY",
    label: "총 국내선 도착 착륙과정 연료 절감량(지연시간 감소)",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  FR_AI_Rcost_byADLY: {
    type: "-",
    variable: "FR_AI_Rcost_byADLY",
    label: "총 국제선 도착 항로과정 연료 절감량(지연시간 감소)",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  BNF_AD_PSG: {
    type: "-",
    variable: "BNF_AD_PSG",
    label: "국내선 도착 지연시간 감소편익",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  BNF_AI_PSG: {
    type: "-",
    variable: "BNF_AI_PSG",
    label: "국제선 도착 지연시간 감소편익",
    value: Array(MAX).fill(Array(YEAR).fill(0)),
  },
  CER_amount_byAFT: {
    type: "-",
    variable: "CER_amount_byAFT",
    label: "총 영공 통과 탄소배출 절감량",
    value: Array(MAX).fill(0),
  },
  FR_amount_byAFT: {
    type: "-",
    variable: "FR_amount_byAFT",
    label: "총 영공 통과 연료 절감량",
    value: Array(MAX).fill(0),
  },
  CER_cost_byAFT: {
    type: "-",
    variable: "CER_cost_byAFT",
    label: "총 영공 통과 탄소배출 절감비용",
    value: Array(MAX).fill(0),
  },
  FR_cost_byAFT: {
    type: "-",
    variable: "FR_cost_byAFT",
    label: "총 영공 통과 연료 절감비용",
    value: Array(MAX).fill(0),
  },
};

export default ANSDataTemplate;