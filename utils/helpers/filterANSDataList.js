import { state } from '@/store/ansData/index.js'
import { mutateFilteredANSData } from "@/store/ansData/mutations.js"

const filterANSDataList = (type) => {
  console.log(type)
  if (type) {
    const filteredANSData = state.ANSData.filter(ans => ans.type === type)
    console.log(filteredANSData)
    mutateFilteredANSData(filteredANSData)
  } else {
    const filteredANSData = state.ANSData
    mutateFilteredANSData(state)
  }
}

export default filterANSDataList