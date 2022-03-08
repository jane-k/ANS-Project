import axios from "axios"
import { BASE_URL } from "@/utils/constants/endpoints"

const getLocalANSData = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/ANSData.json`)
    return { data }
  } catch (error) {
    return { data: error }
  }
}

export default getLocalANSData