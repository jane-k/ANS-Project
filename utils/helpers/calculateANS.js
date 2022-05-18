import { MAX, N_AC, YEAR } from "../constants/config";
import ANSDataTemplate from "../constants/ANSDataTemplate";
import ANSDatabase from "../constants/ANSDatabase";

const calculateANS = (Cetha) => {
  // console.log(ANSANSDatabase)
  var a =
    (Math.log(0.1) -
      Math.log(
        (ANSDatabase.FTRgoal_Start.value * 1.1) /
        ANSDatabase.FTRgoal_Fin.value -
        Cetha
      )) /
    (ANSDatabase.Time_Pass_S.value - Cetha);
  var b =
    Math.log(
      (ANSDatabase.FTRgoal_Start.value * 1.1) / ANSDatabase.FTRgoal_Fin.value -
      Cetha
    ) - a;

  for (let t = 0; t < YEAR; t++) {
    //Flt_Sav 변수(연도별 운함시감 절감률 목표) 추가 정의
    ANSDataTemplate.Flt_Sav.value[t] =
      (ANSDatabase.FTRgoal_Fin.value * 1.0) /
      (Cetha + Math.exp(b + a * (t + 1))) /
      100.0;
  }

  //시간당 편균 탄소배출량, 연료소모량 계산, 임시 변수 정의

  // 공항별 항공기 기종별 시간당 탄소 배출량, 연료 소모량 기반으로 시간당 산출: 출도착, 항로 구분
  for (let l = 0; l < N_AC; l++) {
    // 공항별 시간당 탄소배출량

    let Temp_CA = 0.0,
      Temp_CB = 0.0,
      Temp_CC = 0.0; // 중간 계산용 임시변수

    for (let k = 0; k < YEAR; k++) {
      // N_AC - 항공기 기종 정의, 나머지 인덱스 재 정의
      Temp_CA =
        Temp_CA +
        ANSDatabase.FCE_flight.value[l][k] * ANSDatabase.FU_flight.value[l][k];
      Temp_CB =
        Temp_CB +
        ANSDatabase.ACE_TO_flight.value[l][k] *
        ANSDatabase.AU_flight.value[l][k];
      Temp_CC =
        Temp_CC +
        ANSDatabase.ACE_LD_flight.value[l][k] *
        ANSDatabase.AU_flight.value[l][k];
    }
    //공항별 이륙, 착륙, 항로의 시간당 탄소배출량 산출  FCE_hour, ACE_TO_hour, ACE_LD_hour 인덱스 t-> l 공항으로 변경
    ANSDataTemplate.FCE_hour.value[l] = Temp_CA / 100.0; // 시간당 항로 탄소배출량
    ANSDataTemplate.ACE_TO_hour.value[l] = Temp_CB / 100.0; // 시간당 이륙(출발) 탄소배출량
    ANSDataTemplate.ACE_LD_hour.value[l] = Temp_CC / 100.0; // 시간당 착륙(도착) 탄소배출량
  }

  for (let l = 0; l < MAX; l++) {
    // 공항별 시간당 연료소모량

    let Temp_CA = 0.0,
      Temp_CB = 0.0,
      Temp_CC = 0.0; // 중간 계산용 임시변수

    for (let k = 0; k < N_AC; k++) {
      Temp_CA =
        Temp_CA +
        ANSDatabase.FFE_flight.value[l][k] * ANSDatabase.FU_flight.value[l][k];
      Temp_CB =
        Temp_CB +
        ANSDatabase.AFE_TO_flight.value[l][k] *
        ANSDatabase.AU_flight.value[l][k];
      Temp_CC =
        Temp_CC +
        ANSDatabase.AFE_LD_flight.value[l][k] *
        ANSDatabase.AU_flight.value[l][k];
    }
    //공항별 이륙, 착륙, 항로의 시간당 연료소모량 산출   FFE_hour, AFE_TO_hour, AFE_LD_hour 인덱스 t-> l 공항으로 변경
    ANSDataTemplate.FFE_hour.value[l] = Temp_CA / 100.0; // 시간당 항로 연료소모량
    ANSDataTemplate.AFE_TO_hour.value[l] = Temp_CB / 100.0; // 시간당 이륙(출발) 연료소모량
    ANSDataTemplate.AFE_LD_hour.value[l] = Temp_CC / 100.0; // 시간당 착륙(도착) 연료소모량
  }

  for (let l = 0; l < MAX; l++) {
    for (let t = 0; t < YEAR; t++) {
      ANSDataTemplate.N_DD_Flght.value[l][t] =
        ANSDatabase.N_DD_F.value *
        Math.pow(1.0 + ANSDatabase.r_Dom.value / 100, t);
      ANSDataTemplate.N_DI_Flght.value[l][t] =
        ANSDatabase.N_DI_F.value *
        Math.pow(1.0 + ANSDatabase.r_Int.value / 100, t);
      ANSDataTemplate.N_AD_Flght.value[l][t] =
        ANSDatabase.N_AD_F.value *
        Math.pow(1.0 + ANSDatabase.r_Dom.value / 100, t);
      ANSDataTemplate.N_AI_Flght.value[l][t] =
        ANSDatabase.N_AI_F.value *
        Math.pow(1.0 + ANSDatabase.r_Int.value / 100, t);
    }
  }

  // 공항별, 연도별 총 운항시간 절감 산출 : 국제선, 국내선, 출발, 도착, 항로 구분하여 산출

  for (let l = 0; l < MAX; l++) {
    for (let t = 0; t < YEAR; t++) {
      // 운항편당 이륙, 착륙, 항로 감소 시간을 국내선, 국제선으로 구분하여 산출
      ANSDataTemplate.FTR_DDgoal.value[l][t] =
        (ANSDatabase.Time_DTO.value[l] * ANSDataTemplate.Flt_Sav.value[t]) /
        60.0; // 국내선 이륙 시간 절감
      ANSDataTemplate.FTR_ADgoal.value[l][t] =
        (ANSDatabase.Time_DLD.value[l] * ANSDataTemplate.Flt_Sav.value[t]) /
        60.0; // 국내선 착륙 시간 절감
      ANSDataTemplate.FTR_DRgoal.value[l][t] =
        (ANSDatabase.Time_DRoute.value[l] * ANSDataTemplate.Flt_Sav.value[t]) /
        60.0; // 국내선 항로 시간 절감 FTR_RDgoal 추가 정의

      ANSDataTemplate.FTR_DIgoal.value[l][t] =
        (ANSDatabase.Time_ITO.value[l] * ANSDataTemplate.Flt_Sav.value[t]) /
        60.0; // 국제선 이륙시간 절감
      ANSDataTemplate.FTR_DIRgoal.value[l][t] =
        (ANSDatabase.Time_DIRoute.value[l] * ANSDataTemplate.Flt_Sav.value[t]) /
        60.0; // 국제선 이륙항로 시간 절감, FTR_DRIgoal, Time_DIRoute 추가정의
      ANSDataTemplate.FTR_AIgoal.value[l][t] =
        (ANSDatabase.Time_ILD.value[l] * ANSDataTemplate.Flt_Sav.value[t]) /
        60.0; // 국제선 착륙시간 절감
      ANSDataTemplate.FTR_AIRgoal.value[l][t] =
        (ANSDatabase.Time_AIRoute.value[l] * ANSDataTemplate.Flt_Sav.value[t]) /
        60.0; // 국제선 착륙항로 시간 절감, FTR_ARIgoal, Time_AIRoute 추가정의

      // 운항편수를 고려한 총운항시간 절감규모 산출하기 : 국내선, 국제선 출발, 국제선 도착으로 구분
      ANSDataTemplate.FTR_DDtotal.value[l][t] =
        ANSDatabase.N_DD_Flght.value[l][t] *
        ANSDataTemplate.FTR_DDgoal.value[l][t]; // 국내선 이륙과정 총절감시간 (출발)
      ANSDataTemplate.FTR_ADtotal.value[l][t] =
        ANSDatabase.N_AD_Flght.value[l][t] *
        ANSDataTemplate.FTR_ADgoal.value[l][t]; // 국내선 착과정 총절감시간 (도착)
      ANSDataTemplate.FTR_DRtotal.value[l][t] =
        ((ANSDatabase.N_DD_Flght.value[l][t] +
          ANSDatabase.N_AD_Flght.value[l][t]) /
          2) *
        ANSDataTemplate.FTR_DDgoal.value[l][t]; // 국내선 항로과정 총절감시간 FTR_DRtotal 추가정의
      ANSDataTemplate.FTR_DItotal.value[l][t] =
        ANSDatabase.N_DI_Flght.value[l][t] *
        ANSDataTemplate.FTR_DIgoal.value[l][t]; // 국제선 이륙과정 총절감시간
      ANSDataTemplate.FTR_DIRtotal.value[l][t] =
        ANSDatabase.N_DI_Flght.value[l][t] *
        ANSDataTemplate.FTR_DIRgoal.value[l][t]; // 국제선 이륙-항로과정 총절감시간  FTR_DIRtotal 추가정의
      ANSDataTemplate.FTR_AItotal.value[l][t] =
        ANSDatabase.N_AI_Flght.value[l][t] *
        ANSDataTemplate.FTR_AIgoal.value[l][t]; // 국제선 착률과정 총절감시간
      ANSDataTemplate.FTR_AIRtotal.value[l][t] =
        ANSDatabase.N_DI_Flght.value[l][t] *
        ANSDataTemplate.FTR_AIRgoal.value[l][t]; // 국제선 착륙-항로과정 총절감시간  FTR_AIRtotal 추가정의
    }
  }

  // 공항별 탄소배출 감축량 산출 : 국내선 출도착, 항로, 국제선 출발, 출발항로, 도착 도착항로 구분하여 연도별 산출

  for (let l = 0; l < MAX; l++) {
    for (let t = 0; t < YEAR; t++) {
      ANSDataTemplate.CER_DDamount.value[l][t] =
        (ANSDataTemplate.ACE_TO_hour.value[l] *
          ANSDataTemplate.FTR_DDtotal.value[l][t]) /
        1000.0; // 국내선 출발 총탄소배출량
      ANSDataTemplate.CER_ADamount.value[l][t] =
        (ANSDataTemplate.ACE_LD_hour.value[l] *
          ANSDataTemplate.FTR_ADtotal.value[l][t]) /
        1000.0; // 국내선 착륙 총탄소배출량
      ANSDataTemplate.CER_DRamount.value[l][t] =
        (ANSDataTemplate.FCE_hour.value[l] *
          ANSDataTemplate.FTR_DRtotal.value[l][t]) /
        1000.0; // 국내선 항로 총탄소배출량  CER_DRamount 추가정의

      ANSDataTemplate.CER_DIamount.value[l][t] =
        (ANSDataTemplate.ACE_TO_hour.value[l] *
          ANSDataTemplate.FTR_DItotal.value[l][t]) /
        1000.0; // 국제선 출발 총탄소배출량
      ANSDataTemplate.CER_DIRamount.value[l][t] =
        (ANSDataTemplate.FCE_hour.value[l] *
          ANSDataTemplate.FTR_DIRtotal.value[l][t]) /
        1000.0; // 국제선 출발-항로 총탄소배출량 CER_DIRamount 추가정의
      ANSDataTemplate.CER_AIamount.value[l][t] =
        (ANSDataTemplate.ACE_LD_hour.value[l] *
          ANSDataTemplate.FTR_AItotal.value[l][t]) /
        1000.0; // 국제선 도착 총탄소배출량
      ANSDataTemplate.CER_AIRamount.value[l][t] =
        (ANSDataTemplate.FCE_hour.value[l] *
          ANSDataTemplate.FTR_AIRtotal.value[l][t]) /
        1000.0; // 국제선 도착-항로 총탄소배출량  CER_AIRamount 추가정의
    }
  }

  for (let i = 0; i < Year; i++) {
    ANSDataTemplate.carbonCredit.value[i] =
      ANSDatabase.carbon.value *
      Math.pow(1.0 + ANSDatabase.r_carbon.value / 100.0, i); //추가변수
    ANSDataTemplate.fuelCredit.value[i] =
      ANSDatabase.fuel.value *
      Math.pow(1.0 + ANSDatabase.r_fuel.value / 100.0, i);
  }

  // 탄소배출 절감 비용

  for (let l = 0; l < MAX; l++) {
    for (let t = 0; t < YEAR; t++) {
      ANSDataTemplate.CER_DDcost.value[l][t] =
        (ANSDatabase.carbonCredit.value[t] *
          ANSDataTemplate.CER_DDamount.value[l][t]) /
        1000000.0; // 국내선 출발 총탄소배출 절감비용
      ANSDataTemplate.CER_ADcost.value[l][t] =
        (ANSDatabase.carbonCredit.value[t] *
          ANSDataTemplate.CER_ADamount.value[l][t]) /
        1000000.0; // 국내선 착륙 총탄소배출 절감비용
      ANSDataTemplate.CER_DRcost.value[l][t] =
        (ANSDatabase.carbonCredit.value[t] *
          ANSDataTemplate.CER_DRamount.value[l][t]) /
        1000000.0; // 국내선 항로 총탄소배출 절감비용  CER_DRcost 추가정의

      ANSDataTemplate.CER_DIcost.value[l][t] =
        (ANSDatabase.carbonCredit.value[t] *
          ANSDataTemplate.CER_DIamount.value[l][t]) /
        1000000.0; // 국제선 출발 총탄소배출 절감비용
      ANSDataTemplate.CER_DIRcost.value[l][t] =
        (ANSDatabase.carbonCredit.value[t] *
          ANSDataTemplate.CER_DIRamount.value[l][t]) /
        1000000.0; // 국제선 출발-항로 총탄소배출 절감비용  CER_DIRcost[l][t] 추가정의
      ANSDataTemplate.CER_AIcost.value[l][t] =
        (ANSDatabase.carbonCredit.value[t] *
          ANSDataTemplate.CER_AIamount.value[l][t]) /
        1000000.0; // 국제선 도착 총탄소배출 절감비용
      ANSDataTemplate.CER_AIRcost.value[l][t] =
        (ANSDatabase.carbonCredit.value[t] *
          ANSDataTemplate.CER_AIRamount.value[l][t]) /
        1000000.0; // 국제선 도착-항로 총탄소배출 절감비용   CER_AIRcost  추가정의
    }
  }

  // 공항별 연료절감량 산출 : 국내선 출도착, 항로, 국제선 출발, 출발항로, 도착 도착항로 구분하여 연도별 산출

  //FR_amount(연간 총 연료 절감)
  for (let l = 0; l < MAX; l++) {
    for (let t = 0; t < YEAR; t++) {
      ANSDataTemplate.FR_DDamount.value[l][t] =
        (ANSDataTemplate.AFE_TO_hour.value[l] *
          ANSDataTemplate.FTR_DDtotal.value[l][t]) /
        1000.0; // 국내선 출발 총연료절감량
      ANSDataTemplate.FR_ADamount.value[l][t] =
        (ANSDataTemplate.AFE_LD_hour.value[l] *
          ANSDataTemplate.FTR_ADtotal.value[l][t]) /
        1000.0; // 국내선 착륙 총연료절감량
      ANSDataTemplate.FR_DRamount.value[l][t] =
        (ANSDataTemplate.FFE_hour.value[l] *
          ANSDataTemplate.FTR_DRtotal.value[l][t]) /
        1000.0; // 국내선 항로 총연료절감량  FR_DRamount 추가정의

      ANSDataTemplate.FR_DIamount.value[l][t] =
        (ANSDataTemplate.AFE_TO_hour.value[l] *
          ANSDataTemplate.FTR_DItotal.value[l][t]) /
        1000.0; // 국제선 출발 총연료절감량
      ANSDataTemplate.FR_DIRamount.value[l][t] =
        (ANSDataTemplate.FFE_hour.value[l] *
          ANSDataTemplate.FTR_DIRtotal.value[l][t]) /
        1000.0; // 국제선 출발-항로 총연료절감량 FR_DIRamount 추가정의
      ANSDataTemplate.FR_AIamount.value[l][t] =
        (ANSDataTemplate.AFE_LD_hour.value[l] *
          ANSDataTemplate.FTR_AItotal.value[l][t]) /
        1000.0; // 국제선 도착 총연료절감량
      ANSDataTemplate.FR_AIRamount.value[l][t] =
        (ANSDataTemplate.FFE_hour.value[l] *
          ANSDataTemplate.FTR_AIRtotal.value[l][t]) /
        1000.0; // 국제선 도착-항로 총연료절감량  FR_AIRamount 추가정의
    }
  }

  //FR_cost(연료비용 절감)

  for (let l = 0; l < MAX; l++) {
    for (let t = 0; t < YEAR; t++) {
      ANSDataTemplate.FR_DDcost.value[l][t] =
        (ANSDatabase.fuelCredit.value[t] *
          ANSDataTemplate.CER_DDamount.value[l][t]) /
        1000000.0; // 국내선 출발 총연료비절감
      ANSDataTemplate.FR_ADcost.value[l][t] =
        (ANSDatabase.fuelCredit.value[t] *
          ANSDataTemplate.CER_ADamount.value[l][t]) /
        1000000.0; // 국내선 착륙 총연료비절감
      ANSDataTemplate.FR_DRcost.value[l][t] =
        (ANSDatabase.fuelCredit.value[t] *
          ANSDataTemplate.CER_DRamount.value[l][t]) /
        1000000.0; // 국내선 항로 총연료비절감  FR_DRcost 추가정의

      ANSDataTemplate.FR_DIcost.value[l][t] =
        (ANSDatabase.fuelCredit.value[t] *
          ANSDataTemplate.CER_DIamount.value[l][t]) /
        1000000.0; // 국제선 출발 총연료비절감
      ANSDataTemplate.FR_DIRcost.value[l][t] =
        (ANSDatabase.fuelCredit.value[t] *
          ANSDataTemplate.CER_DIRamount.value[l][t]) /
        1000000.0; // 국제선 출발-항로 총연료비절감  FR_DIRcost[l][t] 추가정의
      ANSDataTemplate.FR_AIcost.value[l][t] =
        (ANSDatabase.fuelCredit.value[t] *
          ANSDataTemplate.CER_AIamount.value[l][t]) /
        1000000.0; // 국제선 도착 총연료비절감
      ANSDataTemplate.FR_AIRcost.value[l][t] =
        (ANSDatabase.fuelCredit.value[t] *
          ANSDataTemplate.CER_AIRamount.value[l][t]) /
        1000000.0; // 국제선 도착-항로 총연료비절감   FR_AIRcost  추가정의
    }
  }
  for (let i = 0; i < Year; i++) {
    ANSDataTemplate.OP_DDcost.value[i] =
      ANSDatabase.OPR_D.value *
      Math.pow(1.0 + ANSDatabase.r_OPcost.value / 100.0, i); //추가변수
    ANSDataTemplate.OP_DIcost.value[i] =
      ANSDatabase.OPR_I.value *
      Math.pow(1.0 + ANSDatabase.r_OPcost.value / 100.0, i);
    ANSDataTemplate.OP_ADcost.value[i] =
      ANSDatabase.OPR_D.value *
      Math.pow(1.0 + ANSDatabase.r_OPcost.value / 100.0, i);
    ANSDataTemplate.OP_AIcost.value[i] =
      ANSDatabase.OPR_I.value *
      Math.pow(1.0 + ANSDatabase.r_OPcost.value / 100.0, i);
  }
  // 공항별 총운항비용 절감 : 국내선, 국제선 출발/도착  OPR_cost
  for (let l = 0; l < MAX; l++) {
    for (let t = 0; t < YEAR; t++) {
      ANSDataTemplate.OPR_DDcost.value[l][t] =
        ((ANSDataTemplate.FTR_DDtotal.value[l][t] +
          ANSDataTemplate.FTR_ADtotal.value[l][t] +
          ANSDataTemplate.FTR_DRtotal.value[l][t]) *
          ANSDatabase.OP_DDcost.value[t]) /
        1000.0; // 국내선 운항비용 절감
      ANSDataTemplate.OPR_DIcost.value[l][t] =
        ((ANSDataTemplate.FTR_DItotal.value[l][t] +
          ANSDataTemplate.FTR_DIRtotal.value[l][t]) *
          ANSDatabase.OP_DIcost.value[t]) /
        1000.0; // 국제선 출발편 운항비용 절감
      ANSDataTemplate.OPR_ADcost.value[l][t] =
        ((ANSDataTemplate.FTR_ADtotal.value[l][t] +
          ANSDataTemplate.FTR_AIRtotal.value[l][t]) *
          ANSDatabase.OP_AIcost.value[t]) /
        1000.0; // 국제선 도착편 운항비용 절감
    }
  }

  // 지연시간 감소 (정시성 향상) 기대 효과 분석  (여기부터 보완한 것 임!!!!!)

  // 1_지연시간 감소율 목표 계산 : Logistic 모형 적용

  var a =
    (Math.log(0.1) -
      Math.log(
        (ANSDatabase.Dlygoal_Fin.value * 1.1) /
        ANSDatabase.Dlygoal_Start.value -
        Cetha
      )) /
    (ANSDatabase.Time_Pass_S.value - Cetha);
  var b =
    Math.log(
      (ANSDatabase.Dlygoal_Fin.value * 1.1) / ANSDatabase.Dlygoal_Start.value -
      Cetha
    ) - a;

  for (let t = 0; t < YEAR; t++) {
    //Flt_Sav 변수(연도별 운함시감 절감률 목표) 추가 정의
    ANSDataTemplate.Dly_Sav.value[t] =
      (ANSDatabase.Dlygoal_Fin.value * 1.0) /
      (Cetha + Math.exp(b + a * (t + 1))) /
      100.0;
  }

  // 2_ 공항별 총출발지연 감소시간  (국내선, 국제선은 출발지연은 공항만 고려), 항행원인 비율 고려

  for (let l = 0; l < MAX; l++) {
    for (let t = 0; t < YEAR; t++) {
      // 운항편당 출발지연 감소 시간을 국내선, 국제선으로 구분하여 산출
      ANSDataTemplate.Avg_DD_Dly.value[l][t] =
        (ANSDatabase.Time_DD_Dly.value[l] *
          ANSDataTemplate.Dly_Sav.value[t] *
          ANSDatabase.DLY_DD_ANSshare.value[l]) /
        (100.0 * 60.0); // 국내선 이륙(공항) 지연시간 절감
      ANSDataTemplate.Avg_DI_Dly.value[l][t] =
        (ANSDatabase.Time_DI_Dly.value[l] *
          ANSDataTemplate.Dly_Sav.value[t] *
          ANSDatabase.DLY_DI_ANSshare.value[l]) /
        (100.0 * 60.0); // 국제선 이륙(공항) 지연시간 절감

      // 총출발지연 감소 시간을 국내선, 국제선으로 구분하여 산출
      ANSDataTemplate.TL_DD_Dly.value[l][t] =
        ANSDatabase.N_DD_Flght.value[l][t] * ANSDatabase.Avg_DD_Dly.value[l][t]; // 국내선 총 출발지연시간 절감
      ANSDataTemplate.TL_DI_Dly.value[l][t] =
        ANSDatabase.N_DI_Flght.value[l][t] *
        ANSDataTemplate.Avg_DI_Dly.value[l][t]; // 국제선 총 공항 출발지연시간 절감
    }
  }
  // 3_출발 지연 탄소배출/연료 절감량 및 탄소배출/연료 비용 산출 : CER_amount_byDDLY(탄소배출 감축량) FR_amount_byADLY(총 연료 절감)

  for (let l = 0; l < MAX; l++) {
    for (let t = 0; t < YEAR; t++) {
      ANSDataTemplate.CER_DDamount_byADLY.value[l][t] =
        (ANSDataTemplate.ACE_TO_hour.value[l] *
          ANSDataTemplate.TL_DD_Dly.value[l][t]) /
        1000.0; // 국내선 총 공항 출발 탄소배출 절감량
      ANSDataTemplate.CER_DIamount_byADLY.value[l][t] =
        (ANSDataTemplate.ACE_TO_hour.value[l] *
          ANSDataTemplate.TL_DI_Dly.value[l][t]) /
        1000.0; // 국제선 총 공항 출발 탄소배출 절감량
      ANSDataTemplate.FR_DDamount_byADLY.value[l][t] =
        (ANSDataTemplate.AFE_TO_hour.value[t] *
          ANSDataTemplate.TL_DD_Dly.value[l][t]) /
        1000.0; // 국내선 총 공항 출발 연료 절감량
      ANSDataTemplate.FR_DIamount_byADLY.value[l][t] =
        (ANSDataTemplate.AFE_TO_hour.value[t] *
          ANSDataTemplate.TL_DI_Dly.value[l][t]) /
        1000.0; // 국제선 총 공항 출발 연료 절감량

      ANSDataTemplate.CER_DDcost_byADLY.value[l][t] =
        (ANSDatabase.carbonCredit.value[t] *
          ANSDataTemplate.CER_DDamount_byADLY.value[l][t]) /
        1000000.0; // 국내선 총 공항 출발 탄소배출 절감비용
      ANSDataTemplate.CER_DIcost_byADLY.value[l][t] =
        (ANSDatabase.carbonCredit.value[t] *
          ANSDataTemplate.CER_DIamount_byADLY.value[l][t]) /
        1000000.0; // 국제선 총 공항 출발 탄소배출 절감비용
      ANSDataTemplate.FR_DDcost_byADLY.value[l][t] =
        (ANSDatabase.fuelCredit.value[t] *
          ANSDataTemplate.FR_DDamount_byADLY.value[l][t]) /
        1000000.0; // 국내선 총 공항 출발 연료 절감비용
      ANSDataTemplate.FR_DIcost_byADLY.value[l][t] =
        (ANSDatabase.fuelCredit.value[t] *
          ANSDataTemplate.FR_DIamount_byADLY.value[l][t]) /
        1000000.0; // 국제선 총 공항 출발 연료 절감비용
    }
  }

  // 4_ 공항별 총도착지연 감소시간  (공항, 항로 고려), 항행원인 비율 고려

  for (let l = 0; l < MAX; l++) {
    // l 공항의 국내 공역비행시간 점유율 : 도착(착륙)과정, 항로 과정 비율 구분
    for (let t = 0; t < YEAR; t++) {
      // 운항편당 도착지연 감소 시간을 국내선, 국제선으로 구분하여 산출

      ANSDataTemplate.Avg_AD_Dly.value[l][t] =
        (ANSDatabase.Time_AD_Dly.value[l] *
          ANSDataTemplate.Dly_Sav.value[t] *
          ANSDatabase.DLY_AD_ANSshare.value[l]) /
        (100.0 * 60.0); // 국내선 도착 지연감소 시간

      let FIR_Share =
        (ANSDatabase.Time_AIRoute.value[l] + ANSDatabase.Time_ILD.value[l]) /
        ANSDatabase.average_AITime.value[l]; // 국제선 도착 운항시간중 국내 공역 운항비율
      //  let FIR_Share =
      //   ANSDatabase.Time_AIRoute.value[l] /
      //   (ANSDatabase.Time_AIRoute.value[l] + ANSDatabase.Time_ILD.value[l]);
      let FIR_LD_Share =
        ANSDatabase.Time_ILD.value[l] /
        (ANSDatabase.Time_AIRoute.value[l] + ANSDatabase.Time_ILD.value[l]); // 국제선 도착 국내 공역 운항 시간 중 착륙과정 비율

      ANSDataTemplate.Avg_AI_Dly.value[l][t] =
        (ANSDatabase.Time_AI_Dly.value[l] *
          ANSDataTemplate.Dly_Sav.value[t] *
          ANSDatabase.DLY_AI_ANSshare.value[l]) /
        (100.0 * 60.0); // 국제선 총도착 지연시간 절감(국내공역)
      ANSDataTemplate.Avg_AI_Dly_LD.value[l][t] =
        ANSDataTemplate.Avg_AI_Dly.value[l][t] * FIR_LD_Share; // 국제선 도착 착륙(공항)과정 지연시간 감소
      ANSDataTemplate.Avg_AI_Dly_R.value[l][t] =
        ANSDataTemplate.Avg_AI_Dly.value[l][t] * (1 - FIR_LD_Share); // 국제선 도착 항로 지연시간 감소

      // 총출발지연 감소 시간을 국내선, 국제선으로 구분하여 산출
      ANSDataTemplate.TL_AD_Dly.value[l][t] =
        ANSDatabase.N_AD_Flght.value[l][t] *
        ANSDataTemplate.Avg_AI_Dly.value[l][t]; // 국내선 총 도착 지연시간 절감
      ANSDataTemplate.TL_AI_Dly_LD.value[l][t] =
        ANSDatabase.N_AI_Flght.value[l][t] *
        ANSDataTemplate.Avg_AI_Dly_LD.value[l][t]; // 국제선 총 도착 착륙과정 지연시간 절감
      ANSDataTemplate.TL_AI_Dly_R.value[l][t] =
        ANSDatabase.N_AI_Flght.value[l][t] *
        ANSDataTemplate.Avg_AI_Dly_R.value[l][t]; // 국제선 총 도착 항로과정 지연시간 절감
      ANSDataTemplate.TL_AI_Dly.value[l][t] =
        ANSDataTemplate.TL_AI_Dly_LD.value[l][t] +
        ANSDataTemplate.TL_AI_Dly_R.value[l][t]; // 국제선 총 도착 지연시간 절감
    }
  }

  // 5_항로 및 도착(착륙)과정 탄소배출 및 연료 감축량 및 절감비용

  for (let l = 0; l < MAX; l++) {
    for (let t = 0; t < YEAR; t++) {
      ANSDataTemplate.CER_ADamount_byADLY.value[l][t] =
        (ANSDataTemplate.ACE_LD_hour.value[l] *
          ANSDataTemplate.TL_AD_Dly.value[l][t]) /
        1000.0; // 국내선 총 도착 탄소배출 절감량
      ANSDataTemplate.CER_AI_LDamount_byADLY.value[l][t] =
        (ANSDataTemplate.ACE_LD_hour.value[l] *
          ANSDataTemplate.TL_AI_Dly_LD.value[l][t]) /
        1000.0; // 국제선 총 공항 도착(착륙) 탄소배출 절감량
      ANSDataTemplate.CER_AI_Ramount_byADLY.value[l][t] =
        (ANSDataTemplate.FCE_hour.value[l] *
          ANSDataTemplate.TL_AI_Dly_R.value[l][t]) /
        1000.0; // 국제선 총 도착 항로 탄소배출 절감량
      ANSDataTemplate.CER_AIamount_byADLY.value[l][t] =
        ANSDataTemplate.CER_AI_LDamount_byADLY.value[l][t] +
        ANSDataTemplate.CER_AI_Ramount_byADLY.value[l][t] / 1000.0; // 국제선 총 도착 탄소배출 절감량

      ANSDataTemplate.FR_ADamount_byADLY.value[l][t] =
        (ANSDataTemplate.AFE_TO_hour.value[t] *
          ANSDataTemplate.TL_AD_Dly.value[l][t]) /
        1000.0; // 국내선 총 도착 연료 절감량
      ANSDataTemplate.FR_AI_LDamount_byADLY.value[l][t] =
        (ANSDataTemplate.AFE_TO_hour.value[t] *
          ANSDataTemplate.TL_AI_Dly_LD.value[l][t]) /
        1000.0; // 국제선 총 공항 도착(착륙) 연료 절감량
      ANSDataTemplate.FR_AI_Ramount_byADLY.value[l][t] =
        (ANSDataTemplate.FFE_hour.value[t] *
          ANSDataTemplate.TL_AI_Dly_R.value[l][t]) /
        1000.0; // 국제선 총 도착 항로 연료 절감량
      ANSDataTemplate.FR_AIamount_byADLY.value[l][t] =
        ANSDataTemplate.FR_AI_LDamount_byADLY.value[l][t] +
        ANSDataTemplate.FR_AI_Ramount_byADLY.value[l][t] / 1000.0; // 국제선 총 도착 연료 절감량

      ANSDataTemplate.CER_ADcost_byADLY.value[l][t] =
        (ANSDatabase.carbonCredit.value[t] *
          ANSDataTemplate.CER_ADamount_byADLY.value[l][t]) /
        1000000.0; // 국내선 총 공항 도착 탄소배출 절감비용
      ANSDataTemplate.CER_AI_LDcost_byADLY.value[l][t] =
        (ANSDatabase.carbonCredit.value[t] *
          ANSDataTemplate.CER_AI_LDamount_byADLY.value[l][t]) /
        1000000.0; // 국제선 총 공항 도착(착륙) 탄소배출 절감비용
      ANSDataTemplate.CER_AI_Rcost_byADLY.value[l][t] =
        (ANSDatabase.carbonCredit.value[t] *
          ANSDataTemplate.CER_AI_Ramount_byADLY.value[l][t]) /
        1000000.0; // 국제선 총 도착 항로 탄소배출 절감비용
      ANSDataTemplate.CER_AIcost_byADLY.value[l][t] =
        ANSDataTemplate.CER_AI_LDcost_byADLY.value[l][t] +
        ANSDataTemplate.CER_AI_Rcost_byADLY.value[l][t] / 1000000.0; // 국제선 총 도착 탄소배출 절감비용

      ANSDataTemplate.FR_ADcost_byADLY.value[l][t] =
        (ANSDatabase.fuelCredit.value[t] *
          ANSDataTemplate.FR_ADamount_byADLY.value[l][t]) /
        1000000.0; // 국내선 총 공항 도착 연료 절감비용
      ANSDataTemplate.FR_AI_LDcost_byADLY.value[l][t] =
        (ANSDatabase.fuelCredit.value[t] *
          ANSDataTemplate.FR_AI_LDamount_byADLY.value[l][t]) /
        1000000.0; // 국제선 총 공항 도착 연료 절감비용
      ANSDataTemplate.FR_AI_Rcost_byADLY.value[l][t] =
        (ANSDatabase.fuelCredit.value[t] *
          ANSDataTemplate.FR_AI_Ramount_byADLY.value[l][t]) /
        1000000.0; // 국제선 총 공항 도착 연료 절감비용
      ANSDataTemplate.FR_AIcost_byADLY.value[l][t] =
        ANSDataTemplate.FR_AI_LDcost_byADLY.value[l][t] +
        ANSDataTemplate.FR_AI_Rcost_byADLY.value[l][t] / 1000000.0; // 국제선 총 도착 연료 절감비용
    }
  }

  // 6_운항비용 절감 : 국내선 총도착지연, 국제선 : 도착항로+착륙 지연, 출발은 이륙지연 만 고려 : OPR_cost(운항비용 절감 편익)

  for (let l = 0; l < MAX; l++) {
    //연료비 제외하는 것 추가 검토
    for (let t = 0; t < YEAR; t++) {
      ANSDataTemplate.OPR_ADcost_DLY.value[l][t] =
        (ANSDataTemplate.TL_AD_Dly.value[l][t] *
          ANSDatabase.OP_DDcost.value[t]) /
        1000.0; // 국내선 지연감소 운항비 절감
      ANSDataTemplate.OPR_DIcost_DLY.value[l][t] =
        (ANSDataTemplate.TL_DI_Dly.value[l][t] *
          ANSDatabase.OP_DIcost.value[t]) /
        1000.0; // 국제선 출발지연 감소 운항비 절감
      ANSDataTemplate.OPR_AIcost_DLY.value[l][t] =
        (ANSDataTemplate.TL_AI_Dly.value[l][t] *
          ANSDatabase.OP_ADcost.value[t]) /
        1000.0; // 국제선 도착지연 감소 운항비 절감
    }
  }

  // 7_지연시간 감소에 대한 여객 및 화물편익 BNF_PSG(여객 편익, BNF_CRG(화물 편익) 고객 편익은 도착지연만 고려함

  for (let l = 0; l < MAX; l++) {
    for (let t = 0; t < YEAR; t++) {
      ANSDataTemplate.BNF_AD_PSG.value[l][t] =
        (ANSDatabase.PSG_AD.value[l][t] *
          ANSDataTemplate.TL_AD_Dly.value[l][t] *
          ANSDatabase.DLY_AD_cost_PSG.value[l][t]) /
        1000000.0; // 국내선 도착지연 감소편익(여객)
      ANSDataTemplate.BNF_AI_PSG.value[l][t] =
        (ANSDatabase.PSG_AI.value[l][t] *
          ANSDataTemplate.TL_AI_Dly.value[l][t] *
          ANSDatabase.DLY_AI_cost_PSG.value[l][t]) /
        1000000.0; // 국제선 도착지연 감소편익(여객)

      // BNF_AD_CRG[l][t] = CRG_AD[l][t] * TL_AD_Dly[l][t](화물) * DLY_AD_cost_CRG[l][t];   // 국내선 도착지연 감소편익(화물) 2차
      // BNF_AI_CRG[l][t] = CRG_AI[l][t] * TL_AI_Dly[l][t](화물) * DLY_AI_cost_CRG[l][t];   // 국내선 도착지연 감소편익(화물) 2차
    }
  }

  // 8_영공통과 운항시간 절감 효과 (공항별 효과에서는 분석 제외)

  // 운항시간 절감률 목표 계산 : Logistic 모형 적용 - 운항시간 절감 계수 동일하게 사용

  for (let l = 0; l < MAX; l++) {
    for (let t = 0; t < Year; t++) {
      ANSDataTemplate.N_Pass_Flght.value[t] =
        ANSDatabase.N_Pass_F.value[l] *
        Math.pow(1.0 + ANSDatabase.r_Pass.value / 100.0, t); // 총 영공통과 항공편수 //추가변수
    }
  }

  for (let t = 0; t < YEAR; t++) {
    ANSDataTemplate.Time_Pass.value[t] =
      ANSDataTemplate.Flt_Sav.value[t] * ANSDatabase.Time_Pass_S.value; // 영공통과 시간 절감
    ANSDataTemplate.FTR_Pass.value[t] =
      (ANSDatabase.N_Pass_Flght.value[t] * ANSDataTemplate.Time_Pass.value[t]) /
      60.0; // 총 영공통과 운항시간 절감

    ANSDataTemplate.CER_amount_byAFT.value[t] =
      (ANSDataTemplate.FCE_hour.value[t] * ANSDataTemplate.FTR_Pass.value[t]) /
      1000.0; // 총 영공통과 탄소배출 감소
    ANSDataTemplate.CER_cost_byAFT.value[t] =
      (ANSDatabase.carbonCredit.value[t] *
        ANSDataTemplate.CER_amount_byAFT.value[t]) /
      1000000.0; // 총 영공통과 탄소배출 비용 감소

    ANSDataTemplate.FR_amount_byAFT.value[t] =
      (ANSDataTemplate.FFE_hour.value[t] * ANSDataTemplate.FTR_Pass.value[t]) /
      1000.0; // 총 영공통과 연료소모 감소
    ANSDataTemplate.FR_cost_byAFT.value[t] =
      (ANSDatabase.fuelCredit.value[t] *
        ANSDataTemplate.FR_amount_byAFT.value[t]) /
      1000000.0; // 총 영공통과 연료비 절감}
  }
  var a =
    (Math.log(0.1) -
      Math.log(
        (ANSDatabase.Safty_Fin.value * 1.1) / ANSDatabase.Safty_Start.value -
        Cetha
      )) /
    (ANSDatabase.Time_Pass_S.value - Cetha);
  var b =
    Math.log(
      (ANSDatabase.Safty_Fin.value * 1.1) / ANSDatabase.Safty_Start.value -
      Cetha
    ) - a;
  for (let t = 0; t < Year; t++) {
    // 연도별 안전사고 절감률 목표
    ANSDataTemplate.Safty_Sav.value[t] =
      (ANSDatabase.Safty_Fin.value * 1.0) /
      (1.0 + Math.exp(b + a * (t + 1))) /
      100.0;
    ANSDataTemplate.Safty_cost.value[t] =
      ANSDatabase.N_Safty.value *
      ANSDataTemplate.Safty_Sav.value[t] *
      ANSDatabase.Safty_cost_M.value;
  }
};

export default calculateANS;
