const ANSDatabase = {
  FTRgoal_Start: {
    type: "ASSUMPTION",
    variable: "FTRgoal_Start",
    label: "운항시간 절감 목표(시작 년도)",
    value: 40,
  },
  FTRgoal_Fin: {
    type: "ASSUMPTION",
    variable: "FTRgoal_Fin",
    label: "운항시간 절감 목표(종료 년도)",
    value: 100,
  },
  Dlygoal_Start: {
    type: "ASSUMPTION",
    variable: "Dlygoal_Start",
    label: "지연시간 목표(시작 년도)",
    value: 40,
  },
  Dlygoal_Fin: {
    type: "ASSUMPTION",
    variable: "Dlygoal_Fin",
    label: "지연시간 목표(종료 년도)",
    value: 10,
  },
  Time_Pass_S: {
    type: "ASSUMPTION",
    variable: "Time_Pass_S",
    label: "영공통과 운항시간",
    value: 30,
  },
  FCE_flight: {
    type: "OUTER",
    variable: "FCE_flight",
    label: "항로 탄소 배출량",
    value: [
      [
        10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13,
        13, 13, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15,
      ],
      [
        16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 19, 19, 19,
        19, 19, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21,
      ],
    ],
  },
  ACE_TO_flight: {
    type: "OUTER",
    variable: "ACE_TO_flight",
    label: "시간당 이륙 탄소 배출량",
    value: [
      [
        10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13,
        13, 13, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15,
      ],
      [
        16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 19, 19, 19,
        19, 19, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21,
      ],
    ],
  },
  ACE_LD_flight: {
    type: "OUTER",
    variable: "ACE_LD_flight",
    label: "시간당 착륙 탄소 배출량",
    value: [
      [
        10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13,
        13, 13, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15,
      ],
      [
        16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 19, 19, 19,
        19, 19, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21,
      ],
    ],
  },
  FU_flight: {
    type: "OUTER",
    variable: "FU_flight",
    label: "항로 이용분포",
    value: [
      [
        10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13,
        13, 13, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15,
      ],
      [
        16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 19, 19, 19,
        19, 19, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21,
      ],
    ],
  },
  AU_flight: {
    type: "OUTER",
    variable: "AU_flight",
    label: "공항 이용분포",
    value: [
      [
        10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13,
        13, 13, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15,
      ],
      [
        16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 19, 19, 19,
        19, 19, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21,
      ],
    ],
  },
  N_DD_F: {
    type: "OUTER",
    variable: "N_DD_F",
    label: "국내선 출발 총 운항편",
    value: 100,
  },
  N_DI_F: {
    type: "OUTER",
    variable: "N_DI_F",
    label: "국제선 출발 총 운항편",
    value: 100,
  },
  N_AD_F: {
    type: "OUTER",
    variable: "N_AD_F",
    label: "국내선 도착 총 운항편",
    value: 100,
  },
  N_AI_F: {
    type: "OUTER",
    variable: "N_AI_F",
    label: "국제선 도착 총 운항편",
    value: 100,
  },
  r_Dom: {
    type: "OUTER",
    variable: "r_Dom",
    label: "국내선 도착 총 운항편",
    value: 30,
  },
  r_Int: {
    type: "OUTER",
    variable: "r_Int",
    label: "국제선 도착 총 운항편",
    value: 40,
  },
  AFT_Dshare: {
    type: "OUTER",
    variable: "AFT_Dshare",
    label: "국내 영공 운항시간 점유율",
    value: [
      5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9,
      10, 10, 10, 10, 10,
    ],
  },
  AFT_Ishare: {
    type: "OUTER",
    variable: "AFT_Ishare",
    label: "국제 영공 운항시간 점유율",
    value: [
      5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9,
      10, 10, 10, 10, 10,
    ],
  },
  carbon: {
    type: "BASE",
    variable: "carbon",
    label: "탄소 배출권 가격",
    value: 100,
  },
  fuel: {
    type: "BASE",
    variable: "fuel",
    label: "연료 가격",
    value: 100,
  },
  r_carbon: {
    type: "BASE",
    variable: "r_carbon",
    label: "탄소 배출권 가격",
    value: 10,
  },
  r_fuel: {
    type: "BASE",
    variable: "r_fuel",
    label: "연료 가격",
    value: 10,
  },
  FFE_flight: {
    type: "BASE",
    variable: "FFE_flight",
    label: "항로 연료 소모량",
    value: [
      [
        10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13,
        13, 13, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15,
      ],
      [
        16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 19, 19, 19,
        19, 19, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21,
      ],
    ],
  },
  AFE_TO_flight: {
    type: "BASE",
    variable: "AFE_TO_flight",
    label: "이륙 연료 소모량",
    value: [
      [
        10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13,
        13, 13, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15,
      ],
      [
        16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 19, 19, 19,
        19, 19, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21,
      ],
    ],
  },
  AFE_LD_flight: {
    type: "BASE",
    variable: "AFE_LD_flight",
    label: "착륙 연료 소모량",
    value: [
      [
        10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13,
        13, 13, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15,
      ],
      [
        16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 19, 19, 19,
        19, 19, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21,
      ],
    ],
  },
  Time_ITO: {
    type: "BASE",
    variable: "Time_ITO",
    label: "국제선 이륙 소요시간",
    value: [3, 3],
  },
  Time_DTO: {
    type: "BASE",
    variable: "Time_DTO",
    label: "국내선 이륙 소요시간",
    value: [3, 3],
  },
  Time_ILD: {
    type: "BASE",
    variable: "Time_ILD",
    label: "국제선 착륙 소요시간",
    value: [3, 3],
  },
  Time_DLD: {
    type: "BASE",
    variable: "Time_DLD",
    label: "국내선 착륙 소요시간",
    value: [3, 3],
  },
  Time_DIRoute: {
    type: "BASE",
    variable: "Time_DIRoute",
    label: "평균 국제선 이륙-항로 운항시간",
    value: [4, 4],
  },
  Time_AIRoute: {
    type: "BASE",
    variable: "Time_AIRoute",
    label: "평균 국제선 착륙-항로 운항시간",
    value: [4, 4],
  },
  Time_DRoute: {
    type: "BASE",
    variable: "Time_DRoute",
    label: "국내선 평균 항로 운항시간",
    value: [4, 4],
  },
  N_Pass_F: {
    type: "INNER",
    variable: "N_Pass_F",
    label: "총 영공통과 운항편",
    value: [
      10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13,
      13, 13, 14, 14, 14, 14, 14, 15, 16, 17, 18, 19,
    ],
  },
  OPR_D: {
    type: "INNER",
    variable: "OPR_D",
    label: "국내선 출발편 시간당 평균 운항 비용",
    value: 10,
  },
  OPR_I: {
    type: "INNER",
    variable: "OPR_I",
    label: "국제선 출발편 시간당 평균 운항 비용",
    value: 10,
  },
  r_OPcost: {
    type: "INNER",
    variable: "r_OPcost",
    label: "국제선 도착편 시간당 평균 운항 비용",
    value: 0,
  },
  r_Pass: {
    type: "INNER",
    variable: "r_Pass",
    label: "국제선 도착편 시간당 평균 운항 비용",
    value: 0,
  },
  Time_DD_Dly: {
    type: "INNER",
    variable: "Time_DD_Dly",
    label: "총 국내선 출발편 감소 지연시간",
    value: [
      10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13,
      13, 13, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15,
    ],
  },
  Time_DI_Dly: {
    type: "INNER",
    variable: "Time_DI_Dly",
    label: "총 국제선 출발편 감소 지연시간",
    value: [
      10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13,
      13, 13, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15,
    ],
  },
  Time_AD_Dly: {
    type: "INNER",
    variable: "Time_AD_Dly",
    label: "총 국내선 도착편 감소 지연시간",
    value: [
      10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13,
      13, 13, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15,
    ],
  },
  Time_AI_Dly: {
    type: "INNER",
    variable: "Time_AI_Dly",
    label: "총 국제선 도착편 감소 지연시간",
    value: [
      10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13,
      13, 13, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15,
    ],
  },
  DLY_DD_ANSshare: {
    type: "ASSUMPTION",
    variable: "DLY_DD_ANSshare",
    label: "국내선 출발 지연 항행원인 비율",
    value: [5, 5],
  },
  DLY_DI_ANSshare: {
    type: "ASSUMPTION",
    variable: "DLY_DI_ANSshare",
    label: "국제선 출발 지연 항행원인 비율",
    value: [5, 5],
  },
  DLY_AD_ANSshare: {
    type: "ASSUMPTION",
    variable: "DLY_AD_ANSshare",
    label: "국내선 도착 지연 항행원인 비율",
    value: [5, 5],
  },
  DLY_AI_ANSshare: {
    type: "ASSUMPTION",
    variable: "DLY_AI_ANSshare",
    label: "국제선 도착 지연 항행원인 비율",
    value: [5, 5],
  },
  average_AITime: {
    type: "ASSUMPTION",
    variable: "average_AITime",
    label: "국제선 도착편 평균 비행시간",
    value: [5, 5],
  },
  DLY_AD_cost_PSG: {
    type: "ASSUMPTION",
    variable: "DLY_AD_cost_PSG",
    label: "국내선 도착편 여객 지연비용",
    value: [
      [
        10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13,
        13, 13, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15,
      ],
      [
        16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 19, 19, 19,
        19, 19, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21,
      ],
    ],
  },
  DLY_AI_cost_PSG: {
    type: "ASSUMPTION",
    variable: "DLY_AI_cost_PSG",
    label: "국제선 도착편 여객 지연비용",
    value: [
      [
        10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13,
        13, 13, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15,
      ],
      [
        16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 19, 19, 19,
        19, 19, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21,
      ],
    ],
  },
  PSG_AD: {
    type: "ASSUMPTION",
    variable: "PSG_AD",
    label: "국내선 도착편 평균 여객수",
    value: [
      [
        1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5,
        5, 6, 6, 6, 6, 6,
      ],
      [
        7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 11, 11,
        11, 11, 11, 12, 12, 12, 12, 12,
      ],
    ],
  },
  PSG_AI: {
    type: "ASSUMPTION",
    variable: "PSG_AI",
    label: "국제선 도착편 평균 여객수",
    value: [
      [
        1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5,
        5, 6, 6, 6, 6, 6,
      ],
      [
        7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 11, 11,
        11, 11, 11, 12, 12, 12, 12, 12,
      ],
    ],
  },
  Safty_Start: {
    type: "INNER",
    variable: "Safty_Start",
    label: "국제선 도착편 시간당 평균 운항 비용",
    value: 10,
  },
  Safty_Fin: {
    type: "INNER",
    variable: "Safty_Fin",
    label: "국제선 도착편 시간당 평균 운항 비용",
    value: 10,
  },
  Safty_cost_M: {
    type: "INNER",
    variable: "Safty_cost_M",
    label: "국제선 도착편 시간당 평균 운항 비용",
    value: 10,
  },
  N_Safty: {
    type: "INNER",
    variable: "N_Safty",
    label: "국제선 도착편 시간당 평균 운항 비용",
    value: 10,
  },
};

export default ANSDatabase;
