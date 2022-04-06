import ANSDataTemplate from "@/utils/constants/ANSDataTemplate";

export const state = () => ({
  selectedANSType: null,
  // 계산이 완료된 ANS 데이터 결과물
  ANSData: ANSDataTemplate,
  // 계산용 초기 데이터베이스
  initialData: null,
  filteredANSData: null,
  filteredDataName: null,
  filteredDataCount: 0
})
