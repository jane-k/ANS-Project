import ANSDataTemplate from "@/utils/constants/ANSDataTemplate";
import ANSDatabase from "@/utils/constants/ANSDatabase";

export const state = () => ({
  selectedANSType: null,
  // 계산이 완료된 ANS 데이터 결과물
  // ANSResult: ANSDataTemplate,
  ANSDataTemplate: ANSDataTemplate,
  // 계산용 초기 데이터베이스
  ANSDatabase: ANSDatabase,
  filteredANSData: ANSDatabase,
  filteredDataName: null,
  filteredDataCount: 0,
});
