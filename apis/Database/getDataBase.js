import axios from "axios"
import { BASE_URL } from "@/utils/constants/endpoints"

const getDependencyVariable = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/database.csv`)
    return { data }
  } catch (error) {
    return { data: error }
  }
}

export default getDependencyVariable