import { FTRgoal_Fin, FTRgoal_Start } from "../constants/ANSDatabase";

const calculateANS = () => {
  const Year = [1, 2, 3]
  const MAX = 1;
  const N_AC = 1;

  var a = Math.log10(FTRgoal_Start[0] / (0.999 * FTRgoal_Fin[0])); // FTRgoal_Start, FTRgoal_Fin 추가정의 / 자연로그함수 ln() 확인 / a, b 전역변수 사용가능?
  var b = (1 / Year.length) * (Math.log10(1 / 0.999) - a);

  for (let t = 0; t < Year.length; t++) {
    //Flt_Sav 변수(연도별 운함시감 절감률 목표) 추가 정의
    Flt_Sav[t] = (FTRgoal_Fin * 0.999) / (1 + Math.exp(a + b * t)) / 100;
  }

  //시간당 편균 탄소배출량, 연료소모량 계산, 임시 변수 정의

  // 공항별 항공기 기종별 시간당 탄소 배출량, 연료 소모량 기반으로 시간당 산출: 출도착, 항로 구분
  for (let l = 0; l < N_AC; l++) {
    // 공항별 시간당 탄소배출량

    let Temp_CA = 0.0,
      Temp_CB = 0.0,
      Temp_CC = 0.0,
      Temp_FA = 0.0,
      Temp_FB = 0.0,
      Temp_FC = 0.0; // 중간 계산용 임시변수

    for (let k = 0; k < Year.length; k++) {
      // N_AC - 항공기 기종 정의, 나머지 인덱스 재 정의
      Temp_CA = Temp_CA + FCE_flight[l][k] * FU_flight[l][k];
      Temp_CB = Temp_CB + ACE_TO_flight[l][k] * AU_flight[l][k];
      Temp_CC = Temp_CC + ACE_LD_flight[l][k] * AU_flight[l][k];
    }
    //공항별 이륙, 착륙, 항로의 시간당 탄소배출량 산출  FCE_hour, ACE_TO_hour, ACE_LD_hour 인덱스 t-> l 공항으로 변경
    FCE_hour[l] = Temp_CA; // 시간당 항로 탄소배출량
    ACE_TO_hour[l] = Temp_CB; // 시간당 이륙(출발) 탄소배출량
    ACE_LD_hour[l] = Temp_CC; // 시간당 착륙(도착) 탄소배출량
  }

  for (let l = 0; l < MAX; l++) {
    // 공항별 시간당 연료소모량

    let Temp_CA = 0.0,
      Temp_CB = 0.0,
      Temp_CC = 0.0; // 중간 계산용 임시변수

    for (let k = 0; k < N_AC; k++) {
      Temp_CA = Temp_CA + FFE_flight[l][k] * FU_flight[l][k];
      Temp_CB = Temp_CB + AFE_TO_flight[l][k] * AU_flight[l][k];
      Temp_CC = Temp_CC + AFE_LD_flight[l][k] * AU_flight[l][k];
    }
    //공항별 이륙, 착륙, 항로의 시간당 연료소모량 산출   FFE_hour, AFE_TO_hour, AFE_LD_hour 인덱스 t-> l 공항으로 변경
    FFE_hour[l] = Temp_CA; // 시간당 항로 연료소모량
    AFE_TO_hour[l] = Temp_CB; // 시간당 이륙(출발) 연료소모량
    AFE_LD_hour[l] = Temp_CC; // 시간당 착륙(도착) 연료소모량
  }

  // 공항별, 연도별 총 운항시간 절감 산출 : 국제선, 국내선, 출발, 도착, 항로 구분하여 산출

  for (let l = 0; l < MAX; l++) {
    for (let t = 0; t < Year.length; t++) {
      // 운항편당 이륙, 착륙, 항로 감소 시간을 국내선, 국제선으로 구분하여 산출
      FTR_DDgoal[l][t] = Time_DTO[l] * Flt_Sav[t]; // 국내선 이륙 시간 절감
      FTR_ADgoal[l][t] = Time_DLD[l] * Flt_Sav[t]; // 국내선 착륙 시간 절감
      FTR_DRgoal[l][t] = Time_DRoute[l] * Flt_Sav[t]; // 국내선 항로 시간 절감 FTR_RDgoal 추가 정의

      FTR_DIgoal[l][t] = Time_ITO[l] * Flt_Sav[t]; // 국제선 이륙시간 절감
      FTR_DIRgoal[l][t] = Time_DIRoute[l] * Flt_Sav[t]; // 국제선 이륙항로 시간 절감, FTR_DRIgoal, Time_DIRoute 추가정의
      FTR_AIgoal[l][t] = Time_ILD[l] * Flt_Sav[t]; // 국제선 착륙시간 절감
      FTR_AIRgoal[l][t] = Time_AIRoute[l] * Flt_Sav[t]; // 국제선 착륙항로 시간 절감, FTR_ARIgoal, Time_AIRoute 추가정의

      // 운항편수를 고려한 총운항시간 절감규모 산출하기 : 국내선, 국제선 출발, 국제선 도착으로 구분
      FTR_DDtotal[l][t] = N_DD_Flght[l][t] * FTR_DDgoal[l][t]; // 국내선 이륙과정 총절감시간 (출발)
      FTR_ADtotal[l][t] = N_AD_Flght[l][t] * FTR_ADgoal[l][t]; // 국내선 착과정 총절감시간 (도착)
      FTR_DRtotal[l][t] =
        ((N_DD_Flght[l][t] + N_AD_Flght[l][t]) / 2) * FTR_DDgoal[l][t]; // 국내선 항로과정 총절감시간 FTR_DRtotal 추가정의

      FTR_DItotal[l][t] = N_DI_Flght[l][t] * FTR_DIgoal[l][t]; // 국제선 이륙과정 총절감시간
      FTR_DIRtotal[l][t] = N_DI_Flght[l][t] * FTR_DIRgoal[l][t]; // 국제선 이륙-항로과정 총절감시간  FTR_DIRtotal 추가정의
      FTR_AItotal[l][t] = N_AI_Flght[l][t] * FTR_AIgoal[l][t]; // 국제선 착률과정 총절감시간
      FTR_AIRtotal[l][t] = N_DI_Flght[l][t] * FTR_AIRgoal[l][t]; // 국제선 착륙-항로과정 총절감시간  FTR_AIRtotal 추가정의
    }
  }

  // 공항별 탄소배출 감축량 산출 : 국내선 출도착, 항로, 국제선 출발, 출발항로, 도착 도착항로 구분하여 연도별 산출

  for (let l = 0; l < MAX; l++) {
    for (let t = 0; t < Year.length; t++) {
      CER_DDamount[l][t] = ACE_TO_hour[l] * FTR_DDtotal[l][t]; // 국내선 출발 총탄소배출량
      CER_ADamount[l][t] = ACE_LD_hour[l] * FTR_ADtotal[l][t]; // 국내선 착륙 총탄소배출량
      CER_DRamount[l][t] = FCE_hour[l] * FTR_DRtotal[l][t]; // 국내선 항로 총탄소배출량  CER_DRamount 추가정의

      CER_DIamount[l][t] = ACE_TO_hour[l] * FTR_DItotal[l][t]; // 국제선 출발 총탄소배출량
      CER_DIRamount[l][t] = FCE_hour[l] * FTR_DIRtotal[l][t]; // 국제선 출발-항로 총탄소배출량 CER_DIRamount 추가정의
      CER_AIamount[l][t] = ACE_LD_hour[l] * FTR_AItotal[l][t]; // 국제선 도착 총탄소배출량
      CER_AIRamount[l][t] = FCE_hour[l] * FTR_AIRtotal[l][t]; // 국제선 도착-항로 총탄소배출량  CER_AIRamount 추가정의
    }
  }

  // 탄소배출 절감 비용

  for (let l = 0; l < MAX; l++) {
    for (let t = 0; t < Year.length; t++) {
      CER_DDcost[l][t] = carbonCredit[t] * CER_DDamount[l][t]; // 국내선 출발 총탄소배출 절감비용
      CER_ADcost[l][t] = carbonCredit[t] * CER_ADamount[l][t]; // 국내선 착륙 총탄소배출 절감비용
      CER_DRcost[l][t] = carbonCredit[t] * CER_DRamount[l][t]; // 국내선 항로 총탄소배출 절감비용  CER_DRcost 추가정의

      CER_DIcost[l][t] = carbonCredit[t] * CER_DIamount[l][t]; // 국제선 출발 총탄소배출 절감비용
      CER_DIRcost[l][t] = carbonCredit[t] * CER_DIRamount[l][t]; // 국제선 출발-항로 총탄소배출 절감비용  CER_DIRcost[l][t] 추가정의
      CER_AIcost[l][t] = carbonCredit[t] * CER_AIamount[l][t]; // 국제선 도착 총탄소배출 절감비용
      CER_AIRcost[l][t] = carbonCredit[t] * CER_AIRamount[l][t]; // 국제선 도착-항로 총탄소배출 절감비용   CER_AIRcost  추가정의
    }
  }

  // 공항별 연료절감량 산출 : 국내선 출도착, 항로, 국제선 출발, 출발항로, 도착 도착항로 구분하여 연도별 산출

  //FR_amount(연간 총 연료 절감)
  for (let l = 0; l < MAX; l++) {
    for (let t = 0; t < Year.length; t++) {
      FR_DDamount[l][t] = AFE_TO_hour[l] * FTR_DDtotal[l][t]; // 국내선 출발 총연료절감량
      FR_ADamount[l][t] = AFE_LD_hour[l] * FTR_ADtotal[l][t]; // 국내선 착륙 총연료절감량
      FR_DRamount[l][t] = FFE_hour[l] * FTR_DRtotal[l][t]; // 국내선 항로 총연료절감량  FR_DRamount 추가정의

      FR_DIamount[l][t] = AFE_TO_hour[l] * FTR_DItotal[l][t]; // 국제선 출발 총연료절감량
      FR_DIRamount[l][t] = FFE_hour[l] * FTR_DIRtotal[l][t]; // 국제선 출발-항로 총연료절감량 FR_DIRamount 추가정의
      FR_AIamount[l][t] = AFE_LD_hour[l] * FTR_AItotal[l][t]; // 국제선 도착 총연료절감량
      FR_AIRamount[l][t] = FFE_hour[l] * FTR_AIRtotal[l][t]; // 국제선 도착-항로 총연료절감량  FR_AIRamount 추가정의
    }
  }

  //FR_cost(연료비용 절감)

  for (let l = 0; l < MAX; l++) {
    for (let t = 0; t < Year.length; t++) {
      FR_DDcost[l][t] = fuelCredit[t] * CER_DDamount[l][t]; // 국내선 출발 총연료비절감
      FR_ADcost[l][t] = fuelCredit[t] * CER_ADamount[l][t]; // 국내선 착륙 총연료비절감
      FR_DRcost[l][t] = fuelCredit[t] * CER_DRamount[l][t]; // 국내선 항로 총연료비절감  FR_DRcost 추가정의

      FR_DIcost[l][t] = fuelCredit[t] * CER_DIamount[l][t]; // 국제선 출발 총연료비절감
      FR_DIRcost[l][t] = fuelCredit[t] * CER_DIRamount[l][t]; // 국제선 출발-항로 총연료비절감  FR_DIRcost[l][t] 추가정의
      FR_AIcost[l][t] = fuelCredit[t] * CER_AIamount[l][t]; // 국제선 도착 총연료비절감
      FR_AIRcost[l][t] = fuelCredit[t] * CER_AIRamount[l][t]; // 국제선 도착-항로 총연료비절감   FR_AIRcost  추가정의
    }
  }

  // 공항별 총운항비용 절감 : 국내선, 국제선 출발/도착  OPR_cost
  for (let l = 0; l < MAX; l++) {
    for (let t = 0; t < Year.length; t++) {
      OPR_DDcost[l][t] =
        (FTR_DDtotal[l][t] + FTR_ADtotal[l][t] + FTR_DRtotal[l][t]) *
        OP_DDcost[t]; // 국내선 운항비용 절감
      OPR_DIcost[l][t] =
        (FTR_DItotal[l][t] + FTR_DIRtotal[l][t]) * OP_DIcost[t]; // 국제선 출발편 운항비용 절감
      OPR_ADcost[l][t] =
        (FTR_ADtotal[l][t] + FTR_AIRtotal[l][t]) * OP_AIcost[t]; // 국제선 도착편 운항비용 절감
    }
  }

  // 지연시간 감소 (정시성 향상) 기대 효과 분석  (여기부터 보완한 것 임!!!!!)

  // 1_지연시간 감소율 목표 계산 : Logistic 모형 적용

  var a = Math.log10(Dlygoal_Start / (0.999 * Dlygoal_Fin)); // Dlygoal_Start, Dlygoal_Fin 추가정의 / 자연로그함수 ln() 확인 / a, b 전역변수 사용가능?
  var b = (1 / Year.length) * (Math.log10(1 / 0.999) - a);

  for (let t = 0; t < Year.length; t++) {
    //Dly_Sav 변수(연도별 운함시감 절감률 목표) 추가 정의
    Dly_Sav[t] = (Dlygoal_Fin * 0.999) / (1 + Math.exp(a + b * t)) / 100;
  }

  // 2_ 공항별 총출발지연 감소시간  (국내선, 국제선은 출발지연은 공항만 고려), 항행원인 비율 고려

  for (let l = 0; l < MAX; l++) {
    for (let t = 0; t < Year.length; t++) {
      // 운항편당 출발지연 감소 시간을 국내선, 국제선으로 구분하여 산출
      Avg_DD_Dly[l][t] = Time_DD_Dly[l] * Dly_Sav[t] * DLY_DD_ANSshare[l]; // 국내선 이륙(공항) 지연시간 절감
      Avg_DI_Dly[l][t] = Time_DI_Dly[l] * Dly_Sav[t] * DLY_DI_ANSshare[l]; // 국제선 이륙(공항) 지연시간 절감

      // 총출발지연 감소 시간을 국내선, 국제선으로 구분하여 산출
      TL_DD_Dly[l][t] = N_DD_Flght[l][t] * Avg_DD_Dly[l][t]; // 국내선 총 출발지연시간 절감
      TL_DI_Dly[l][t] = N_DI_Flght[l][t] * Avg_DI_Dly[l][t]; // 국제선 총 공항 출발지연시간 절감
    }
  }
  // 3_출발 지연 탄소배출/연료 절감량 및 탄소배출/연료 비용 산출 : CER_amount_byDDLY(탄소배출 감축량) FR_amount_byADLY(총 연료 절감)

  for (let l = 0; l < MAX; l++) {
    for (let t = 0; t < Year.length; t++) {
      CER_DDamount_byADLY[l][t] = ACE_TO_hour[l] * TL_DD_Dly[l][t]; // 국내선 총 공항 출발 탄소배출 절감량
      CER_DIamount_byADLY[l][t] = ACE_TO_hour[l] * TL_DI_Dly[l][t]; // 국제선 총 공항 출발 탄소배출 절감량
      FR_DDamount_byADLY[l][t] = AFE_TO_hour[t] * TL_DD_Dly[l][t]; // 국내선 총 공항 출발 연료 절감량
      FR_DIamount_byADLY[l][t] = AFE_TO_hour[t] * TL_DI_Dly[l][t]; // 국제선 총 공항 출발 연료 절감량

      CER_DDcost_byADLY[l][t] = carbonCredit[t] * CER_DDamount_byADLY[l][t]; // 국내선 총 공항 출발 탄소배출 절감비용
      CER_DIcost_byADLY[l][t] = carbonCredit[t] * CER_DIamount_byADLY[l][t]; // 국제선 총 공항 출발 탄소배출 절감비용
      FR_DDcost_byADLY[l][t] = fuelCredit[t] * FR_DDamount_byADLY[l][t]; // 국내선 총 공항 출발 연료 절감비용
      FR_DIcost_byADLY[l][t] = fuelCredit[t] * FR_DIamount_byADLY[l][t]; // 국제선 총 공항 출발 연료 절감비용
    }
  }

  // 4_ 공항별 총도착지연 감소시간  (공항, 항로 고려), 항행원인 비율 고려

  for (let l = 0; l < MAX; l++) {
    // l 공항의 국내 공역비행시간 점유율 : 도착(착륙)과정, 항로 과정 비율 구분
    for (let t = 0; t < Year.length; t++) {
      // 운항편당 도착지연 감소 시간을 국내선, 국제선으로 구분하여 산출

      Avg_AD_Dly[l][t] = Time_AD_Dly[l] * Dly_Sav[t] * DLY_AD_ANSshare[l]; // 국내선 도착 지연감소 시간

      let FIR_Share = (Time_AIRoute[l] + Time_ILD[l]) / average_AITime[l]; // 국제선 도착 운항시간중 국내 공역 운항비율
      let FIR_LD_Share = Time_ILD[l] / (Time_AIRoute[l] + Time_ILD[l]); // 국제선 도착 국내 공역 운항 시간 중 착륙과정 비율

      Avg_AI_Dly[l][t] =
        Time_AI_Dly[l] * Dly_Sav[t] * DLY_AI_ANSshare[l] * FIR_Share; // 국제선 총도착 지연시간 절감(국내공역)
      Avg_AI_Dly_LD[l][t] = Avg_AI_Dly[l][t] * FIR_LD_Share; // 국제선 도착 착륙(공항)과정 지연시간 감소
      Avg_AI_Dly_R[l][t] = Avg_AI_Dly[l][t] * (1 - FIR_LD_Share); // 국제선 도착 항로 지연시간 감소

      // 총출발지연 감소 시간을 국내선, 국제선으로 구분하여 산출
      TL_AD_Dly[l][t] = N_AD_Flght[l][t] * Avg_AI_Dly[l][t]; // 국내선 총 도착 지연시간 절감
      TL_AI_Dly_LD[l][t] = N_AI_Flght[l][t] * Avg_AI_Dly_LD[l][t]; // 국제선 총 도착 착륙과정 지연시간 절감
      TL_AI_Dly_R[l][t] = N_AI_Flght[l][t] * Avg_AI_Dly_R[l][t]; // 국제선 총 도착 항로과정 지연시간 절감
      TL_AI_Dly[l][t] = TL_AI_Dly_LD[l][t] + TL_AI_Dly_R[l][t]; // 국제선 총 도착 지연시간 절감
    }
  }

  // 5_항로 및 도착(착륙)과정 탄소배출 및 연료 감축량 및 절감비용

  for (let l = 0; l < MAX; l++) {
    for (let t = 0; t < Year.length; t++) {
      CER_ADamount_byADLY[l][t] = ACE_LD_hour[l] * TL_AD_Dly[l][t]; // 국내선 총 도착 탄소배출 절감량
      CER_AI_LDamount_byADLY[l][t] = ACE_LD_hour[l] * TL_AI_Dly_LD[l][t]; // 국제선 총 공항 도착(착륙) 탄소배출 절감량
      CER_AI_Ramount_byADLY[l][t] = FCE_hour[l] * TL_AI_Dly_R[l][t]; // 국제선 총 도착 항로 탄소배출 절감량
      CER_AIamount_byADLY[l][t] =
        CER_AI_LDamount_byADLY[l][t] + CER_AI_Ramount_byADLY[l][t]; // 국제선 총 도착 탄소배출 절감량

      FR_ADamount_byADLY[l][t] = AFE_TO_hour[t] * TL_AD_Dly[l][t]; // 국내선 총 도착 연료 절감량
      FR_AI_LDamount_byADLY[l][t] = AFE_TO_hour[t] * TL_AI_Dly_LD[l][t]; // 국제선 총 공항 도착(착륙) 연료 절감량
      FR_AI_Ramount_byADLY[l][t] = FFE_hour[t] * TL_AI_Dly_R[l][t]; // 국제선 총 도착 항로 연료 절감량
      FR_AIamount_byADLY[l][t] =
        FR_AI_LDamount_byADLY[l][t] + FR_AI_Ramount_byADLY[l][t]; // 국제선 총 도착 연료 절감량

      CER_ADcost_byADLY[l][t] = carbonCredit[t] * CER_ADamount_byADLY[l][t]; // 국내선 총 공항 도착 탄소배출 절감비용
      CER_AI_LDcost_byADLY[l][t] =
        carbonCredit[t] * CER_AI_LDamount_byADLY[l][t]; // 국제선 총 공항 도착(착륙) 탄소배출 절감비용
      CER_AI_Rcost_byADLY[l][t] = carbonCredit[t] * CER_AI_Ramount_byADLY[l][t]; // 국제선 총 도착 항로 탄소배출 절감비용
      CER_AIcost_byADLY[l][t] =
        CER_AI_LDcost_byADLY[l][t] + CER_AI_Rcost_byADLY[l][t]; // 국제선 총 도착 탄소배출 절감비용

      FR_ADcost_byADLY[l][t] = fuelCredit[t] * FR_ADamount_byADLY[l][t]; // 국내선 총 공항 도착 연료 절감비용
      FR_AI_LDcost_byADLY[l][t] = fuelCredit[t] * FR_AI_LDamount_byADLY[l][t]; // 국제선 총 공항 도착 연료 절감비용
      FR_AI_Rcost_byADLY[l][t] = fuelCredit[t] * FR_AI_Ramount_byADLY[l][t]; // 국제선 총 공항 도착 연료 절감비용
      FR_AIcost_byADLY[l][t] =
        FR_AI_LDcost_byADLY[l][t] + FR_AI_Rcost_byADLY[l][t]; // 국제선 총 도착 연료 절감비용
    }
  }

  // 6_운항비용 절감 : 국내선 총도착지연, 국제선 : 도착항로+착륙 지연, 출발은 이륙지연 만 고려 : OPR_cost(운항비용 절감 편익)

  for (let l = 0; l < MAX; l++) {
    //연료비 제외하는 것 추가 검토
    for (let t = 0; t < Year.length; t++) {
      OPR_ADcost_DLY[l][t] = TL_AD_Dly[l][t] * OP_DDcost[t]; // 국내선 지연감소 운항비 절감
      OPR_DIcost_DLY[l][t] = TL_DI_Dly[l][t] * OP_DIcost[t]; // 국제선 출발지연 감소 운항비 절감
      OPR_AIcost_DLY[l][t] = TL_AI_Dly[l][t] * OP_ADcost[t]; // 국제선 도착지연 감소 운항비 절감
    }
  }

  // 7_지연시간 감소에 대한 여객 및 화물편익 BNF_PSG(여객 편익, BNF_CRG(화물 편익) 고객 편익은 도착지연만 고려함

  for (let l = 0; l < MAX; l++) {
    for (let t = 0; t < Year.length; t++) {
      BNF_AD_PSG[l][t] = PSG_AD[l][t] * TL_AD_Dly[l][t] * DLY_AD_cost_PSG[l][t]; // 국내선 도착지연 감소편익(여객)
      BNF_AI_PSG[l][t] = PSG_AI[l][t] * TL_AI_Dly[l][t] * DLY_AI_cost_PSG[l][t]; // 국제선 도착지연 감소편익(여객)

      // BNF_AD_CRG[l][t] = CRG_AD[l][t] * TL_AD_Dly[l][t](화물) * DLY_AD_cost_CRG[l][t];   // 국내선 도착지연 감소편익(화물) 2차
      // BNF_AI_CRG[l][t] = CRG_AI[l][t] * TL_AI_Dly[l][t](화물) * DLY_AI_cost_CRG[l][t];   // 국내선 도착지연 감소편익(화물) 2차
    }
  }

  // 8_영공통과 운항시간 절감 효과 (공항별 효과에서는 분석 제외)

  // 운항시간 절감률 목표 계산 : Logistic 모형 적용 - 운항시간 절감 계수 동일하게 사용

  var a = Math.log10(FTRgoal_Start / (0.999 * FTRgoal_Fin));
  var b = (1 / Year.length) * (Math.log10(1 / 0.999) - a);

  for (let t = 0; t < Year.length; t++) {
    // Flt_Sav 변수(연도별 운함시감 절감률 목표) 추가 정의
    Flt_Sav[t] = (FTRgoal_Fin * 0.999) / (1 + Math.exp(a + b * t)) / 100;
  }

  for (let t = 0; t < Year.length; t++) {
    Time_Pass[t] = Flt_Sav[t] * Time_Pass_S; // 영공통과 시간 절감
    FTR_Pass[t] = N_Pass_Flght[t] * Time_Pass[t]; // 총 영공통과 운항시간 절감

    CER_amount_byAFT[t] = FCE_hour[t] * FTR_Pass[t]; // 총 영공통과 탄소배출 감소
    CER_cost_byAFT[t] = carbonCredit[t] * CER_amount_byAFT[t]; // 총 영공통과 탄소배출 비용 감소

    FR_amount_byAFT[t] = FFE_hour[t] * FTR_Pass[t]; // 총 영공통과 연료소모 감소
    FR_cost_byAFT[t] = fuelCredit[t] * FR_amount_byAFT[t]; // 총 영공통과 연료비 절감}
  }
};

export default calculateANS;
