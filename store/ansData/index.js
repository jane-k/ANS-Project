import ANSDataTemplate from "@/utils/constants/ANSDataTemplate";
import ANSDatabase from "@/utils/constants/ANSDatabase";

export const state = () => ({
  selectedANSType: null,
  // 계산이 완료된 ANS 데이터 결과물
  // ANSResult: ANSDataTemplate,
  ANSData: ANSDataTemplate,
  // 계산용 초기 데이터베이스
  initialData: ANSDatabase,
  filteredANSData: null,
  filteredDataName: null,
  filteredDataCount: 0,
});
