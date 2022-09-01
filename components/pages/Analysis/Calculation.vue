<template></template>

<script>
// import ANSDataTemplate from "@/utils/constants/ANSDataTemplate";
// importANSDatabase from "@/utils/constants/ANSDatabase";
import { MAX, N_AC, YEAR } from "@/utils/constants/config";
import { mapState, mapMutations } from "vuex";

export default {
  name: "Calculation",
  data() {
    return {
      // ANSDataTemplate: this.ANSDataTemplate,
    };
  },
  computed: {
    ...mapState("ansData", ["ANSDatabase", "ANSDataTemplate"]),
  },
  created() {
    this.calculateANS();
    this.mutateANSDataTemplate(this.ANSDataTemplate);
  },
  methods: {
    ...mapMutations("ansData", [
      "mutateFilteredANSData",
      "mutateANSDataTemplate",
    ]),
    calculateANS(Cetha = 1.0) {
      var a =
        (Math.log(0.1) -
          Math.log(
            (this.ANSDatabase.FTRgoal_Fin.value * 1.1) /
              this.ANSDatabase.FTRgoal_Start.value -
              Cetha
          )) /
        (this.ANSDatabase.Time_Pass_S.value - Cetha);
      var b =
        Math.log(
          (this.ANSDatabase.FTRgoal_Fin.value * 1.1) /
            this.ANSDatabase.FTRgoal_Start.value -
            Cetha
        ) - a;
      for (let t = 0; t < YEAR; t++) {
        //Flt_Sav 변수(연도별 운함시감 절감률 목표) 추가 정의
        this.ANSDataTemplate.Flt_Sav.value[t] =
          (this.ANSDatabase.FTRgoal_Fin.value * 1.0) /
          (Cetha + Math.exp(b + a * (t + 1))) /
          100.0;
      }

      //시간당 편균 탄소배출량, 연료소모량 계산, 임시 변수 정의

      // 공항별 항공기 기종별 시간당 탄소 배출량, 연료 소모량 기반으로 시간당 산출: 출도착, 항로 구분
      for (let l = 0; l < MAX; l++) {
        // 공항별 시간당 탄소배출량

        let Temp_CA = 0.0,
          Temp_CB = 0.0,
          Temp_CC = 0.0; // 중간 계산용 임시변수

        for (let k = 0; k < N_AC; k++) {
          // N_AC - 항공기 기종 정의, 나머지 인덱스 재 정의
          Temp_CA =
            Temp_CA +
            this.ANSDatabase.FCE_flight.value[l][k] *
              this.ANSDatabase.FU_flight.value[l][k];
          Temp_CB =
            Temp_CB +
            this.ANSDatabase.ACE_TO_flight.value[l][k] *
              this.ANSDatabase.AU_flight.value[l][k];
          Temp_CC =
            Temp_CC +
            this.ANSDatabase.ACE_LD_flight.value[l][k] *
              this.ANSDatabase.AU_flight.value[l][k];
        }
        //공항별 이륙, 착륙, 항로의 시간당 탄소배출량 산출  FCE_hour, ACE_TO_hour, ACE_LD_hour 인덱스 t-> l 공항으로 변경
        this.ANSDataTemplate.FCE_hour.value[l] = Temp_CA / 100.0; // 시간당 항로 탄소배출량
        this.ANSDataTemplate.ACE_TO_hour.value[l] = Temp_CB / 100.0; // 시간당 이륙(출발) 탄소배출량
        this.ANSDataTemplate.ACE_LD_hour.value[l] = Temp_CC / 100.0; // 시간당 착륙(도착) 탄소배출량
      }

      for (let l = 0; l < MAX; l++) {
        // 공항별 시간당 연료소모량

        let Temp_CA = 0.0,
          Temp_CB = 0.0,
          Temp_CC = 0.0; // 중간 계산용 임시변수

        for (let k = 0; k < N_AC; k++) {
          Temp_CA =
            Temp_CA +
            this.ANSDatabase.FFE_flight.value[l][k] *
              this.ANSDatabase.FU_flight.value[l][k];
          Temp_CB =
            Temp_CB +
            this.ANSDatabase.AFE_TO_flight.value[l][k] *
              this.ANSDatabase.AU_flight.value[l][k];
          Temp_CC =
            Temp_CC +
            this.ANSDatabase.AFE_LD_flight.value[l][k] *
              this.ANSDatabase.AU_flight.value[l][k];
        }
        //공항별 이륙, 착륙, 항로의 시간당 연료소모량 산출   FFE_hour, AFE_TO_hour, AFE_LD_hour 인덱스 t-> l 공항으로 변경
        this.ANSDataTemplate.FFE_hour.value[l] = Temp_CA / 100.0; // 시간당 항로 연료소모량
        this.ANSDataTemplate.AFE_TO_hour.value[l] = Temp_CB / 100.0; // 시간당 이륙(출발) 연료소모량
        this.ANSDataTemplate.AFE_LD_hour.value[l] = Temp_CC / 100.0; // 시간당 착륙(도착) 연료소모량
      }

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          this.ANSDataTemplate.N_DD_Flght.value[l][t] =
            this.ANSDatabase.N_DD_F.value *
            Math.pow(1.0 + this.ANSDatabase.r_Dom.value / 100, t);
          this.ANSDataTemplate.N_DI_Flght.value[l][t] =
            this.ANSDatabase.N_DI_F.value *
            Math.pow(1.0 + this.ANSDatabase.r_Int.value / 100, t);
          this.ANSDataTemplate.N_AD_Flght.value[l][t] =
            this.ANSDatabase.N_AD_F.value *
            Math.pow(1.0 + this.ANSDatabase.r_Dom.value / 100, t);
          this.ANSDataTemplate.N_AI_Flght.value[l][t] =
            this.ANSDatabase.N_AI_F.value *
            Math.pow(1.0 + this.ANSDatabase.r_Int.value / 100, t);
        }
      }

      // 공항별, 연도별 총 운항시간 절감 산출 : 국제선, 국내선, 출발, 도착, 항로 구분하여 산출

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          // 운항편당 이륙, 착륙, 항로 감소 시간을 국내선, 국제선으로 구분하여 산출
          this.ANSDataTemplate.FTR_DDgoal.value[l][t] =
            (this.ANSDatabase.Time_DTO.value[l] *
              this.ANSDataTemplate.Flt_Sav.value[t]) /
            60.0; // 국내선 이륙 시간 절감
          this.ANSDataTemplate.FTR_ADgoal.value[l][t] =
            (this.ANSDatabase.Time_DLD.value[l] *
              this.ANSDataTemplate.Flt_Sav.value[t]) /
            60.0; // 국내선 착륙 시간 절감
          this.ANSDataTemplate.FTR_DRgoal.value[l][t] =
            (this.ANSDatabase.Time_DRoute.value[l] *
              this.ANSDataTemplate.Flt_Sav.value[t]) /
            60.0; // 국내선 항로 시간 절감 FTR_RDgoal 추가 정의

          this.ANSDataTemplate.FTR_DIgoal.value[l][t] =
            (this.ANSDatabase.Time_ITO.value[l] *
              this.ANSDataTemplate.Flt_Sav.value[t]) /
            60.0; // 국제선 이륙시간 절감
          this.ANSDataTemplate.FTR_DIRgoal.value[l][t] =
            (this.ANSDatabase.Time_DIRoute.value[l] *
              this.ANSDataTemplate.Flt_Sav.value[t]) /
            60.0; // 국제선 이륙항로 시간 절감, FTR_DRIgoal, Time_DIRoute 추가정의
          this.ANSDataTemplate.FTR_AIgoal.value[l][t] =
            (this.ANSDatabase.Time_ILD.value[l] *
              this.ANSDataTemplate.Flt_Sav.value[t]) /
            60.0; // 국제선 착륙시간 절감
          this.ANSDataTemplate.FTR_AIRgoal.value[l][t] =
            (this.ANSDatabase.Time_AIRoute.value[l] *
              this.ANSDataTemplate.Flt_Sav.value[t]) /
            60.0; // 국제선 착륙항로 시간 절감, FTR_ARIgoal, Time_AIRoute 추가정의

          // 운항편수를 고려한 총운항시간 절감규모 산출하기 : 국내선, 국제선 출발, 국제선 도착으로 구분
          this.ANSDataTemplate.FTR_DDtotal.value[l][t] =
            this.ANSDataTemplate.N_DD_Flght.value[l][t] *
            this.ANSDataTemplate.FTR_DDgoal.value[l][t]; // 국내선 이륙과정 총절감시간 (출발)
          this.ANSDataTemplate.FTR_ADtotal.value[l][t] =
            this.ANSDataTemplate.N_AD_Flght.value[l][t] *
            this.ANSDataTemplate.FTR_ADgoal.value[l][t]; // 국내선 착과정 총절감시간 (도착)
          this.ANSDataTemplate.FTR_DRtotal.value[l][t] =
            ((this.ANSDataTemplate.N_DD_Flght.value[l][t] +
              this.ANSDataTemplate.N_AD_Flght.value[l][t]) /
              2) *
            this.ANSDataTemplate.FTR_DRgoal.value[l][t]; // 국내선 항로과정 총절감시간 FTR_DRtotal 추가정의
          this.ANSDataTemplate.FTR_DItotal.value[l][t] =
            this.ANSDataTemplate.N_DI_Flght.value[l][t] *
            this.ANSDataTemplate.FTR_DIgoal.value[l][t]; // 국제선 이륙과정 총절감시간
          this.ANSDataTemplate.FTR_DIRtotal.value[l][t] =
            this.ANSDataTemplate.N_DI_Flght.value[l][t] *
            this.ANSDataTemplate.FTR_DIRgoal.value[l][t]; // 국제선 이륙-항로과정 총절감시간  FTR_DIRtotal 추가정의
          this.ANSDataTemplate.FTR_AItotal.value[l][t] =
            this.ANSDataTemplate.N_AI_Flght.value[l][t] *
            this.ANSDataTemplate.FTR_AIgoal.value[l][t]; // 국제선 착률과정 총절감시간
          this.ANSDataTemplate.FTR_AIRtotal.value[l][t] =
            this.ANSDataTemplate.N_AI_Flght.value[l][t] *
            this.ANSDataTemplate.FTR_AIRgoal.value[l][t]; // 국제선 착륙-항로과정 총절감시간  FTR_AIRtotal 추가정의
        }
      }

      // 공항별 탄소배출 감축량 산출 : 국내선 출도착, 항로, 국제선 출발, 출발항로, 도착 도착항로 구분하여 연도별 산출

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          this.ANSDataTemplate.CER_DDamount.value[l][t] =
            (this.ANSDataTemplate.ACE_TO_hour.value[l] *
              this.ANSDataTemplate.FTR_DDtotal.value[l][t]) /
            1000.0; // 국내선 출발 총탄소배출량
          this.ANSDataTemplate.CER_ADamount.value[l][t] =
            (this.ANSDataTemplate.ACE_LD_hour.value[l] *
              this.ANSDataTemplate.FTR_ADtotal.value[l][t]) /
            1000.0; // 국내선 착륙 총탄소배출량
          this.ANSDataTemplate.CER_DRamount.value[l][t] =
            (this.ANSDataTemplate.FCE_hour.value[l] *
              this.ANSDataTemplate.FTR_DRtotal.value[l][t]) /
            1000.0; // 국내선 항로 총탄소배출량  CER_DRamount 추가정의

          this.ANSDataTemplate.CER_DIamount.value[l][t] =
            (this.ANSDataTemplate.ACE_TO_hour.value[l] *
              this.ANSDataTemplate.FTR_DItotal.value[l][t]) /
            1000.0; // 국제선 출발 총탄소배출량
          this.ANSDataTemplate.CER_DIRamount.value[l][t] =
            (this.ANSDataTemplate.FCE_hour.value[l] *
              this.ANSDataTemplate.FTR_DIRtotal.value[l][t]) /
            1000.0; // 국제선 출발-항로 총탄소배출량 CER_DIRamount 추가정의
          this.ANSDataTemplate.CER_AIamount.value[l][t] =
            (this.ANSDataTemplate.ACE_LD_hour.value[l] *
              this.ANSDataTemplate.FTR_AItotal.value[l][t]) /
            1000.0; // 국제선 도착 총탄소배출량
          this.ANSDataTemplate.CER_AIRamount.value[l][t] =
            (this.ANSDataTemplate.FCE_hour.value[l] *
              this.ANSDataTemplate.FTR_AIRtotal.value[l][t]) /
            1000.0; // 국제선 도착-항로 총탄소배출량  CER_AIRamount 추가정의
        }
      }

      for (let i = 0; i < YEAR; i++) {
        this.ANSDataTemplate.carbonCredit.value[i] =
          this.ANSDatabase.carbon.value *
          Math.pow(1.0 + this.ANSDatabase.r_carbon.value / 100.0, i); //추가변수
        this.ANSDataTemplate.fuelCredit.value[i] =
          this.ANSDatabase.fuel.value *
          Math.pow(1.0 + this.ANSDatabase.r_fuel.value / 100.0, i);
      }

      // 탄소배출 절감 비용

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          this.ANSDataTemplate.CER_DDcost.value[l][t] =
            (this.ANSDataTemplate.carbonCredit.value[t] *
              this.ANSDataTemplate.CER_DDamount.value[l][t]) /
            1000000.0; // 국내선 출발 총탄소배출 절감비용
          this.ANSDataTemplate.CER_ADcost.value[l][t] =
            (this.ANSDataTemplate.carbonCredit.value[t] *
              this.ANSDataTemplate.CER_ADamount.value[l][t]) /
            1000000.0; // 국내선 착륙 총탄소배출 절감비용
          this.ANSDataTemplate.CER_DRcost.value[l][t] =
            (this.ANSDataTemplate.carbonCredit.value[t] *
              this.ANSDataTemplate.CER_DRamount.value[l][t]) /
            1000000.0; // 국내선 항로 총탄소배출 절감비용  CER_DRcost 추가정의

          this.ANSDataTemplate.CER_DIcost.value[l][t] =
            (this.ANSDataTemplate.carbonCredit.value[t] *
              this.ANSDataTemplate.CER_DIamount.value[l][t]) /
            1000000.0; // 국제선 출발 총탄소배출 절감비용
          this.ANSDataTemplate.CER_DIRcost.value[l][t] =
            (this.ANSDataTemplate.carbonCredit.value[t] *
              this.ANSDataTemplate.CER_DIRamount.value[l][t]) /
            1000000.0; // 국제선 출발-항로 총탄소배출 절감비용  CER_DIRcost[l][t] 추가정의
          this.ANSDataTemplate.CER_AIcost.value[l][t] =
            (this.ANSDataTemplate.carbonCredit.value[t] *
              this.ANSDataTemplate.CER_AIamount.value[l][t]) /
            1000000.0; // 국제선 도착 총탄소배출 절감비용
          this.ANSDataTemplate.CER_AIRcost.value[l][t] =
            (this.ANSDataTemplate.carbonCredit.value[t] *
              this.ANSDataTemplate.CER_AIRamount.value[l][t]) /
            1000000.0; // 국제선 도착-항로 총탄소배출 절감비용   CER_AIRcost  추가정의
        }
      }

      // 공항별 연료절감량 산출 : 국내선 출도착, 항로, 국제선 출발, 출발항로, 도착 도착항로 구분하여 연도별 산출

      //FR_amount(연간 총 연료 절감)
      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          this.ANSDataTemplate.FR_DDamount.value[l][t] =
            (this.ANSDataTemplate.AFE_TO_hour.value[l] *
              this.ANSDataTemplate.FTR_DDtotal.value[l][t]) /
            1000.0; // 국내선 출발 총연료절감량
          this.ANSDataTemplate.FR_ADamount.value[l][t] =
            (this.ANSDataTemplate.AFE_LD_hour.value[l] *
              this.ANSDataTemplate.FTR_ADtotal.value[l][t]) /
            1000.0; // 국내선 착륙 총연료절감량
          this.ANSDataTemplate.FR_DRamount.value[l][t] =
            (this.ANSDataTemplate.FFE_hour.value[l] *
              this.ANSDataTemplate.FTR_DRtotal.value[l][t]) /
            1000.0; // 국내선 항로 총연료절감량  FR_DRamount 추가정의

          this.ANSDataTemplate.FR_DIamount.value[l][t] =
            (this.ANSDataTemplate.AFE_TO_hour.value[l] *
              this.ANSDataTemplate.FTR_DItotal.value[l][t]) /
            1000.0; // 국제선 출발 총연료절감량
          this.ANSDataTemplate.FR_DIRamount.value[l][t] =
            (this.ANSDataTemplate.FFE_hour.value[l] *
              this.ANSDataTemplate.FTR_DIRtotal.value[l][t]) /
            1000.0; // 국제선 출발-항로 총연료절감량 FR_DIRamount 추가정의
          this.ANSDataTemplate.FR_AIamount.value[l][t] =
            (this.ANSDataTemplate.AFE_LD_hour.value[l] *
              this.ANSDataTemplate.FTR_AItotal.value[l][t]) /
            1000.0; // 국제선 도착 총연료절감량
          this.ANSDataTemplate.FR_AIRamount.value[l][t] =
            (this.ANSDataTemplate.FFE_hour.value[l] *
              this.ANSDataTemplate.FTR_AIRtotal.value[l][t]) /
            1000.0; // 국제선 도착-항로 총연료절감량  FR_AIRamount 추가정의
        }
      }

      //FR_cost(연료비용 절감)

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          this.ANSDataTemplate.FR_DDcost.value[l][t] =
            (this.ANSDataTemplate.fuelCredit.value[t] *
              this.ANSDataTemplate.FR_DDamount.value[l][t]) /
            1000000.0; // 국내선 출발 총연료비절감
          this.ANSDataTemplate.FR_ADcost.value[l][t] =
            (this.ANSDataTemplate.fuelCredit.value[t] *
              this.ANSDataTemplate.FR_ADamount.value[l][t]) /
            1000000.0; // 국내선 착륙 총연료비절감
          this.ANSDataTemplate.FR_DRcost.value[l][t] =
            (this.ANSDataTemplate.fuelCredit.value[t] *
              this.ANSDataTemplate.FR_DRamount.value[l][t]) /
            1000000.0; // 국내선 항로 총연료비절감  FR_DRcost 추가정의

          this.ANSDataTemplate.FR_DIcost.value[l][t] =
            (this.ANSDataTemplate.fuelCredit.value[t] *
              this.ANSDataTemplate.FR_DIamount.value[l][t]) /
            1000000.0; // 국제선 출발 총연료비절감
          this.ANSDataTemplate.FR_DIRcost.value[l][t] =
            (this.ANSDataTemplate.fuelCredit.value[t] *
              this.ANSDataTemplate.FR_DIRamount.value[l][t]) /
            1000000.0; // 국제선 출발-항로 총연료비절감  FR_DIRcost[l][t] 추가정의
          this.ANSDataTemplate.FR_AIcost.value[l][t] =
            (this.ANSDataTemplate.fuelCredit.value[t] *
              this.ANSDataTemplate.FR_AIamount.value[l][t]) /
            1000000.0; // 국제선 도착 총연료비절감
          this.ANSDataTemplate.FR_AIRcost.value[l][t] =
            (this.ANSDataTemplate.fuelCredit.value[t] *
              this.ANSDataTemplate.FR_AIRamount.value[l][t]) /
            1000000.0; // 국제선 도착-항로 총연료비절감   FR_AIRcost  추가정의
          console.log(
            this.ANSDataTemplate.FR_DDcost.value[l][t] +
              this.ANSDataTemplate.FR_ADcost.value[l][t] +
              this.ANSDataTemplate.FR_DRcost.value[l][t] +
              this.ANSDataTemplate.FR_DIcost.value[l][t] +
              this.ANSDataTemplate.FR_DIRcost.value[l][t] +
              this.ANSDataTemplate.FR_AIcost.value[l][t] +
              this.ANSDataTemplate.FR_AIRcost.value[l][t]
          );
        }
      }
      for (let i = 0; i < YEAR; i++) {
        this.ANSDataTemplate.OP_DDcost.value[i] =
          this.ANSDatabase.OPR_D.value *
          Math.pow(1.0 + this.ANSDatabase.r_OPcost.value / 100.0, i); //추가변수
        this.ANSDataTemplate.OP_DIcost.value[i] =
          this.ANSDatabase.OPR_I.value *
          Math.pow(1.0 + this.ANSDatabase.r_OPcost.value / 100.0, i);
        this.ANSDataTemplate.OP_ADcost.value[i] =
          this.ANSDatabase.OPR_D.value *
          Math.pow(1.0 + this.ANSDatabase.r_OPcost.value / 100.0, i);
        this.ANSDataTemplate.OP_AIcost.value[i] =
          this.ANSDatabase.OPR_I.value *
          Math.pow(1.0 + this.ANSDatabase.r_OPcost.value / 100.0, i);
      }
      // 공항별 총운항비용 절감 : 국내선, 국제선 출발/도착  OPR_cost
      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          this.ANSDataTemplate.OPR_DDcost.value[l][t] =
            ((this.ANSDataTemplate.FTR_DDtotal.value[l][t] +
              this.ANSDataTemplate.FTR_ADtotal.value[l][t] +
              this.ANSDataTemplate.FTR_DRtotal.value[l][t]) *
              this.ANSDataTemplate.OP_DDcost.value[t]) /
            1000000.0; // 국내선 운항비용 절감
          this.ANSDataTemplate.OPR_DIcost.value[l][t] =
            ((this.ANSDataTemplate.FTR_DItotal.value[l][t] +
              this.ANSDataTemplate.FTR_DIRtotal.value[l][t]) *
              this.ANSDataTemplate.OP_DIcost.value[t]) /
            1000000.0; // 국제선 출발편 운항비용 절감
          this.ANSDataTemplate.OPR_AIcost.value[l][t] =
            ((this.ANSDataTemplate.FTR_AItotal.value[l][t] +
              this.ANSDataTemplate.FTR_AIRtotal.value[l][t]) *
              this.ANSDataTemplate.OP_AIcost.value[t]) /
            1000000.0; // 국제선 도착편 운항비용 절감
        }
      }

      // 지연시간 감소 (정시성 향상) 기대 효과 분석  (여기부터 보완한 것 임!!!!!)

      // 1_지연시간 감소율 목표 계산 : Logistic 모형 적용

      var a =
        (Math.log(0.1) -
          Math.log(
            (this.ANSDatabase.Dlygoal_Fin.value * 1.1) /
              this.ANSDatabase.Dlygoal_Start.value -
              Cetha
          )) /
        (this.ANSDatabase.Time_Pass_S.value - Cetha);
      var b =
        Math.log(
          (this.ANSDatabase.Dlygoal_Fin.value * 1.1) /
            this.ANSDatabase.Dlygoal_Start.value -
            Cetha
        ) - a;

      for (let t = 0; t < YEAR; t++) {
        //Flt_Sav 변수(연도별 운함시감 절감률 목표) 추가 정의
        this.ANSDataTemplate.Dly_Sav.value[t] =
          (this.ANSDatabase.Dlygoal_Fin.value * 1.0) /
          (Cetha + Math.exp(b + a * (t + 1))) /
          100.0;
      }

      // 2_ 공항별 총출발지연 감소시간  (국내선, 국제선은 출발지연은 공항만 고려), 항행원인 비율 고려

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          // 운항편당 출발지연 감소 시간을 국내선, 국제선으로 구분하여 산출
          this.ANSDataTemplate.Avg_DD_Dly.value[l][t] =
            (this.ANSDatabase.Time_DD_Dly.value[l] *
              this.ANSDataTemplate.Dly_Sav.value[t] *
              this.ANSDatabase.DLY_DD_ANSshare.value[l]) /
            (100.0 * 60.0); // 국내선 이륙(공항) 지연시간 절감
          this.ANSDataTemplate.Avg_DI_Dly.value[l][t] =
            (this.ANSDatabase.Time_DI_Dly.value[l] *
              this.ANSDataTemplate.Dly_Sav.value[t] *
              this.ANSDatabase.DLY_DI_ANSshare.value[l]) /
            (100.0 * 60.0); // 국제선 이륙(공항) 지연시간 절감

          // 총출발지연 감소 시간을 국내선, 국제선으로 구분하여 산출
          this.ANSDataTemplate.TL_DD_Dly.value[l][t] =
            this.ANSDataTemplate.N_DD_Flght.value[l][t] *
            this.ANSDataTemplate.Avg_DD_Dly.value[l][t]; // 국내선 총 출발지연시간 절감
          this.ANSDataTemplate.TL_DI_Dly.value[l][t] =
            this.ANSDataTemplate.N_DI_Flght.value[l][t] *
            this.ANSDataTemplate.Avg_DI_Dly.value[l][t]; // 국제선 총 공항 출발지연시간 절감
        }
      }
      // 3_출발 지연 탄소배출/연료 절감량 및 탄소배출/연료 비용 산출 : CER_amount_byDDLY(탄소배출 감축량) FR_amount_byADLY(총 연료 절감)

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          this.ANSDataTemplate.CER_DDamount_byADLY.value[l][t] =
            (this.ANSDataTemplate.ACE_TO_hour.value[l] *
              this.ANSDataTemplate.TL_DD_Dly.value[l][t]) /
            1000.0; // 국내선 총 공항 출발 탄소배출 절감량
          this.ANSDataTemplate.CER_DIamount_byADLY.value[l][t] =
            (this.ANSDataTemplate.ACE_TO_hour.value[l] *
              this.ANSDataTemplate.TL_DI_Dly.value[l][t]) /
            1000.0; // 국제선 총 공항 출발 탄소배출 절감량
          this.ANSDataTemplate.FR_DDamount_byADLY.value[l][t] =
            (this.ANSDataTemplate.AFE_TO_hour.value[l] *
              this.ANSDataTemplate.TL_DD_Dly.value[l][t]) /
            1000.0; // 국내선 총 공항 출발 연료 절감량
          this.ANSDataTemplate.FR_DIamount_byADLY.value[l][t] =
            (this.ANSDataTemplate.AFE_TO_hour.value[l] *
              this.ANSDataTemplate.TL_DI_Dly.value[l][t]) /
            1000.0; // 국제선 총 공항 출발 연료 절감량

          this.ANSDataTemplate.CER_DDcost_byADLY.value[l][t] =
            (this.ANSDataTemplate.carbonCredit.value[t] *
              this.ANSDataTemplate.CER_DDamount_byADLY.value[l][t]) /
            1000000.0; // 국내선 총 공항 출발 탄소배출 절감비용
          this.ANSDataTemplate.CER_DIcost_byADLY.value[l][t] =
            (this.ANSDataTemplate.carbonCredit.value[t] *
              this.ANSDataTemplate.CER_DIamount_byADLY.value[l][t]) /
            1000000.0; // 국제선 총 공항 출발 탄소배출 절감비용
          this.ANSDataTemplate.FR_DDcost_byADLY.value[l][t] =
            (this.ANSDataTemplate.fuelCredit.value[t] *
              this.ANSDataTemplate.FR_DDamount_byADLY.value[l][t]) /
            1000000.0; // 국내선 총 공항 출발 연료 절감비용
          this.ANSDataTemplate.FR_DIcost_byADLY.value[l][t] =
            (this.ANSDataTemplate.fuelCredit.value[t] *
              this.ANSDataTemplate.FR_DIamount_byADLY.value[l][t]) /
            1000000.0; // 국제선 총 공항 출발 연료 절감비용
        }
      }

      // 4_ 공항별 총도착지연 감소시간  (공항, 항로 고려), 항행원인 비율 고려

      for (let l = 0; l < MAX; l++) {
        // l 공항의 국내 공역비행시간 점유율 : 도착(착륙)과정, 항로 과정 비율 구분
        for (let t = 0; t < YEAR; t++) {
          // 운항편당 도착지연 감소 시간을 국내선, 국제선으로 구분하여 산출

          this.ANSDataTemplate.Avg_AD_Dly.value[l][t] =
            (this.ANSDatabase.Time_AD_Dly.value[l] *
              this.ANSDataTemplate.Dly_Sav.value[t] *
              this.ANSDatabase.DLY_AD_ANSshare.value[l]) /
            (100.0 * 60.0); // 국내선 도착 지연감소 시간

          let FIR_Share =
            this.ANSDatabase.Time_AIRoute.value[l] /
            (this.ANSDatabase.Time_AIRoute.value[l] +
              this.ANSDatabase.Time_ILD.value[l]); // 국제선 도착 운항시간중 국내 공역 운항비율
          let FIR_LD_Share =
            this.ANSDatabase.Time_ILD.value[l] /
            (this.ANSDatabase.Time_AIRoute.value[l] +
              this.ANSDatabase.Time_ILD.value[l]); // 국제선 도착 국내 공역 운항 시간 중 착륙과정 비율

          this.ANSDataTemplate.Avg_AI_Dly.value[l][t] =
            (this.ANSDatabase.Time_AI_Dly.value[l] *
              this.ANSDataTemplate.Dly_Sav.value[t] *
              this.ANSDatabase.DLY_AI_ANSshare.value[l]) /
            (100.0 * 60.0); // 국제선 총도착 지연시간 절감(국내공역)
          this.ANSDataTemplate.Avg_AI_Dly_LD.value[l][t] =
            this.ANSDataTemplate.Avg_AI_Dly.value[l][t] * FIR_LD_Share; // 국제선 도착 착륙(공항)과정 지연시간 감소
          this.ANSDataTemplate.Avg_AI_Dly_R.value[l][t] =
            this.ANSDataTemplate.Avg_AI_Dly.value[l][t] * FIR_Share; // 국제선 도착 항로 지연시간 감소

          // 총출발지연 감소 시간을 국내선, 국제선으로 구분하여 산출
          this.ANSDataTemplate.TL_AD_Dly.value[l][t] =
            this.ANSDataTemplate.N_AD_Flght.value[l][t] *
            this.ANSDataTemplate.Avg_AD_Dly.value[l][t]; // 국내선 총 도착 지연시간 절감
          this.ANSDataTemplate.TL_AI_Dly_LD.value[l][t] =
            this.ANSDataTemplate.N_AI_Flght.value[l][t] *
            this.ANSDataTemplate.Avg_AI_Dly_LD.value[l][t]; // 국제선 총 도착 착륙과정 지연시간 절감
          this.ANSDataTemplate.TL_AI_Dly_R.value[l][t] =
            this.ANSDataTemplate.N_AI_Flght.value[l][t] *
            this.ANSDataTemplate.Avg_AI_Dly_R.value[l][t]; // 국제선 총 도착 항로과정 지연시간 절감
          this.ANSDataTemplate.TL_AI_Dly.value[l][t] =
            this.ANSDataTemplate.TL_AI_Dly_LD.value[l][t] +
            this.ANSDataTemplate.TL_AI_Dly_R.value[l][t]; // 국제선 총 도착 지연시간 절감
        }
      }

      // 5_항로 및 도착(착륙)과정 탄소배출 및 연료 감축량 및 절감비용

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          this.ANSDataTemplate.CER_ADamount_byADLY.value[l][t] =
            (this.ANSDataTemplate.ACE_LD_hour.value[l] *
              this.ANSDataTemplate.TL_AD_Dly.value[l][t]) /
            1000.0; // 국내선 총 도착 탄소배출 절감량
          this.ANSDataTemplate.CER_AI_LDamount_byADLY.value[l][t] =
            (this.ANSDataTemplate.ACE_LD_hour.value[l] *
              this.ANSDataTemplate.TL_AI_Dly_LD.value[l][t]) /
            1000.0; // 국제선 총 공항 도착(착륙) 탄소배출 절감량
          this.ANSDataTemplate.CER_AI_Ramount_byADLY.value[l][t] =
            (this.ANSDataTemplate.FCE_hour.value[l] *
              this.ANSDataTemplate.TL_AI_Dly_R.value[l][t]) /
            1000.0; // 국제선 총 도착 항로 탄소배출 절감량
          this.ANSDataTemplate.CER_AIamount_byADLY.value[l][t] =
            this.ANSDataTemplate.CER_AI_LDamount_byADLY.value[l][t] +
            this.ANSDataTemplate.CER_AI_Ramount_byADLY.value[l][t]; // 국제선 총 도착 탄소배출 절감량

          this.ANSDataTemplate.FR_ADamount_byADLY.value[l][t] =
            (this.ANSDataTemplate.AFE_TO_hour.value[l] *
              this.ANSDataTemplate.TL_AD_Dly.value[l][t]) /
            1000.0; // 국내선 총 도착 연료 절감량
          this.ANSDataTemplate.FR_AI_LDamount_byADLY.value[l][t] =
            (this.ANSDataTemplate.AFE_TO_hour.value[l] *
              this.ANSDataTemplate.TL_AI_Dly_LD.value[l][t]) /
            1000.0; // 국제선 총 공항 도착(착륙) 연료 절감량
          this.ANSDataTemplate.FR_AI_Ramount_byADLY.value[l][t] =
            (this.ANSDataTemplate.FFE_hour.value[l] *
              this.ANSDataTemplate.TL_AI_Dly_R.value[l][t]) /
            1000.0; // 국제선 총 도착 항로 연료 절감량
          this.ANSDataTemplate.FR_AIamount_byADLY.value[l][t] =
            this.ANSDataTemplate.FR_AI_LDamount_byADLY.value[l][t] +
            this.ANSDataTemplate.FR_AI_Ramount_byADLY.value[l][t]; // 국제선 총 도착 연료 절감량

          this.ANSDataTemplate.CER_ADcost_byADLY.value[l][t] =
            (this.ANSDataTemplate.carbonCredit.value[t] *
              this.ANSDataTemplate.CER_ADamount_byADLY.value[l][t]) /
            1000000.0; // 국내선 총 공항 도착 탄소배출 절감비용
          this.ANSDataTemplate.CER_AI_LDcost_byADLY.value[l][t] =
            (this.ANSDataTemplate.carbonCredit.value[t] *
              this.ANSDataTemplate.CER_AI_LDamount_byADLY.value[l][t]) /
            1000000.0; // 국제선 총 공항 도착(착륙) 탄소배출 절감비용
          this.ANSDataTemplate.CER_AI_Rcost_byADLY.value[l][t] =
            (this.ANSDataTemplate.carbonCredit.value[t] *
              this.ANSDataTemplate.CER_AI_Ramount_byADLY.value[l][t]) /
            1000000.0; // 국제선 총 도착 항로 탄소배출 절감비용
          this.ANSDataTemplate.CER_AIcost_byADLY.value[l][t] =
            this.ANSDataTemplate.CER_AI_LDcost_byADLY.value[l][t] +
            this.ANSDataTemplate.CER_AI_Rcost_byADLY.value[l][t]; // 국제선 총 도착 탄소배출 절감비용

          this.ANSDataTemplate.FR_ADcost_byADLY.value[l][t] =
            (this.ANSDataTemplate.fuelCredit.value[t] *
              this.ANSDataTemplate.FR_ADamount_byADLY.value[l][t]) /
            1000000.0; // 국내선 총 공항 도착 연료 절감비용
          this.ANSDataTemplate.FR_AI_LDcost_byADLY.value[l][t] =
            (this.ANSDataTemplate.fuelCredit.value[t] *
              this.ANSDataTemplate.FR_AI_LDamount_byADLY.value[l][t]) /
            1000000.0; // 국제선 총 공항 도착 연료 절감비용
          this.ANSDataTemplate.FR_AI_Rcost_byADLY.value[l][t] =
            (this.ANSDataTemplate.fuelCredit.value[t] *
              this.ANSDataTemplate.FR_AI_Ramount_byADLY.value[l][t]) /
            1000000.0; // 국제선 총 공항 도착 연료 절감비용
          this.ANSDataTemplate.FR_AIcost_byADLY.value[l][t] =
            this.ANSDataTemplate.FR_AI_LDcost_byADLY.value[l][t] +
            this.ANSDataTemplate.FR_AI_Rcost_byADLY.value[l][t]; // 국제선 총 도착 연료 절감비용
        }
      }

      // 6_운항비용 절감 : 국내선 총도착지연, 국제선 : 도착항로+착륙 지연, 출발은 이륙지연 만 고려 : OPR_cost(운항비용 절감 편익)

      for (let l = 0; l < MAX; l++) {
        //연료비 제외하는 것 추가 검토
        for (let t = 0; t < YEAR; t++) {
          this.ANSDataTemplate.OPR_ADcost_DLY.value[l][t] =
            (this.ANSDataTemplate.TL_AD_Dly.value[l][t] *
              this.ANSDataTemplate.OP_DDcost.value[t]) /
            1000000.0; // 국내선 지연감소 운항비 절감
          this.ANSDataTemplate.OPR_DIcost_DLY.value[l][t] =
            (this.ANSDataTemplate.TL_DI_Dly.value[l][t] *
              this.ANSDataTemplate.OP_DIcost.value[t]) /
            1000000.0; // 국제선 출발지연 감소 운항비 절감
          this.ANSDataTemplate.OPR_AIcost_DLY.value[l][t] =
            (this.ANSDataTemplate.TL_AI_Dly.value[l][t] *
              this.ANSDataTemplate.OP_AIcost.value[t]) /
            1000000.0; // 국제선 도착지연 감소 운항비 절감
        }
      }

      // 7_지연시간 감소에 대한 여객 및 화물편익 BNF_PSG(여객 편익, BNF_CRG(화물 편익) 고객 편익은 도착지연만 고려함

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          this.ANSDataTemplate.BNF_AD_PSG.value[l][t] =
            (this.ANSDatabase.PSG_AD.value[l] *
              this.ANSDataTemplate.TL_AD_Dly.value[l][t] *
              this.ANSDatabase.DLY_AD_cost_PSG.value[l]) /
            1000000.0; // 국내선 도착지연 감소편익(여객)
          this.ANSDataTemplate.BNF_AI_PSG.value[l][t] =
            (this.ANSDatabase.PSG_AI.value[l] *
              this.ANSDataTemplate.TL_AI_Dly.value[l][t] *
              this.ANSDatabase.DLY_AI_cost_PSG.value[l]) /
            1000000.0; // 국제선 도착지연 감소편익(여객)

          // BNF_AD_CRG[l][t] = CRG_AD[l][t] * TL_AD_Dly[l][t](화물) * DLY_AD_cost_CRG[l][t];   // 국내선 도착지연 감소편익(화물) 2차
          // BNF_AI_CRG[l][t] = CRG_AI[l][t] * TL_AI_Dly[l][t](화물) * DLY_AI_cost_CRG[l][t];   // 국내선 도착지연 감소편익(화물) 2차
        }
      }

      // 8_영공통과 운항시간 절감 효과 (공항별 효과에서는 분석 제외)

      // 운항시간 절감률 목표 계산 : Logistic 모형 적용 - 운항시간 절감 계수 동일하게 사용

      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          this.ANSDataTemplate.N_Pass_Flght.value[t] =
            this.ANSDatabase.N_Pass_F.value[l] *
            Math.pow(1.0 + this.ANSDatabase.r_Pass.value / 100.0, t); // 총 영공통과 항공편수 //추가변수
        }
      }
      for (let l = 0; l < MAX; l++) {
        for (let t = 0; t < YEAR; t++) {
          this.ANSDataTemplate.Time_Pass.value[t] =
            this.ANSDataTemplate.Flt_Sav.value[t] *
            this.ANSDatabase.Time_Pass_S.value; // 영공통과 시간 절감
          this.ANSDataTemplate.FTR_Pass.value[t] =
            (this.ANSDataTemplate.N_Pass_Flght.value[t] *
              this.ANSDataTemplate.Time_Pass.value[t]) /
            60.0; // 총 영공통과 운항시간 절감

          this.ANSDataTemplate.CER_amount_byAFT.value[t] =
            (this.ANSDataTemplate.FCE_hour.value[l] *
              this.ANSDataTemplate.FTR_Pass.value[t]) /
            1000.0; // 총 영공통과 탄소배출 감소
          this.ANSDataTemplate.CER_cost_byAFT.value[t] =
            (this.ANSDataTemplate.carbonCredit.value[t] *
              this.ANSDataTemplate.CER_amount_byAFT.value[t]) /
            1000000.0; // 총 영공통과 탄소배출 비용 감소

          this.ANSDataTemplate.FR_amount_byAFT.value[t] =
            (this.ANSDataTemplate.FFE_hour.value[l] *
              this.ANSDataTemplate.FTR_Pass.value[t]) /
            1000.0; // 총 영공통과 연료소모 감소
          this.ANSDataTemplate.FR_cost_byAFT.value[t] =
            (this.ANSDataTemplate.fuelCredit.value[t] *
              this.ANSDataTemplate.FR_amount_byAFT.value[t]) /
            1000000.0; // 총 영공통과 연료비 절감}
        }
      }
      var a =
        (Math.log(0.1) -
          Math.log(
            (this.ANSDatabase.Safty_Fin.value * 1.1) /
              this.ANSDatabase.Safty_Start.value -
              Cetha
          )) /
        (this.ANSDatabase.Time_Pass_S.value - Cetha);
      var b =
        Math.log(
          (this.ANSDatabase.Safty_Fin.value * 1.1) /
            this.ANSDatabase.Safty_Start.value -
            Cetha
        ) - a;
      for (let t = 0; t < YEAR; t++) {
        // 연도별 안전사고 절감률 목표
        this.ANSDataTemplate.Safty_Sav.value[t] =
          (this.ANSDatabase.Safty_Fin.value * 1.0) /
          (1.0 + Math.exp(b + a * (t + 1))) /
          100.0;
        this.ANSDataTemplate.Safty_cost.value[t] =
          this.ANSDatabase.N_Safty.value *
          this.ANSDataTemplate.Safty_Sav.value[t] *
          this.ANSDatabase.Safty_cost_M.value;
      }
    },
  },
};
</script>

<style></style>
